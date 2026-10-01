'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, events as createPointerEvents, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PACKET_ARRIVED } from '../PacketTrail';
import {
  CARD,
  SLOT,
  STRAP_TEXTURE,
  drawBack,
  drawFront,
  drawHoloMask,
  drawHoloRainbow,
  drawStrap,
  loadBadgeFonts,
  type BadgeFonts,
} from './textures';

/*
 * Ausweis am Umhängeband.
 *
 * Keine Physik-Engine: Das Band ist eine Kette aus Punkten (Verlet-Integration
 * mit Längen-Constraints), die Karte hängt als starres Segment aus zwei Punkten
 * daran (Ring oben, Kartenunterkante unten). Die Drehung der Karte um ihre
 * Längsachse läuft als gedämpfte Feder zu einem Zielwinkel (vorne 0, hinten π).
 */

// ─── Maße und Physik ────────────────────────────────────────

const CAMERA_Z = 13;
const FOV = 22;
/** Sichtbare halbe Höhe bei z = 0 */
const HALF_H = CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2));

const ANCHOR = new THREE.Vector3(0, HALF_H + 0.45, 0);
const CLIP_GAP = 0.2; // vom Drehpunkt (Ring) bis zur Kartenoberkante
const BODY_LEN = CLIP_GAP + CARD.height;
const ROPE_SEGMENTS = 10;
const ROPE_LEN = ANCHOR.y - (-HALF_H + 0.28 + BODY_LEN); // Karte hängt knapp über dem unteren Rand
const SEG_LEN = ROPE_LEN / ROPE_SEGMENTS;

const GRAVITY = 36;
const DAMPING = 1.8; // pro Sekunde
const STEP = 1 / 120;
const ITERATIONS = 14;
/** Leichter Biegewiderstand, damit das Band nicht zu einer Zickzack-Schlaufe faltet */
const BEND_STIFFNESS = 0.08;
/** Höchstgeschwindigkeit pro Schritt, damit ein kräftiger Wurf nicht davonfliegt */
const MAX_STEP_MOVE = 0.04;
/** Die Karte kippt höchstens so weit aus der Senkrechten (sonst hinge sie kopfüber) */
const MAX_TILT = THREE.MathUtils.degToRad(70);
/** Höchste Lage des Rings beim Hochziehen, damit die Karte nicht oben aus dem Bild rutscht */
const MAX_PIVOT_Y = 0.9;
/** Obergrenze für Schwung, der von außen (Scrollen, Einschwingen) kommt */
const MAX_NUDGE_SPEED = 1.6;

const TWIST_SPRING = 6;
const TWIST_DAMPING = 3; // Dämpfungsgrad etwa 0,6: dreht kurz nach und steht dann
/** Wie lange die Rückseite nach dem Umdrehen sichtbar bleibt */
const FLIP_HOLD_MS = 8000;

const STRAP_WIDTH = 0.3;
const RIBBON_SAMPLES = 48;

const PIVOT = ROPE_SEGMENTS; // letzter Bandpunkt = Ring am Clip
const BOTTOM = ROPE_SEGMENTS + 1; // Kartenunterkante

/** Unterhalb davon gilt die Szene als ruhig (quadrierte Bewegung pro Schritt, Welteinheiten) */
const CALM_ENERGY = 2e-7;
const CALM_FRAMES = 30;

const tmp = new THREE.Vector3();
const tmp2 = new THREE.Vector3();
const AXIS_Z = new THREE.Vector3(0, 0, 1);

interface Grab {
  pointerId: number;
  /** Anteil entlang der Karte: 0 Ring, 1 Unterkante */
  t: number;
  /** Abstand vom Zeiger zum Greifpunkt */
  offset: THREE.Vector3;
  /** Ziel am Ende des letzten Frames und aktuelles Ziel: dazwischen wird pro Teilschritt interpoliert */
  from: THREE.Vector3;
  to: THREE.Vector3;
  target: THREE.Vector3;
}

interface Sim {
  pos: THREE.Vector3[];
  prev: THREE.Vector3[];
  invMass: number[];
  twist: number;
  twistVel: number;
  twistTarget: number;
  acc: number;
  grab: Grab | null;
  calm: number;
  /** Halbe Breite des eigenen Bereichs (Spalte des Ausweises), pro Frame aus der Größe */
  halfW: number;
  /** Seitliche Grenzen in Welteinheiten. Auf dem Desktop reicht maxX über die Textspalte. */
  minX: number;
  maxX: number;
}

function createSim(): Sim {
  const pos: THREE.Vector3[] = [];
  for (let i = 0; i <= ROPE_SEGMENTS; i++) pos.push(new THREE.Vector3(0, ANCHOR.y - i * SEG_LEN, 0));
  pos.push(new THREE.Vector3(0, pos[PIVOT].y - BODY_LEN, 0));
  const invMass = pos.map((_, i) => (i === 0 ? 0 : i === PIVOT ? 0.6 : i === BOTTOM ? 0.25 : 1));
  return {
    pos,
    prev: pos.map((p) => p.clone()),
    invMass,
    twist: 0,
    twistVel: 0,
    twistTarget: 0,
    acc: 0,
    grab: null,
    calm: 0,
    halfW: 1.5,
    minX: -1.5,
    maxX: 1.5,
  };
}

function satisfy(sim: Sim, a: number, b: number, rest: number, stiffness = 1) {
  const pa = sim.pos[a];
  const pb = sim.pos[b];
  const wa = sim.invMass[a];
  const wb = sim.invMass[b];
  if (wa + wb === 0) return;
  tmp.subVectors(pb, pa);
  const d = tmp.length() || 1e-6;
  const k = (stiffness * (d - rest)) / (d * (wa + wb));
  pa.addScaledVector(tmp, k * wa);
  pb.addScaledVector(tmp, -k * wb);
}

/** Greifpunkt auf der Karte zum Ziel ziehen (PBD-Constraint für einen Punkt auf dem Segment) */
function satisfyGrab(sim: Sim) {
  if (!sim.grab) return;
  const { t, target } = sim.grab;
  const p0 = sim.pos[PIVOT];
  const p1 = sim.pos[BOTTOM];
  const w0 = sim.invMass[PIVOT] * (1 - t);
  const w1 = sim.invMass[BOTTOM] * t;
  const denom = (1 - t) * w0 + t * w1;
  if (denom === 0) return;
  tmp.lerpVectors(p0, p1, t).sub(target);
  p0.addScaledVector(tmp, -w0 / denom);
  p1.addScaledVector(tmp, -w1 / denom);
}

/** Karte höchstens MAX_TILT aus der Senkrechten, sonst hinge sie kopfüber am Zeiger */
function limitTilt(sim: Sim) {
  const p0 = sim.pos[PIVOT];
  const p1 = sim.pos[BOTTOM];
  const angle = Math.atan2(p1.x - p0.x, p0.y - p1.y);
  if (Math.abs(angle) <= MAX_TILT) return;
  const a = Math.sign(angle) * MAX_TILT;
  p1.set(p0.x + Math.sin(a) * BODY_LEN, p0.y - Math.cos(a) * BODY_LEN, p0.z);
}

/** Ring nicht höher als MAX_PIVOT_Y, sonst stützt das lose Band die Karte nach oben */
function limitLift(sim: Sim) {
  const p = sim.pos[PIVOT];
  if (p.y > MAX_PIVOT_Y) {
    p.y = MAX_PIVOT_Y;
    sim.prev[PIVOT].y = Math.min(sim.prev[PIVOT].y, p.y);
  }
}

/** Karte seitlich im sichtbaren Bereich halten; die Wand schluckt den Schwung nach außen */
function limitSides(sim: Sim) {
  const inset = (CARD.width / 2) * Math.abs(Math.cos(sim.twist)) + 0.04;
  const lo = Math.min(sim.minX + inset, 0);
  const hi = Math.max(sim.maxX - inset, 0);
  for (const i of [PIVOT, BOTTOM]) {
    const p = sim.pos[i];
    if (p.x < lo || p.x > hi) {
      p.x = THREE.MathUtils.clamp(p.x, lo, hi);
      sim.prev[i].x = p.x;
    }
  }
}

function step(sim: Sim, dt: number) {
  const damp = Math.exp(-DAMPING * dt);
  for (let i = 1; i < sim.pos.length; i++) {
    const p = sim.pos[i];
    tmp.subVectors(p, sim.prev[i]).multiplyScalar(damp).clampLength(0, MAX_STEP_MOVE);
    sim.prev[i].copy(p);
    p.add(tmp);
    p.y -= GRAVITY * dt * dt;
  }

  for (let n = 0; n < ITERATIONS; n++) {
    satisfyGrab(sim);
    for (let i = 0; i < ROPE_SEGMENTS; i++) satisfy(sim, i, i + 1, SEG_LEN);
    for (let i = 0; i < ROPE_SEGMENTS - 1; i++) satisfy(sim, i, i + 2, SEG_LEN * 2, BEND_STIFFNESS);
    satisfy(sim, PIVOT, BOTTOM, BODY_LEN);
    limitLift(sim);
    limitTilt(sim);
  }
  limitSides(sim);

  sim.twistVel += (-TWIST_SPRING * (sim.twist - sim.twistTarget) - TWIST_DAMPING * sim.twistVel) * dt;
  sim.twist += sim.twistVel * dt;
}

/** Bewegung pro Schritt in Welteinheiten (quadriert), Drehung umgerechnet auf die Kartenkante */
function kinetic(sim: Sim) {
  let e = 0;
  for (let i = 1; i < sim.pos.length; i++) e += sim.pos[i].distanceToSquared(sim.prev[i]);
  const edge = (CARD.width / 2) * sim.twistVel * STEP;
  return e + edge * edge;
}

/** Seitlicher Schwung auf die Kette, zur Karte hin zunehmend und nach oben begrenzt */
function nudge(sim: Sim, vx: number) {
  for (let i = 1; i < sim.pos.length; i++) {
    const current = (sim.pos[i].x - sim.prev[i].x) / STEP;
    const next = THREE.MathUtils.clamp(current + vx * (i / BOTTOM), -MAX_NUDGE_SPEED, MAX_NUDGE_SPEED);
    sim.prev[i].x = sim.pos[i].x - next * STEP;
  }
  sim.calm = 0;
}

// ─── Geometrie und Texturen ─────────────────────────────────

function cardShape() {
  const w = CARD.width;
  const h = CARD.height;
  const r = CARD.radius;
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  // Schlitz für den Clip
  const sw = SLOT.width * w;
  const sh = SLOT.height * h;
  const sy = h / 2 - SLOT.top * h - sh;
  const hole = new THREE.Path();
  hole.absarc(-sw / 2 + sh / 2, sy + sh / 2, sh / 2, Math.PI / 2, (Math.PI * 3) / 2, false);
  hole.lineTo(sw / 2 - sh / 2, sy);
  hole.absarc(sw / 2 - sh / 2, sy + sh / 2, sh / 2, -Math.PI / 2, Math.PI / 2, false);
  hole.lineTo(-sw / 2 + sh / 2, sy + sh);
  shape.holes.push(hole);
  return shape;
}

function useBadgeAssets(fonts: BadgeFonts) {
  const assets = useMemo(() => {
    const make = (draw: (c: HTMLCanvasElement, f: BadgeFonts) => void, anisotropy = 4) => {
      const canvas = document.createElement('canvas');
      draw(canvas, fonts);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = anisotropy;
      return texture;
    };

    const front = make(drawFront);
    const back = make(drawBack);
    const strap = make(drawStrap, 2);
    const holoMask = make((c) => drawHoloMask(c), 4);
    holoMask.colorSpace = THREE.NoColorSpace;
    const holoRainbow = make((c) => drawHoloRainbow(c), 1);
    holoRainbow.wrapS = THREE.RepeatWrapping;
    holoRainbow.wrapT = THREE.RepeatWrapping;
    strap.wrapS = THREE.RepeatWrapping;

    const body = new THREE.ExtrudeGeometry(cardShape(), {
      depth: CARD.depth,
      bevelEnabled: false,
      curveSegments: 10,
    });
    body.translate(0, 0, -CARD.depth / 2);

    const face = new THREE.PlaneGeometry(CARD.width, CARD.height);

    // Band als Streifen aus Dreiecken. Positionen pro Frame, Normalen fest zur Kamera,
    // damit überlappende Stellen beim Falten nicht dunkel flackern.
    const ribbon = new THREE.BufferGeometry();
    const count = (RIBBON_SAMPLES + 1) * 2;
    ribbon.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    const normal = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) normal[i * 3 + 2] = 1;
    ribbon.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
    const uv = new Float32Array(count * 2);
    const tile = STRAP_WIDTH * (STRAP_TEXTURE.width / STRAP_TEXTURE.height);
    for (let i = 0; i <= RIBBON_SAMPLES; i++) {
      const u = ((i / RIBBON_SAMPLES) * ROPE_LEN) / tile;
      uv.set([u, 0, u, 1], i * 4);
    }
    ribbon.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    const index: number[] = [];
    for (let i = 0; i < RIBBON_SAMPLES; i++) {
      const a = i * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    ribbon.setIndex(index);

    const materials = {
      body: new THREE.MeshStandardMaterial({ color: '#1b1b1a', roughness: 0.6 }),
      // Wenig Klarlack: glänzt leicht, bleibt aber auch schräg im Licht dunkel
      front: new THREE.MeshPhysicalMaterial({
        map: front,
        alphaTest: 0.5,
        roughness: 0.6,
        clearcoat: 0.35,
        clearcoatRoughness: 0.4,
      }),
      back: new THREE.MeshPhysicalMaterial({
        map: back,
        alphaTest: 0.5,
        roughness: 0.6,
        clearcoat: 0.35,
        clearcoatRoughness: 0.4,
      }),
      // Unbeleuchtet, damit das Band exakt in der Akzentfarbe leuchtet
      strap: new THREE.MeshBasicMaterial({ map: strap, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: '#c9c8c4', metalness: 1, roughness: 0.3 }),
      // Hologramm: Regenbogen nur durch die Maske sichtbar, additiv, wandert mit der Kartenlage
      holo: new THREE.MeshBasicMaterial({
        map: holoRainbow,
        alphaMap: holoMask,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    };

    return { front, back, strap, holoMask, holoRainbow, body, face, ribbon, materials };
  }, [fonts]);

  // GPU-Speicher freigeben, wenn die Szene verschwindet
  useEffect(
    () => () => {
      assets.front.dispose();
      assets.back.dispose();
      assets.strap.dispose();
      assets.holoMask.dispose();
      assets.holoRainbow.dispose();
      assets.body.dispose();
      assets.face.dispose();
      assets.ribbon.dispose();
      Object.values(assets.materials).forEach((m) => m.dispose());
    },
    [assets],
  );

  return assets;
}

// ─── Szene ──────────────────────────────────────────────────

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04).texture;
    room.dispose();
    pmrem.dispose();
    scene.environment = env;
    scene.environmentIntensity = 0.3;
    return () => {
      scene.environment = null;
      env.dispose();
    };
  }, [gl, scene]);
  return null;
}

interface LanyardProps {
  fonts: BadgeFonts;
  /** Zusätzliche Breite der Zeichenfläche rechts neben der eigenen Spalte (Pixel) */
  extraRight: number;
  /** Element, das die Zeigerereignisse liefert, wenn die Fläche über dem Text liegt */
  source: HTMLElement | null;
  reducedMotion: boolean;
  active: boolean;
  started: boolean;
  /** Zählt hoch, wenn die Karte per Tastatur umgedreht werden soll */
  flipSignal: number;
  onStart: () => void;
  /** Karte wurde angetippt oder per Tastatur umgedreht */
  onTap: () => void;
  onFirstFrame: () => void;
  setCursor: (cursor: 'default' | 'grab' | 'grabbing') => void;
}

function Lanyard({
  fonts,
  extraRight,
  source,
  reducedMotion,
  active,
  started,
  flipSignal,
  onStart,
  onTap,
  onFirstFrame,
  setCursor,
}: LanyardProps) {
  const assets = useBadgeAssets(fonts);
  const sim = useMemo(() => createSim(), []);
  const card = useRef<THREE.Group>(null!);
  const firstFrame = useRef(true);
  const teardown = useRef<(() => void) | null>(null);
  const hovered = useRef(false);
  const flipTimer = useRef<number | undefined>(undefined);
  const live = useRef({ active, started, reducedMotion });
  live.current = { active, started, reducedMotion };
  const { camera, invalidate, gl } = useThree();
  const view = useRef({ w: 0, h: 0, extra: -1 });

  const helpers = useMemo(
    () => ({
      curve: new THREE.CatmullRomCurve3(sim.pos.slice(0, PIVOT + 1), false, 'centripetal'),
      samples: Array.from({ length: RIBBON_SAMPLES + 1 }, () => new THREE.Vector3()),
      raycaster: new THREE.Raycaster(),
      plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
      basis: new THREE.Matrix4(),
      x: new THREE.Vector3(),
      y: new THREE.Vector3(),
      z: new THREE.Vector3(),
      side: new THREE.Vector3(),
      ndc: new THREE.Vector2(),
      pointer: new THREE.Vector3(),
    }),
    [sim],
  );

  const onTapRef = useRef(onTap);
  onTapRef.current = onTap;

  // Liegt die Fläche über dem Text, darf ein Griff an die Karte weder Text markieren
  // noch einen Link darunter auslösen
  const swallowClick = useRef(false);
  useEffect(() => {
    if (!source) return;
    const onSelect = (e: Event) => {
      if (hovered.current || sim.grab) e.preventDefault();
    };
    const onClick = (e: Event) => {
      if (!swallowClick.current) return;
      swallowClick.current = false;
      e.preventDefault();
      e.stopPropagation();
    };
    source.addEventListener('selectstart', onSelect, true);
    source.addEventListener('dragstart', onSelect, true);
    source.addEventListener('click', onClick, true);
    return () => {
      source.removeEventListener('selectstart', onSelect, true);
      source.removeEventListener('dragstart', onSelect, true);
      source.removeEventListener('click', onClick, true);
    };
  }, [source, sim]);

  // Datenpakete aus dem Netzwerk kommen im Band an: kleiner Stoß
  useEffect(() => {
    const onPacket = () => {
      if (!live.current.started || live.current.reducedMotion || sim.grab) return;
      nudge(sim, 0.9);
      sim.twistVel += 0.8;
      invalidate();
    };
    window.addEventListener(PACKET_ARRIVED, onPacket);
    return () => window.removeEventListener(PACKET_ARRIVED, onPacket);
  }, [sim, invalidate]);

  /** Vorder- und Rückseite wechseln; nach einer Weile dreht sich die Karte zurück */
  const flip = () => {
    onTapRef.current();
    sim.twistTarget = sim.twistTarget === 0 ? Math.PI : 0;
    if (live.current.reducedMotion) {
      sim.twist = sim.twistTarget;
      sim.twistVel = 0;
    }
    sim.calm = 0;
    window.clearTimeout(flipTimer.current);
    if (sim.twistTarget !== 0) {
      flipTimer.current = window.setTimeout(() => {
        sim.twistTarget = 0;
        if (live.current.reducedMotion) sim.twist = 0;
        sim.calm = 0;
        invalidate();
      }, FLIP_HOLD_MS);
    }
    invalidate();
  };

  // Aufräumen beim Verlassen, auch mitten im Ziehen
  useEffect(
    () => () => {
      teardown.current?.();
      window.clearTimeout(flipTimer.current);
    },
    [],
  );

  // Umdrehen per Tastatur (Button in LanyardBadge)
  const lastFlipSignal = useRef(flipSignal);
  useEffect(() => {
    if (flipSignal === lastFlipSignal.current) return;
    lastFlipSignal.current = flipSignal;
    if (!live.current.started) onStart();
    flip();
    // flip liest nur Refs und stabile Werte
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipSignal]);

  // Einschwingen, sobald die Karte im Bild ist: seitlicher Schubs, so dosiert,
  // dass die Karte im sichtbaren Bereich bleibt
  useEffect(() => {
    if (!started) return;
    if (!reducedMotion) {
      const room = Math.max(sim.halfW - CARD.width / 2 - 0.15, 0.2);
      const omega = Math.sqrt(GRAVITY / (ROPE_LEN + CLIP_GAP + CARD.height * 0.6));
      nudge(sim, -Math.min(room, 0.9) * omega * 0.8);
      sim.twistVel += 1.6;
    }
    invalidate();
  }, [started, reducedMotion, sim, invalidate]);

  useEffect(() => {
    if (active) invalidate();
  }, [active, invalidate]);

  // Scrollen: nur Beschleunigung (Anfahren, Abbremsen) bringt Schwung, begrenzt,
  // und nur solange die Karte zu sehen ist
  useEffect(() => {
    if (reducedMotion) return;
    let lastY = window.scrollY;
    let lastV = 0;
    let lastT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      const dt = Math.max(now - lastT, 1);
      lastT = now;
      const v = dt > 150 ? 0 : dy / dt; // Pixel pro Millisekunde, nach einer Pause neu anfangen
      const a = THREE.MathUtils.clamp(v - lastV, -3, 3);
      lastV = v;
      const { active: visible, started: running } = live.current;
      if (!visible || !running || sim.grab || Math.abs(a) < 0.05) return;
      nudge(sim, a * 0.35);
      sim.twistVel += a * 0.25;
      invalidate();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sim, reducedMotion, invalidate]);

  /** Zeiger (Client-Koordinaten) auf die Ebene z = 0 projizieren */
  const pointerToWorld = (clientX: number, clientY: number, out: THREE.Vector3) => {
    const rect = gl.domElement.getBoundingClientRect();
    helpers.ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    helpers.raycaster.setFromCamera(helpers.ndc, camera);
    return helpers.raycaster.ray.intersectPlane(helpers.plane, out);
  };

  /** Ziel für den Greifpunkt: im Bild und in Reichweite von Band und Karte */
  const clampTarget = (grab: Grab) => {
    const target = grab.to;
    const inset = CARD.width / 2 + 0.05;
    target.x = THREE.MathUtils.clamp(target.x, Math.min(sim.minX + inset, 0), Math.max(sim.maxX - inset, 0));
    const reach = ROPE_LEN + grab.t * BODY_LEN - 0.02;
    tmp.subVectors(target, ANCHOR);
    if (tmp.length() > reach) target.copy(ANCHOR).addScaledVector(tmp.normalize(), reach);
    // Greifpunkt liegt t * Kartenlänge unter dem Ring, bei maximaler Neigung entsprechend weniger
    target.y = Math.min(target.y, MAX_PIVOT_Y - grab.t * BODY_LEN * Math.cos(MAX_TILT));
  };

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    const native = e.nativeEvent;
    if (native.button !== 0 || !native.isPrimary || native.ctrlKey) return;
    e.stopPropagation();
    if (source && native.target !== gl.domElement) swallowClick.current = true;
    if (!live.current.started) {
      onStart();
      return;
    }
    if (teardown.current) teardown.current();

    const pointerId = native.pointerId;
    const touch = native.pointerType === 'touch';
    const startX = native.clientX;
    const startY = native.clientY;
    const hit = e.point.clone();
    let moved = false;
    let lastWorldX = 0;

    const beginGrab = (clientX: number, clientY: number) => {
      if (!pointerToWorld(clientX, clientY, helpers.pointer)) return;
      const p0 = sim.pos[PIVOT];
      const p1 = sim.pos[BOTTOM];
      tmp.subVectors(p1, p0);
      const t = THREE.MathUtils.clamp(tmp2.subVectors(hit, p0).dot(tmp) / tmp.lengthSq(), 0.05, 1);
      const offset = new THREE.Vector3().lerpVectors(p0, p1, t).sub(helpers.pointer);
      const to = helpers.pointer.clone().add(offset);
      sim.grab = { pointerId, t, offset, from: to.clone(), to, target: to.clone() };
      lastWorldX = helpers.pointer.x;
      setCursor('grabbing');
      invalidate();
    };

    // Maus und Stift greifen sofort. Beim Finger erst, wenn klar seitlich gewischt wird,
    // damit senkrechtes Wischen weiter die Seite scrollt.
    if (!touch) beginGrab(startX, startY);

    const end = (kind: 'up' | 'cancel') => {
      if (kind === 'up' && !moved) flip();
      if (kind === 'cancel' && sim.grab) {
        // Abgebrochen (Scrollen übernimmt, Kontextmenü): ohne Wurf loslassen
        sim.prev[PIVOT].copy(sim.pos[PIVOT]);
        sim.prev[BOTTOM].copy(sim.pos[BOTTOM]);
      }
      sim.grab = null;
      sim.calm = 0;
      window.setTimeout(() => (swallowClick.current = false), 60);
      setCursor(hovered.current ? 'grab' : 'default');
      invalidate();
      teardown.current?.();
    };

    const move = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      if (ev.pointerType === 'mouse' && ev.buttons === 0) return end('cancel');
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!moved && Math.hypot(dx, dy) > 6) moved = true;
      if (!sim.grab) {
        if (!touch || !moved) return;
        if (Math.abs(dy) > Math.abs(dx)) return end('cancel');
        beginGrab(ev.clientX, ev.clientY);
        if (!sim.grab) return;
      }
      const grab: Grab = sim.grab;
      if (!pointerToWorld(ev.clientX, ev.clientY, helpers.pointer)) return;
      grab.to.copy(helpers.pointer).add(grab.offset);
      clampTarget(grab);
      sim.twistVel += THREE.MathUtils.clamp((helpers.pointer.x - lastWorldX) * 1.5, -1, 1);
      lastWorldX = helpers.pointer.x;
      sim.calm = 0;
      invalidate();
    };

    const up = (ev: PointerEvent) => {
      if (ev.pointerId === pointerId) end('up');
    };
    const cancel = () => end('cancel');

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', cancel);
    window.addEventListener('contextmenu', cancel);
    window.addEventListener('blur', cancel);
    teardown.current = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', cancel);
      window.removeEventListener('contextmenu', cancel);
      window.removeEventListener('blur', cancel);
      teardown.current = null;
      if (sim.grab?.pointerId === pointerId) sim.grab = null;
    };
  };

  useFrame((state, delta) => {
    // Die Zeichenfläche kann rechts über die eigene Spalte hinausreichen. Die Kamera
    // bleibt auf die Spalte zentriert (Ausschnitt eines symmetrischen Gesamtbilds),
    // damit der Ausweis exakt an derselben Stelle hängt wie ohne Erweiterung.
    const { width: w, height: h } = state.size;
    const extra = Math.min(Math.max(extraRight, 0), Math.max(w - 1, 0));
    const v = view.current;
    if (v.w !== w || v.h !== h || v.extra !== extra) {
      const cam = state.camera as THREE.PerspectiveCamera;
      const homeHalf = (w - extra) / 2;
      const fullHalf = w - homeHalf;
      cam.aspect = (fullHalf * 2) / h;
      cam.setViewOffset(fullHalf * 2, h, fullHalf - homeHalf, 0, w, h);
      cam.updateProjectionMatrix();
      const perPixel = (2 * HALF_H) / h;
      sim.halfW = homeHalf * perPixel;
      sim.minX = -homeHalf * perPixel;
      sim.maxX = (w - homeHalf) * perPixel;
      Object.assign(v, { w, h, extra });
    }

    // Feste Physik-Schritte, unabhängig von der Bildrate. Das Greifziel wird über
    // die Teilschritte verteilt, sonst ginge der Wurf bei 60 Hz verloren.
    if (started) {
      sim.acc = Math.min(sim.acc + delta, 0.1);
      const steps = Math.floor(sim.acc / STEP);
      for (let k = 1; k <= steps; k++) {
        if (sim.grab) sim.grab.target.lerpVectors(sim.grab.from, sim.grab.to, k / steps);
        step(sim, STEP);
      }
      sim.acc -= steps * STEP;
      if (sim.grab) sim.grab.from.copy(sim.grab.to);
    }

    // Karte ausrichten: y entlang der Karte, dazu die Drehung um die eigene Achse
    const { x, y, z, basis } = helpers;
    y.subVectors(sim.pos[PIVOT], sim.pos[BOTTOM]).normalize();
    x.crossVectors(y, AXIS_Z).normalize();
    z.crossVectors(x, y);
    const c = Math.cos(sim.twist);
    const s = Math.sin(sim.twist);
    tmp.copy(x).multiplyScalar(c).addScaledVector(z, -s);
    x.copy(tmp);
    z.crossVectors(x, y);
    basis.makeBasis(x, y, z);
    card.current.position.copy(sim.pos[PIVOT]);
    card.current.quaternion.setFromRotationMatrix(basis);

    // Hologramm schimmert je nach Drehung und Neigung der Karte in anderen Farben
    const tilt = Math.atan2(sim.pos[BOTTOM].x - sim.pos[PIVOT].x, sim.pos[PIVOT].y - sim.pos[BOTTOM].y);
    assets.holoRainbow.offset.set(sim.twist * 0.45 + tilt * 1.6, tilt * 0.9 - sim.twist * 0.2);
    assets.materials.holo.opacity = 0.35 + Math.min(0.4, Math.abs(Math.sin(sim.twist * 1.3 + tilt * 3)) * 0.4);

    // Band nachziehen: Kurve durch die Bandpunkte, Streifen in der Bildebene,
    // am unteren Ende in die Drehung der Karte übergehend
    helpers.samples.forEach((p, i) => helpers.curve.getPoint(i / RIBBON_SAMPLES, p));
    const attr = assets.ribbon.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i <= RIBBON_SAMPLES; i++) {
      const p = helpers.samples[i];
      const q = helpers.samples[Math.min(i + 1, RIBBON_SAMPLES)];
      const r = helpers.samples[Math.max(i - 1, 0)];
      tmp.subVectors(q, r).normalize(); // Tangente
      tmp2.set(-tmp.y, tmp.x, 0).normalize(); // quer, in der Bildebene
      // Kartenachse mit passendem Vorzeichen, sonst kippt das Band bei halber Drehung
      const blend = THREE.MathUtils.smoothstep(i / RIBBON_SAMPLES, 0.75, 1);
      const sign = tmp2.dot(x) < 0 ? -1 : 1;
      tmp2.lerp(helpers.side.copy(x).multiplyScalar(sign), blend).normalize().multiplyScalar(STRAP_WIDTH / 2);
      attr.setXYZ(i * 2, p.x - tmp2.x, p.y - tmp2.y, p.z - tmp2.z);
      attr.setXYZ(i * 2 + 1, p.x + tmp2.x, p.y + tmp2.y, p.z + tmp2.z);
    }
    attr.needsUpdate = true;

    if (firstFrame.current) {
      firstFrame.current = false;
      onFirstFrame();
    }

    // Weiterrendern, solange sich sichtbar etwas bewegt; danach Drehung einrasten
    if (!started) return;
    if (kinetic(sim) < CALM_ENERGY && !sim.grab) sim.calm += 1;
    else sim.calm = 0;
    if (sim.calm >= CALM_FRAMES) {
      sim.twist = sim.twistTarget;
      sim.twistVel = 0;
      return;
    }
    if (active) invalidate();
  });

  const cardTop = -CLIP_GAP;
  const cardCenter = cardTop - CARD.height / 2;
  const slotCenter = cardTop - (SLOT.top + SLOT.height / 2) * CARD.height;

  return (
    <>
      <mesh geometry={assets.ribbon} material={assets.materials.strap} frustumCulled={false} />

      <group ref={card}>
        {/* Ring, Klemme und Lasche durch den Schlitz */}
        <mesh material={assets.materials.metal}>
          <torusGeometry args={[0.075, 0.018, 12, 32]} />
        </mesh>
        <mesh material={assets.materials.metal} position={[0, -0.1, 0.02]}>
          <boxGeometry args={[0.2, 0.09, 0.05]} />
        </mesh>
        <mesh material={assets.materials.metal} position={[0, (-0.1 + slotCenter) / 2, 0.03]}>
          <boxGeometry args={[0.07, -0.1 - slotCenter, 0.012]} />
        </mesh>
        <mesh material={assets.materials.metal} position={[0, slotCenter, 0]}>
          <boxGeometry args={[SLOT.width * CARD.width * 0.9, SLOT.height * CARD.height * 0.6, 0.07]} />
        </mesh>

        {/* Karte */}
        <group
          position={[0, cardCenter, 0]}
          onPointerDown={onPointerDown}
          onPointerOver={() => {
            hovered.current = true;
            if (!sim.grab) setCursor('grab');
          }}
          onPointerOut={() => {
            hovered.current = false;
            if (!sim.grab) setCursor('default');
          }}
        >
          <mesh geometry={assets.body} material={assets.materials.body} />
          <mesh geometry={assets.face} material={assets.materials.front} position={[0, 0, CARD.depth / 2 + 0.001]} />
          <mesh geometry={assets.face} material={assets.materials.holo} position={[0, 0, CARD.depth / 2 + 0.002]} />
          <mesh
            geometry={assets.face}
            material={assets.materials.back}
            position={[0, 0, -CARD.depth / 2 - 0.001]}
            rotation={[0, Math.PI, 0]}
          />
        </group>
      </group>
    </>
  );
}

export default function BadgeScene({
  reducedMotion,
  flipSignal,
  onReady,
  onTap,
  extraRight = 0,
  eventSource = null,
}: {
  reducedMotion: boolean;
  flipSignal: number;
  onReady: () => void;
  onTap: () => void;
  /** Desktop: Zeichenfläche reicht so viele Pixel über die Spalte nach rechts */
  extraRight?: number;
  /** Desktop: Zeigerereignisse kommen von diesem Element, die Fläche selbst lässt sie durch */
  eventSource?: HTMLElement | null;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [fonts, setFonts] = useState<BadgeFonts | null>(null);
  const [active, setActive] = useState(true);
  const [started, setStarted] = useState(false);
  /** Erstes Bild steht (Ruhelage, deckungsgleich mit der statischen Karte) */
  const [shown, setShown] = useState(false);
  const [cursor, setCursorState] = useState<'default' | 'grab' | 'grabbing'>('default');

  // Über dem Text: Mauszeiger per Attribut an der Sektion setzen (CSS in globals.css),
  // denn die Zeichenfläche selbst nimmt keine Zeigerereignisse an
  const setCursor = (next: 'default' | 'grab' | 'grabbing') => {
    if (!eventSource) return setCursorState(next);
    if (next === 'default') delete eventSource.dataset.badgeCursor;
    else eventSource.dataset.badgeCursor = next;
  };
  useEffect(() => () => void (eventSource && delete eventSource.dataset.badgeCursor), [eventSource]);

  // Zeiger relativ zur Zeichenfläche berechnen, auch wenn die Ereignisse von der Sektion kommen
  const events = useMemo<Parameters<typeof Canvas>[0]['events']>(
    () => (store) => ({
      ...createPointerEvents(store),
      compute(event, state) {
        const rect = state.gl.domElement.getBoundingClientRect();
        state.pointer.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        state.raycaster.setFromCamera(state.pointer, state.camera);
      },
    }),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    loadBadgeFonts().then((f) => !cancelled && setFonts(f));
    return () => {
      cancelled = true;
    };
  }, []);

  // Nur rechnen, solange die Karte zu sehen ist. Einschwingen erst, wenn der
  // Bereich fast ganz im Bild ist (die Karte sitzt in der unteren Hälfte). Ist
  // der Bildschirm niedriger als der Bereich (Handy quer), zählt die Bildhöhe.
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const visibility = new IntersectionObserver((entries) => {
      setActive(entries[entries.length - 1].isIntersecting);
    });
    visibility.observe(el);
    const start = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        const viewport = entry.rootBounds?.height ?? window.innerHeight;
        const needed = 0.8 * Math.min(entry.boundingClientRect.height, viewport);
        if (entry.isIntersecting && entry.intersectionRect.height >= needed - 1) {
          setStarted(true);
          start.disconnect();
        }
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    start.observe(el);
    return () => {
      visibility.disconnect();
      start.disconnect();
    };
  }, []);

  return (
    <div
      ref={container}
      className="absolute inset-0 select-none"
      style={eventSource ? { pointerEvents: 'none' } : { cursor, touchAction: 'pan-y pinch-zoom' }}
    >
      {fonts && (
        <Canvas
          flat
          frameloop={active || !shown ? 'demand' : 'never'}
          // Größere Fläche auf dem Desktop: Pixeldichte etwas begrenzen
          dpr={[1, eventSource ? 1.5 : 2]}
          events={events}
          eventSource={eventSource ?? undefined}
          camera={{ position: [0, 0, CAMERA_Z], fov: FOV, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[3, 5, 8]} intensity={1.05} />
          <Environment />
          <Lanyard
            fonts={fonts}
            extraRight={extraRight}
            source={eventSource}
            reducedMotion={reducedMotion}
            active={active}
            started={started && shown}
            flipSignal={flipSignal}
            onStart={() => setStarted(true)}
            onTap={onTap}
            onFirstFrame={() => {
              setShown(true);
              onReady();
            }}
            setCursor={setCursor}
          />
        </Canvas>
      )}
    </div>
  );
}

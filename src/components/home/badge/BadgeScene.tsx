'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  CARD,
  SLOT,
  STRAP_TEXTURE,
  drawBack,
  drawFront,
  drawStrap,
  loadBadgeFonts,
  type BadgeFonts,
} from './textures';

/*
 * Ausweis am Umhängeband.
 *
 * Keine Physik-Engine: Das Band ist eine Kette aus Punkten (Verlet-Integration
 * mit Längen-Constraints), die Karte hängt als starres Segment aus zwei Punkten
 * daran (Clip oben, Kartenunterkante unten). Die Drehung der Karte um ihre
 * Längsachse läuft als gedämpfte Feder separat. Das spart eine WASM-Engine
 * mit mehreren hundert Kilobyte.
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
const DAMPING = 1.4; // pro Sekunde
const STEP = 1 / 120;
const ITERATIONS = 14;

const TWIST_SPRING = 5.5;
const TWIST_DAMPING = 1.3;

const STRAP_WIDTH = 0.3;
const RIBBON_SAMPLES = 48;

const PIVOT = ROPE_SEGMENTS; // letzter Bandpunkt = Ring am Clip
const BOTTOM = ROPE_SEGMENTS + 1; // Kartenunterkante

const tmp = new THREE.Vector3();
const tmp2 = new THREE.Vector3();
const AXIS_Z = new THREE.Vector3(0, 0, 1);

interface Sim {
  pos: THREE.Vector3[];
  prev: THREE.Vector3[];
  invMass: number[];
  twist: number;
  twistVel: number;
  acc: number;
  /** Greifen: Anteil entlang der Karte (0 Ring, 1 Unterkante) und Ziel in Weltkoordinaten */
  grab: { t: number; target: THREE.Vector3; offset: THREE.Vector3 } | null;
  calm: number;
}

function createSim(dropIn: boolean): Sim {
  const pos: THREE.Vector3[] = [];
  for (let i = 0; i <= ROPE_SEGMENTS; i++) pos.push(new THREE.Vector3(0, ANCHOR.y - i * SEG_LEN, 0));
  pos.push(new THREE.Vector3(0, pos[PIVOT].y - BODY_LEN, 0));

  const prev = pos.map((p) => p.clone());

  if (dropIn) {
    // Startet ausgelenkt (um den Aufhängepunkt gedreht), schwingt dann ins Bild
    const angle = 0.38;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    pos.forEach((p, i) => {
      const dx = p.x - ANCHOR.x;
      const dy = p.y - ANCHOR.y;
      p.set(ANCHOR.x + dx * c - dy * s, ANCHOR.y + dx * s + dy * c, 0);
      prev[i].copy(p);
    });
  }

  const invMass = pos.map((_, i) => (i === 0 ? 0 : i === PIVOT ? 0.6 : i === BOTTOM ? 0.25 : 1));
  return { pos, prev, invMass, twist: dropIn ? 0.9 : 0, twistVel: 0, acc: 0, grab: null, calm: 0 };
}

function satisfy(sim: Sim, a: number, b: number, rest: number) {
  const pa = sim.pos[a];
  const pb = sim.pos[b];
  const wa = sim.invMass[a];
  const wb = sim.invMass[b];
  if (wa + wb === 0) return;
  tmp.subVectors(pb, pa);
  const d = tmp.length() || 1e-6;
  const k = (d - rest) / (d * (wa + wb));
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
  tmp.lerpVectors(p0, p1, t).sub(target); // C = grab - target
  p0.addScaledVector(tmp, -w0 / denom);
  p1.addScaledVector(tmp, -w1 / denom);
}

/** Höchstgeschwindigkeit pro Schritt, damit ein kräftiger Wurf nicht aus dem Bild fliegt */
const MAX_STEP_MOVE = 0.05;

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
    satisfy(sim, PIVOT, BOTTOM, BODY_LEN);
  }

  // Drehung um die Längsachse
  sim.twistVel += (-TWIST_SPRING * sim.twist - TWIST_DAMPING * sim.twistVel) * dt;
  sim.twist += sim.twistVel * dt;
}

function kinetic(sim: Sim) {
  let e = 0;
  for (let i = 1; i < sim.pos.length; i++) e += sim.pos[i].distanceToSquared(sim.prev[i]);
  return e + Math.abs(sim.twistVel) * 1e-4 + Math.abs(sim.twist) * 1e-5;
}

/** Stößt das Band an, z. B. beim Scrollen oder Antippen */
function nudge(sim: Sim, vx: number, twist: number) {
  const k = vx * STEP;
  for (let i = 1; i < sim.pos.length; i++) sim.prev[i].x -= k * (i / BOTTOM);
  sim.twistVel += twist;
  sim.calm = 0;
}

// ─── Geometrie ──────────────────────────────────────────────

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
  return useMemo(() => {
    const make = (draw: (c: HTMLCanvasElement, f: BadgeFonts) => void, anisotropy = 8) => {
      const canvas = document.createElement('canvas');
      draw(canvas, fonts);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = anisotropy;
      return texture;
    };

    const front = make(drawFront);
    const back = make(drawBack);
    const strap = make(drawStrap, 4);
    strap.wrapS = THREE.RepeatWrapping;

    const body = new THREE.ExtrudeGeometry(cardShape(), {
      depth: CARD.depth,
      bevelEnabled: false,
      curveSegments: 10,
    });
    body.translate(0, 0, -CARD.depth / 2);

    const face = new THREE.PlaneGeometry(CARD.width, CARD.height);

    // Band als Streifen aus Dreiecken, Positionen werden pro Frame gesetzt
    const ribbon = new THREE.BufferGeometry();
    const count = (RIBBON_SAMPLES + 1) * 2;
    ribbon.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
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

    return {
      front,
      back,
      strap,
      body,
      face,
      ribbon,
      materials: {
        body: new THREE.MeshStandardMaterial({ color: '#1b1b1a', roughness: 0.6 }),
        front: new THREE.MeshPhysicalMaterial({
          map: front,
          alphaTest: 0.5,
          roughness: 0.45,
          clearcoat: 1,
          clearcoatRoughness: 0.18,
        }),
        back: new THREE.MeshPhysicalMaterial({
          map: back,
          alphaTest: 0.5,
          roughness: 0.5,
          clearcoat: 0.6,
          clearcoatRoughness: 0.3,
        }),
        strap: new THREE.MeshStandardMaterial({ map: strap, roughness: 0.85, side: THREE.DoubleSide }),
        metal: new THREE.MeshStandardMaterial({ color: '#c9c8c4', metalness: 1, roughness: 0.28 }),
      },
    };
  }, [fonts]);
}

// ─── Szene ──────────────────────────────────────────────────

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.35;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Lanyard({
  fonts,
  reducedMotion,
  active,
  started,
  onFirstFrame,
  setGrabbing,
  setHovering,
}: {
  fonts: BadgeFonts;
  reducedMotion: boolean;
  active: boolean;
  /** Erst losschwingen, wenn die Karte wirklich im Bild ist */
  started: boolean;
  onFirstFrame: () => void;
  setGrabbing: (v: boolean) => void;
  setHovering: (v: boolean) => void;
}) {
  const assets = useBadgeAssets(fonts);
  const sim = useMemo(() => createSim(!reducedMotion), [reducedMotion]);
  const card = useRef<THREE.Group>(null!);
  const firstFrame = useRef(true);
  const { camera, invalidate, gl } = useThree();

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
      down: { x: 0, y: 0, moved: false },
      lastPointer: new THREE.Vector3(),
    }),
    [sim],
  );

  // Aufwecken, wenn sich etwas bewegen soll
  useEffect(() => {
    if (active) invalidate();
  }, [active, started, invalidate]);

  // Scrollen bringt die Karte leicht ins Schwingen
  useEffect(() => {
    if (reducedMotion || !started) return;
    let last = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - last;
      last = window.scrollY;
      const v = THREE.MathUtils.clamp(dy, -60, 60);
      nudge(sim, v * 0.008, v * 0.003);
      invalidate();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sim, reducedMotion, started, invalidate]);

  /** Zeiger (Client-Koordinaten) auf die Ebene z = 0 projizieren */
  const pointerToWorld = (clientX: number, clientY: number, out: THREE.Vector3) => {
    const rect = gl.domElement.getBoundingClientRect();
    helpers.ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    helpers.raycaster.setFromCamera(helpers.ndc, camera);
    return helpers.raycaster.ray.intersectPlane(helpers.plane, out);
  };

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const hit = e.point;
    const p0 = sim.pos[PIVOT];
    const p1 = sim.pos[BOTTOM];
    tmp.subVectors(p1, p0);
    const t = THREE.MathUtils.clamp(tmp2.subVectors(hit, p0).dot(tmp) / tmp.lengthSq(), 0.05, 1);
    const target = new THREE.Vector3();
    if (!pointerToWorld(e.clientX, e.clientY, target)) return;
    const grabPoint = new THREE.Vector3().lerpVectors(p0, p1, t);
    sim.grab = { t, target: target.clone(), offset: grabPoint.sub(target) };
    sim.grab.target.add(sim.grab.offset);
    helpers.down = { x: e.clientX, y: e.clientY, moved: false };
    helpers.lastPointer.copy(target);
    setGrabbing(true);

    const move = (ev: PointerEvent) => {
      if (!sim.grab) return;
      if (Math.hypot(ev.clientX - helpers.down.x, ev.clientY - helpers.down.y) > 6) helpers.down.moved = true;
      if (!pointerToWorld(ev.clientX, ev.clientY, target)) return;
      sim.grab.target.copy(target).add(sim.grab.offset);
      // Seitlich im Bild halten und nicht weiter ziehen, als Band und Karte lang sind
      const halfW = Math.max(HALF_H * (camera as THREE.PerspectiveCamera).aspect - CARD.width / 2 - 0.05, 0);
      sim.grab.target.x = THREE.MathUtils.clamp(sim.grab.target.x, -halfW, halfW);
      const reach = ROPE_LEN + sim.grab.t * BODY_LEN - 0.02;
      tmp.subVectors(sim.grab.target, ANCHOR);
      if (tmp.length() > reach) sim.grab.target.copy(ANCHOR).addScaledVector(tmp.normalize(), reach);
      sim.twistVel += THREE.MathUtils.clamp((target.x - helpers.lastPointer.x) * 2.2, -1.5, 1.5);
      helpers.lastPointer.copy(target);
      sim.calm = 0;
      invalidate();
    };
    const up = () => {
      // Kurzes Antippen ohne Ziehen: Karte dreht sich einmal um
      if (sim.grab && !helpers.down.moved) nudge(sim, 0, 10.5);
      sim.grab = null;
      setGrabbing(false);
      invalidate();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    invalidate();
  };

  useFrame((_, delta) => {
    // Feste Physik-Schritte, unabhängig von der Bildrate
    sim.acc = started ? Math.min(sim.acc + delta, 0.1) : 0;
    while (sim.acc >= STEP) {
      step(sim, STEP);
      sim.acc -= STEP;
    }

    // Karte ausrichten: y entlang Band, Drehung um die eigene Achse
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

    // Band nachziehen: Kurve durch die Bandpunkte, Streifen zur Kamera gedreht,
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
    assets.ribbon.computeVertexNormals();
    assets.ribbon.computeBoundingSphere();

    if (firstFrame.current) {
      firstFrame.current = false;
      onFirstFrame();
    }

    // Weiterrendern, solange sich noch etwas bewegt
    if (kinetic(sim) < 2e-7 && !sim.grab) sim.calm += 1;
    else sim.calm = 0;
    if (active && started && sim.calm < 45) invalidate();
  });

  const cardTop = -CLIP_GAP;
  const cardCenter = cardTop - CARD.height / 2;
  const slotCenter = cardTop - (SLOT.top + SLOT.height / 2) * CARD.height;

  return (
    <>
      <mesh geometry={assets.ribbon} material={assets.materials.strap} frustumCulled={false} />

      <group ref={card}>
        {/* Ring und Klemme */}
        <mesh material={assets.materials.metal}>
          <torusGeometry args={[0.075, 0.018, 12, 32]} />
        </mesh>
        <mesh material={assets.materials.metal} position={[0, -0.1, 0.02]}>
          <boxGeometry args={[0.2, 0.09, 0.05]} />
        </mesh>
        {/* Lasche vom Clip durch den Schlitz */}
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
          onPointerOver={() => setHovering(true)}
          onPointerOut={() => setHovering(false)}
        >
          <mesh geometry={assets.body} material={assets.materials.body} />
          <mesh geometry={assets.face} material={assets.materials.front} position={[0, 0, CARD.depth / 2 + 0.001]} />
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
  onReady,
}: {
  reducedMotion: boolean;
  onReady: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [fonts, setFonts] = useState<BadgeFonts | null>(null);
  const [active, setActive] = useState(true);
  const [started, setStarted] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadBadgeFonts().then((f) => !cancelled && setFonts(f));
    return () => {
      cancelled = true;
    };
  }, []);

  // Nur rechnen, solange die Karte zu sehen ist
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    observer.observe(el);
    const start = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4) {
          setStarted(true);
          start.disconnect();
        }
      },
      { threshold: [0, 0.4] },
    );
    start.observe(el);
    return () => {
      observer.disconnect();
      start.disconnect();
    };
  }, []);

  return (
    <div
      ref={container}
      className="absolute inset-0 touch-pan-y select-none"
      style={{ cursor: grabbing ? 'grabbing' : hovering ? 'grab' : 'default' }}
    >
      {fonts && (
        <Canvas
          flat
          frameloop="demand"
          dpr={[1, 2]}
          camera={{ position: [0, 0, CAMERA_Z], fov: FOV, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[3, 5, 8]} intensity={1.05} />
          <Environment />
          <Lanyard
            fonts={fonts}
            reducedMotion={reducedMotion}
            active={active}
            started={started}
            onFirstFrame={onReady}
            setGrabbing={setGrabbing}
            setHovering={setHovering}
          />
        </Canvas>
      )}
    </div>
  );
}

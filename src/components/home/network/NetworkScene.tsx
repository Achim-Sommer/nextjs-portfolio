'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  COLORS,
  EXTENT,
  FACE_COLORS,
  GRID_STEP,
  LAYERS,
  LINKS,
  NODE_BY_ID,
  NODE_SIZE,
  NODES,
  PLANE_HALF,
  ROUTES,
  type NetNode,
  type NodeKind,
  cameraPosition,
  layerAnchor,
  nodeCenter,
  nodeTop,
  seededRandom,
} from './data';

const AUTO_SPEED = 0.06; // Bogenmaß pro Sekunde
const PACKET_COUNT = 28;
const PACKET_SPEED = 1.05; // Welteinheiten pro Sekunde
const PULSE_SECONDS = 0.55;

const LABELED = NODES.filter((n) => n.label);

/** Zustand, der zwischen DOM und Szene geteilt wird, ohne React neu zu rendern */
interface Shared {
  angle: number;
  velocity: number;
  dragging: boolean;
  labels: Record<string, HTMLDivElement | null>;
  invalidate?: () => void;
}

/** Status-LEDs auf der Vorderseite (+z) von Servern, Switches und Firewall */
const LED_LAYOUT: Partial<Record<NodeKind, { count: number; y: number }>> = {
  server: { count: 3, y: 0.06 },
  firewall: { count: 2, y: 0.03 },
  switch: { count: 6, y: 0 },
};

function lineGeometry(points: number[]) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  return geometry;
}

function Scene({
  shared,
  hovered,
  setHovered,
  reducedMotion,
  onFirstFrame,
}: {
  shared: React.MutableRefObject<Shared>;
  hovered: string | null;
  setHovered: (updater: (current: string | null) => string | null) => void;
  reducedMotion: boolean;
  onFirstFrame: () => void;
}) {
  const group = useRef<THREE.Group>(null!);
  const packetCore = useRef<THREE.InstancedMesh>(null!);
  const packetHalo = useRef<THREE.InstancedMesh>(null!);
  const leds = useRef<THREE.Mesh[]>([]);
  const firstFrame = useRef(true);
  const { camera, size, invalidate } = useThree();

  shared.current.invalidate = invalidate;

  // Die Szene füllt die Box genau so wie die SVG-Variante (siehe EXTENT)
  useEffect(() => {
    const ortho = camera as THREE.OrthographicCamera;
    ortho.zoom = Math.min(size.width / EXTENT.width, size.height / EXTENT.height);
    ortho.lookAt(0, 0, 0);
    ortho.updateProjectionMatrix();
    invalidate();
  }, [camera, size, invalidate]);

  const geometry = useMemo(() => {
    const boxes = {} as Record<NodeKind, THREE.BoxGeometry>;
    const edges = {} as Record<NodeKind, THREE.EdgesGeometry>;
    for (const kind of Object.keys(NODE_SIZE) as NodeKind[]) {
      boxes[kind] = new THREE.BoxGeometry(...NODE_SIZE[kind]);
      edges[kind] = new THREE.EdgesGeometry(boxes[kind]);
    }

    const outline: number[] = [];
    const grid: number[] = [];
    const h = PLANE_HALF;
    for (const { y } of LAYERS) {
      const c = [[-h, -h], [h, -h], [h, h], [-h, h]];
      c.forEach((a, i) => {
        const b = c[(i + 1) % 4];
        outline.push(a[0], y, a[1], b[0], y, b[1]);
      });
      for (let v = -h + GRID_STEP; v < h - 1e-6; v += GRID_STEP) {
        grid.push(v, y, -h, v, y, h, -h, y, v, h, y, v);
      }
    }

    const links = lineGeometry(
      LINKS.flatMap(([a, b]) => [...nodeCenter(NODE_BY_ID[a]), ...nodeCenter(NODE_BY_ID[b])]),
    );
    links.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(LINKS.length * 6), 3));

    return {
      boxes,
      edges,
      outline: lineGeometry(outline),
      grid: lineGeometry(grid),
      links,
      led: new THREE.PlaneGeometry(0.03, 0.018),
      packet: new THREE.SphereGeometry(0.032, 10, 8),
      halo: new THREE.SphereGeometry(0.068, 12, 10),
    };
  }, []);

  const materials = useMemo(
    () => ({
      faces: FACE_COLORS.map((color) => new THREE.MeshBasicMaterial({ color })),
      edges: Object.fromEntries(
        NODES.map((n) => [n.id, new THREE.LineBasicMaterial({ color: COLORS.nodeEdge })]),
      ) as Record<string, THREE.LineBasicMaterial>,
      led: new THREE.MeshBasicMaterial({ color: COLORS.accent }),
      packet: new THREE.MeshBasicMaterial({ color: COLORS.accent }),
      halo: new THREE.MeshBasicMaterial({
        color: COLORS.accent,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      }),
    }),
    [],
  );

  const colors = useMemo(
    () => ({
      edge: new THREE.Color(COLORS.nodeEdge),
      link: new THREE.Color(COLORS.link),
      accent: new THREE.Color(COLORS.accent),
    }),
    [],
  );

  // Verbindungen des markierten Geräts hervorheben
  useEffect(() => {
    const attr = geometry.links.getAttribute('color') as THREE.BufferAttribute;
    LINKS.forEach(([a, b], i) => {
      const c = hovered && (a === hovered || b === hovered) ? colors.accent : colors.link;
      attr.setXYZ(i * 2, c.r, c.g, c.b);
      attr.setXYZ(i * 2 + 1, c.r, c.g, c.b);
    });
    attr.needsUpdate = true;
    invalidate();
  }, [hovered, geometry, colors, invalidate]);

  // Routen als Punktfolgen mit kumulierter Länge
  const routes = useMemo(
    () =>
      ROUTES.map((ids) => {
        const points = ids.map((id) => new THREE.Vector3(...nodeCenter(NODE_BY_ID[id])));
        const lengths = [0];
        for (let i = 1; i < points.length; i++) {
          lengths.push(lengths[i - 1] + points[i].distanceTo(points[i - 1]));
        }
        return { ids, points, lengths, total: lengths[lengths.length - 1] };
      }),
    [],
  );

  const sim = useMemo(() => {
    const rand = seededRandom(42);
    const packets = Array.from({ length: PACKET_COUNT }, () => {
      const route = Math.floor(rand() * routes.length);
      return { route, dist: rand() * routes[route].total, hop: 0 };
    });
    return {
      rand,
      packets,
      pulses: {} as Record<string, { t: number; strength: number }>,
      dummy: new THREE.Object3D(),
      v: new THREE.Vector3(),
    };
  }, [routes]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const s = shared.current;

    // Drehung: Autopilot plus Schwung vom Ziehen
    if (!s.dragging) {
      s.angle += s.velocity * dt;
      s.velocity *= Math.pow(0.05, dt);
      if (!reducedMotion) s.angle += AUTO_SPEED * dt;
    }
    group.current.rotation.y = s.angle;
    group.current.updateMatrixWorld();

    // Datenpakete
    if (!reducedMotion) {
      sim.packets.forEach((p, i) => {
        let route = routes[p.route];
        p.dist += PACKET_SPEED * dt;
        while (p.hop < route.lengths.length - 1 && p.dist > route.lengths[p.hop + 1]) {
          p.hop += 1;
          // Nur das Ziel leuchtet voll auf, Zwischenstationen dezent
          const last = p.hop === route.ids.length - 1;
          sim.pulses[route.ids[p.hop]] = { t, strength: last ? 0.9 : 0.35 };
        }
        if (p.dist >= route.total) {
          p.route = Math.floor(sim.rand() * routes.length);
          p.dist = 0;
          p.hop = 0;
          route = routes[p.route];
        }
        const hop = Math.min(p.hop, route.points.length - 2);
        const segment = route.lengths[hop + 1] - route.lengths[hop];
        const k = segment > 0 ? (p.dist - route.lengths[hop]) / segment : 0;
        sim.v.lerpVectors(route.points[hop], route.points[hop + 1], k);
        sim.dummy.position.copy(sim.v);
        sim.dummy.updateMatrix();
        packetCore.current.setMatrixAt(i, sim.dummy.matrix);
        packetHalo.current.setMatrixAt(i, sim.dummy.matrix);
      });
      packetCore.current.instanceMatrix.needsUpdate = true;
      packetHalo.current.instanceMatrix.needsUpdate = true;

      leds.current.forEach((led, i) => {
        led.visible = Math.sin(t * (2.1 + (i % 5) * 0.9) + i * 1.7) > -0.2;
      });
    }

    // Kanten leuchten kurz auf, wenn ein Paket durchläuft
    for (const node of NODES) {
      const hit = sim.pulses[node.id];
      const pulse = hit ? Math.max(0, 1 - (t - hit.t) / PULSE_SECONDS) * hit.strength : 0;
      const k = hovered === node.id ? 1 : pulse;
      materials.edges[node.id].color.copy(colors.edge).lerp(colors.accent, k);
    }

    // HTML-Beschriftungen an die projizierten Positionen schieben
    const project = (key: string, p: [number, number, number]) => {
      const el = s.labels[key];
      if (!el) return;
      sim.v.set(...p).applyMatrix4(group.current.matrixWorld).project(state.camera);
      const x = (sim.v.x * 0.5 + 0.5) * state.size.width;
      const y = (-sim.v.y * 0.5 + 0.5) * state.size.height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };
    LABELED.forEach((n) => project(n.id, nodeTop(n)));
    LAYERS.forEach((_, i) => project(`layer-${i}`, layerAnchor(i)));

    if (firstFrame.current) {
      firstFrame.current = false;
      onFirstFrame();
    }
  });

  const hoverHandlers = (node: NetNode) =>
    node.label
      ? {
          onPointerOver: (e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            setHovered(() => node.id);
          },
          onPointerOut: () => setHovered((current) => (current === node.id ? null : current)),
          onClick: (e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            setHovered(() => node.id);
          },
        }
      : {};

  let ledIndex = 0;

  return (
    <group ref={group}>
      <lineSegments geometry={geometry.grid}>
        <lineBasicMaterial color={COLORS.planeGrid} />
      </lineSegments>
      <lineSegments geometry={geometry.outline}>
        <lineBasicMaterial color={COLORS.planeOutline} />
      </lineSegments>
      <lineSegments geometry={geometry.links}>
        <lineBasicMaterial vertexColors />
      </lineSegments>

      {NODES.map((node) => {
        const [w, , d] = NODE_SIZE[node.kind];
        const layout = LED_LAYOUT[node.kind];
        return (
          <group key={node.id} position={nodeCenter(node)}>
            <mesh geometry={geometry.boxes[node.kind]} material={materials.faces} {...hoverHandlers(node)} />
            <lineSegments geometry={geometry.edges[node.kind]} material={materials.edges[node.id]} />
            {layout &&
              Array.from({ length: layout.count }, (_, i) => {
                const index = ledIndex++;
                return (
                  <mesh
                    key={i}
                    ref={(m) => {
                      if (m) leds.current[index] = m;
                    }}
                    geometry={geometry.led}
                    material={materials.led}
                    position={[-w / 2 + 0.06 + i * 0.05, layout.y, d / 2 + 0.002]}
                  />
                );
              })}
          </group>
        );
      })}

      {!reducedMotion && (
        <>
          <instancedMesh ref={packetHalo} args={[geometry.halo, materials.halo, PACKET_COUNT]} />
          <instancedMesh ref={packetCore} args={[geometry.packet, materials.packet, PACKET_COUNT]} />
        </>
      )}
    </group>
  );
}

export default function NetworkScene({
  reducedMotion,
  onReady,
}: {
  reducedMotion: boolean;
  onReady: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const shared = useRef<Shared>({ angle: 0, velocity: 0, dragging: false, labels: {} });
  const [hovered, setHovered] = useState<string | null>(null);
  const [inView, setInView] = useState(true);

  // Außerhalb des Viewports nicht rendern
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Horizontal ziehen dreht die Szene. Vertikales Wischen bleibt Scrollen (touch-action: pan-y).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const s = shared.current;
    s.dragging = true;
    s.velocity = 0;
    let lastX = e.clientX;
    let lastT = performance.now();

    const move = (ev: PointerEvent) => {
      const now = performance.now();
      const dx = ev.clientX - lastX;
      const step = dx * 0.006;
      s.angle += step;
      s.velocity = step / Math.max((now - lastT) / 1000, 0.008);
      lastX = ev.clientX;
      lastT = now;
      s.invalidate?.();
    };
    const up = () => {
      s.dragging = false;
      if (reducedMotion || performance.now() - lastT > 80) s.velocity = 0;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };

  const hoveredNode = hovered ? NODE_BY_ID[hovered] : null;

  return (
    <div
      ref={container}
      className="absolute inset-0 touch-pan-y select-none"
      style={{ cursor: hovered ? 'pointer' : 'grab' }}
      onPointerDown={onPointerDown}
      onPointerLeave={() => setHovered(() => null)}
    >
      <Canvas
        orthographic
        flat
        dpr={[1, 1.75]}
        frameloop={!inView ? 'never' : reducedMotion ? 'demand' : 'always'}
        camera={{ position: cameraPosition(), zoom: 100, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        style={{ position: 'absolute', inset: 0 }}
        onPointerMissed={() => setHovered(() => null)}
      >
        <Scene
          shared={shared}
          hovered={hovered}
          setHovered={setHovered}
          reducedMotion={reducedMotion}
          onFirstFrame={onReady}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 overflow-visible font-mono" aria-hidden="true">
        {LAYERS.map((layer, i) => (
          <div
            key={layer.id}
            ref={(el) => {
              shared.current.labels[`layer-${i}`] = el;
            }}
            className="absolute left-0 top-0"
          >
            <span className="absolute translate-y-2 whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-faint">
              <span className="text-accent">0{i + 1}</span> {layer.title}
            </span>
          </div>
        ))}

        {LABELED.map((node) => {
          const active = hoveredNode?.id === node.id;
          return (
            <div
              key={node.id}
              ref={(el) => {
                shared.current.labels[node.id] = el;
              }}
              className="absolute left-0 top-0"
              style={{ zIndex: active ? 2 : 1 }}
            >
              <span
                className={`absolute -translate-x-1/2 -translate-y-full whitespace-nowrap pb-1 text-center uppercase transition-colors duration-200 ${
                  active ? 'text-fg' : node.pinned ? 'text-muted' : 'text-transparent'
                }`}
              >
                <span className="block text-[10px] tracking-[0.08em]">{node.label}</span>
                {active && node.detail && (
                  <span className="block pt-0.5 text-[10px] normal-case tracking-normal text-accent">
                    {node.detail}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

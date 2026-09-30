/**
 * Daten und Geometrie für das Netzwerk im Hero.
 *
 * Dieselben Daten zeichnen zwei Varianten:
 *  - NetworkScene.tsx     echte 3D-Szene (three.js), nur auf größeren Bildschirmen
 *  - NetworkFallback.tsx  flache SVG-Projektion für Handys, als Platzhalter
 *                         während die 3D-Szene lädt und ohne WebGL
 *
 * Beide nutzen dieselbe orthografische Kamera (siehe project()). Dadurch liegt
 * die SVG-Variante deckungsgleich unter dem ersten Bild der 3D-Szene und der
 * Wechsel beim Einblenden fällt nicht auf.
 */

export type NodeKind = 'cloud' | 'firewall' | 'switch' | 'server' | 'ap' | 'client';

export interface NetNode {
  id: string;
  kind: NodeKind;
  /** Index in LAYERS */
  layer: 0 | 1 | 2;
  x: number;
  z: number;
  label?: string;
  detail?: string;
  /** Beschriftung dauerhaft zeigen, sonst nur beim Hover */
  pinned?: boolean;
}

export type Vec3 = [number, number, number];

export const COLORS = {
  accent: '#ff6a2b',
  nodeEdge: '#8a8985',
  link: '#3a3937',
  planeOutline: '#353431',
  planeGrid: '#1b1b1a',
};

/**
 * Feste Flächenfarben der Geräte, Reihenfolge wie bei THREE.BoxGeometry
 * (+x, -x, +y, -y, +z, -z). Keine Beleuchtung, damit SVG und WebGL gleich aussehen.
 */
export const FACE_COLORS = ['#121211', '#121211', '#1f1f1e', '#0d0d0d', '#171716', '#171716'];

export const LAYERS = [
  { id: 'cloud', title: 'Cloud', y: 1.9 },
  { id: 'core', title: 'Serverraum', y: 0 },
  { id: 'edge', title: 'Arbeitsplätze', y: -1.9 },
] as const;

/** Halbe Kantenlänge der quadratischen Ebenen */
export const PLANE_HALF = 1.8;
export const GRID_STEP = 0.45;

/** Breite, Höhe, Tiefe je Gerätetyp */
export const NODE_SIZE: Record<NodeKind, Vec3> = {
  cloud: [0.36, 0.06, 0.36],
  firewall: [0.42, 0.16, 0.28],
  switch: [0.58, 0.07, 0.2],
  server: [0.42, 0.24, 0.3],
  ap: [0.16, 0.04, 0.16],
  client: [0.15, 0.025, 0.11],
};

const desks = (prefix: string, xs: number[], zs: number[]): NetNode[] =>
  zs.flatMap((z, row) =>
    xs.map((x, col) => ({
      id: `${prefix}${row * xs.length + col}`,
      kind: 'client' as const,
      layer: 2 as const,
      x,
      z,
    })),
  );

const clientsA = desks('ca', [-1.5, -1.1, -0.7], [-1.35, -0.95]);
const clientsB = desks('cb', [0.5, 0.9, 1.3], [0.95, 1.35]);

export const NODES: NetNode[] = [
  // Cloud
  { id: 'm365', kind: 'cloud', layer: 0, x: -0.9, z: -1.0, label: 'Microsoft 365', detail: 'Mail, Teams, SharePoint', pinned: true },
  { id: 'entra', kind: 'cloud', layer: 0, x: 0.1, z: -0.35, label: 'Entra ID', detail: 'Identitäten und Zugriffe', pinned: true },
  { id: 'atlassian', kind: 'cloud', layer: 0, x: 1.1, z: -1.05, label: 'Atlassian', detail: 'Jira und Confluence', pinned: true },
  { id: 'github', kind: 'cloud', layer: 0, x: 1.05, z: 0.85, label: 'GitHub', detail: 'Code und Deployments', pinned: true },
  { id: 'mdm', kind: 'cloud', layer: 0, x: -1.0, z: 0.75, label: 'MDM', detail: 'Geräte und Richtlinien', pinned: true },

  // Serverraum
  { id: 'fw', kind: 'firewall', layer: 1, x: 0.95, z: -1.0, label: 'Firewall', detail: 'Perimeter und VPN', pinned: true },
  { id: 'core', kind: 'switch', layer: 1, x: 0.0, z: -0.1, label: 'Core Switch', detail: 'Backbone', pinned: true },
  { id: 'hv', kind: 'server', layer: 1, x: -1.0, z: -0.8, label: 'Hyper-V', detail: 'Virtualisierung, AD-Sync', pinned: true },
  { id: 'backup', kind: 'server', layer: 1, x: -1.15, z: 0.5, label: 'Backup', detail: 'Snapshots und Offsite-Kopie', pinned: true },
  { id: 'docker', kind: 'server', layer: 1, x: 0.9, z: 0.8, label: 'Docker', detail: 'Container-Plattform', pinned: true },

  // Arbeitsplätze
  { id: 'swA', kind: 'switch', layer: 2, x: -0.9, z: -0.2, label: 'Access Switch', detail: 'Etage 1' },
  { id: 'swB', kind: 'switch', layer: 2, x: 0.9, z: 0.3, label: 'Access Switch', detail: 'Etage 2' },
  { id: 'apA', kind: 'ap', layer: 2, x: -1.45, z: 0.75, label: 'WLAN', detail: 'Access Point' },
  { id: 'apB', kind: 'ap', layer: 2, x: 1.45, z: -0.8, label: 'WLAN', detail: 'Access Point' },
  ...clientsA,
  ...clientsB,
];

export const LINKS: [string, string][] = [
  // Identität als Drehscheibe der Cloud-Dienste
  ['entra', 'm365'],
  ['entra', 'atlassian'],
  ['entra', 'github'],
  ['entra', 'mdm'],
  // Internet-Uplinks über die Firewall
  ['fw', 'm365'],
  ['fw', 'entra'],
  ['fw', 'atlassian'],
  ['fw', 'github'],
  ['fw', 'mdm'],
  // Hybride Identität
  ['hv', 'entra'],
  // Serverraum
  ['fw', 'core'],
  ['core', 'hv'],
  ['core', 'backup'],
  ['core', 'docker'],
  ['hv', 'backup'],
  // Verteilung auf die Etagen
  ['core', 'swA'],
  ['core', 'swB'],
  ['swA', 'apA'],
  ['swB', 'apB'],
  ...clientsA.map((c) => ['swA', c.id] as [string, string]),
  ...clientsB.map((c) => ['swB', c.id] as [string, string]),
];

export const NODE_BY_ID: Record<string, NetNode> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

/** Mittelpunkt eines Geräts, es steht auf seiner Ebene */
export function nodeCenter(node: NetNode): Vec3 {
  const [, h] = NODE_SIZE[node.kind];
  return [node.x, LAYERS[node.layer].y + h / 2, node.z];
}

/** Punkt knapp über der Oberseite, hier hängt die Beschriftung */
export function nodeTop(node: NetNode): Vec3 {
  const [, h] = NODE_SIZE[node.kind];
  return [node.x, LAYERS[node.layer].y + h + 0.03, node.z];
}

/** Ecke der Ebene, an der der Ebenenname steht */
export function layerAnchor(layer: number): Vec3 {
  return [-PLANE_HALF, LAYERS[layer].y, PLANE_HALF];
}

// ─── Routen für die Datenpakete ─────────────────────────────

const adjacency: Record<string, string[]> = {};
for (const [a, b] of LINKS) {
  (adjacency[a] ??= []).push(b);
  (adjacency[b] ??= []).push(a);
}

function shortestPath(from: string, to: string): string[] {
  const prev: Record<string, string | null> = { [from]: null };
  const queue = [from];
  while (queue.length) {
    const current = queue.shift()!;
    if (current === to) break;
    for (const next of adjacency[current] ?? []) {
      if (!(next in prev)) {
        prev[next] = current;
        queue.push(next);
      }
    }
  }
  const path: string[] = [];
  for (let at: string | null = to; at; at = prev[at] ?? null) path.unshift(at);
  return path[0] === from ? path : [];
}

const cloudTargets = ['m365', 'entra', 'atlassian', 'github', 'mdm'];
const routePairs: [string, string][] = [
  ...clientsA.map((c, i) => [c.id, cloudTargets[i % 3]] as [string, string]),
  ...clientsB.map((c, i) => [c.id, cloudTargets[(i + 2) % 5]] as [string, string]),
  ['docker', 'github'],
  ['hv', 'backup'],
  ['hv', 'entra'],
  ['apA', 'm365'],
  ['apB', 'atlassian'],
  ['ca1', 'docker'],
  ['cb2', 'hv'],
];

/** Jede Route in beide Richtungen, als Liste von Knoten-IDs */
export const ROUTES: string[][] = routePairs
  .map(([a, b]) => shortestPath(a, b))
  .filter((p) => p.length > 1)
  .flatMap((p) => [p, [...p].reverse()]);

// ─── Kamera und Projektion ──────────────────────────────────

export const CAMERA = {
  azimuth: Math.PI / 4,
  elevation: (26 * Math.PI) / 180,
  distance: 30,
};

export function cameraPosition(): Vec3 {
  const { azimuth, elevation, distance } = CAMERA;
  return [
    distance * Math.cos(elevation) * Math.sin(azimuth),
    distance * Math.sin(elevation),
    distance * Math.cos(elevation) * Math.cos(azimuth),
  ];
}

const normalize = ([x, y, z]: Vec3): Vec3 => {
  const l = Math.hypot(x, y, z);
  return [x / l, y / l, z / l];
};
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

const cam = cameraPosition();
const forward = normalize([-cam[0], -cam[1], -cam[2]]);
const right = normalize(cross(forward, [0, 1, 0]));
const up = cross(right, forward);

/** Blickrichtung zur Kamera, für die Sichtbarkeit von Flächen */
export const VIEW_DIR: Vec3 = [-forward[0], -forward[1], -forward[2]];

/**
 * Orthografische Projektion wie die three.js-Kamera, in Welteinheiten.
 * x nach rechts, y nach unten (SVG), depth wächst Richtung Kamera.
 */
export function project(p: Vec3, rotY = 0): { x: number; y: number; depth: number } {
  const c = Math.cos(rotY);
  const s = Math.sin(rotY);
  const q: Vec3 = [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
  return { x: dot(q, right), y: -dot(q, up), depth: -dot(q, forward) };
}

/**
 * Auf drei Stellen runden. Server und Browser können sich bei sin/cos in der
 * letzten Nachkommastelle unterscheiden, gerundet stimmt das HTML beim
 * Hydrieren trotzdem überein.
 */
const round = (v: number) => Math.round(v * 1000) / 1000;

/**
 * Ausschnitt, in den die Szene bei jeder Drehung passt (plus Rand für
 * Beschriftungen). Die Szene wird immer in einer Box mit genau diesem
 * Seitenverhältnis gezeichnet, dann entspricht 1 % Breite überall
 * demselben Punkt, egal ob SVG oder WebGL.
 */
export const EXTENT = (() => {
  let maxX = 0;
  let maxY = 0;
  const corners: Vec3[] = LAYERS.flatMap((l) => [
    [-PLANE_HALF, l.y, -PLANE_HALF],
    [PLANE_HALF, l.y, -PLANE_HALF],
    [PLANE_HALF, l.y, PLANE_HALF],
    [-PLANE_HALF, l.y, PLANE_HALF],
  ] as Vec3[]);
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 36) {
    for (const p of corners) {
      const { x, y } = project(p, a);
      maxX = Math.max(maxX, Math.abs(x));
      maxY = Math.max(maxY, Math.abs(y));
    }
  }
  return { width: round(2 * maxX + 0.5), height: round(2 * maxY + 0.7) };
})();

/** Welt-Koordinate in Prozent der Box (für HTML-Beschriftungen) */
export function toPercent(p: Vec3, rotY = 0) {
  const { x, y } = project(p, rotY);
  return {
    left: round(((x + EXTENT.width / 2) / EXTENT.width) * 100),
    top: round(((y + EXTENT.height / 2) / EXTENT.height) * 100),
  };
}

/** Kleiner deterministischer Zufallsgenerator (gleiches Ergebnis auf Server und Client) */
export function seededRandom(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

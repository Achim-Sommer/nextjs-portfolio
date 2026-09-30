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
  VIEW_DIR,
  type Vec3,
  layerAnchor,
  nodeCenter,
  nodeTop,
  project,
  seededRandom,
  toPercent,
} from './data';

/** Flächen eines Quaders. Eckindex als Bitmaske: 1 = +x, 2 = +y, 4 = +z. */
const FACES: { normal: Vec3; corners: number[]; color: string }[] = [
  { normal: [1, 0, 0], corners: [1, 3, 7, 5], color: FACE_COLORS[0] },
  { normal: [-1, 0, 0], corners: [0, 4, 6, 2], color: FACE_COLORS[1] },
  { normal: [0, 1, 0], corners: [2, 3, 7, 6], color: FACE_COLORS[2] },
  { normal: [0, -1, 0], corners: [0, 1, 5, 4], color: FACE_COLORS[3] },
  { normal: [0, 0, 1], corners: [4, 5, 7, 6], color: FACE_COLORS[4] },
  { normal: [0, 0, -1], corners: [0, 2, 3, 1], color: FACE_COLORS[5] },
];

const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const pt = (p: Vec3) => {
  const { x, y } = project(p);
  return `${x.toFixed(3)},${y.toFixed(3)}`;
};

function boxPolygons(center: Vec3, size: Vec3) {
  const [w, h, d] = size;
  const corners: Vec3[] = Array.from({ length: 8 }, (_, i) => [
    center[0] + (i & 1 ? w / 2 : -w / 2),
    center[1] + (i & 2 ? h / 2 : -h / 2),
    center[2] + (i & 4 ? d / 2 : -d / 2),
  ]);
  return FACES.filter((f) => dot(f.normal, VIEW_DIR) > 0).map((f) => ({
    points: f.corners.map((i) => pt(corners[i])).join(' '),
    color: f.color,
  }));
}

// Ebenen: Umriss und Raster
const planes = LAYERS.map((layer) => {
  const y = layer.y;
  const outline = [
    [-PLANE_HALF, y, -PLANE_HALF],
    [PLANE_HALF, y, -PLANE_HALF],
    [PLANE_HALF, y, PLANE_HALF],
    [-PLANE_HALF, y, PLANE_HALF],
  ].map((p) => pt(p as Vec3));

  const grid: string[] = [];
  for (let v = -PLANE_HALF + GRID_STEP; v < PLANE_HALF - 1e-6; v += GRID_STEP) {
    grid.push(`M${pt([v, y, -PLANE_HALF])}L${pt([v, y, PLANE_HALF])}`);
    grid.push(`M${pt([-PLANE_HALF, y, v])}L${pt([PLANE_HALF, y, v])}`);
  }
  return { id: layer.id, outline: outline.join(' '), grid: grid.join('') };
});

const linkPath = LINKS.map(
  ([a, b]) => `M${pt(nodeCenter(NODE_BY_ID[a]))}L${pt(nodeCenter(NODE_BY_ID[b]))}`,
).join('');

// Geräte von hinten nach vorne zeichnen
const nodeShapes = NODES.map((node) => {
  const center = nodeCenter(node);
  return {
    id: node.id,
    depth: project(center).depth,
    faces: boxPolygons(center, NODE_SIZE[node.kind]),
  };
}).sort((a, b) => a.depth - b.depth);

// Ein paar Pakete für die animierte Handy-Variante
const PACKET_SPEED = 0.9; // Welteinheiten pro Sekunde
const packets = (() => {
  const rand = seededRandom(7);
  return Array.from({ length: 14 }, (_, i) => {
    const route = ROUTES[Math.floor(rand() * ROUTES.length)];
    const points = route.map((id) => project(nodeCenter(NODE_BY_ID[id])));
    let length = 0;
    for (let k = 1; k < points.length; k++) {
      length += Math.hypot(points[k].x - points[k - 1].x, points[k].y - points[k - 1].y);
    }
    return {
      key: i,
      path: 'M' + points.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`).join('L'),
      duration: Math.max(2.4, length / PACKET_SPEED),
      delay: rand() * 6,
    };
  });
})();

export const pinnedLabels = NODES.filter((n) => n.pinned).map((n) => ({
  id: n.id,
  label: n.label!,
  position: toPercent(nodeTop(n)),
}));

export const layerLabels = LAYERS.map((layer, i) => ({
  id: layer.id,
  index: i + 1,
  title: layer.title,
  position: toPercent(layerAnchor(i)),
}));

export default function NetworkFallback({
  animated = false,
  showLabels = true,
}: {
  animated?: boolean;
  showLabels?: boolean;
}) {
  const { width, height } = EXTENT;

  return (
    <div className="absolute inset-0">
      <svg
        viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {planes.map((plane) => (
          <g key={plane.id}>
            <path d={plane.grid} stroke={COLORS.planeGrid} fill="none" vectorEffect="non-scaling-stroke" />
            <polygon points={plane.outline} stroke={COLORS.planeOutline} fill="none" vectorEffect="non-scaling-stroke" />
          </g>
        ))}

        <path d={linkPath} stroke={COLORS.link} fill="none" vectorEffect="non-scaling-stroke" />

        {nodeShapes.map((node) => (
          <g key={node.id}>
            {node.faces.map((face, i) => (
              <polygon
                key={i}
                points={face.points}
                fill={face.color}
                stroke={COLORS.nodeEdge}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        ))}

        {animated &&
          packets.map((packet) => (
            <circle key={packet.key} r="0.035" fill={COLORS.accent} opacity="0">
              <animateMotion
                path={packet.path}
                dur={`${packet.duration}s`}
                begin={`${packet.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.08;0.92;1"
                dur={`${packet.duration}s`}
                begin={`${packet.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
      </svg>

      {showLabels && (
        <div className="pointer-events-none absolute inset-0 font-mono" aria-hidden="true">
          {layerLabels.map((l) => (
            <span
              key={l.id}
              className="absolute translate-y-2 whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-faint"
              style={{ left: `${l.position.left}%`, top: `${l.position.top}%` }}
            >
              <span className="text-accent">0{l.index}</span> {l.title}
            </span>
          ))}
          {pinnedLabels.map((l) => (
            <span
              key={l.id}
              className="absolute -translate-x-1/2 -translate-y-full whitespace-nowrap pb-1 text-[9px] uppercase tracking-[0.08em] text-muted sm:text-[10px]"
              style={{ left: `${l.position.left}%`, top: `${l.position.top}%` }}
            >
              {l.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

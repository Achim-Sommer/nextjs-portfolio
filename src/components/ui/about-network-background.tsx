import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: Point[];
  color: string;
  isCircuitNode?: boolean;
}

export const AboutNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Konfiguration
    const POINT_COUNT = 50;
    const CONNECTION_DISTANCE = 180;
    const POINT_SPEED = 0.3;
    const MOUSE_INFLUENCE_DISTANCE = 150;
    const points: Point[] = [];

    // Farbpalette definieren
    const colors = [
      'rgba(255, 182, 193, 0.9)', // Rosa
      'rgba(147, 112, 219, 0.9)', // Lila
      'rgba(100, 149, 237, 0.9)', // Kornblumenblau
      'rgba(199, 21, 133, 0.9)',  // Mittleres Violettrot
      'rgba(138, 43, 226, 0.9)',  // Blauviolett
      'rgba(72, 61, 139, 0.9)',   // Dunkles Schieferblau
    ];

    // Circuit-Board Linien
    const circuitLines: {start: Point; end: Point; progress: number}[] = [];

    // Canvas-Größe setzen
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    // Punkte initialisieren
    const initPoints = () => {
      points.length = 0;
      // Hauptpunkte
      for (let i = 0; i < POINT_COUNT; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * POINT_SPEED,
          vy: (Math.random() - 0.5) * POINT_SPEED,
          connections: [],
          color: colors[Math.floor(Math.random() * colors.length)],
          isCircuitNode: Math.random() < 0.3 // 30% Chance ein Circuit-Node zu sein
        });
      }

      // Circuit-Verbindungen erstellen
      const circuitNodes = points.filter(p => p.isCircuitNode);
      circuitLines.length = 0;
      circuitNodes.forEach(node => {
        const nearestNodes = circuitNodes
          .filter(n => n !== node)
          .sort((a, b) => {
            const distA = Math.hypot(a.x - node.x, a.y - node.y);
            const distB = Math.hypot(b.x - node.x, b.y - node.y);
            return distA - distB;
          })
          .slice(0, 2);

        nearestNodes.forEach(target => {
          circuitLines.push({
            start: node,
            end: target,
            progress: 0
          });
        });
      });
    };

    // Verbindungen aktualisieren
    const updateConnections = () => {
      points.forEach(point => {
        point.connections = [];
        points.forEach(otherPoint => {
          if (point === otherPoint) return;
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < CONNECTION_DISTANCE) {
            point.connections.push(otherPoint);
          }
        });
      });
    };

    // Punkte bewegen
    const movePoints = () => {
      points.forEach(point => {
        // Normale Bewegung
        point.x += point.vx;
        point.y += point.vy;

        // Mauseinfluss
        const dx = mouseRef.current.x - point.x;
        const dy = mouseRef.current.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < MOUSE_INFLUENCE_DISTANCE) {
          const force = (MOUSE_INFLUENCE_DISTANCE - distance) / MOUSE_INFLUENCE_DISTANCE;
          point.vx -= (dx / distance) * force * 0.2;
          point.vy -= (dy / distance) * force * 0.2;
        }

        // Geschwindigkeit begrenzen
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
        if (speed > POINT_SPEED) {
          point.vx = (point.vx / speed) * POINT_SPEED;
          point.vy = (point.vy / speed) * POINT_SPEED;
        }

        // An Rändern abprallen
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));
      });
    };

    // Zeichnen
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Circuit-Linien zeichnen
      circuitLines.forEach(line => {
        const dx = line.end.x - line.start.x;
        const dy = line.end.y - line.start.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        ctx.beginPath();
        ctx.strokeStyle = line.start.color.replace('0.9', '0.15');
        ctx.lineWidth = 2;
        
        // Gestrichelte Linie
        ctx.setLineDash([5, 10]);
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.stroke();
        
        // Pulsierender Punkt auf der Linie
        line.progress = (line.progress + 0.005) % 1;
        const pulseX = line.start.x + dx * line.progress;
        const pulseY = line.start.y + dy * line.progress;
        
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
        ctx.fillStyle = line.start.color;
        ctx.fill();
      });

      // Normale Verbindungen zeichnen
      points.forEach(point => {
        point.connections.forEach(connectedPoint => {
          const dx = point.x - connectedPoint.x;
          const dy = point.y - connectedPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const opacity = 1 - (distance / CONNECTION_DISTANCE);
          
          const gradient = ctx.createLinearGradient(
            point.x, point.y,
            connectedPoint.x, connectedPoint.y
          );
          gradient.addColorStop(0, point.color.replace('0.9', `${opacity * 0.4}`));
          gradient.addColorStop(1, connectedPoint.color.replace('0.9', `${opacity * 0.4}`));
          
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(connectedPoint.x, connectedPoint.y);
          ctx.stroke();
        });
      });

      // Punkte zeichnen
      points.forEach(point => {
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(point.x, point.y, point.isCircuitNode ? 4 : 3, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();

        // Leuchten-Effekt
        if (point.isCircuitNode) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = point.color.replace('0.9', '0.3');
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = point.color.replace('0.9', '0.2');
          ctx.fill();
        }
      });
    };

    // Animation Loop
    const animate = () => {
      movePoints();
      updateConnections();
      draw();
      requestAnimationFrame(animate);
    };

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleResize = () => {
      resizeCanvas();
      initPoints();
    };

    // Initialisierung
    resizeCanvas();
    initPoints();
    animate();

    // Event Listener hinzufügen
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-[#1a1a1a]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
    </div>
  );
};

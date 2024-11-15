'use client';
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export default function Particles({
  className = '',
  quantity = 50,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const particleColors = theme === 'dark' 
      ? ['#3b82f6', '#6366f1', '#8b5cf6', '#d946ef']  // Blue to purple for dark mode
      : ['#3b82f6', '#6366f1', '#8b5cf6', '#d946ef'];  // Same colors for light mode

    let particles: any[] = [];
    let width = 0;
    let height = 0;
    let animate = true;
    let isMouseOver = false;
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      particles = [];
      const rows = Math.floor(height / 30);
      const cols = Math.floor(width / 30);
      const cellWidth = width / cols;
      const cellHeight = height / rows;

      for (let i = 0; i < quantity; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          color,
          size: Math.random() * 2 + 1,
          vx: 0,
          vy: 0,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (isMouseOver) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDirX = dx / distance;
          const forceDirY = dy / distance;
          const maxDistance = 100;
          const force = (maxDistance - distance) / maxDistance;
          
          if (distance < maxDistance) {
            p.vx += forceDirX * force * 0.2;
            p.vy += forceDirY * force * 0.2;
          }
        }

        const dx = p.originX - p.x;
        const dy = p.originY - p.y;
        p.vx += dx / staticity;
        p.vy += dy / staticity;
        p.vx *= ease / 100;
        p.vy *= ease / 100;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
    };

    const connectParticles = () => {
      const maxDistance = 100;
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${theme === 'dark' ? '255,255,255,' : '0,0,0,'} ${alpha})`;
            ctx.stroke();
          }
        });
      });
    };

    const render = () => {
      if (animate) {
        drawParticles();
        connectParticles();
        requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
    };

    resizeCanvas();
    createParticles();
    render();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      animate = false;
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [quantity, staticity, ease, refresh, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

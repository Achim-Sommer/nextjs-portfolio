'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const PARTICLE_COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#d946ef'];

export default function Particles({
  className = '',
  quantity = 50,
  ease = 50,
  refresh = false,
}: {
  className?: string;
  quantity?: number;
  ease?: number;
  refresh?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isMouseOver = useRef<boolean>(false);
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = context.current;
    const container = canvasContainerRef.current;
    if (!canvas || !ctx || !container) return;

    const { width, height } = container.getBoundingClientRect();
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    particles.current = Array.from({ length: quantity }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 2 + 1,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]
    }));
  }, [dpr, quantity]);

  const onMouseMove = (e: MouseEvent) => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    mouse.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const drawConnections = useCallback(() => {
    const ctx = context.current;
    if (!ctx) return;

    particles.current.forEach((particle, i) => {
      particles.current.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const opacity = (120 - distance) / 120 * 0.2;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(147, 197, 253, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = context.current;
    if (!canvas || !ctx) return;

    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.clearRect(0, 0, width, height);
    drawConnections();

    particles.current.forEach(particle => {
      if (isMouseOver.current) {
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const force = (120 - distance) / 120;
          particle.vx -= (dx / distance) * force * 0.2;
          particle.vy -= (dy / distance) * force * 0.2;
        }
      }

      particle.x += particle.vx * (ease / 25);
      particle.y += particle.vy * (ease / 25);

      // Leichte zufällige Bewegung
      particle.vx += (Math.random() - 0.5) * 0.1;
      particle.vy += (Math.random() - 0.5) * 0.1;

      // Geschwindigkeitsbegrenzung
      const maxSpeed = 2;
      const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (currentSpeed > maxSpeed) {
        particle.vx = (particle.vx / currentSpeed) * maxSpeed;
        particle.vy = (particle.vy / currentSpeed) * maxSpeed;
      }

      // Reibung
      particle.vx *= 0.98;
      particle.vy *= 0.98;

      if (particle.x < 0) particle.x = width;
      else if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      else if (particle.y > height) particle.y = 0;

      // Zeichne Partikel
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }, [drawConnections, dpr, ease]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    context.current = ctx;
    initCanvas();
    animate();
    
    const handleResize = () => initCanvas();
    const handleMouseMove = (e: MouseEvent) => onMouseMove(e);
    const handleMouseEnter = () => { isMouseOver.current = true; };
    const handleMouseLeave = () => { isMouseOver.current = false; };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [animate, initCanvas]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas, refresh]);

  return (
    <div className={cn("h-full w-full", className)} ref={canvasContainerRef}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

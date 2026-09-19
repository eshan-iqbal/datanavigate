'use client';

import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with easing
    const mouse = {
      x: width * 0.5,
      y: height * 0.35,
      targetX: width * 0.5,
      targetY: height * 0.35,
      radius: 280,
    };

    // Ambient floating orbs (Typeform warm palette)
    const orbs = [
      {
        x: width * 0.3,
        y: height * 0.25,
        targetX: width * 0.3,
        targetY: height * 0.25,
        radius: 340,
        color: 'rgba(242, 235, 222, 0.75)', // Warm Sand
        vx: 0.3,
        vy: 0.2,
      },
      {
        x: width * 0.7,
        y: height * 0.3,
        targetX: width * 0.7,
        targetY: height * 0.3,
        radius: 380,
        color: 'rgba(235, 245, 240, 0.65)', // Typeform Soft Mint/Sage
        vx: -0.25,
        vy: 0.35,
      },
      {
        x: width * 0.5,
        y: height * 0.55,
        targetX: width * 0.5,
        targetY: height * 0.55,
        radius: 400,
        color: 'rgba(254, 243, 225, 0.6)', // Soft Amber/Peach
        vx: 0.2,
        vy: -0.3,
      },
      {
        x: width * 0.2,
        y: height * 0.7,
        targetX: width * 0.2,
        targetY: height * 0.7,
        radius: 320,
        color: 'rgba(238, 242, 250, 0.5)', // Subtle Ice Blue
        vx: -0.2,
        vy: 0.2,
      },
    ];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      mouse.targetX = clientX;
      mouse.targetY = clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    let time = 0;
    const render = () => {
      time += 0.008;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render ambient orbs
      orbs.forEach((orb, i) => {
        // Natural organic oscillation
        orb.x += Math.sin(time + i * 1.5) * 0.6 + orb.vx;
        orb.y += Math.cos(time + i * 1.2) * 0.5 + orb.vy;

        // Subtle reaction to mouse proximity
        const dx = mouse.x - orb.x;
        const dy = mouse.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          const force = (1 - dist / 400) * 25;
          orb.x -= (dx / dist) * force * 0.05;
          orb.y -= (dy / dist) * force * 0.05;
        }

        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(0.7, orb.color.replace(/[\d\.]+\)$/, '0.2)'));
        gradient.addColorStop(1, 'rgba(250, 249, 245, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render interactive mouse spotlight
      const mouseGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        mouse.radius
      );
      mouseGlow.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      mouseGlow.addColorStop(0.5, 'rgba(245, 242, 233, 0.2)');
      mouseGlow.addColorStop(1, 'rgba(250, 249, 245, 0)');

      ctx.fillStyle = mouseGlow;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="typeform-interactive-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="interactive-canvas" />
      <div className="typeform-grid-overlay" />
    </div>
  );
}

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  color: string; size: number; rotation: number; rotSpeed: number; opacity: number;
}

const COLORS = ["#f97316","#fbbf24","#ea580c","#d97706","#fb923c","#ffffff","#fed7aa"];

export function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";

  const particles: Particle[] = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: -20,
    vx: (Math.random() - 0.5) * 6,
    vy: Math.random() * 4 + 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 8,
    opacity: 1,
  }));

  let frame = 0;
  let raf: number;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // gravity
      p.rotation += p.rotSpeed;
      p.opacity = Math.max(0, 1 - frame / 160);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
      ctx.restore();
    }

    if (frame < 180) {
      raf = requestAnimationFrame(draw);
    } else {
      canvas.style.display = "none";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  raf = requestAnimationFrame(draw);
  // Cleanup if component unmounts
  return () => cancelAnimationFrame(raf);
}

export default function ConfettiCanvas() {
  return (
    <canvas
      id="confetti-canvas"
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ display: "none" }}
    />
  );
}

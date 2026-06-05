import { useEffect, useRef, useState } from "react";

export default function CursedCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect mobile touch interface
    const checkMobile = () => {
      const touchCapable =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(touchCapable);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse coordinates with easing
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle class for cursed energy trail
    interface FlameParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      maxLife: number;
      life: number;
    }

    const particles: FlameParticle[] = [];

    const colors = [
      "rgba(6, 182, 212, ",   // Cyan (Cursed Technique Blue)
      "rgba(168, 85, 247, ",  // Purple (Hollow Purple)
      "rgba(236, 72, 153, ",  // Pink (Cursed Energy Surge)
    ];

    const spawnParticle = (mx: number, my: number) => {
      // Spawn standard trail particles
      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: mx + (Math.random() * 12 - 6),
        y: my + (Math.random() * 12 - 6),
        size: Math.random() * 10 + 4,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * -2 - 0.5, // Float upwards
        color: colorBase,
        alpha: 1,
        maxLife: Math.random() * 30 + 15,
        life: 0,
      });
    };

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ease mouse target
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      // Spawn new particles based on motion
      const dist = Math.hypot(mouse.targetX - mouse.x, mouse.targetY - mouse.y);
      const spawnCount = Math.min(Math.floor(dist / 4) + 1, 4);
      for (let i = 0; i < spawnCount; i++) {
        spawnParticle(mouse.x, mouse.y);
      }

      // Draw custom reticle cursor
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(6, 182, 212, 0.8)"; // Neon Cyan
      ctx.fill();

      // Outer ring with slight pulse
      const pulseRadius = 12 + Math.sin(Date.now() / 100) * 2;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.4)"; // Faint Purple
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha = 1 - p.life / p.maxLife;
        p.size *= 0.96; // Shrink as it lives

        if (p.life >= p.maxLife || p.size < 0.5) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        // Cursed energy uses shadows/blur effect
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.shadowColor = p.color === colors[0] ? "#06b6d4" : "#a855f7";
        ctx.shadowBlur = p.size * 1.5;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for next iteration
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      id="cursed-particle-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
    />
  );
}

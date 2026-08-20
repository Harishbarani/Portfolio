import { useEffect, useRef } from 'react';

export function CursorDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const dots = useRef<Array<{ x: number; y: number; opacity: number; life: number }>>([]);
  const isOverInteractive = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Check if cursor is over interactive element
    const checkInteractiveElement = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('.cursor-pointer') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer';

      isOverInteractive.current = !!isInteractive;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      checkInteractiveElement(e);

      // Only create dots if not over interactive elements
      if (!isOverInteractive.current) {
        for (let i = 0; i < 2; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 40;
          dots.current.push({
            x: e.clientX + Math.cos(angle) * distance,
            y: e.clientY + Math.sin(angle) * distance,
            opacity: 0.6,
            life: 1,
          });
        }

        // Limit dots array size
        if (dots.current.length > 100) {
          dots.current = dots.current.slice(-100);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw dots
      dots.current = dots.current.filter((dot) => {
        dot.life -= 0.02;
        dot.opacity = dot.life * 0.6;

        if (dot.life > 0) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);

          // Get CSS variable colors
          const isDark = document.documentElement.classList.contains('dark');
          const color = isDark ? '96, 165, 250' : '59, 130, 246';

          ctx.fillStyle = `rgba(${color}, ${dot.opacity})`;
          ctx.fill();
          return true;
        }
        return false;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
      style={{ opacity: 0.4 }}
    />
  );
}

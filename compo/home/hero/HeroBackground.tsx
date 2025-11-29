import React, { useEffect, useRef } from 'react';

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

   
    const SPACING = 40; 
    const RIPPLE_SPEED = 8; 
    const RIPPLE_DECAY = 0.03; 
    const MAX_RIPPLES = 10; 

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      strength: number;
    }

 
    const ripples: Ripple[] = [];
    let lastMouseX = 0;
    let lastMouseY = 0;
    let frameCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      frameCount++;

   
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += RIPPLE_SPEED;
        r.strength -= RIPPLE_DECAY;
        if (r.strength <= 0) {
          ripples.splice(i, 1);
        }
      }


      const cols = Math.ceil(width / SPACING);
      const rows = Math.ceil(height / SPACING);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * SPACING;
          const y = j * SPACING;

          let totalInfluence = 0;
          
       
          for (const r of ripples) {
            const dx = x - r.x;
            const dy = y - r.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            

            const distFromWave = Math.abs(dist - r.radius);

            if (distFromWave < 50) {

              const intensity = (1 - distFromWave / 50) * r.strength;
              totalInfluence += intensity;
            }
          }

   
          if (totalInfluence > 1) totalInfluence = 1;

   
          const size = 1.5 + totalInfluence * 3;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);

          if (totalInfluence > 0.1) {
         
             if (totalInfluence > 0.5) {
                ctx.fillStyle = `rgba(245, 158, 11, ${totalInfluence})`;
             } else {
                ctx.fillStyle = `rgba(147, 51, 234, ${totalInfluence + 0.2})`; 
             }
          } else {
   
             ctx.fillStyle = 'rgba(147, 51, 234, 0.15)'; 
          }
          
          ctx.fill();
        }
      }

      if (frameCount % 60 === 0 && Math.random() > 0.5) {
         ripples.push({
             x: Math.random() * width,
             y: Math.random() * height,
             radius: 0,
             strength: 0.4 
         });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      
      if (dist > 30) {
        if (ripples.length < MAX_RIPPLES) {
            ripples.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                strength: 1
            });
        }
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
   
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#1a0b2e] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-10" />
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export default HeroBackground;
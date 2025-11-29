import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  CircuitBoard,
  Linkedin,
  Twitter,
  Instagram,
  ArrowRight,
  ArrowUp,
  Globe,
} from 'lucide-react';

import { NAV_LINKS, COMPANY_INFO } from '../constants';

// ================================
//  ELASTIC GRID BACKGROUND INSIDE
// ================================
const ElasticGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;

    const SPACING = 45;
    const MOUSE_INFLUENCE = 180;
    const MOUSE_FORCE = 5;
    const SPRING_STRENGTH = 0.08;
    const FRICTION = 0.85;

    const mouse = { x: -1000, y: -1000 };

    interface Point {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
    }

    const points: Point[] = [];

    const init = () => {
      points.length = 0;
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * SPACING;
          const y = j * SPACING;
          points.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_INFLUENCE) {
          const angle = Math.atan2(dy, dx);
          const force = (MOUSE_INFLUENCE - dist) / MOUSE_INFLUENCE;
          p.vx -= Math.cos(angle) * force * MOUSE_FORCE;
          p.vy -= Math.sin(angle) * force * MOUSE_FORCE;
        }

        const dxHome = p.ox - p.x;
        const dyHome = p.oy - p.y;

        p.vx += dxHome * SPRING_STRENGTH;
        p.vy += dyHome * SPRING_STRENGTH;

        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;
      }

      const rowsVal = Math.ceil(height / SPACING) + 2;
      const rowStride = rowsVal + 1;

      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        const dist = Math.sqrt((p.x - p.ox) ** 2 + (p.y - p.oy) ** 2);
        const intensity = Math.min(1, dist / 30);

        const r = Math.floor(147 + 98 * intensity);
        const g = Math.floor(51 + 107 * intensity);
        const b = Math.floor(234 - 223 * intensity);
        const alpha = 0.15 + 0.5 * intensity;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        const rightIdx = i + rowStride;
        if (rightIdx < points.length) {
          const n = points[rightIdx];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }

        const bottomIdx = i + 1;
        if (bottomIdx < points.length && (i + 1) % rowStride !== 0) {
          const n = points[bottomIdx];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(update);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      init();
    };

    const move = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const leave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);

    resize();
    update();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
};

// ================================
//           FOOTER
// ================================
const Footer: React.FC = () => {
  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  return (
    <footer className="relative bg-[#020005] overflow-hidden border-t border-purple-900/20">
      {/* BG */}
      <div className="absolute inset-0">
        <ElasticGridBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020005_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-20 pt-20 pb-10">

        {/* CTA */}
        <div className="text-center mb-32">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-xs tracking-[0.3em] uppercase mb-8">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
            Future Ready
          </div>
{/* Top Line */}
<h3 className="font-['Space_Grotesk'] font-medium text-lg md:text-2xl tracking-[0.8em] md:tracking-[1em] text-slate-300 uppercase mb-4 select-none drop-shadow-md transition-all duration-300 group-hover:tracking-[1.1em]">
                  Scale Your
                </h3>

          {/* Bottom Line: Massive White Vision */}
          <h2 className="font-['Syne'] font-extrabold text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter select-none relative z-10 transition-all duration-500 group-hover:scale-105">
                  <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    VISION
                  </span>
                </h2>

          <Link to="/contact">
            <button className="mt-12 inline-flex gap-3 bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-amber-400 transition-all">
              Start a Project <ArrowRight />
            </button>
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 p-8 bg-[#050505]/80 rounded-3xl border border-white/5">

          {/* BRAND */}
          <div className="md:col-span-4 pr-12 border-r border-white/5">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <CircuitBoard className="w-8 h-8 text-amber-500" />
              <span className="text-2xl font-bold text-white">KORDEN</span>
            </Link>

            <p className="text-slate-400 mb-6">
              Bridging the gap between global innovation and local manufacturing.
            </p>

            <div className="flex gap-4">
              {[Linkedin, Twitter, Instagram].map((I, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white hover:text-black transition"
                >
                  <I size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* EXPLORE */}
          <div className="md:col-span-2 px-8 border-r border-white/5">
            <h4 className="text-xs uppercase text-white/50 mb-4">Explore</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link className="text-slate-400 hover:text-amber-500" to={link.path}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* OFFICE */}
          <div className="md:col-span-3 px-8 border-r border-white/5">
            <h4 className="text-xs uppercase text-white/50 mb-4">Office</h4>
            <ul className="space-y-5">
              <li>
                <span className="text-purple-400 text-xs">LOCATION</span>
                <p className="text-slate-300">{COMPANY_INFO.address}</p>
              </li>
              <li>
                <span className="text-purple-400 text-xs">INQUIRIES</span>
                <a
                  className="text-slate-300 hover:text-white"
                  href={`mailto:${COMPANY_INFO.email}`}
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="md:col-span-3 pl-8">
            <h4 className="text-xs uppercase text-white/50 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a className="text-slate-400 hover:text-amber-500" href="#">Privacy Policy</a></li>
              <li><a className="text-slate-400 hover:text-amber-500" href="#">Terms of Service</a></li>
              <li><a className="text-slate-400 hover:text-amber-500" href="#">Cookie Settings</a></li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-8 flex items-center gap-3 text-slate-500 hover:text-white text-xs uppercase tracking-widest"
            >
              Back to Top
              <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-black">
                <ArrowUp />
              </div>
            </button>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="py-6 mt-8 flex justify-between text-[10px] text-slate-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} KORDEN TECHNOLOGIES.</p>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Systems Nominal
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" /> Mumbai, IN
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

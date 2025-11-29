import React, { useState, useEffect, useRef } from 'react';
import {  Link} from 'react-router-dom';
import { Menu, X, CircuitBoard, ArrowRight, ArrowUp, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';
import { NAV_LINKS, COMPANY_INFO } from '../constants';

// --- NEW "ELASTIC NEURAL GRID" BACKGROUND ---
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

    // Config
    const SPACING = 45; 
    const POINT_RADIUS = 1.5;
    const MOUSE_INFLUENCE = 180;
    const MOUSE_FORCE = 5; // How strongly mouse pushes
    const SPRING_STRENGTH = 0.08; // How fast points return
    const FRICTION = 0.85; // Damping

    // State
    const mouse = { x: -1000, y: -1000 };
    interface Point {
      x: number; // current pos
      y: number;
      ox: number; // original pos (target)
      oy: number;
      vx: number; // velocity
      vy: number;
    }
    const points: Point[] = [];

    const init = () => {
       points.length = 0;
       // Add extra padding to ensure grid covers edges even when distorted
       // Note: width/height are updated in handleResize before init is called
       const cols = Math.ceil(width / SPACING) + 2;
       const rows = Math.ceil(height / SPACING) + 2;
       
       // Loops run from -1 to cols/rows (exclusive). 
       // So for rows, it runs -1, 0, ..., rows-1. Total items = rows + 1.
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

       // 1. Update Physics
       for (const p of points) {
           // Calculate distance to mouse
           const dx = mouse.x - p.x;
           const dy = mouse.y - p.y;
           const dist = Math.sqrt(dx*dx + dy*dy);

           // Repulsion Force (Mouse)
           if (dist < MOUSE_INFLUENCE) {
               const angle = Math.atan2(dy, dx);
               const force = (MOUSE_INFLUENCE - dist) / MOUSE_INFLUENCE;
               // Push away
               p.vx -= Math.cos(angle) * force * MOUSE_FORCE;
               p.vy -= Math.sin(angle) * force * MOUSE_FORCE;
           }

           // Spring Force (Return to Original)
           const dxHome = p.ox - p.x;
           const dyHome = p.oy - p.y;
           
           p.vx += dxHome * SPRING_STRENGTH;
           p.vy += dyHome * SPRING_STRENGTH;

           // Apply Velocity & Friction
           p.vx *= FRICTION;
           p.vy *= FRICTION;
           p.x += p.vx;
           p.y += p.vy;
       }

       // 2. Draw Connections
       // We must match the loop logic from init to determine neighbors correctly.
       // In init: inner loop is 'j' (rows), from -1 to rows-1. Total count is rows + 1.
       const rowsVal = Math.ceil(height / SPACING) + 2;
       const rowStride = rowsVal + 1; 
       
       ctx.lineWidth = 1;

       for (let i = 0; i < points.length; i++) {
           const p = points[i];
           
           // Calculate displacement magnitude for color
           const d = Math.sqrt(Math.pow(p.x - p.ox, 2) + Math.pow(p.y - p.oy, 2));
           const intensity = Math.min(1, d / 30); // 0 to 1 based on movement

           // Color: Purple base -> Amber hot
           const r = Math.floor(147 + (98 * intensity));
           const g = Math.floor(51 + (107 * intensity));
           const b = Math.floor(234 - (223 * intensity));
           const alpha = 0.15 + (0.5 * intensity);

           ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
           ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

           // Draw Lines to Neighbors
           // We only draw to Right (Next Col) and Bottom (Next Row) to avoid duplicates

           // Right neighbor (Index + rowStride)
           const rightIndex = i + rowStride;
           if (rightIndex < points.length) {
                const neighbor = points[rightIndex];
                if (neighbor) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(neighbor.x, neighbor.y);
                    ctx.stroke();
                }
           }

           // Bottom neighbor (Index + 1)
           // Logic: It is the next item in the array, unless we are at the end of a column.
           // Since we flatten the array column by column, the next item is physically below.
           // However, we must ensure we don't connect the last item of a column to the first of the next.
           // We check (i + 1) % rowStride !== 0.
           
           const bottomIndex = i + 1;
           if (bottomIndex < points.length && (i + 1) % rowStride !== 0) {
               const neighbor = points[bottomIndex];
               if (neighbor) {
                   ctx.beginPath();
                   ctx.moveTo(p.x, p.y);
                   ctx.lineTo(neighbor.x, neighbor.y);
                   ctx.stroke();
               }
           }
       }

       animationId = requestAnimationFrame(update);
    };

    const handleResize = () => {
       const parent = canvas.parentElement;
       if (parent) {
           width = parent.clientWidth;
           height = parent.clientHeight;
       } else {
           width = window.innerWidth;
           height = window.innerHeight;
       }
       canvas.width = width;
       canvas.height = height;
       init();
    };

    const handleMouseMove = (e: MouseEvent) => {
       const rect = canvas.getBoundingClientRect();
       mouse.x = e.clientX - rect.left;
       mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    handleResize(); // also calls init
    update();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none" 
      style={{ opacity: 1 }}
    />
  );
};



export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020005] overflow-hidden border-t border-purple-900/20">
      {/* ELASTIC GRID BACKGROUND */}
      <div className="absolute inset-0 w-full h-full bg-[#020005]">
         <ElasticGridBackground />
         {/* Top Gradient Fade to blend with content above */}
         <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#020005] via-[#020005]/80 to-transparent z-10" />
         {/* Radial vignette to fade edges to black */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020005_100%)] z-10 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-16 md:pt-20 pb-10">
        
        {/* === SCALE YOUR VISION (CLEAN & POWERFUL) === */}
        <div className="relative flex flex-col items-center justify-center text-center mb-20 md:mb-32">
             
             {/* Floating Pill */}
             <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/90 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-8 shadow-lg hover:bg-white/10 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_#F59E0B]"/>
                Future Ready
             </div>

            {/* MAIN TEXT */}
            <div className="relative group flex flex-col items-center">
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
                
                {/* Subtle Glow Behind Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/10 blur-[100px] rounded-full -z-10 pointer-events-none mix-blend-screen" />
            </div>
            
            {/* CTA Button */}
            <div className="mt-16 relative z-20">
               <Link to="/contact">
                  <button className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-black rounded-full font-bold text-base font-['Space_Grotesk'] tracking-wide transition-all duration-300 hover:bg-amber-400 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]">
                    <span className="relative z-10">Start a Project</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  </button>
                </Link>
            </div>
        </div>

        {/* === LINKS GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 bg-[#050505]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl relative z-10">
            
            {/* 1. Brand & Social (4 Cols) */}
            <div className="md:col-span-4 md:pr-12 md:border-r border-white/5 flex flex-col justify-between">
               <div>
                 <Link to="/" className="flex items-center gap-3 mb-6 group w-fit">
                   <div className="relative">
                     <CircuitBoard className="w-8 h-8 text-amber-500 group-hover:rotate-90 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-amber-500 blur-lg opacity-40 animate-pulse"></div>
                   </div>
                   <span className="text-2xl font-bold text-white font-['Space_Grotesk'] tracking-wider">KORDEN</span>
                 </Link>
                 
                 <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                   Bridging the gap between global innovation and local manufacturing. Your premium partner for electronics sourcing.
                 </p>
               </div>

               <div className="flex gap-4">
                  {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      <Icon size={18} />
                    </a>
                  ))}
               </div>
            </div>

            {/* 2. Explore Links (2 Cols) */}
            <div className="md:col-span-2 md:px-8 md:border-r border-white/5">
               <h4 className="font-['Syne'] font-bold text-white uppercase tracking-widest mb-6 text-xs opacity-50">Explore</h4>
               <ul className="space-y-3">
                 {NAV_LINKS.map(link => (
                    <li key={link.path}>
                       <Link to={link.path} className="text-slate-400 hover:text-amber-500 transition-colors text-sm font-medium block hover:translate-x-2 transition-transform duration-300">
                          {link.label}
                       </Link>
                    </li>
                 ))}
               </ul>
            </div>

            {/* 3. Contact (3 Cols) */}
            <div className="md:col-span-3 md:px-8 md:border-r border-white/5">
               <h4 className="font-['Syne'] font-bold text-white uppercase tracking-widest mb-6 text-xs opacity-50">Office</h4>
               <ul className="space-y-5">
                 <li>
                    <span className="block text-[10px] text-purple-400 font-bold mb-1 tracking-wider">LOCATION</span>
                    <span className="text-slate-300 text-sm leading-relaxed block hover:text-white transition-colors">{COMPANY_INFO.address}</span>
                 </li>
                 <li>
                    <span className="block text-[10px] text-purple-400 font-bold mb-1 tracking-wider">INQUIRIES</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-300 text-sm hover:text-white transition-colors block">{COMPANY_INFO.email}</a>
                 </li>
               </ul>
            </div>
            
            {/* 4. Legal & Utility (3 Cols) */}
            <div className="md:col-span-3 md:pl-8 flex flex-col justify-between h-full">
               <div>
                  <h4 className="font-['Syne'] font-bold text-white uppercase tracking-widest mb-6 text-xs opacity-50">Legal</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-slate-400 hover:text-amber-500 text-sm transition-colors block hover:translate-x-1 duration-200">Privacy Policy</a></li>
                    <li><a href="#" className="text-slate-400 hover:text-amber-500 text-sm transition-colors block hover:translate-x-1 duration-200">Terms of Service</a></li>
                    <li><a href="#" className="text-slate-400 hover:text-amber-500 text-sm transition-colors block hover:translate-x-1 duration-200">Cookie Settings</a></li>
                  </ul>
               </div>
               
               <button 
                 onClick={scrollToTop} 
                 className="mt-8 md:mt-0 self-start group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
               >
                  Back to Top 
                  <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUp className="w-4 h-4" />
                  </div>
               </button>
            </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 mt-8 opacity-60 hover:opacity-100 transition-opacity">
           <p className="text-[10px] text-slate-500 font-['Space_Grotesk'] uppercase tracking-widest">
              © {new Date().getFullYear()} KORDEN TECHNOLOGIES.
           </p>
           
           <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 group cursor-help">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider group-hover:text-green-500 transition-colors">Systems Nominal</span>
               </div>
               <div className="hidden md:flex items-center gap-2 group cursor-help">
                  <Globe className="w-3 h-3 text-slate-500 group-hover:text-amber-500 transition-colors" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider group-hover:text-amber-500 transition-colors">Mumbai, IN</span>
               </div>
           </div>
        </div>

      </div>
    </footer>
  );
};

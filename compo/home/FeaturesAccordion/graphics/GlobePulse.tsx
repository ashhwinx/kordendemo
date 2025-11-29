import React from "react";
import { Globe } from "lucide-react";

const GlobePulse: React.FC = () => {
  return (
    // Added group-hover:scale-105 for a subtle zoom effect on interaction
    <div className="relative w-full h-full flex items-center justify-center scale-75 md:scale-90 group-hover:scale-100 lg:scale-110 opacity-90 group-hover:opacity-100 transition-all duration-700 ease-out">
      
      {/* --- AMBIENT GLOWS --- */}
      {/* Primary Purple Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2),transparent_70%)] blur-xl" />
      {/* Secondary Amber Glow (Warmth) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15),transparent_60%)] blur-lg animate-pulse" />


      {/* --- ENERGY RIPPLES (New) --- */}
      {/* Expanding waves radiating outwards */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-purple-500/20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"
          style={{
            width: 140 + i * 40 + 'px',
            height: 140 + i * 40 + 'px',
            animationDelay: `${i * 1}s`,
            opacity: 0.5 - i * 0.1
          }}
        />
      ))}


      {/* --- TECH RINGS --- */}
      
      {/* 1. The Tilted "3D" Orbital (New) */}
      <div className="absolute z-0 w-[320px] h-[320px] rounded-full border border-white/5 animate-[spin_40s_linear_infinite] [transform:rotateX(70deg)_rotateY(10deg)]">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/20 rounded-full blur-[1px]"></div>
      </div>

      {/* 2. Outer Scanner Ring */}
      <div className="absolute w-[280px] h-[280px] rounded-full border border-white/5 overflow-hidden animate-[spin_60s_linear_infinite]">
         {/* Conic gradient for a "radar sweep" look */}
         <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,rgba(168,85,247,0.2)_100%)] animate-[spin_5s_linear_infinite]"></div>
      </div>

      {/* 3. Dashed Data Ring */}
      <div className="absolute w-[240px] h-[240px] rounded-full border-2 border-purple-500/30 animate-[spin_25s_linear_infinite_reverse]" style={{ borderStyle: "dashed" }} />
      
      {/* 4. Inner Active Ring (Partial) */}
      <div className="absolute w-[190px] h-[190px] rounded-full border-[3px] border-transparent border-t-amber-500/60 border-r-amber-500/40 animate-[spin_12s_linear_infinite] shadow-[0_0_15px_rgba(245,158,11,0.2)]" />


      {/* --- THE CORE --- */}
      <div className="relative z-20 w-36 h-36 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center shadow-[0_0_80px_-10px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_100px_-10px_rgba(168,85,247,0.7)] transition-all duration-500 overflow-hidden">
        
        {/* Background grid inside the core */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 scale-[2] animate-[spin_120s_linear_infinite]"></div>

        {/* Holographic Globe Icon */}
        <div className="relative z-10 animate-[pulse_4s_ease-in-out_infinite]">
            {/* Gradient fill for the icon itself */}
             <svg width="0" height="0">
                <linearGradient id="globe-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop stopColor="#A855F7" offset="0%" />
                    <stop stopColor="#F59E0B" offset="100%" />
                </linearGradient>
            </svg>
            <Globe className="w-20 h-20 stroke-[1px]" style={{ stroke: "url(#globe-gradient)", filter: "drop-shadow(0px 0px 10px rgba(168,85,247,0.5))" }} />
        </div>
        
        {/* Internal bright flash */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-[spin_3s_linear_infinite] opacity-30" />
      </div>


      {/* --- SATELLITES (Connected) --- */}
      {/* Satellite 1 (Amber) */}
      <div className="absolute w-[230px] h-[230px] animate-[spin_10s_linear_infinite] z-10 pointer-events-none">
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 flex items-center">
             {/* Connecting line */}
            <div className="w-12 h-[1px] bg-gradient-to-r from-amber-500/0 to-amber-500/50 origin-right -rotate-12"></div>
            <div className="w-3 h-3 bg-[#050505] border-2 border-amber-500 rounded-full shadow-[0_0_20px_#F59E0B] relative">
                 <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-50"></div>
            </div>
        </div>
      </div>

      {/* Satellite 2 (Purple) */}
      <div className="absolute w-[170px] h-[170px] animate-[spin_15s_linear_infinite_reverse] rotate-45 z-10 pointer-events-none">
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
            <div className="w-2.5 h-2.5 bg-[#050505] border-2 border-purple-500 rounded-full shadow-[0_0_15px_#A855F7] relative">
                <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-50"></div>
            </div>
             {/* Connecting line */}
            <div className="h-10 w-[1px] bg-gradient-to-b from-purple-500/50 to-purple-500/0"></div>
         </div>
      </div>
    </div>
  );
};

export default GlobePulse;
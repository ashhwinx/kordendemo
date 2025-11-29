import React from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

interface Props {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ElementType;
  Graphic: React.ComponentType;
  isActive: boolean;
  onActivate: (id: number) => void;
}

const VerticalAccordionItem: React.FC<Props> = ({
  id,
  title,
  subtitle,
  desc,
  icon: Icon,
  Graphic,
  isActive,
  onActivate
}) => {
  return (
    <div
      /* 1. HOVER TRIGGER (Desktop) */
      onMouseEnter={() => onActivate(id)}
      
      /* 2. CLICK TRIGGER (Mobile/Tablet) */
      onClick={() => onActivate(id)}
      
      className={`
        relative w-full rounded-3xl overflow-hidden border transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group flex flex-col shrink-0
        
        /* Mobile Styles */
        ${isActive ? "h-auto bg-[#080808] border-amber-500/50 shadow-[0_0_30px_-10px_rgba(245,158,11,0.15)]" : "h-24 bg-[#050505] border-white/5"}
        
        /* Desktop Styles */
        md:h-auto
        ${
          isActive
            ? "md:flex-[3]"
            : "md:flex-[0.8] md:hover:border-white/10 md:hover:bg-[#0a0a0a]"
        }
      `}
    >
      {/* Active background sheen */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent transition-opacity duration-700 pointer-events-none ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* HEADER */}
      <div className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10 md:py-8 border-b border-white/5 h-24 shrink-0">
        <div className="flex items-center gap-5 md:gap-10">
          {/* Number */}
          <div className="relative">
            <span
              className={`text-3xl md:text-6xl font-['Space_Grotesk'] font-bold transition-all duration-500 block ${
                isActive
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-600 scale-110"
                  : "text-transparent [-webkit-text-stroke:1px_rgba(100,116,139,0.5)] group-hover:[-webkit-text-stroke:1px_rgba(148,163,184,0.8)]"
              }`}
            >
              0{id}
            </span>
            {isActive && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 md:w-8 h-1 bg-amber-500 rounded-full blur-[4px] animate-pulse" />
            )}
          </div>

          {/* Titles */}
          <div className="flex flex-col justify-center">
            <h3
              className={`text-lg md:text-3xl font-['Syne'] font-bold uppercase tracking-wide transition-all duration-500 ${
                isActive ? "text-white translate-x-2" : "text-slate-500 group-hover:text-slate-300"
              }`}
            >
              {title}
            </h3>

            {/* Subtitle */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isActive ? "max-h-8 opacity-100 mt-1 md:mt-2" : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 md:w-6 h-[1px] bg-amber-500"></div>
                <span className="text-[10px] md:text-xs text-amber-500 font-bold tracking-[0.2em] uppercase">
                  {subtitle}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Button - Rotate Animation */}
        <div
          className={`w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-500 relative overflow-hidden shrink-0 ${
            isActive
              ? "border-amber-500 text-black rotate-180 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              : "border-white/10 text-slate-600 bg-white/5 group-hover:border-white/30 group-hover:text-white"
          }`}
        >
          {isActive && <div className="absolute inset-0 bg-amber-500" />}
          <div className="relative z-10">
            {isActive ? <Minus size={16} strokeWidth={3} className="md:w-5 md:h-5" /> : <Plus size={16} className="md:w-5 md:h-5" />}
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div 
        className={`
           w-full z-10 overflow-hidden transition-all duration-700 ease-in-out
           ${isActive ? "opacity-100" : "opacity-0"}
           relative md:absolute md:inset-0 md:top-32
        `}
      >
        <div
          className={`
            flex flex-col md:flex-row w-full h-full
            ${isActive ? "translate-y-0" : "translate-y-4 md:translate-y-8"}
            transition-transform duration-700 delay-100
          `}
        >
          {/* LEFT CONTENT */}
          <div className="flex-1 p-6 md:p-12 flex flex-col justify-start md:justify-center relative bg-gradient-to-r from-transparent to-black/20">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden md:block opacity-50" />

            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="p-2 md:p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <Icon size={20} className="md:w-6 md:h-6" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest border-l border-slate-700 pl-3 ml-1">
                Core Feature
              </span>
            </div>

            <p className="text-slate-300 text-sm md:text-xl leading-relaxed max-w-xl font-light">
              {desc}
            </p>

            <div className="mt-8 md:mt-14 pb-4 md:pb-0">
              <button className="group/btn relative inline-flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors pl-4">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-700 rounded-full group-hover/btn:bg-amber-500 transition-colors"></span>
                Explore Capability
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300 text-amber-500" />
              </button>
            </div>
          </div>

          {/* RIGHT GRAPHIC PANEL */}
          <div className="h-96 md:h-auto md:flex-1 bg-black/40 border-t md:border-t-0 md:border-l border-white/5 relative overflow-hidden backdrop-blur-sm shrink-0">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 flex  items-center justify-center p-8">
              <Graphic />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalAccordionItem;
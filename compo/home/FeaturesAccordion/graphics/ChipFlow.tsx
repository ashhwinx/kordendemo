import React from "react";
import { Cpu, Zap } from "lucide-react";

const ChipFlow: React.FC = () => {
  return (
    // Added 'group' to outer div for hover effects
    <div className="relative w-full h-full flex items-center justify-center bg-[#030303] overflow-hidden group">

      {/* --- LAYER 1: Background Circuitry Matrix --- */}
      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
        {/* Dots */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(#7E22CE 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        />
        {/* Subtle Traces overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(126,34,206,0.05)_10px,rgba(126,34,206,0.05)_11px)]" />
      </div>


      {/* --- LAYER 2: The Data Bus (Streaming behind the CPU) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Horizontal Primary Stream (Amber - Fast) */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 bg-purple-500/20">
            {/* The bright data packet head */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-32 h-[4px] bg-gradient-to-r from-transparent via-amber-500 to-white blur-[2px] animate-[shimmer_2s_linear_infinite]" />
           {/* The trailing tail */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-64 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-amber-300 animate-[shimmer_2s_linear_infinite] delay-75" />
        </div>

        {/* Horizontal Secondary Stream (Purple - Slower, offset) */}
        <div className="absolute top-[35%] left-0 w-full h-[1px] bg-purple-500/10">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-40 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-purple-200 blur-[1px] animate-[shimmer_4s_linear_infinite_reverse]" />
        </div>

        {/* Vertical Primary Stream (Amber/Purple Mix) */}
        <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-purple-500/20">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-40 w-[3px] bg-gradient-to-b from-transparent via-amber-500 to-white blur-[2px] animate-[shimmer_3s_linear_infinite]" />
        </div>
        
         {/* Vertical Secondary Stream (Offset) */}
         <div className="absolute left-[65%] top-0 h-full w-[1px] bg-purple-500/10">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-32 w-[2px] bg-gradient-to-b from-transparent via-purple-400 to-purple-100 blur-[1px] animate-[shimmer_5s_linear_infinite]" />
        </div>
      </div>


      {/* --- LAYER 3: The Central CPU Frame (The Hero) --- */}
      <div className="relative z-10 w-56 h-56 bg-[#0a0a0a]/90 backdrop-blur-md border border-purple-500/40 flex items-center justify-center shadow-[0_0_80px_rgba(147,51,234,0.3)] rounded-3xl overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-amber-500/50 group-hover:shadow-[0_0_100px_rgba(245,158,11,0.3)]">

        {/* Internal Glowing Ring & Micro-traces */}
        <div className="absolute inset-0 z-0">
           {/* Subtle internal grid */}
          <div className="absolute inset-4 border border-purple-500/20 rounded-2xl bg-[repeating-linear-gradient(90deg,transparent,transparent_5px,rgba(147,51,234,0.05)_5px,rgba(147,51,234,0.05)_6px)]" />
          {/* Pulsing energy ring */}
          <div className="absolute inset-6 border-2 border-purple-500/30 rounded-xl animate-[pulse_4s_ease-in-out_infinite] group-hover:border-amber-500/40" />
          
          {/* Central Intersection Flash */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_20px_white] animate-ping" />
        </div>

        {/* The CPU Icon */}
        <div className="relative z-20 animate-[pulse_8s_ease-in-out_infinite] group-hover:animate-none">
            <Cpu className="w-24 h-24 text-slate-200 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(245,158,11,0.8)] transition-all duration-500" strokeWidth={1} />
            {/* Small energy icon overlap */}
            <Zap className="absolute -bottom-2 -right-2 w-8 h-8 text-amber-500 fill-amber-500/20 animate-bounce duration-[2000ms]" strokeWidth={1.5} />
        </div>

        {/* High-Tech Corners */}
        {/* Top Left (Amber Power) */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-500 shadow-[0_0_15px_#F59E0B] rounded-tl-lg" />
        {/* Bottom Right (Amber Power) */}
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-500 shadow-[0_0_15px_#F59E0B] rounded-br-lg" />

        {/* Passive Purple Corners */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500/60 rounded-tr-md" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500/60 rounded-bl-md" />
      </div>
      
    </div>
  );
};

export default ChipFlow;
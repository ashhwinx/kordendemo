import React from "react";
import { Shield, Fingerprint, ScanLine, CheckCircle2 } from "lucide-react";

const ScannerGrid: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-[#020202] group border border-white/5 rounded-3xl">
      
      {/* --- BACKGROUND EFFECTS --- */}
      
      {/* 1. 3D Moving Perspective Grid (The "Floor") */}
      <div className="absolute inset-0 perspective-[500px]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [transform:rotateX(60deg)_scale(2)] origin-bottom animate-[gridMove_20s_linear_infinite] opacity-20" />
      </div>

      {/* 2. Vignette (Darkens edges to focus attention) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_90%)]" />


      {/* --- THE SCANNER BEAM --- */}
      {/* Moves Top to Bottom */}
      <div className="absolute top-0 left-0 w-full z-10 animate-[scan_4s_ease-in-out_infinite]">
        {/* The glowing laser line */}
        <div className="h-[2px] bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)] w-full" />
        {/* The trailing fade */}
        <div className="h-32 bg-gradient-to-b from-emerald-500/20 to-transparent w-full" />
      </div>


      {/* --- CENTER HOLOGRAM --- */}
      <div className="relative z-20 flex flex-col items-center gap-6 group-hover:scale-105 transition-transform duration-500">
        
        {/* The Shield Container */}
        <div className="relative w-32 h-32 flex items-center justify-center">
            
            {/* Outer Spinning Tech Ring */}
            <div className="absolute inset-[-10px] rounded-full border border-dashed border-emerald-500/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-[-10px] rounded-full border-t border-r border-transparent border-emerald-500/60 animate-[spin_5s_linear_infinite]" />

            {/* Shield Icon Layers (Ghosting Effect) */}
            <Shield className="absolute w-full h-full text-emerald-900/20" strokeWidth={1} />
            <Shield className="absolute w-full h-full text-emerald-500/50 blur-sm animate-pulse" strokeWidth={1} />
            <Shield className="relative w-full h-full text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" strokeWidth={1.5} />

            {/* Inner Biometric Animation */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden [mask-image:url('data:image/svg+xml;base64,...')]"> {/* Using mask conceptually, simpler implementation below */}
                <div className="relative overflow-hidden w-12 h-16 flex items-center justify-center">
                   <Fingerprint className="w-12 h-12 text-emerald-200 opacity-80" strokeWidth={1.5} />
                   {/* Fingerprint Scan Line */}
                   <div className="absolute top-0 w-full h-[2px] bg-amber-400 shadow-[0_0_10px_#fbbf24] animate-[scanFast_2s_linear_infinite]" />
                </div>
            </div>

            {/* Floating Status Icons */}
            <div className="absolute -top-4 -right-4 bg-black/80 border border-emerald-500/30 p-1.5 rounded-lg shadow-lg animate-bounce duration-[2000ms]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
        </div>

        {/* --- HUD TEXT DISPLAY --- */}
        <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-500/20 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                    Biometric Verified
                </span>
            </div>
            
            {/* Decrypting Text Effect */}
            <div className="flex gap-4 opacity-50">
                 <span className="text-[8px] font-mono text-emerald-600">ID: 982-AX-09</span>
                 <span className="text-[8px] font-mono text-emerald-600">SEC: Lvl-5</span>
            </div>
        </div>
      </div>

      {/* --- CORNER HUD DECORATIONS --- */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald-500/30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-emerald-500/30 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald-500/30 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-500/30 rounded-br-lg" />

    </div>
  );
};

export default ScannerGrid;
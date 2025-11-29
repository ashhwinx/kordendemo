import React from "react";
import { ArrowUpRight } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
}

interface Props {
  service: Service;
  index: number;
  active: number;
  onClick: () => void;
  progressRef: (el: HTMLDivElement | null) => void;
}

const ServiceCard: React.FC<Props> = ({ service, index, active, onClick, progressRef }) => {
  const isActive = active === index;

  return (
    <div
      onClick={onClick}
      className={`
        p-4 lg:p-6 rounded-2xl cursor-pointer transition-all duration-500 border 
        relative overflow-hidden group shrink-0
        ${
          isActive
            ? "bg-white/5 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.1)] translate-x-2"
            : "bg-transparent border-white/5 hover:bg-white/5 hover:border-white/10"
        }
      `}
    >
      {/* Progress Bar */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-purple-600 z-20 transition-opacity duration-300"
        style={{ width: "0%", opacity: 0 }}
      />

      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex items-center justify-between relative z-10">
        <h3
          className={`
            text-lg lg:text-xl font-bold font-['Space_Grotesk'] transition-colors
            ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}
          `}
        >
          {service.title}
        </h3>

        {isActive && <ArrowUpRight className="w-5 h-5 text-amber-500" />}
      </div>

      <p
        className={`
          text-xs lg:text-sm mt-2 line-clamp-2 transition-colors duration-300 
          ${isActive ? "text-slate-300" : "text-slate-600"}
        `}
      >
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;

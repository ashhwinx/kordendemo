import React from "react";
import { Globe, Layers, Factory, Search } from "lucide-react";
import { SERVICES } from "../../../constants";

interface Props {
  active: number;
}

const icons = [Globe, Layers, Factory, Search];

const ServiceDisplay: React.FC<Props> = ({ active }) => {
  return (
    <>
      {SERVICES.slice(0, 4).map((service, index) => {
        const Icon = icons[index % icons.length];

        return (
          <div
            key={service.id}
            className={`
              absolute inset-0 transition-all duration-700 ease-in-out 
              ${active === index ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"}
            `}
          >
            {/* Image + Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

            <img
              src={`https://picsum.photos/1000/800?random=${index + 100}`}
              alt={service.title}
              className="w-full h-full object-cover filter saturate-[0.8] contrast-[1.1]"
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 z-20">
              <div className="flex items-center gap-4 mb-4 lg:mb-6">
                <div className="inline-block px-3 py-1 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] lg:text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                  Service Module 0{index + 1}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 font-['Syne'] leading-tight drop-shadow-lg">
                {service.title}
              </h2>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                <p className="text-base lg:text-lg text-slate-300 max-w-xl leading-relaxed drop-shadow-md">
                  {service.description} Korden Technologies ensures top-tier 
                  quality control and seamless integration for your supply chain needs.
                </p>

                <div className="flex-shrink-0">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg flex items-center justify-center text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                    <Icon size={32} strokeWidth={1.5} className="lg:w-10 lg:h-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ServiceDisplay;

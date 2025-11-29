import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Code2,
  Scan
} from 'lucide-react';

// --- DATA ---
const SERVICES = [
  {
    id: 1,
    title: "Global Sourcing",
    description: "We navigate the chaos of global supply chains. Access verified stockpiles across Asia and Europe, delivering obsolete and hard-to-find components.",
    icon: "Globe",
    image: "https://images.unsplash.com/photo-1614064641938-3e8212d07141?q=80&w=2070&auto=format&fit=crop", 
    tags: ["LOGISTICS", "ASIA_EU", "NETWORK"]
  },
  {
    id: 2,
    title: "PCB Fabrication",
    description: "From rapid prototyping to mass production. IPC Class 2 & 3 standards ensuring every board is engineered for absolute reliability under extreme conditions.",
    icon: "Cpu",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1994&auto=format&fit=crop", 
    tags: ["IPC_CLASS_3", "SMT", "ASSEMBLY"]
  },
  {
    id: 3,
    title: "QA Laboratory",
    description: "Trust is good, verification is non-negotiable. Our in-house lab performs X-ray inspection and heated chemical testing to ensure 100% authenticity.",
    icon: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080&auto=format&fit=crop", 
    tags: ["X-RAY", "TESTING", "ISO_9001"]
  },
  {
    id: 4,
    title: "Rapid Prototyping",
    description: "Speed is the currency of the future. 72-hour turnaround for critical component kits and initial board layouts to help you beat the competition.",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", 
    tags: ["FAST_TRACK", "R&D", "SPRINT"]
  }
];

// --- SCROLL HOOK ---
const useInView = (options = { threshold: 0.2 }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);
  return [ref, isInView];
};

const IconMap = { Globe, Cpu, ShieldCheck, Zap };

const ServiceRow = ({ service, index }) => {
  const isEven = index % 2 === 0;
  const [ref, isInView] = useInView({ threshold: 0.2 });
  
  // @ts-ignore
  const Icon = IconMap[service.icon] || Code2;

  return (
    // --- PARENT DIV (Glass Card Blueprint) ---
    <div 
      ref={ref}
      className={`group relative p-6 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-700 hover:border-purple-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.2)] ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
      }`}
    >
      
      {/* --- CORNER MARKERS --- */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-2xl transition-colors duration-500 group-hover:border-purple-500"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-2xl transition-colors duration-500 group-hover:border-purple-500"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-2xl transition-colors duration-500 group-hover:border-purple-500"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-2xl transition-colors duration-500 group-hover:border-purple-500"></div>

      {/* --- INNER LAYOUT --- */}
      <div className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        
        {/* TEXT SIDE */}
        <div className="flex-1 relative z-10">
          <div className="mb-6 flex items-center gap-4">
             <span className="font-mono text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded">0{index + 1}</span>
             <div className="h-[1px] w-12 bg-white/10 group-hover:bg-purple-500/50 transition-colors"></div>
             <Icon size={20} className="text-slate-400 group-hover:text-white transition-colors" />
          </div>

          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all">
            {service.title}
          </h3>
          
          <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, i) => (
              <span key={i} className="text-[10px] font-mono uppercase tracking-wider border border-white/10 px-3 py-1 rounded-full text-slate-500 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* IMAGE SIDE */}
        <div className="flex-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 group-hover:border-white/20 transition-all shadow-2xl">
            {/* IMAGE CHANGES:
               1. Removed 'grayscale' class
               2. Kept 'group-hover:scale-105' for zoom
            */}
            <img 
              src={service.image} 
              alt={service.title} 
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Overlay Gradient (for subtle depth, kept transparency high) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Scan Icon Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 pointer-events-none">
               <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <ArrowRight className="text-white -rotate-45" />
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#020205] text-slate-200 selection:bg-purple-500 selection:text-white overflow-hidden">
      
      {/* Background Noise & Glows */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="fixed top-0 left-0 w-full h-[500px] bg-purple-900/10 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-32">
        
        {/* Header */}
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6 backdrop-blur-sm">
            <Scan size={14} className="text-purple-400" />
            <span className="font-mono text-xs text-purple-200 tracking-widest">
              SYSTEM_CAPABILITIES
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Services</span>
          </h2>
        </div>

        {/* List of Services */}
        <div className="flex flex-col gap-12">
          {SERVICES.map((service, index) => (
            <ServiceRow key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
             <Link to="/contact">
               <button className="relative px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-purple-500/20">
                 Get a Quote
               </button>
             </Link>
        </div>

      </div>
    </div>
  );
};

export default Services;
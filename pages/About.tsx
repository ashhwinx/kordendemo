import React, { useEffect, useRef, useState } from 'react';
import { Target, TrendingUp, Users, ArrowRight, Zap, Globe, ShieldCheck, MapPin, Cpu, Star, LayoutGrid } from 'lucide-react';

// Mock Data
const COMPANY_INFO = {
  founded: "2018",
  location: "Andheri East, Mumbai",
  email: "contact@korden.tech"
};

// --- Custom Hooks ---

const useOnScreen = (options = { threshold: 0.1, rootMargin: "0px" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, isVisible];
};

// --- Components ---

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useOnScreen();
  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ease-out transform ${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Updated Cosmic Card Component
// - Fixed content cutting issue (using flex-col and min-height)
// - Enhanced hover animations (border glow, scale, and gradient shift)
const CosmicCard = ({ children, title, subtitle, className = "", glowColor = "purple" }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    setRotate({ x: x * 2, y: y * -2 }); // Reduced tilt for better readability
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 });
  };

  const gradientColor = glowColor === "amber" ? "from-amber-500/20" : "from-purple-900/40";
  const borderColor = glowColor === "amber" ? "group-hover:border-amber-500/50" : "group-hover:border-purple-500/50";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full w-full group perspective-1000 ${className}`}
    >
      <div 
        className={`relative h-full w-full rounded-[2rem] overflow-hidden bg-[#0a0a0f] border border-white/5 transition-all duration-500 ease-out shadow-2xl flex flex-col ${borderColor}`}
        style={{
          transform: isHovering 
            ? `rotateY(${rotate.x}deg) rotateX(${rotate.y}deg) scale(1.02)`
            : `rotateY(0deg) rotateX(0deg) scale(1)`,
        }}
      >
        {/* Card Background */}
        <div className="absolute inset-0 bg-[#05050a]"></div>

        {/* Dynamic Glow Gradient */}
        <div className={`absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t ${gradientColor} via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500`}></div>
        
        {/* Top Highlight Gradient */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Wireframe Pattern */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
             <path d="M0,50 Q150,0 300,50 T600,50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
             <line x1="10%" y1="0" x2="10%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
             <line x1="90%" y1="0" x2="90%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className={`absolute bottom-12 left-8 w-1.5 h-1.5 rounded-full animate-pulse delay-700 ${glowColor === 'amber' ? 'bg-amber-400' : 'bg-purple-400'}`}></div>

        {/* Content Container - Flex column to push content properly */}
        <div className="relative z-20 p-8 flex flex-col h-full">
          {children}
          
          <div className="mt-auto pt-6">
            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
              {title}
            </h3>
            {subtitle && (
              <div className="text-slate-400 text-sm font-light leading-relaxed border-t border-white/10 pt-4 group-hover:text-slate-200 transition-colors">
                {subtitle}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Layout ---

const About = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#020205] overflow-hidden text-slate-200 selection:bg-purple-500 selection:text-white">
      
      {/* 1. Purple Halo Background */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[140%] aspect-square rounded-full bg-gradient-to-b from-purple-600/20 via-purple-900/10 to-transparent blur-[120px] opacity-60 pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-32 pb-32">
        
        {/* --- Hero Section --- */}
        <FadeIn>
          <div className="text-center max-w-4xl mx-auto mb-28">
            <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 font-medium text-sm tracking-[0.2em] uppercase mb-6 animate-pulse">
              The Engine of Innovation
            </h4>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-8 drop-shadow-2xl">
              We aren't just distributing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
                we are architecting.
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Architecting the supply chain for India's technological renaissance. From <span className="text-white font-medium">Mumbai</span> to the world.
            </p>
          </div>
        </FadeIn>

        {/* --- Story Section: "Beyond Distribution" --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <FadeIn delay={200}>
            <div className="space-y-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="h-[1px] w-12 bg-purple-500"></div>
                 <span className="text-purple-400 uppercase tracking-widest text-xs font-bold">Beyond Distribution</span>
               </div>
               
               <h2 className="text-4xl font-bold text-white leading-tight">
                 Innovation stalls when <br /> 
                 <span className="italic text-slate-500">supply chains fail.</span>
               </h2>
               
               <p className="text-slate-400 leading-relaxed font-light">
                 Founded in {COMPANY_INFO.founded}, Korden Technologies emerged from this simple observation. We bridge the gap between global semiconductor giants and Indian manufacturers.
               </p>
               
               <p className="text-slate-400 leading-relaxed font-light">
                 Whether you are a startup prototyping your first IoT device or an industrial titan scaling production, we ensure your assembly lines never stop.
               </p>

               <div className="flex gap-6 pt-4">
                  <div className="flex items-center gap-3 group">
                    <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-colors">
                      <Cpu className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Authentic Parts</p>
                      <p className="text-slate-500 text-xs">100% Verified Sourcing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-amber-500/50 transition-colors">
                      <Globe className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Global Network</p>
                      <p className="text-slate-500 text-xs">Asian Market Access</p>
                    </div>
                  </div>
               </div>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
             {/* Updated Image Component for Headquarters */}
             <div className="relative h-[400px] w-full rounded-[2rem] overflow-hidden border border-white/10 group shadow-2xl">
                {/* Real Image of Mumbai/Tech City */}
                <div className="absolute inset-0 bg-slate-900">
                  <img 
                    src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1935&auto=format&fit=crop" 
                    alt="Mumbai Skyline Architecture" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent"></div>
                </div>
                
                {/* Glowing Overlay Effects */}
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>

                {/* Floating Location Marker */}
                <div className="absolute top-8 right-8">
                   <div className="relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e] animate-pulse z-20 relative"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                   </div>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center justify-between group-hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-xs text-amber-400 uppercase tracking-widest mb-1 font-semibold">Headquarters</p>
                    <div className="flex items-center gap-2 text-white font-bold text-lg">
                      <MapPin className="w-5 h-5 text-purple-500 fill-purple-500/20" />
                      {COMPANY_INFO.location}
                    </div>
                  </div>
                  
                </div>
             </div>
          </FadeIn>
        </div>

        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-4">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-medium text-slate-300 uppercase tracking-widest">Our Core Pillars</span>
           </div>
        </div>

        {/* --- Bento Grid Section (Fixed Heights & Content) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 auto-rows-[minmax(300px,auto)]">
          
          {/* 1. Mission (Wide) */}
          <div className="col-span-1 md:col-span-2">
            <FadeIn delay={200} className="h-full">
              <CosmicCard title="Our Mission" glowColor="amber">
                <div className="mb-6 w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-amber-400" />
                </div>
                <p className="text-slate-300 text-lg font-light leading-relaxed max-w-lg mb-4">
                  To accelerate electronic hardware development in India by eliminating friction in component procurement.
                </p>
                <div className="mt-auto flex items-center text-amber-400 text-sm font-medium cursor-pointer group/link">
                  See our process <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </CosmicCard>
            </FadeIn>
          </div>

          {/* 2. Vision (Tall) */}
          <div className="col-span-1 md:row-span-2">
            <FadeIn delay={300} className="h-full">
              <CosmicCard title="Vision 2030">
                 <div className="mb-6 w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                   <TrendingUp className="w-6 h-6 text-purple-400" />
                 </div>
                 <p className="text-slate-400 text-sm font-light mb-8">
                   Becoming the most trusted digitally-integrated supply chain partner in the Asian ecosystem.
                 </p>
                 
                 {/* Growth Visualization */}
                 <div className="mt-auto w-full p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-end gap-2 h-32 mb-2 w-full justify-between px-2">
                      <div className="w-1/5 bg-purple-900/40 rounded-t h-[30%]"></div>
                      <div className="w-1/5 bg-purple-800/40 rounded-t h-[50%]"></div>
                      <div className="w-1/5 bg-purple-600/60 rounded-t h-[70%]"></div>
                      <div className="w-1/5 bg-gradient-to-t from-purple-500 to-amber-500 rounded-t h-[100%] shadow-[0_0_15px_rgba(168,85,247,0.4)] relative group-hover:h-[105%] transition-all duration-500">
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white bg-purple-600 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">Goal</div>
                      </div>
                    </div>
                    <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest mt-2">Growth Trajectory</p>
                 </div>
              </CosmicCard>
            </FadeIn>
          </div>

          {/* 3. Expert Team (Small) */}
          <div className="col-span-1">
             <FadeIn delay={400} className="h-full">
                <CosmicCard title="Expert Team" className="min-h-[280px]">
                   <div className="mb-4 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                     <Users className="w-5 h-5 text-blue-400" />
                   </div>
                   <p className="text-slate-400 text-sm font-light">
                     Engineers & logistics pros working 24/7 to solve your procurement challenges.
                   </p>
                </CosmicCard>
             </FadeIn>
          </div>

          {/* 4. Agile Logistics (Small) */}
          <div className="col-span-1">
             <FadeIn delay={500} className="h-full">
                <CosmicCard title="Agile Logistics" className="min-h-[280px]" glowColor="amber">
                   <div className="mb-4 w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                     <Zap className="w-5 h-5 text-pink-400" />
                   </div>
                   <p className="text-slate-400 text-sm font-light">
                     Custom bonded warehousing networks and express delivery.
                   </p>
                </CosmicCard>
             </FadeIn>
          </div>
        </div>

        {/* --- Stats Section --- */}
        <FadeIn delay={600}>
          <div className="border-t border-white/5 pt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
               {[
                  { label: "Components Shipped", value: "5M+" },
                  { label: "Happy Clients", value: "500+" },
                  { label: "Global Partners", value: "12" },
                  { label: "Support Active", value: "24/7" }
                ].map((stat, i) => (
                  <div key={i} className="text-center group cursor-default">
                    <p className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-2 group-hover:text-purple-400 transition-colors">{stat.label}</p>
                    <h4 className="text-4xl font-bold text-white tracking-tight group-hover:scale-110 transition-transform duration-300">{stat.value}</h4>
                  </div>
                ))}
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
};



export default About;
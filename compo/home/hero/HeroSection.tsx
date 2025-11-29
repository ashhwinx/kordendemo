import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SpotlightHeroText from "./SpotlightHeroText";
import HeroBackground from "./HeroBackground";
import { Button } from "../../../components/UI";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.gsap) return;

    const tl = window.gsap.timeline();

    // Badge
    window.gsap.fromTo(
      badgeRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    // Hero animations
    tl.fromTo(
      heroRef.current?.querySelector("h1"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        heroRef.current?.querySelector("p"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        heroRef.current?.querySelector(".hero-btns"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );
  }, []);

  return (
    <section className="min-h-screen flex items-center relative pt-24 px-4 overflow-hidden">
      <HeroBackground />

      <div ref={heroRef} className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm 
            border border-slate-700 text-slate-300 text-xs md:text-sm font-medium mb-4 cursor-pointer 
            hover:bg-slate-800 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 
            hover:scale-105 shadow-sm hover:shadow-purple-500/20"
        >
          <span className="relative flex h-2 w-2">  
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          ISO Certified • Global Sourcing Partner
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-8 text-white tracking-tighter">
          <SpotlightHeroText>
            <span className="block">Powering the</span>
            <span className="block">Next Generation</span>
          </SpotlightHeroText>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-slate-400 text-base md:text-lg lg:text-xl mb-10 max-w-2xl mx-auto leading-relaxed px-4">
          Delivering the advanced electronic components that drive modern industry. Your strategic partner for
          semiconductors, sensors, and next-gen supply chain solutions.
        </p>

        {/* Buttons */}
        <div className="hero-btns flex flex-wrap gap-4 justify-center">
          <Link to="/products">
            <Button variant="primary" icon>
              Explore Products
            </Button>
          </Link>

          <Link to="/contact">
            <Button variant="secondary">Contact Sales</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

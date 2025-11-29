import React, { useEffect, useRef, useState } from "react";
// import SectionTitle from "../../../components/UI/SectionTitle";
import { SERVICES } from "../../../constants";
import { SectionTitle } from "@/components/UI";

import ServiceCard from "./ServiceCard";
import ServiceDisplay from "./ServiceDisplay";

const TOTAL_ITEMS = 4;

const ServicesScrollSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Scroll Trigger Logic
  useEffect(() => {
    if (!scrollRef.current || !window.ScrollTrigger) return;

    window.ScrollTrigger.create({
      trigger: scrollRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self: any) => {
        const raw = self.progress * TOTAL_ITEMS;
        const index = Math.min(Math.floor(raw), TOTAL_ITEMS - 1);

        setActive((prev) => (prev !== index ? index : prev));

        // update progress bars
        progressRefs.current.forEach((bar, i) => {
          if (!bar) return;

          if (i === index) {
            const localProgress = raw - Math.floor(raw);
            bar.style.width = `${Math.max(0, Math.min(1, localProgress)) * 100}%`;
            bar.style.opacity = "1";
          } else if (i < index) {
            bar.style.width = "100%";
            bar.style.opacity = "0";
          } else {
            bar.style.width = "0%";
            bar.style.opacity = "0";
          }
        });
      }
    });
  }, []);

  const scrollToItem = (i: number) => {
    if (!scrollRef.current) return;

    const rect = scrollRef.current.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const sectionHeight = scrollRef.current.offsetHeight;
    const viewHeight = window.innerHeight;

    const start = top;
    const end = top + sectionHeight - viewHeight;

    window.scrollTo({
      top: start + (end - start) * ((i + 0.1) / TOTAL_ITEMS),
      behavior: "smooth"
    });
  };

  return (
    <section ref={scrollRef} className="relative h-[400vh] bg-[#050505]">

      {/* Rotating Rings */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full opacity-20 animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full opacity-20 animate-[spin_40s_linear_infinite_reverse]" />

        <div className="max-w-7xl mx-auto w-full px-4 relative z-10 h-[80vh] flex flex-col justify-center">
          <SectionTitle title="Comprehensive Solutions" subtitle="Services" />

          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 mt-8 h-[550px]">

            {/* LEFT PANEL — SERVICE CARDS */}
            <div className="md:w-1/3 flex flex-col gap-3 lg:gap-4 overflow-y-auto md:overflow-visible">
              {SERVICES.slice(0, 4).map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  active={active}
                  onClick={() => scrollToItem(index)}
                  progressRef={(el) => (progressRefs.current[index] = el)}
                />
              ))}

              <div className="mt-auto pt-4 hidden md:block">
                <a href="/services" className="block">
                  <button className="w-full border border-white/10 rounded-xl py-3 text-xs lg:text-sm text-white hover:border-amber-500 transition">
                    View All Services
                  </button>
                </a>
              </div>
            </div>

            {/* RIGHT PANEL — DISPLAY */}
            <div className="md:w-2/3 relative rounded-3xl overflow-hidden border border-white/10 bg-[#020202] shadow-2xl h-full hidden md:block">
              <ServiceDisplay active={active} />
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default ServicesScrollSection;

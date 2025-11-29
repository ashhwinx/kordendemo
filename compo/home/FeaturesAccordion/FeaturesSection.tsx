import React, { useState } from "react";
// import SectionTitle from "../../../components/UI/SectionTitle";
import { SectionTitle } from "@/components/UI";

import VerticalAccordionItem from "./VerticalAccordionItem";

import GlobePulse from "./graphics/GlobePulse";
import ScannerGrid from "./graphics/ScannerGrid";
import ChipFlow from "./graphics/ChipFlow";

import { Globe, ShieldCheck, Cpu } from "lucide-react";

const FeaturesSection: React.FC = () => {
  const [active, setActive] = useState<number>(1); // default open first one

  return (
    <section className="py-24 md:py-32 bg-[#020202] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-purple-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <SectionTitle title="The Korden Advantage" subtitle="Why Choose Us" />

        <div
          className="mt-16 flex flex-col gap-4 h-[850px] md:h-[700px]"
          onMouseLeave={() => setActive(0)}
        >
          <VerticalAccordionItem
            id={1}
            title="Global Network"
            subtitle="Borderless Sourcing"
            desc="Access a vast, resilient network of tier-1 manufacturers across Asia and Europe. We eliminate regional bottlenecks and ensure continuous supply even in volatile markets."
            icon={Globe}
            Graphic={GlobePulse}
            isActive={active === 1}
            onActivate={setActive}
          />

          <VerticalAccordionItem
            id={2}
            title="Quality Assured"
            subtitle="Zero Compromise"
            desc="Rigorous anti-counterfeit testing in our certified labs guarantees 100% authenticity. From microscopic inspection to functional testing, we verify everything."
            icon={ShieldCheck}
            Graphic={ScannerGrid}
            isActive={active === 2}
            onActivate={setActive}
          />

          <VerticalAccordionItem
            id={3}
            title="Tech Expertise"
            subtitle="Engineering First"
            desc="Our engineers assist with design-in integration, optimizing your BOM costs. We don’t just supply parts; we help you build better products."
            icon={Cpu}
            Graphic={ChipFlow}
            isActive={active === 3}
            onActivate={setActive}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

import React from "react";

// Importing all home components from /src/compo/home/index.ts
import {
  HeroSection,
  FeaturesSection,
  ServicesScrollSection,
} from "../compo/home";

const Home: React.FC = () => {
  return (
    <div className="w-full">

      {/* HERO */}
      <HeroSection />

      {/* FEATURES ACCORDION */}
      <FeaturesSection />

      {/* SERVICES SCROLL SECTION */}
      <ServicesScrollSection />

    </div>
  );
};

export default Home;

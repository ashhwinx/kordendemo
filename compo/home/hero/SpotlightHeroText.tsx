import React, { useRef } from "react";

interface SpotlightHeroTextProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightHeroText: React.FC<SpotlightHeroTextProps> = ({ children, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !overlayRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const size = 150;
    const maskStyle = `radial-gradient(circle ${size}px at ${x}px ${y}px, transparent 10%, black 70%)`;

    overlayRef.current.style.webkitMaskImage = maskStyle;
    overlayRef.current.style.maskImage = maskStyle;
  };

  const handleMouseLeave = () => {
    if (!overlayRef.current) return;

    const defaultMask = "linear-gradient(to right, black, black)";
    overlayRef.current.style.webkitMaskImage = defaultMask;
    overlayRef.current.style.maskImage = defaultMask;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block cursor-default select-none ${className}`}
    >
      {/* Outline Layer (hollow) */}
      <div className="absolute inset-0 z-0 text-transparent [-webkit-text-stroke:2px_#F59E0B] font-extrabold tracking-tighter font-['Syne']">
        {children}
      </div>

      {/* Filled Layer (hidden by spotlight) */}
      <div
        ref={overlayRef}
        className="relative z-10 text-white transition-all duration-300 ease-out font-extrabold tracking-tighter font-['Syne']"
        style={{
          WebkitMaskImage: "linear-gradient(to right, black, black)",
          maskImage: "linear-gradient(to right, black, black)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SpotlightHeroText;

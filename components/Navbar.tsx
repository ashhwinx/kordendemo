import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, CircuitBoard, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (isOpen) {
        setIsVisible(true);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isOpen]);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isVisible ? 'translate-y-0' : '-translate-y-[200%]'
      }`}
    >
      <nav
        className={`
          relative transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
          ${isOpen ? 'w-full max-w-sm rounded-[2rem] bg-[#030303]/90' : 'w-full max-w-5xl rounded-full bg-[#030303]/50'}
          backdrop-blur-xl border border-white/5
          shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)] 
        `}
      >
        {/* Subtle Gradient Line */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-500 pointer-events-none ${isVisible && !isOpen ? 'opacity-100' : 'opacity-0'}`}>
           <div className="absolute inset-x-0 -top-px h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="flex justify-between items-center px-6 py-3 relative z-10">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-20">
            <div className="relative">
              <CircuitBoard className="w-6 h-6 text-white group-hover:text-amber-500 transition-colors duration-300" />
              <div className="absolute inset-0 bg-amber-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <span className="text-lg font-bold text-white font-['Space_Grotesk'] tracking-wider group-hover:tracking-widest transition-all duration-300">
              KORDEN
            </span>
          </Link>

          {/* Desktop Nav - MAIN LOGIC HERE */}
          <div className={`hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 text-sm font-medium transition-all group overflow-hidden"
              >
                {({ isActive }) => (
                  <>
                    {/* 1. Normal Text (Sans) */}
                    {/* Logic: Agar Active hai YA Hover kiya, toh ye upar chala jayega (Hide ho jayega) */}
                    <span className={`
                      block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] text-zinc-400
                      ${isActive ? '-translate-y-[150%]' : 'group-hover:-translate-y-[150%]'}
                    `}>
                      {link.label}
                    </span>
                    
                    {/* 2. Fancy Text (Serif) */}
                    {/* Logic: Agar Active hai YA Hover kiya, toh ye samne aa jayega (Show ho jayega) */}
                    <span className={`
                      absolute top-0 left-0 w-full h-full flex items-center justify-center 
                      transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] 
                      font-serif italic tracking-wide
                      ${isActive 
                        ? 'translate-y-0 text-amber-500' // Active: Visible & Amber Color
                        : 'translate-y-[150%] group-hover:translate-y-0 text-white' // Inactive: Hidden -> White on Hover
                      }
                    `}>
                      {link.label}
                    </span>

                    {/* Active Dot (Optional - rakhna hai toh rakho, warna hata sakte ho) */}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 z-20">
            <Link 
              to="/contact"
              className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black border border-white/5 text-white text-sm font-semibold transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
            >
              Let's Talk
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-zinc-300 hover:text-white transition-colors p-1"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="flex flex-col p-6 gap-2 pt-2 border-t border-white/5">
            {NAV_LINKS.map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={({ isActive }) =>
                  `text-xl p-3 rounded-xl transition-all flex justify-between items-center group ${
                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  } ${isActive ? 'bg-amber-500/10 text-amber-500 font-serif italic' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`
                }
              >
                {link.label}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </NavLink>
            ))}
             <Link to="/contact" className="mt-4 w-full py-4 bg-amber-500 text-black flex justify-center items-center gap-2 rounded-xl font-bold hover:bg-amber-400 transition-colors">
                Get Quote
             </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
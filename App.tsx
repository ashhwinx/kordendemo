import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Footer } from './components/Layout';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import FuturisticBackground from './components/FuturisticBackground';
// import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="relative min-h-screen text-slate-100 selection:bg-purple-500/30 selection:text-amber-400">
        {/* <CustomCursor /> */}
        {/* <FuturisticBackground /> */}
        <Navbar />
        <ScrollToTop />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Home />} />
            <Route path="/products" element={<Home />} />
            <Route path="/contact" element={<Home/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
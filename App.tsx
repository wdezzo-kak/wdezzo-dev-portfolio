import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans text-brutal-black selection:bg-black selection:text-brutal-green">
      <Navbar />
      <Hero />
      <Marquee text=" // RESPONSIVE DESIGN // LANDING PAGES // UI DEVELOPMENT // CLEAN CODE // " className="rotate-1 scale-105" />
      <Projects />
      <Marquee text=" // HTML5 // CSS3 // JAVASCRIPT // BOOTSTRAP // TAILWIND // " direction="right" className="-rotate-1 scale-105 z-10 relative" />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

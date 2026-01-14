import React, { useEffect, useState, useCallback } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FeedbackSystem from './components/FeedbackSystem';
import NotFound from './components/NotFound';

interface MainLayoutProps {
  onToggleTheme: () => void;
  isDark: boolean;
  metadata: any;
  trackProjectInteraction: (id: string) => void;
}

const LandingPage: React.FC<MainLayoutProps> = ({ onToggleTheme, isDark, metadata, trackProjectInteraction }) => (
  <div className="min-h-screen bg-[#f3f3f3] dark:bg-brutal-black font-sans text-brutal-black dark:text-white selection:bg-black dark:selection:bg-brutal-lime selection:text-brutal-lime dark:selection:text-black transition-colors duration-300">
    <Navbar onToggleTheme={onToggleTheme} isDark={isDark} />
    <Hero />
    <Marquee text=" // RESPONSIVE DESIGN // LANDING PAGES // UI DEVELOPMENT // CLEAN CODE // " className="rotate-1 scale-105" />
    <Projects onInteract={trackProjectInteraction} />
    <Marquee text=" // HTML5 // CSS3 // JAVASCRIPT // BOOTSTRAP // TAILWIND // " direction="right" className="-rotate-1 scale-105 z-10 relative" />
    <Skills />
    <Testimonials />
    <Contact />
    <Footer />
    <FeedbackSystem metadata={metadata} />
  </div>
);

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [metadata, setMetadata] = useState({
    projectHistory: [] as string[],
    currentSection: 'HERO'
  });

  const trackProjectInteraction = useCallback((projectId: string) => {
    setMetadata(prev => {
      if (prev.projectHistory.includes(projectId)) return prev;
      return {
        ...prev,
        projectHistory: [...prev.projectHistory, projectId]
      };
    });
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  if (!isMounted) return null;

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              onToggleTheme={toggleTheme} 
              isDark={isDark} 
              metadata={metadata} 
              trackProjectInteraction={trackProjectInteraction} 
            />
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
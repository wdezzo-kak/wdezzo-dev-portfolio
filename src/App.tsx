
import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import { DEFAULT_PROJECTS, DEFAULT_SKILLS } from './constants';
import { Project, Skill } from './types';

// Lazy load non-critical sections
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const FeedbackSystem = lazy(() => import('./components/FeedbackSystem'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const NotFound = lazy(() => import('./components/NotFound'));

// Optimization: Lazy section wrapper to prevent hydration overhead for off-screen elements
const LazySection = ({ children, fallbackHeight = "400px" }: { children?: React.ReactNode, fallbackHeight?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before reaching the viewport
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : fallbackHeight }}>
      {isVisible ? <Suspense fallback={<div style={{ height: fallbackHeight }} />}>{children}</Suspense> : null}
    </div>
  );
};

interface MainLayoutProps {
  onToggleTheme: () => void;
  isDark: boolean;
  metadata: any;
  trackProjectInteraction: (id: string) => void;
  projects: Project[];
  skills: Skill[];
  vitals: any;
}

const LandingPage: React.FC<MainLayoutProps> = ({ 
  onToggleTheme, isDark, metadata, trackProjectInteraction, projects, skills, vitals
}) => (
  <div className="min-h-screen bg-[#f3f3f3] dark:bg-brutal-black font-sans text-brutal-black dark:text-white selection:bg-black dark:selection:bg-brutal-lime selection:text-brutal-lime dark:selection:text-black transition-colors duration-300 scroll-pt-20 pt-20">
    <Navbar onToggleTheme={onToggleTheme} isDark={isDark} />
    
    {/* Hero is critical for LCP - No lazy loading */}
    <Hero />
    
    <Marquee text=" // RESPONSIVE DESIGN // LANDING PAGES // UI DEVELOPMENT // CLEAN CODE // " className="rotate-1 scale-105" />
    
    <LazySection fallbackHeight="800px">
      <Projects onInteract={trackProjectInteraction} dynamicProjects={projects} />
    </LazySection>

    <Marquee text=" // HTML5 // CSS3 // JAVASCRIPT // BOOTSTRAP // TAILWIND // " direction="right" className="-rotate-1 scale-105 z-10 relative" />
    
    <LazySection fallbackHeight="400px">
      <Skills dynamicSkills={skills} />
    </LazySection>
    
    <LazySection fallbackHeight="500px">
      <Testimonials />
    </LazySection>
    
    <LazySection fallbackHeight="600px">
      <Contact />
    </LazySection>
    
    {/* Vitals are now passed directly to Footer */}
    <Footer vitals={vitals} />

    <Suspense fallback={null}>
      <FeedbackSystem metadata={metadata} />
    </Suspense>
  </div>
);

function AdminWrapper({ projects, setProjects, skills, setSkills, vitals }: any) {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">LOADING_SIMULATOR...</div>}>
      <AdminPanel 
        projects={projects} 
        setProjects={setProjects} 
        skills={skills} 
        setSkills={setSkills}
        onExit={() => navigate('/')} 
        vitals={vitals}
      />
    </Suspense>
  );
}

function App() {
  const [vitals, setVitals] = useState({ lcp: 0, cls: 0, fid: 0, ttfb: 0 });
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('wdezzo_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('wdezzo_skills');
    return saved ? JSON.parse(saved) : DEFAULT_SKILLS;
  });

  const [metadata, setMetadata] = useState({
    projectHistory: [] as string[],
    currentSection: 'HERO'
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor TTFB
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      setVitals(v => ({ ...v, ttfb: Math.round(navigation.responseStart - navigation.requestStart) }));
    }

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      setVitals(v => ({ ...v, lcp: Math.round(entries[entries.length - 1].startTime) }));
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let cls = 0;
      for (const entry of list.getEntries() as any) {
        if (!entry.hadRecentInput) cls += entry.value;
      }
      setVitals(v => ({ ...v, cls: parseFloat(cls.toFixed(4)) }));
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      for (const entry of entries as any) {
        setVitals(v => ({ ...v, fid: Math.round(entry.processingStart - entry.startTime) }));
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    return () => {
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('wdezzo_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('wdezzo_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark(d => !d), []);
  const trackProjectInteraction = useCallback((projectId: string) => {
    setMetadata(prev => prev.projectHistory.includes(projectId) ? prev : {
      ...prev,
      projectHistory: [...prev.projectHistory, projectId]
    });
  }, []);

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
              projects={projects}
              skills={skills}
              vitals={vitals}
            />
          } 
        />
        <Route 
          path="/admin" 
          element={
            <AdminWrapper 
              projects={projects} 
              setProjects={setProjects} 
              skills={skills} 
              setSkills={setSkills} 
              vitals={vitals}
            />
          } 
        />
        <Route path="*" element={<Suspense fallback={null}><NotFound onBack={() => window.location.hash = '/'} /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;

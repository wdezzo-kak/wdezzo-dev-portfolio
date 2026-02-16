
import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import { DEFAULT_PROJECTS, DEFAULT_SKILLS } from './constants';
import { Project, Skill } from './types';

// Lazy load sections
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const FeedbackSystem = lazy(() => import('./components/FeedbackSystem'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const ProjectPreview = lazy(() => import('./components/ProjectPreview'));
const NotFound = lazy(() => import('./components/NotFound'));

const LazySection = ({ 
  children, 
  id, 
  fallbackHeight = "400px" 
}: { 
  children?: React.ReactNode, 
  id?: string, 
  fallbackHeight?: string 
}) => {
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
      { rootMargin: "400px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} style={{ minHeight: isVisible ? 'auto' : fallbackHeight }} aria-labelledby={`${id}-heading`}>
      {isVisible ? <Suspense fallback={<div style={{ height: fallbackHeight }} />}>{children}</Suspense> : null}
    </section>
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
  <div className="min-h-screen bg-[#f3f3f3] dark:bg-brutal-black font-sans text-brutal-black dark:text-white transition-colors duration-300">
    <a href="#main-content" className="sr-only focus:not-sr-only fixed top-4 left-4 z-[100] bg-brutal-lime text-black px-4 py-2 font-black border-4 border-black shadow-hard">
      SKIP_TO_MAIN_CONTENT
    </a>
    <Navbar onToggleTheme={onToggleTheme} isDark={isDark} />
    <main id="main-content" className="scroll-pt-20 pt-20 focus:outline-none" tabIndex={-1}>
      <Hero />
      <Marquee text=" // RESPONSIVE DESIGN // LANDING PAGES // UI DEVELOPMENT // CLEAN CODE // " className="rotate-1 scale-105" />
      <LazySection id="work" fallbackHeight="800px">
        <Projects onInteract={trackProjectInteraction} dynamicProjects={projects} />
      </LazySection>
      <Marquee text=" // HTML5 // CSS3 // JAVASCRIPT // BOOTSTRAP // TAILWIND // " direction="right" className="-rotate-1 scale-105 z-10 relative" />
      <LazySection id="stack" fallbackHeight="400px">
        <Skills dynamicSkills={skills} />
      </LazySection>
      <LazySection id="testimonials" fallbackHeight="500px">
        <Testimonials />
      </LazySection>
      <LazySection id="contact" fallbackHeight="600px">
        <Contact />
      </LazySection>
    </main>
    <Footer vitals={vitals} />
    <Suspense fallback={null}>
      <FeedbackSystem metadata={metadata} />
    </Suspense>
  </div>
);

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

  // Performance Telemetry Hook
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // TTFB
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      setVitals(v => ({ ...v, ttfb: Math.round(navigation.responseStart) }));
    }

    // LCP
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      setVitals(v => ({ ...v, lcp: Math.round(lastEntry.startTime) }));
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // FID
    const fidObserver = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry) => {
        const fidEntry = entry as any;
        setVitals(v => ({ ...v, fid: Math.round(fidEntry.processingStart - fidEntry.startTime) }));
      });
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShift = entry as any;
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
          setVitals(v => ({ ...v, cls: parseFloat(clsValue.toFixed(3)) }));
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

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
    console.log(`Interacted with project: ${projectId}`);
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
              metadata={{ projectHistory: [], currentSection: 'HERO' }} 
              trackProjectInteraction={trackProjectInteraction}
              projects={projects}
              skills={skills}
              vitals={vitals}
            />
          } 
        />
        <Route 
          path="/preview/:projectId" 
          element={
            <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white font-mono" aria-live="polite">LOADING_SIMULATOR...</div>}>
              <ProjectPreview projects={projects} />
            </Suspense>
          }
        />
        <Route 
          path="/admin" 
          element={
            <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white font-mono" aria-live="polite">LOADING_SIMULATOR...</div>}>
              <AdminPanel 
                projects={projects} 
                setProjects={setProjects} 
                skills={skills} 
                setSkills={setSkills} 
                onExit={() => window.location.hash = '/'} 
                vitals={vitals}
              />
            </Suspense>
          } 
        />
        <Route path="*" element={<Suspense fallback={null}><NotFound onBack={() => window.location.hash = '/'} /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;

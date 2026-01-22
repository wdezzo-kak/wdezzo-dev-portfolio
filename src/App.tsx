
import React, { useEffect, useState, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import AdminPanel from './components/AdminPanel';
import { DEFAULT_PROJECTS, DEFAULT_SKILLS } from './constants';
import { Project, Skill } from './types';

interface MainLayoutProps {
  onToggleTheme: () => void;
  isDark: boolean;
  metadata: any;
  trackProjectInteraction: (id: string) => void;
  projects: Project[];
  skills: Skill[];
}

const LandingPage: React.FC<MainLayoutProps> = ({ 
  onToggleTheme, isDark, metadata, trackProjectInteraction, projects, skills 
}) => (
  <div className="min-h-screen bg-[#f3f3f3] dark:bg-brutal-black font-sans text-brutal-black dark:text-white selection:bg-black dark:selection:bg-brutal-lime selection:text-brutal-lime dark:selection:text-black transition-colors duration-300 scroll-pt-20 pt-20">
    <Navbar onToggleTheme={onToggleTheme} isDark={isDark} />
    <Hero />
    <Marquee text=" // RESPONSIVE DESIGN // LANDING PAGES // UI DEVELOPMENT // CLEAN CODE // " className="rotate-1 scale-105" />
    <Projects onInteract={trackProjectInteraction} dynamicProjects={projects} />
    <Marquee text=" // HTML5 // CSS3 // JAVASCRIPT // BOOTSTRAP // TAILWIND // " direction="right" className="-rotate-1 scale-105 z-10 relative" />
    <Skills dynamicSkills={skills} />
    <Testimonials />
    <Contact />
    <Footer />
    <FeedbackSystem metadata={metadata} />
  </div>
);

// Helper component to handle navigation in App
function AdminWrapper({ projects, setProjects, skills, setSkills }: any) {
  const navigate = useNavigate();
  return (
    <AdminPanel 
      projects={projects} 
      setProjects={setProjects} 
      skills={skills} 
      setSkills={setSkills}
      onExit={() => navigate('/')} 
    />
  );
}

function App() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Theme initialization logic
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Dynamic Content State
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

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('wdezzo_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('wdezzo_skills', JSON.stringify(skills));
  }, [skills]);

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
              projects={projects}
              skills={skills}
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
            />
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

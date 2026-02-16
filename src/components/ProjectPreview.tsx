
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, Tablet, Monitor, X, MoveLeft, ExternalLink, Activity } from 'lucide-react';
import { Project } from '../types';

interface ProjectPreviewProps {
  projects: Project[];
}

type ViewportMode = 'MOBILE' | 'TABLET' | 'LAPTOP';

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ projects }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [mode, setMode] = useState<ViewportMode>('LAPTOP');
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const project = projects.find(p => p.id === projectId);

  const getAssetUrl = (path: string) => {
    if (!path || path.startsWith('http') || path.startsWith('data:')) return path;
    const baseUrl = (typeof window !== 'undefined' && window.location.pathname.includes('/wdezzo-dev-portfolio/')) ? '/wdezzo-dev-portfolio/' : '/';
    return `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}${path.startsWith('/') ? path.substring(1) : path}`;
  };

  // Define simulated widths for each device mode
  const SIMULATED_WIDTHS = {
    MOBILE: 375,
    TABLET: 1024,
    LAPTOP: 1280 // Fixed width simulation for desktop layout on mobile
  };

  // Handle scaling to fit requested viewport on smaller screens
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const horizontalPadding = window.innerWidth < 640 ? 32 : 64; // Account for p-4 vs p-8
      const containerWidth = containerRef.current.offsetWidth - horizontalPadding;
      
      const targetWidth = SIMULATED_WIDTHS[mode];

      // If simulated width is wider than actual screen, scale down to fit
      if (targetWidth > containerWidth) {
        setScale(containerWidth / targetWidth);
      } else {
        setScale(1);
      }
    };

    updateScale();
    // Add a small delay to ensure container size is settled after mode switch transitions
    const timer = setTimeout(updateScale, 50); 
    
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timer);
    };
  }, [mode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return (
    <div className="min-h-screen bg-brutal-black flex flex-col items-center justify-center p-8 text-white font-mono" role="alert">
      <X size={80} className="text-brutal-red mb-6" aria-hidden="true" />
      <h1 className="text-4xl font-black uppercase mb-4 text-white">PROJECT_NOT_FOUND</h1>
      <button 
        onClick={() => navigate('/')} 
        className="bg-brutal-yellow text-black px-8 py-4 font-black flex items-center gap-2 shadow-hard hover:shadow-none transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutal-lime"
        type="button"
      >
        <MoveLeft size={20} aria-hidden="true" /> RETURN_TO_BASE
      </button>
    </div>
  );

  const demoUrl = (!project.demoUrl || project.demoUrl === '#' || project.demoUrl.trim() === '') ? getAssetUrl('projects/notfound.html') : getAssetUrl(project.demoUrl);

  const getTargetWidthString = () => {
    return `${SIMULATED_WIDTHS[mode]}px`;
  };

  return (
    <div className="fixed inset-0 bg-neutral-900 flex flex-col font-mono selection:bg-brutal-lime z-[9999] text-white" role="dialog" aria-modal="true" aria-labelledby="simulator-title">
      <header className="h-20 bg-brutal-yellow border-b-4 border-black flex items-center justify-between px-4 md:px-6 z-50 shadow-hard shrink-0 text-black">
        {/* Left Section: Navigation & Info */}
        <div className="flex items-center gap-3 md:gap-4 text-black shrink-0">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 bg-black text-white px-3 py-1.5 text-[10px] md:text-xs font-black border-2 border-white shadow-hard hover:bg-brutal-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            aria-label="Exit simulator and return home"
            type="button"
          >
            <MoveLeft size={14} aria-hidden="true" /> EXIT
          </button>
          <div className="hidden lg:flex flex-col text-black">
            <span className="text-[10px] font-black leading-none opacity-70 uppercase tracking-widest text-black">WDEZZO_DEV // EMULATOR</span>
            <h1 id="simulator-title" className="text-xs md:text-sm font-black uppercase tracking-tighter truncate max-w-[120px] text-black">{project.title}</h1>
          </div>
        </div>

        {/* Center Section: Device Toggles */}
        <div className="flex bg-white p-0.5 border-2 md:border-4 border-black shadow-hard text-black">
          <button 
            onClick={() => setMode('MOBILE')}
            className={`flex items-center gap-2 px-3 md:px-5 py-1.5 text-[10px] font-black uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-lime ${mode === 'MOBILE' ? 'bg-brutal-lime text-black border-2 border-black -translate-y-0.5 shadow-none' : 'text-black hover:bg-neutral-100'}`}
            aria-label="Switch to mobile viewport"
            aria-pressed={mode === 'MOBILE'}
            type="button"
          >
            <Smartphone size={14} aria-hidden="true" /> <span className="hidden sm:inline">Mobile</span>
          </button>
          <button 
            onClick={() => setMode('TABLET')}
            className={`flex items-center gap-2 px-3 md:px-5 py-1.5 text-[10px] font-black uppercase transition-all border-x-2 md:border-x-4 border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-lime ${mode === 'TABLET' ? 'bg-brutal-lime text-black border-2 border-black -translate-y-0.5 shadow-none' : 'text-black hover:bg-neutral-100'}`}
            aria-label="Switch to tablet viewport"
            aria-pressed={mode === 'TABLET'}
            type="button"
          >
            <Tablet size={14} aria-hidden="true" /> <span className="hidden sm:inline">Tablet</span>
          </button>
          <button 
            onClick={() => setMode('LAPTOP')}
            className={`flex items-center gap-2 px-3 md:px-5 py-1.5 text-[10px] font-black uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-lime ${mode === 'LAPTOP' ? 'bg-brutal-lime text-black border-2 border-black -translate-y-0.5 shadow-none' : 'text-black hover:bg-neutral-100'}`}
            aria-label="Switch to laptop viewport"
            aria-pressed={mode === 'LAPTOP'}
            type="button"
          >
            <Monitor size={14} aria-hidden="true" /> <span className="hidden sm:inline">Laptop</span>
          </button>
        </div>

        {/* Right Section: Status & External Link */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 border-2 border-black bg-white px-2 py-1.5 font-black text-[9px] md:text-[10px] shadow-hard text-black" aria-hidden="true">
            <Activity size={12} className="text-brutal-green-toxic animate-pulse" />
            SIGNAL_LIVE
          </div>
          <a 
            href={demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-black text-white hover:bg-brutal-lime hover:text-black border-2 border-white shadow-hard transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            aria-label={`Open ${project.title} in a new browser tab`}
          >
            <ExternalLink size={18} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main 
        ref={containerRef}
        className="flex-grow relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8 bg-neutral-900/50"
      >
        <motion.div 
          layout
          initial={false}
          animate={{ 
            width: getTargetWidthString(), 
            height: mode === 'LAPTOP' ? '100%' : '80vh',
            scale: scale
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ transformOrigin: 'center center' }}
          className={`relative bg-white border-black shadow-hard-xl overflow-hidden flex flex-col transition-all duration-300 ${mode !== 'LAPTOP' ? 'rounded-[32px] border-[12px]' : 'rounded-none border-4'}`}
        >
          {loading && (
            <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center" aria-live="polite">
              <div className="w-12 h-12 border-4 border-brutal-lime border-t-transparent animate-spin mb-4" aria-hidden="true"></div>
              <span className="font-black text-white text-[10px] uppercase tracking-[0.3em] animate-pulse">ESTABLISHING_UPLINK</span>
            </div>
          )}
          
          <iframe 
            src={demoUrl}
            onLoad={() => setLoading(false)}
            className="w-full h-full border-0"
            title={`Interactive Preview of ${project.title}`}
            sandbox="allow-scripts allow-same-origin allow-forms"
          />

          {/* Notch/Bezel decoration only for simulated mobile/tablet */}
          {mode !== 'LAPTOP' && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-[60] flex items-center justify-center border-x-2 border-b-2 border-white/10" aria-hidden="true">
              <div className="w-8 h-1 bg-neutral-800 rounded-full"></div>
            </div>
          )}
        </motion.div>
      </main>

      <footer className="h-8 bg-black text-white border-t border-white/10 flex items-center px-4 justify-between font-mono text-[8px] font-black uppercase tracking-widest opacity-60 shrink-0" aria-hidden="true">
        <span className="text-white">MODE: {mode}_SIMULATION {scale < 1 ? `(SCALED: ${(scale * 100).toFixed(0)}%)` : ''}</span>
        <span className="text-white">VIEWPORT_WIDTH: {getTargetWidthString()}</span>
      </footer>
    </div>
  );
};

export default ProjectPreview;

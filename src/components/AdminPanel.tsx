
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Save, Trash2, Plus, Terminal, 
  Database, LogOut, Copy, Check, AlertCircle, 
  ChevronRight, Box, Zap, Info, Eye
} from 'lucide-react';
import { Project, Skill } from '../types';
import { CONFIG } from '../constants';

interface AdminPanelProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ projects, setProjects, skills, setSkills, onExit }) => {
  const [activeTab, setActiveTab] = useState<'PROJECTS' | 'STACK' | 'CONFIG' | 'LOGS'>('PROJECTS');
  const [sessionKey, setSessionKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showKeyError, setShowKeyError] = useState(false);
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] INITIALIZED_SIMULATION_SHELL_V1.1.0', '[INFO] AWAITING_AUTHENTICATION...']);
  const [copied, setCopied] = useState(false);

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionKey === CONFIG.ADMIN_KEY) {
      setIsAuthenticated(true);
      addLog('SIMULATION_ACCESS_GRANTED: PREVIEW_STARTED');
    } else {
      setShowKeyError(true);
      addLog('ERROR: UNAUTHORIZED_ACCESS_ATTEMPT');
      setTimeout(() => setShowKeyError(false), 2000);
    }
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updated = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    setProjects(updated);
    addLog(`SIM_UPDATE: PROJECT_${id}_${field.toUpperCase()}`);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    addLog(`SIM_DELETED: PROJECT_${id}`);
  };

  const addProject = () => {
    const newId = (projects.length + 1).toString().padStart(2, '0');
    const newProj: Project = {
      id: newId,
      title: 'SIM_PROJECT',
      category: 'UI_TEMPLATE',
      description: 'Temporary simulation content.',
      tech: ['React', 'Framer'],
      year: new Date().getFullYear().toString(),
      imageUrl: '',
      link: '#',
      demoUrl: '#',
      color: 'bg-brutal-pink-neon'
    };
    setProjects([...projects, newProj]);
    addLog('SIM_CREATED: PROJECT_ID_' + newId);
  };

  const exportConfig = () => {
    const configString = `// PERMANENT SOURCE UPDATE
export const DEFAULT_PROJECTS = ${JSON.stringify(projects, null, 2)};

export const DEFAULT_SKILLS = ${JSON.stringify(skills, null, 2)};`;
    navigator.clipboard.writeText(configString);
    setCopied(true);
    addLog('PRODUCTION_CODE_EXPORTED');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md bg-white border-8 border-brutal-yellow p-8 shadow-[20px_20px_0px_0px_#ffff00]"
        >
          <div className="flex items-center gap-4 mb-8">
            <Eye size={48} className="text-black" />
            <div>
              <h1 className="text-3xl font-black text-black leading-none uppercase">SIMULATION_PORTAL</h1>
              <p className="text-xs font-bold text-black/60 mt-1 uppercase">PREVIEW_MODE_ACTIVE</p>
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase mb-2">ACCESS_KEY</label>
              <input 
                type="password"
                value={sessionKey}
                onChange={(e) => setSessionKey(e.target.value)}
                className={`w-full bg-black text-white p-4 border-4 transition-colors outline-none ${showKeyError ? 'border-red-600' : 'border-black'}`}
                placeholder="INPUT_KEY..."
                autoFocus
              />
            </div>
            <button className="w-full bg-black text-white py-4 font-black uppercase shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-2 border-white">
              LOAD_SIMULATOR
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brutal-bg dark:bg-brutal-black font-mono p-4 md:p-8 flex flex-col gap-6 selection:bg-brutal-yellow selection:text-black">
      {/* Simulation Banner */}
      <div className="bg-brutal-red text-white py-2 px-4 border-4 border-black text-center font-black uppercase tracking-widest text-xs animate-pulse">
        ⚠ SIMULATION_MODE: Changes are local to this session only. Use EXPORT to save permanently.
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-black text-white p-6 border-4 border-black dark:border-white shadow-hard">
        <div className="flex items-center gap-4">
          <Terminal size={32} className="text-brutal-yellow" />
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">WDEZZO_SIM_v1.0</h1>
            <p className="text-[10px] font-bold text-brutal-yellow opacity-80 uppercase mt-1">ENVIRONMENT: PREVIEW_SANDBOX</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="relative group">
            <button 
              onClick={exportConfig}
              className="flex items-center gap-2 bg-brutal-yellow text-black px-4 py-2 border-2 border-white font-black hover:bg-white transition-colors"
            >
              {copied ? <Check size={18} /> : <Save size={18} />}
              GENERATE_SOURCE_CODE
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white text-black p-2 border-2 border-black text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-hard">
              <Info size={12} className="inline mr-1" />
              This simulates an update. Copy the output to constants.ts to make it real.
            </div>
          </div>
          <button 
            onClick={onExit}
            className="flex items-center gap-2 bg-brutal-red text-white px-4 py-2 border-2 border-white font-black hover:bg-black transition-colors"
          >
            <LogOut size={18} />
            STOP_PREVIEW
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-2 flex lg:flex-col gap-2">
          {(['PROJECTS', 'STACK', 'CONFIG', 'LOGS'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 lg:flex-none text-left px-4 py-4 font-black uppercase border-4 transition-all ${
                activeTab === tab 
                ? 'bg-brutal-yellow text-black border-black shadow-hard-lg' 
                : 'bg-white dark:bg-neutral-800 text-black dark:text-white border-transparent hover:border-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border-4 border-black dark:border-white shadow-hard-xl p-6 overflow-y-auto max-h-[70vh] md:max-h-[80vh] brutal-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'PROJECTS' && (
              <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-black uppercase">SIM_PROJECT_GRID</h2>
                  <button onClick={addProject} className="bg-black text-white px-4 py-2 flex items-center gap-2 font-bold hover:bg-brutal-yellow hover:text-black transition-colors">
                    <Plus size={20} /> STAGE_NEW
                  </button>
                </div>
                {projects.map(proj => (
                  <div key={proj.id} className="border-4 border-black p-4 space-y-4 bg-neutral-50 dark:bg-neutral-800 relative group">
                    <button 
                      onClick={() => removeProject(proj.id)}
                      className="absolute top-4 right-4 text-red-600 hover:scale-125 transition-transform"
                    >
                      <Trash2 size={24} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase opacity-50 block mb-1">Title</label>
                        <input 
                          type="text" 
                          value={proj.title} 
                          onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                          className="w-full bg-white dark:bg-black border-2 border-black p-2 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase opacity-50 block mb-1">Category</label>
                        <input 
                          type="text" 
                          value={proj.category} 
                          onChange={(e) => updateProject(proj.id, 'category', e.target.value)}
                          className="w-full bg-white dark:bg-black border-2 border-black p-2 font-bold"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-black uppercase opacity-50 block mb-1">Preview Description</label>
                        <textarea 
                          value={proj.description} 
                          onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                          className="w-full bg-white dark:bg-black border-2 border-black p-2 font-bold h-20"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'STACK' && (
              <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-2xl font-black uppercase">STACK_SIMULATION</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="flex gap-2 items-center bg-brutal-lime p-3 border-2 border-black shadow-hard">
                      <Box size={20} />
                      <input 
                        className="flex-grow bg-transparent font-black uppercase outline-none" 
                        value={skill.name}
                        onChange={(e) => {
                          const updated = [...skills];
                          updated[idx].name = e.target.value;
                          setSkills(updated);
                        }}
                      />
                      <button 
                        onClick={() => setSkills(skills.filter((_, i) => i !== idx))}
                        className="text-black hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setSkills([...skills, { name: 'NEW_TECH', level: 'MASTER' }])}
                    className="border-2 border-dashed border-black p-3 flex items-center justify-center gap-2 font-black uppercase hover:bg-black hover:text-white transition-all"
                  >
                    <Plus size={20} /> ADD_TECH
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'LOGS' && (
              <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-black text-brutal-yellow p-6 border-4 border-white font-mono h-64 overflow-y-auto brutal-scrollbar">
                {logs.map((log, i) => (
                  <div key={i} className="mb-1 text-sm leading-tight">{log}</div>
                ))}
              </motion.div>
            )}

            {activeTab === 'CONFIG' && (
              <motion.div key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                 <h2 className="text-2xl font-black uppercase">SYSTEM_VARIABLES</h2>
                 <div className="bg-neutral-100 dark:bg-neutral-800 p-6 border-4 border-black space-y-4">
                    <p className="font-mono text-xs opacity-60">Variables listed here are pulled from static constant files and cannot be simulated in real-time.</p>
                    <div className="grid gap-4">
                        <div className="p-2 border-2 border-black bg-white dark:bg-black font-bold text-xs">
                           <span className="opacity-50">ADMIN_KEY:</span> {CONFIG.ADMIN_KEY.replace(/./g, '*')}
                        </div>
                        <div className="p-2 border-2 border-black bg-white dark:bg-black font-bold text-xs">
                           <span className="opacity-50">GATEWAY_MAIL:</span> {CONFIG.CONTACT_EMAIL}
                        </div>
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-brutal-black text-white p-6 border-4 border-white shadow-hard">
            <h3 className="font-black uppercase mb-4 flex items-center gap-2 text-brutal-yellow">
              <Zap size={20} /> PREVIEW_STATS
            </h3>
            <div className="space-y-2 font-bold text-[11px] font-mono">
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>VIRTUAL_PROJECTS:</span>
                <span>{projects.length}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>SIM_STACK_SIZE:</span>
                <span>{skills.length}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>MODE:</span>
                <span className="text-brutal-yellow">SANDBOX</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-6 border-4 border-black dark:border-white shadow-hard text-black dark:text-white">
            <h3 className="font-black uppercase mb-4 text-xs">DIAGNOSTICS</h3>
            <div className="text-[10px] font-mono space-y-1 opacity-60">
              <p>STABLE_UPLINK: TRUE</p>
              <p>PREVIEW_ENGINE: RENDER_V8</p>
              <p>CACHE_STATE: VOLATILE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

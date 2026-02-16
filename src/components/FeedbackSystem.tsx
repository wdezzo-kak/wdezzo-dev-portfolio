
import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../constants';

interface FeedbackSystemProps {
  metadata: {
    projectHistory: string[];
    currentSection: string;
  };
}

const STORAGE_KEY = 'brutal_feedback_draft';
const BRUTAL_COLORS = [
  'bg-brutal-lime', 
  'bg-brutal-pink-neon', 
  'bg-brutal-blue-electric', 
  'bg-brutal-orange-hot', 
  'bg-brutal-yellow', 
  'bg-brutal-cyan-deep'
];

const RANDOM_ROLES = [
  'SOFTWARE_ENGINEER',
  'PRODUCT_DESIGNER',
  'TECH_ARCHITECT',
  'CREATIVE_DIRECTOR',
  'FOUNDER @ STEALTH_STARTUP',
  'FULLSTACK_DEV',
  'UX_RESEARCHER',
  'DEVOPS_ENGINEER',
  'PRODUCT_MANAGER',
  'SYSTEM_ADMIN',
  'VISUAL_STRATEGIST',
  'FRONTEND_SPECIALIST',
  'CTO @ ALPHA_TECH',
  'OPEN_SOURCE_CONTRIBUTOR'
];

const generateBrutalId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export default function FeedbackSystem({ metadata }: FeedbackSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState(generateBrutalId());
  
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [randomColor, setRandomColor] = useState(BRUTAL_COLORS[0]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setRandomColor(BRUTAL_COLORS[Math.floor(Math.random() * BRUTAL_COLORS.length)]);
    }
  }, [isOpen]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { name, role, rating, opinion } = JSON.parse(saved);
        setName(name || '');
        setRole(role || '');
        setRating(rating || 0);
        setOpinion(opinion || '');
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (!isSubmitted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, role, rating, opinion }));
    }
  }, [name, role, rating, opinion, isSubmitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const finalRole = role.trim() !== '' 
      ? role.toUpperCase() 
      : RANDOM_ROLES[Math.floor(Math.random() * RANDOM_ROLES.length)];

    const payload = {
      id: submissionId,
      name: name.trim() || 'ANONYMOUS_ENTITY',
      role: finalRole,
      rating: rating,
      opinion: opinion,
      origin_section: metadata.currentSection,
      project_history: metadata.projectHistory.join(', '),
      show_in_testimonials: false,
    };

    try {
      await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: 'no-cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setIsSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
      
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setIsSubmitted(false);
          setRating(0);
          setName('');
          setRole('');
          setOpinion('');
          setSubmissionId(generateBrutalId());
        }, 500);
      }, 3000);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("DATA_LINK_FAILURE. CHECK CONSOLE.");
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[5110] w-14 h-14 bg-brutal-yellow dark:bg-brutal-purple border-4 border-black dark:border-white shadow-hard dark:shadow-hard-white transition-all flex items-center justify-center text-black cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutal-lime"
        aria-label={isOpen ? "Close feedback menu" : "Open feedback menu"}
        aria-expanded={isOpen}
        type="button"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} strokeWidth={3} aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare size={24} strokeWidth={3} aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[5100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              className={`w-full max-w-md ${randomColor} border-4 border-black shadow-hard-xl relative flex flex-col max-h-[85vh]`}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="feedback-title"
              aria-modal="true"
            >
              <div className="overflow-y-auto p-8 brutal-scrollbar">
                {isSubmitted ? (
                  <div className="py-8 text-center" aria-live="assertive">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block p-4 bg-white border-4 border-black mb-6">
                      <CheckCircle2 size={48} className="text-black" aria-hidden="true" />
                    </motion.div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 text-black">DATA_RECEIVED</h3>
                    <p className="font-mono text-sm text-black/70 italic">SYNC_TO_SHEET_INITIATED</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 border-b-4 border-black pb-4 flex justify-between items-end">
                      <h2 id="feedback-title" className="text-3xl font-black uppercase tracking-tighter leading-none text-black">VISITOR_LOG</h2>
                      <span className="font-mono text-[10px] font-bold text-black opacity-60" aria-label={`Session ID: ${submissionId}`}>{submissionId}</span>
                    </div>

                    <form name="visitor-feedback" onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="feedback-name" className="block font-black uppercase text-xs mb-1 text-black">Identity</label>
                          <input
                            id="feedback-name"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="NAME / ALIAS"
                            className="w-full bg-white border-2 border-black p-2 font-mono text-sm focus:bg-black focus:text-white focus:outline-none transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="feedback-role" className="block font-black uppercase text-xs mb-1 text-black">Role / Profession</label>
                          <input
                            id="feedback-role"
                            type="text"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="BLANK = RANDOM_ROLE"
                            className="w-full bg-white border-2 border-black p-2 font-mono text-sm focus:bg-black focus:text-white focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <fieldset>
                        <legend className="block font-black uppercase text-xs mb-1 text-black">Rating</legend>
                        <div className="flex gap-1" role="group">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setRating(star)}
                              className={`w-10 h-10 border-2 border-black transition-all transform active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black ${
                                (hoverRating || rating) >= star ? 'bg-brutal-yellow shadow-hard' : 'bg-white'
                              }`}
                              aria-label={`Rate ${star} out of 5 stars`}
                              aria-pressed={rating === star}
                            />
                          ))}
                        </div>
                      </fieldset>

                      <div>
                        <label htmlFor="feedback-opinion" className="block font-black uppercase text-xs mb-1 text-black">Transmission</label>
                        <textarea
                          id="feedback-opinion"
                          name="opinion"
                          required
                          rows={4}
                          value={opinion}
                          onChange={(e) => setOpinion(e.target.value)}
                          placeholder="INPUT_FEEDBACK_HERE..."
                          className="w-full bg-white border-2 border-black p-2 font-mono text-sm focus:bg-black focus:text-white focus:outline-none transition-colors"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={rating === 0}
                        className="w-full py-4 bg-white disabled:opacity-50 border-4 border-black text-black font-black text-xl uppercase shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-y-0.5 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black"
                      >
                        PUSH <Send size={20} aria-hidden="true" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

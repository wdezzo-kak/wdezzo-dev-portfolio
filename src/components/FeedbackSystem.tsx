import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    
    const bodyData = {
      'form-name': 'visitor-feedback',
      name: name || 'ANONYMOUS_ENTITY',
      role: role || 'ROUND ONE',
      rating: rating.toString(),
      opinion: opinion,
      submission_id: submissionId,
      origin_section: metadata.currentSection,
      project_history: metadata.projectHistory.join(', ')
    };

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(bodyData as any).toString(),
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
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[110] w-14 h-14 bg-brutal-yellow dark:bg-brutal-lime border-4 border-black dark:border-white shadow-hard-lg dark:shadow-hard-white-lg hover:shadow-hard dark:hover:shadow-hard-white transition-all flex items-center justify-center text-black cursor-pointer group active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare size={24} strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none flex items-center justify-center sm:block p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              className={`w-full max-w-md ${randomColor} border-4 border-black shadow-hard-xl relative flex flex-col max-h-[85vh] sm:fixed sm:bottom-24 sm:right-6`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-y-auto p-8 brutal-scrollbar">
                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block p-4 bg-white border-4 border-black mb-6">
                      <CheckCircle2 size={48} className="text-black" />
                    </motion.div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 text-black">DATA_RECEIVED</h3>
                    <p className="font-mono text-sm text-black/70 italic">SYNC_TO_FEED_INITIATED</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 border-b-4 border-black pb-4 flex justify-between items-end">
                      <h2 className="text-3xl font-black uppercase tracking-tighter leading-none text-black">VISITOR_LOG</h2>
                      <span className="font-mono text-[10px] font-bold text-black opacity-50">{submissionId}</span>
                    </div>

                    <form name="visitor-feedback" onSubmit={handleSubmit} className="space-y-4">
                      <input type="hidden" name="form-name" value="visitor-feedback" />
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block font-black uppercase text-xs mb-1 text-black">Identity</label>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="NAME / ALIAS"
                            className="w-full bg-white border-2 border-black p-2 font-mono text-sm focus:bg-black focus:text-white focus:outline-none transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block font-black uppercase text-xs mb-1 text-black">Role / Profession</label>
                          <input
                            type="text"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="CEO / DEV / GHOST"
                            className="w-full bg-white border-2 border-black p-2 font-mono text-sm focus:bg-black focus:text-white focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-black uppercase text-xs mb-1 text-black">Rating</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setRating(star)}
                              className={`w-10 h-10 border-2 border-black transition-all transform active:scale-95 ${
                                (hoverRating || rating) >= star ? 'bg-brutal-yellow shadow-hard' : 'bg-white'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-black uppercase text-xs mb-1 text-black">Transmission</label>
                        <textarea
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
                        className="w-full py-4 bg-white disabled:opacity-50 border-4 border-black text-black font-black text-xl uppercase shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                      >
                        PUSH <Send size={20} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

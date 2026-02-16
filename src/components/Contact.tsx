
import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../constants';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SUBMITTING');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONFIG.CONTACT_EMAIL}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      console.error("Transmission failed:", error);
      setStatus('ERROR');
    }
  };

  return (
    <div className="py-20 bg-brutal-yellow dark:bg-brutal-purple relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
           aria-hidden="true"
           style={{ backgroundImage: 'radial-gradient(var(--dot-color, #000) 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      ></div>
      <style>{`
        .dark { --dot-color: #fff; }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white dark:bg-black border-4 border-black dark:border-white shadow-hard-xl dark:shadow-hard-white-xl p-8 md:p-12 transition-colors min-h-[500px] flex flex-col justify-center">
          
          <div aria-live="polite">
            <AnimatePresence mode="wait">
              {status === 'SUCCESS' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="inline-block p-6 bg-brutal-lime border-4 border-black mb-8 transform -rotate-2">
                    <CheckCircle2 size={80} className="text-black" aria-hidden="true" />
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black uppercase mb-4 text-black dark:text-white leading-none">
                    TRANSMISSION<br/>COMPLETE
                  </h2>
                  <p className="font-mono text-xl text-black dark:text-white mb-8 italic bg-black dark:bg-white text-white dark:text-black inline-block px-4 py-2">
                    STATUS: FORMSUBMIT_LOG_SAVED
                  </p>
                  <div>
                    <button 
                      onClick={() => setStatus('IDLE')}
                      className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-black uppercase border-2 border-transparent hover:bg-brutal-cyan-deep hover:text-black hover:border-black transition-all shadow-hard focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutal-lime"
                      type="button"
                    >
                      SEND_ANOTHER_LOG
                    </button>
                  </div>
                </motion.div>
              ) : status === 'ERROR' ? (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="inline-block p-6 bg-brutal-red border-4 border-black mb-8 transform rotate-3">
                    <AlertTriangle size={80} className="text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black uppercase mb-4 text-black dark:text-white leading-none">
                    UPLINK<br/>FAILURE
                  </h2>
                  <p className="font-mono text-xl text-black dark:text-white mb-8 italic">
                    ERROR_CODE: FORMSUBMIT_REJECTED
                  </p>
                  <button 
                    onClick={() => setStatus('IDLE')}
                    className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-black uppercase border-2 border-transparent hover:bg-brutal-orange-hot hover:text-black hover:border-black transition-all shadow-hard flex items-center gap-2 mx-auto focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutal-lime"
                    type="button"
                  >
                    <RefreshCcw size={20} aria-hidden="true" /> RETRY_TRANSMISSION
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-10 text-center">
                    <h2 id="contact-heading" className="text-5xl md:text-7xl font-black uppercase mb-4 text-black dark:text-white">INITIATE<br/>CONTACT</h2>
                    <p className="font-mono text-xl text-black dark:text-white">Let's build something aggressive.</p>
                  </div>

                  <form className="space-y-8" onSubmit={handleSubmit} aria-labelledby="contact-heading">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label htmlFor="name-field" className="block font-black uppercase text-lg text-black dark:text-white">Identity</label>
                        <input 
                          id="name-field"
                          required
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="NAME OR ALIAS" 
                          className="w-full bg-[#f0f0f0] dark:bg-neutral-800 border-2 border-black dark:border-white p-4 font-mono focus:outline-none focus:ring-4 focus:ring-brutal-lime dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email-field" className="block font-black uppercase text-lg text-black dark:text-white">Coordinates</label>
                        <input 
                          id="email-field"
                          required
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="EMAIL ADDRESS" 
                          className="w-full bg-[#f0f0f0] dark:bg-neutral-800 border-2 border-black dark:border-white p-4 font-mono focus:outline-none focus:ring-4 focus:ring-brutal-lime dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message-field" className="block font-black uppercase text-lg text-black dark:text-white">Transmission</label>
                      <textarea 
                        id="message-field"
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5} 
                        placeholder="YOUR MESSAGE HERE..." 
                        className="w-full bg-[#f0f0f0] dark:bg-neutral-800 border-2 border-black dark:border-white p-4 font-mono focus:outline-none focus:ring-4 focus:ring-brutal-lime dark:text-white"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={status === 'SUBMITTING'}
                      className={`w-full ${status === 'SUBMITTING' ? 'bg-gray-400 cursor-not-allowed' : 'bg-black dark:bg-white'} text-white dark:text-black text-2xl font-black uppercase py-6 border-2 border-transparent hover:bg-brutal-lime dark:hover:bg-brutal-lime hover:text-black hover:border-black dark:hover:border-white hover:shadow-hard dark:hover:shadow-hard-white transition-all duration-200 flex items-center justify-center gap-4 group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutal-lime`}
                    >
                      {status === 'SUBMITTING' ? (
                        <>ESTABLISHING_UPLINK... <RefreshCcw className="animate-spin" aria-hidden="true" /></>
                      ) : (
                        <>SEND DATA <Send className="group-hover:translate-x-2 transition-transform" aria-hidden="true" /></>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

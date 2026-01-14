import React from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, Home, MoveLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-brutal-black flex flex-col items-center justify-center p-6 overflow-hidden relative selection:bg-brutal-red selection:text-white">
      {/* Background Glitch Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[150%] h-32 bg-brutal-red -rotate-12 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-[150%] h-32 bg-brutal-purple rotate-12 blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8 p-6 bg-brutal-red border-8 border-white shadow-hard-xl"
        >
          <AlertOctagon size={80} className="text-white" />
        </motion.div>

        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-9xl md:text-[12rem] font-black text-white leading-none tracking-tighter mb-4 drop-shadow-[10px_10px_0px_#ff0000]"
        >
          404
        </motion.h1>

        <div className="bg-white border-4 border-brutal-red p-4 mb-10 transform rotate-1 shadow-hard-lg">
           <h2 className="text-2xl md:text-4xl font-black uppercase text-brutal-black">ERROR_PATH_NOT_FOUND</h2>
        </div>

        <div className="font-mono text-left w-full mb-12 space-y-2 bg-neutral-900 border-2 border-neutral-700 p-6 shadow-inner text-brutal-green-toxic text-sm md:text-base">
           <p className="flex gap-2"><span className="text-neutral-500">[SYSTEM]</span> INITIALIZING_DIAGNOSTIC...</p>
           <p className="flex gap-2"><span className="text-neutral-500">[STATUS]</span> 404_PAGE_MISSING</p>
           <p className="flex gap-2"><span className="text-neutral-500">[TRACE]</span> {window.location.pathname.toUpperCase()}</p>
           <p className="flex gap-2"><span className="text-neutral-500">[ACTION]</span> REDIRECT_TO_ROOT_RECOMMENDED</p>
           <p className="animate-pulse">_</p>
        </div>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-4 bg-brutal-yellow text-brutal-black px-10 py-6 text-3xl font-black uppercase border-4 border-white shadow-hard-xl hover:shadow-hard-white transition-all"
        >
          <MoveLeft className="group-hover:-translate-x-2 transition-transform" size={32} strokeWidth={3} />
          RETURN_TO_BASE
        </motion.a>
      </div>

      {/* Decorative floating bits */}
      <div className="fixed top-10 left-10 text-white font-black text-8xl opacity-5 select-none pointer-events-none">VOID</div>
      <div className="fixed bottom-10 right-10 text-white font-black text-8xl opacity-5 select-none pointer-events-none">NULL</div>
    </div>
  );
};

export default NotFound;
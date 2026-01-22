
import React from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, MoveLeft } from 'lucide-react';

interface NotFoundProps {
  inline?: boolean;
  onBack?: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ inline = false, onBack }) => {
  const containerClass = inline 
    ? "relative w-full h-full bg-brutal-black flex flex-col items-center justify-center p-4 overflow-hidden"
    : "min-h-screen bg-brutal-black flex flex-col items-center justify-center p-6 overflow-hidden relative selection:bg-brutal-red selection:text-white";

  return (
    <div className={containerClass}>
      {/* Background Glitch Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[150%] h-32 bg-brutal-red -rotate-12 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-[150%] h-32 bg-brutal-purple rotate-12 blur-3xl animate-pulse"></div>
      </div>

      <div className={`relative z-10 flex flex-col items-center text-center w-full ${inline ? 'max-w-md' : 'max-w-2xl'}`}>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`${inline ? 'mb-4 p-3 border-4' : 'mb-8 p-6 border-8'} bg-brutal-red border-white shadow-hard-xl`}
        >
          <AlertOctagon size={inline ? 40 : 80} className="text-white" />
        </motion.div>

        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`${inline ? 'text-6xl md:text-8xl' : 'text-9xl md:text-[12rem]'} font-black text-white leading-none tracking-tighter mb-4 drop-shadow-[5px_5px_0px_#ff0000]`}
        >
          404
        </motion.h1>

        <div className={`bg-white border-4 border-brutal-red ${inline ? 'p-2 mb-6' : 'p-4 mb-10'} transform rotate-1 shadow-hard-lg`}>
           <h2 className={`${inline ? 'text-lg md:text-xl' : 'text-2xl md:text-4xl'} font-black uppercase text-brutal-black`}>ERROR_PATH_NOT_FOUND</h2>
        </div>

        <div className={`font-mono text-left w-full ${inline ? 'mb-6 p-3 text-xs' : 'mb-12 p-6 text-sm md:text-base'} bg-neutral-900 border-2 border-neutral-700 shadow-inner text-brutal-green-toxic`}>
           <p className="flex gap-2"><span className="text-neutral-500">[SYSTEM]</span> INITIALIZING_DIAGNOSTIC...</p>
           <p className="flex gap-2"><span className="text-neutral-500">[STATUS]</span> 404_PAGE_MISSING</p>
           <p className="flex gap-2"><span className="text-neutral-500">[TRACE]</span> {window.location.pathname.toUpperCase()}</p>
           <p className="flex gap-2"><span className="text-neutral-500">[ACTION]</span> {inline ? 'CONTACT_ADMIN' : 'REDIRECT_TO_ROOT_RECOMMENDED'}</p>
        </div>

        {onBack && (
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`group flex items-center gap-4 bg-brutal-yellow text-brutal-black font-black uppercase border-4 border-white shadow-hard-xl hover:shadow-hard-white transition-all ${inline ? 'px-6 py-3 text-xl' : 'px-10 py-6 text-3xl'}`}
          >
            <MoveLeft className="group-hover:-translate-x-2 transition-transform" size={inline ? 24 : 32} strokeWidth={3} />
            BACK_TO_WORK
          </motion.button>
        )}
      </div>

      {!inline && (
        <>
          <div className="fixed top-10 left-10 text-white font-black text-8xl opacity-5 select-none pointer-events-none">VOID</div>
          <div className="fixed bottom-10 right-10 text-white font-black text-8xl opacity-5 select-none pointer-events-none">NULL</div>
        </>
      )}
    </div>
  );
};

export default NotFound;

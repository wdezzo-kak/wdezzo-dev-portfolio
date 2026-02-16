
import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text, direction = 'left', className = '' }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap border-y-2 border-black dark:border-white bg-brutal-lime py-2 text-black transition-colors ${className}`}>
      <motion.div
        className="inline-block will-change-transform"
        animate={{ x: direction === 'left' ? "-33.33%" : "0%" }}
        initial={{ x: direction === 'left' ? "0%" : "-33.33%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        <span className="text-4xl font-black mx-4 uppercase tracking-tighter">{text}</span>
        <span className="text-4xl font-black mx-4 uppercase tracking-tighter">{text}</span>
        <span className="text-4xl font-black mx-4 uppercase tracking-tighter">{text}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;

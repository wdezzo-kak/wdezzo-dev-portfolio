import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text, direction = 'left', className = '' }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap border-y-2 border-black bg-brutal-lime py-2 ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: direction === 'left' ? "-50%" : "0%" }}
        initial={{ x: direction === 'left' ? "0%" : "-50%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 10,
        }}
      >
        <span className="text-4xl font-black mx-4 uppercase tracking-tighter">{text}</span>
        <span className="text-4xl font-black mx-4 uppercase tracking-tighter">{text}</span>
        <span className="text-4xl font-black mx-4 uppercase tracking-tighter">{text}</span>
        <span className="text-4xl font-black mx-4 uppercase tracking-tighter">{text}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;
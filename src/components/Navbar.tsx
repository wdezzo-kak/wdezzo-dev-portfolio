
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, Sun, Moon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onToggleTheme: () => void;
  isDark: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleTheme, isDark }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const ThemeToggleIcon = () => (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ y: 10, opacity: 0, rotate: 45 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: -10, opacity: 0, rotate: -45 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon size={24} className="text-white" />
        ) : (
          <Sun size={24} className="text-black" />
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white/95 dark:bg-brutal-black/95 backdrop-blur-md border-b-4 border-black dark:border-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="#" 
              onClick={(e) => handleScroll(e, '#')}
              className="text-2xl sm:text-3xl font-black tracking-tighter bg-black dark:bg-white text-white dark:text-black px-2 py-1 transform -rotate-2 hover:rotate-0 transition-transform"
            >
              WDEZZO_DEV
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-4 lg:space-x-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-lg lg:text-xl font-bold hover:bg-brutal-lime hover:text-black border-2 border-transparent hover:border-black dark:hover:border-white hover:shadow-hard dark:hover:shadow-hard-white px-4 py-1 transition-all duration-100"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9, x: 2, y: 2 }}
              onClick={onToggleTheme}
              className="p-3 border-2 border-black dark:border-white bg-brutal-yellow dark:bg-brutal-purple shadow-hard dark:shadow-hard-white hover:shadow-none dark:hover:shadow-none hover:translate-x-1 dark:hover:translate-x-1 hover:translate-y-1 transition-all dark:hover:translate-y-1 overflow-hidden"
              aria-label="Toggle Theme"
            >
              <ThemeToggleIcon />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
             <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onToggleTheme}
              className="p-2 border-2 border-black dark:border-white bg-brutal-yellow dark:bg-brutal-purple shadow-hard dark:shadow-hard-white active:shadow-none transition-all overflow-hidden"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'moon-mobile' : 'sun-mobile'}
                  initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Moon size={20} className="text-white" /> : <Sun size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border-2 border-black dark:border-white hover:bg-brutal-lime active:shadow-none shadow-hard dark:shadow-hard-white transition-all"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t-4 border-black dark:border-white bg-white dark:bg-brutal-black absolute w-full left-0 top-20 shadow-hard-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="block px-3 py-4 text-2xl font-black hover:bg-brutal-pink-neon dark:hover:text-black border-b-2 border-black dark:border-white last:border-0"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

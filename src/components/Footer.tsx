
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black dark:bg-black text-white pt-12 pb-24 md:pb-16 border-t-4 border-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left group relative">
          <h2 className="text-3xl font-black tracking-tighter">WDEZZO_DEV</h2>
          
          {/* DISCREET ADMIN LINK: Appears on hover of the branding */}
          <Link 
            to="/admin" 
            className="absolute -top-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity bg-brutal-red text-white text-[10px] px-2 py-0.5 font-mono font-bold flex items-center gap-1 shadow-hard"
          >
            <Shield size={10} /> SYSTEM_ROOT_ACCESS
          </Link>

          <p className="font-mono text-sm text-gray-400 mt-2">
            © {new Date().getFullYear()} // ALL RIGHTS RESERVED.<br/>
            <span className="text-[10px] opacity-50">DESIGNED FOR THE AGGRESSIVE WEB.</span>
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-mono text-sm font-bold">
          <a 
            href="https://github.com/wdezzo-kak" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-brutal-lime hover:underline decoration-2 underline-offset-4 transition-colors"
          >
            GITHUB
          </a>
          <a 
            href="https://wa.me/249966976830" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-brutal-lime hover:underline decoration-2 underline-offset-4 transition-colors"
          >
            WHATSAPP
          </a>
          <a 
            href="https://www.linkedin.com/in/abdalla-izzeldin" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-brutal-lime hover:underline decoration-2 underline-offset-4 transition-colors"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

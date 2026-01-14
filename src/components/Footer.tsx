import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black dark:bg-black text-white py-12 border-t-4 border-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-3xl font-black tracking-tighter">BRUTAL_DEV</h2>
          <p className="font-mono text-sm text-gray-400 mt-2">© {new Date().getFullYear()} // NO RIGHTS RESERVED.</p>
        </div>
        
        <div className="flex gap-8 font-mono text-sm font-bold">
          <a 
            href="https://github.com/wdezzo-kak" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-brutal-lime hover:underline decoration-2 underline-offset-4"
          >
            GITHUB
          </a>
          <a 
            href="https://wa.me/249966976830" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-brutal-lime hover:underline decoration-2 underline-offset-4"
          >
            WHATSAPP
          </a>
          <a 
            href="https://www.linkedin.com/in/abdalla-izzeldin" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-brutal-lime hover:underline decoration-2 underline-offset-4"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
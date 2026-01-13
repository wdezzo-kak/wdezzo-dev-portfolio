import React from 'react';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-brutal-yellow relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      ></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white border-4 border-black shadow-hard-xl p-8 md:p-12">
          
          <div className="mb-10 text-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">INITIATE<br/>CONTACT</h2>
            <p className="font-mono text-xl">Let's build something aggressive.</p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block font-black uppercase text-lg">Identity</label>
                <input 
                  type="text" 
                  placeholder="NAME OR ALIAS" 
                  className="w-full bg-[#f0f0f0] border-2 border-black p-4 font-mono focus:outline-none focus:bg-brutal-blue-electric focus:shadow-hard transition-all placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-black uppercase text-lg">Coordinates</label>
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-[#f0f0f0] border-2 border-black p-4 font-mono focus:outline-none focus:bg-brutal-blue-electric focus:shadow-hard transition-all placeholder-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-black uppercase text-lg">Transmission</label>
              <textarea 
                rows={5} 
                placeholder="YOUR MESSAGE HERE..." 
                className="w-full bg-[#f0f0f0] border-2 border-black p-4 font-mono focus:outline-none focus:bg-brutal-blue-electric focus:shadow-hard transition-all placeholder-gray-500"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-black text-white text-2xl font-black uppercase py-6 border-2 border-transparent hover:bg-brutal-lime hover:text-black hover:border-black hover:shadow-hard transition-all duration-200 flex items-center justify-center gap-4 group"
            >
              SEND DATA <Send className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
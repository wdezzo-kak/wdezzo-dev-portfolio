import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="stack" className="py-20 bg-brutal-bg border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              CORE<br/>STACK
            </h2>
            <p className="font-mono text-lg mt-4 md:mt-0 max-w-md border-l-4 border-brutal-orange-hot pl-4">
              The essential toolkit I use to craft structure, style, and interactivity.
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border-2 border-black">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={skill.name} 
                className="group relative p-6 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 flex flex-col items-center justify-center text-center aspect-square"
              >
                {Icon && <Icon size={48} className="mb-4 stroke-1 group-hover:stroke-brutal-lime transition-colors" />}
                <h3 className="font-bold text-lg uppercase tracking-wider mb-2">{skill.name}</h3>
                <span className="text-xs font-mono px-2 py-1 border border-black group-hover:border-white group-hover:text-brutal-lime">
                  {skill.level}
                </span>
                
                {/* Corner Accents */}
                <div className="absolute top-1 left-1 w-2 h-2 bg-black group-hover:bg-brutal-lime"></div>
                <div className="absolute top-1 right-1 w-2 h-2 bg-black group-hover:bg-brutal-lime"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 bg-black group-hover:bg-brutal-lime"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-black group-hover:bg-brutal-lime"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
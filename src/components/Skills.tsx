
import React, { memo } from 'react';
import { DEFAULT_SKILLS, SKILL_ICONS } from '../constants';
import { Skill } from '../types';

const SkillItem = memo(({ skill }: { skill: Skill }) => {
  const Icon = SKILL_ICONS[skill.name];
  return (
    <li className="group relative p-6 bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white transition-all duration-150 flex flex-col items-center justify-center text-center aspect-square cursor-crosshair overflow-hidden">
      {Icon && (
        <Icon 
          size={48} 
          className="mb-4 stroke-[1px] text-black dark:text-white group-hover:text-brutal-lime transition-colors relative z-10" 
          aria-hidden="true"
        />
      )}
      <h3 className="font-bold text-lg uppercase tracking-wider mb-2 text-black dark:text-white group-hover:text-brutal-lime transition-colors relative z-10">
        {skill.name}
      </h3>
      <span className="text-xs font-mono px-2 py-1 border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white group-hover:border-brutal-lime group-hover:bg-black dark:group-hover:bg-white group-hover:text-brutal-lime transition-all relative z-10 font-bold">
        {skill.level}
      </span>
      <div className="absolute top-1 left-1 w-2 h-2 bg-black dark:bg-white transition-colors group-hover:bg-brutal-lime" aria-hidden="true"></div>
      <div className="absolute top-1 right-1 w-2 h-2 bg-black dark:bg-white transition-colors group-hover:bg-brutal-lime" aria-hidden="true"></div>
      <div className="absolute bottom-1 left-1 w-2 h-2 bg-black dark:bg-white transition-colors group-hover:bg-brutal-lime" aria-hidden="true"></div>
      <div className="absolute bottom-1 right-1 w-2 h-2 bg-black dark:bg-white transition-colors group-hover:bg-brutal-lime" aria-hidden="true"></div>
    </li>
  );
});

const Skills: React.FC<{ dynamicSkills?: Skill[] }> = ({ dynamicSkills }) => {
  const skillsToDisplay = dynamicSkills || DEFAULT_SKILLS;
  return (
    <div className="py-20 bg-[#f0f0f0] dark:bg-neutral-900 border-b-4 border-black dark:border-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <h2 id="stack-heading" className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-black dark:text-white">CORE<br/>STACK</h2>
            <p className="font-mono text-lg mt-4 md:mt-0 max-w-md border-l-4 border-brutal-orange-hot pl-4 text-black dark:text-neutral-200">The essential toolkit I use to craft structure, style, and interactivity.</p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-2 border-black dark:border-white" aria-labelledby="stack-heading">
          {skillsToDisplay.map((skill) => <SkillItem key={skill.name} skill={skill} />)}
        </ul>
      </div>
    </div>
  );
};

export default Skills;

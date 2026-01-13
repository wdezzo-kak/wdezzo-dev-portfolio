import { Project, Skill, NavItem } from './types';
import { FileCode, Palette, Terminal, Layout,  MonitorSmartphone, Component } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'WORK', href: '#work' },
  { label: 'STACK', href: '#stack' },
  { label: 'CONTACT', href: '#contact' },
];

export const SKILLS: Skill[] = [
  { name: 'HTML5', level: 'SEMANTIC', icon: FileCode },
  { name: 'CSS3', level: 'VISUAL', icon: Palette },
  { name: 'JavaScript', level: 'INTERACTIVE', icon: Terminal },
  { name: 'Bootstrap', level: 'FRAMEWORK', icon: Layout },
  { name: 'Tailwind', level: 'UTILITY', icon: Component },
  { name: 'Responsive', level: 'ADAPTIVE', icon: MonitorSmartphone },
];

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'NEON_LAUNCH',
    category: 'PRODUCT LANDING',
    description: 'High-conversion landing page for a cyberpunk fashion brand. CSS Grid layout with neon glow effects.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    year: '2024',
    imageUrl: 'https://picsum.photos/800/600?grayscale',
    link: '#',
    demoUrl: '/projects/neon-launch/index.html',
    color: 'bg-brutal-lime',
  },
  {
    id: '02',
    title: 'STARTUP_X',
    category: 'SAAS MARKETING',
    description: 'Clean, responsive marketing site for a fintech startup. Built rapidly using Bootstrap 5 components.',
    tech: ['Bootstrap', 'Sass', 'HTML'],
    year: '2024',
    imageUrl: 'https://picsum.photos/800/601?grayscale',
    link: '#',
    demoUrl: '/projects/startup-x/index.html',
    color: 'bg-brutal-pink-neon',
  },
  {
    id: '03',
    title: 'TURBO_AGENCY',
    category: 'PORTFOLIO',
    description: 'A single-page agency portfolio focused on typography and whitespace. Mobile-first approach.',
    tech: ['Tailwind CSS', 'Alpine.js'],
    year: '2023',
    imageUrl: 'https://picsum.photos/800/602?grayscale',
    link: '#',
    demoUrl: '/projects/turbo-agency/index.html',
    color: 'bg-brutal-blue-electric',
  },
  {
    id: '04',
    title: 'EVENT_HORIZON',
    category: 'EVENT PAGE',
    description: 'Conference registration page with custom JavaScript form validation and scroll animations.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    year: '2023',
    imageUrl: 'https://picsum.photos/800/603?grayscale',
    link: '#',
    demoUrl: '/projects/event-horizon/index.html',
    color: 'bg-brutal-orange-hot',
  },
];
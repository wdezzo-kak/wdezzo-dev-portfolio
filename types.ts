import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  imageUrl: string;
  link: string;
  demoUrl: string;
  color: string;
}

export interface Skill {
  name: string;
  level: string; // e.g., "CORE", "ADVANCED", "MASTER"
  icon?: LucideIcon;
}

export interface NavItem {
  label: string;
  href: string;
}
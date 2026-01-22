
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

// Added show_in_testimonials property to resolve type mismatch in constants.ts
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  message: string;
  color: string;
  rating: number;
  show_in_testimonials?: boolean;
}
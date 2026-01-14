import { Project, Skill, NavItem, Testimonial } from './types';
import { FileCode, Palette, Terminal, Layout,  MonitorSmartphone, Component } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'WORK', href: '#work' },
  { label: 'STACK', href: '#stack' },
  { label: 'LOGS', href: '#testimonials' },
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
    "id": "01",
    "title": "AHMED_BIN_BAKHIT",
    "category": "LANDING PAGE",
    "description": "A luxury landing page focused on heritage, craftsmanship, and premium retail storytelling.",
    "tech": [
      "Tailwind CSS",
      "Google Fonts",
      "Intersection Observer API",
      "Native JavaScript"
    ],
    "year": "2023",
    "imageUrl": "/projects/Ahmed_bin_Bakhit_bin_Mohammed_Sfrar_Trading_Est/cover.webp",
    "link": "#",
    "demoUrl": "/projects/Ahmed_bin_Bakhit_bin_Mohammed_Sfrar_Trading_Est/index.html",
    "color": "bg-brutal-cyan-deep"
  },
  {
    "id": "02",
    "title": "AL-HAYTHAM",
    "category": "IT AGENCY",
    "description": "An enterprise IT website showcasing secure network infrastructure and digital solutions.",
    "tech": [
      "Bootstrap",
      "AOS",
      "GLightbox",
      "Swiper",
      "PHP",
      "Google Fonts",
      "Bootstrap Icons"
    ],
    "year": "2025",
    "imageUrl": "/projects/Al-Haytham_for_Trade_and_Investment/cover.webp",
    "link": "#",
    "demoUrl": "/projects/Al-Haytham_for_Trade_and_Investment/index.html",
    "color": "bg-brutal-blue-electric"
  },
  {
    "id": "03",
    "title": "EMAAR_AL_SAHARA",
    "category": "CONSTRUCTION",
    "description": "A construction company website focused on structural integrity and commercial projects.",
    "tech": [
      "Bootstrap",
      "AOS",
      "GLightbox",
      "Swiper",
      "Google Fonts",
      "PureCounter"
    ],
    "year": "2024",
    "imageUrl": "/projects/Emaar_Al_Sahara_Trading_&_Contracting_LLC/cover.webp",
    "link": "#",
    "demoUrl": "/projects/Emaar_Al_Sahara_Trading_&_Contracting_LLC/index.html",
    "color": "bg-brutal-orange-hot"
  },
  {
    "id": "04",
    "title": "IRTIQA_DIGITAL",
    "category": "SOCIAL MEDIA AGENCY",
    "description": "A social media agency website designed for high-impact marketing campaigns.",
    "tech": [
      "Bootstrap",
      "Animate.css",
      "Owl Carousel",
      "Lightbox",
      "FontAwesome",
      "Google Fonts",
      "WOW.js"
    ],
    "year": "2024",
    "imageUrl": "/projects/Irtiqa_services_and_investment/cover.webp",
    "link": "#",
    "demoUrl": "/projects/Irtiqa_services_and_investment/index.html",
    "color": "bg-brutal-magenta-dark"
  },
  {
    "id": "05",
    "title": "MAJID_ELECTRICAL_SOLUTIONS",
    "category": "ELECTRICAL SERVICES",
    "description": "An industrial website for large-scale electrical supply and contracting services.",
    "tech": [
      "Bootstrap",
      "Owl Carousel",
      "WOW.js",
      "Animate.css",
      "Google Fonts",
      "Font Awesome",
      "Bootstrap Icons",
      "Lightbox",
      "Counter-Up"
    ],
    "year": "2024",
    "imageUrl": "/projects/Majid_Al-Shami_Trading_and_Contracting_Company/cover.webp",
    "link": "#",
    "demoUrl": "/projects/Majid_Al-Shami_Trading_and_Contracting_Company/index.html",
    "color": "bg-brutal-yellow"
  },
  {
    "id": "06",
    "title": "MIHRAB",
    "category": "E-COMMERCE",
    "description": "An e-commerce website for household products and retail solutions.",
    "tech": [
      "Bootstrap",
      "Font Awesome",
      "Owl Carousel",
      "Lightbox",
      "jQuery",
      "Google Fonts Poppins"
    ],
    "year": "2024",
    "imageUrl": "/projects/Mihrab_Trading_and_Investment/cover.webp",
    "link": "#",
    "demoUrl": "/projects/Mihrab_Trading_and_Investment/index.html",
    "color": "bg-brutal-cyan-deep"
  },
  {
    "id": "07",
    "title": "MODERN_PILLARS",
    "category": "CONSTRUCTION MATERIALS",
    "description": "A corporate website for a premium construction materials supplier.",
    "tech": [
      "Bootstrap",
      "Owl Carousel",
      "WOW.js",
      "Animate.css",
      "Font Awesome",
      "Google Fonts",
      "jQuery"
    ],
    "year": "2024",
    "imageUrl": "/projects/Modern_Pillars/cover.webp",
    "link": "#",
    "demoUrl": "/projects/Modern_Pillars/index.html",
    "color": "bg-brutal-orange-hot"
  },
  {
    "id": "08",
    "title": "MOHAMED_BELLA_RETAIL",
    "category": "RETAIL & INVESTMENT",
    "description": "A retail and investment website focused on trust and modern consumer engagement.",
    "tech": [
      "Bootstrap",
      "AOS",
      "GLightbox",
      "Swiper",
      "PureCounter",
      "Google Fonts"
    ],
    "year": "2024",
    "imageUrl": "/projects/Mohamed_Bella_Trading_and_Investment/cover.webp",
    "link": "#",
    "demoUrl": "/projects/Mohamed_Bella_Trading_and_Investment/index.html",
    "color": "bg-brutal-blue-electric"
  },
  {
    "id": "09",
    "title": "THE_WIDE_HORIZON",
    "category": "TRAVEL AGENCY",
    "description": "A travel agency website promoting tourism experiences across Oman.",
    "tech": [
      "Bootstrap",
      "Owl Carousel",
      "AOS",
      "Magnific Popup",
      "Animate.css",
      "Ionicons",
      "Google Fonts",
      "jQuery",
      "Bootstrap Datepicker"
    ],
    "year": "2024",
    "imageUrl": "/projects/The_wide_horizon_of_trade_and_investment/cover.webp",
    "link": "#",
    "demoUrl": "/projects/The_wide_horizon_of_trade_and_investment/index.html",
    "color": "bg-brutal-blue-electric"
  },
  {
    "id": "10",
    "title": "ZAHRET_AL_BUSTAN",
    "category": "IT AGENCY",
    "description": "An IT services website focused on networking, security, and digital infrastructure.",
    "tech": [
      "Bootstrap",
      "Bootstrap Icons",
      "AOS (Animate On Scroll)",
      "Swiper",
      "Google Fonts"
    ],
    "year": "2024",
    "imageUrl": "/projects/Zahret_Al_Bustan_Modern_Business_LLC/cover.webp",
    "link": "#",
    "demoUrl": "/projects/Zahret_Al_Bustan_Modern_Business_LLC/index.html",
    "color": "bg-brutal-blue-electric"
  }
];

export const TESTIMONIALS_SAFELIST: Testimonial[] = [
  {
    id: 'x9k2m5p8z1',
    name: 'SARAH_CONNOR',
    role: 'TECH_LEAD @ SKYNET',
    message: "The efficiency of the landing pages built here is unmatched. Clean, aggressive code that just works.",
    color: 'bg-brutal-yellow',
    rating: 5
  },
  {
    id: 'r4v7n2q9w5',
    name: 'VICTOR_NASH',
    role: 'FOUNDER @ TURBO_UI',
    message: "Finally a developer who understands that speed and aesthetics aren't mutually exclusive. High impact delivery.",
    color: 'bg-brutal-cyan-deep',
    rating: 4
  },
  {
    id: 'm1j8b3l6k0',
    name: 'ELARA_VOX',
    role: 'CREATIVE_DIR @ NEON_LABS',
    message: "The neobrutalist approach took our brand to a whole new level of visibility. Bold design for bold brands.",
    color: 'bg-brutal-pink-neon',
    rating: 5
  },
  {
    id: 'h2g5f9d3s1',
    name: 'MARCUS_WRIGHT',
    role: 'CTO @ CYBERDYNE',
    message: "Production-ready code with a visual edge that dominates the screen. Highly recommended for startups.",
    color: 'bg-brutal-lime',
    rating: 5
  }
];
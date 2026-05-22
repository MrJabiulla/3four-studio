// ============================================================
// MODEL — pure data, no logic, no UI
// ============================================================

export const Model = {
  brand:    '3Four Studio',
  logo:     '/logo.png',
  tagline:  'We Build Digital Products That Matter.',
  heroSub:  'From product strategy and UI/UX design to development and deployment, we build reliable digital solutions that help companies scale confidently.',
  heroImage:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=90&auto=format&fit=crop',

  navLinks: ['Services', 'Work', 'About', 'Contact'],

  services: [
    { num: '01', title: 'Web Development',  desc: 'React, Next.js and Node.js apps built for speed, scale, and long-term maintainability.', icon: '⬡' },
    { num: '02', title: 'Mobile Apps',      desc: 'Cross-platform iOS & Android with React Native that feel truly native.',                  icon: '◈' },
    { num: '03', title: 'UI/UX Design',     desc: 'Systematic design that bridges beautiful interfaces with measurable business outcomes.',   icon: '◉' },
    { num: '04', title: 'Brand Identity',   desc: 'Visual language, typography, and systems that make your brand impossible to forget.',      icon: '◇' },
    { num: '05', title: 'SaaS Products',    desc: 'From MVP to full product — we architect, build, and ship software as a service.',          icon: '◫' },
    { num: '06', title: 'API & Backend',    desc: 'Scalable REST/GraphQL APIs, microservices, and cloud infrastructure on AWS & GCP.',        icon: '◳' },
  ],

  projects: [
    { title: 'FinTrack',  tag: 'Fintech · Web App',      year: '2024', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop' },
    { title: 'MedFlow',   tag: 'HealthTech · Mobile',    year: '2024', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80&auto=format&fit=crop' },
    { title: 'LogiCore',  tag: 'SaaS · Dashboard',       year: '2023', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80&auto=format&fit=crop' },
    { title: 'Brandify',  tag: 'Brand Identity · Design', year: '2024', img: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=700&q=80&auto=format&fit=crop' },
    { title: 'ShopWave',  tag: 'E-Commerce · Web App',   year: '2023', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=80&auto=format&fit=crop' },
    { title: 'NexCloud',  tag: 'DevOps · AWS',           year: '2023', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80&auto=format&fit=crop' },
  ],

  stats: [
    { value: '120+', label: 'Projects Shipped' },
    { value: '98%',  label: 'Client Retention'  },
    { value: '5yr',  label: 'In Business'        },
    { value: '3×',   label: 'Avg ROI Delivered'  },
  ],

  skills: [
  'Flutter',
  'React',
  'Next.js',
  'Node.js',
  'FastAPI',
  'TypeScript',
  'PostgreSQL',
  'Supabase',
  'Firebase',
  'React Native',
  'Docker',
  'AWS',
  'Cloudflare',
  'Figma',
  'UI/UX',
  'REST API',
  'System Design'
],

  aboutCards: [
    { label: 'Engineering', sub: 'React · Node · AWS'              },
    { label: 'Design',      sub: 'Figma · Motion · UX'             },
    { label: 'Mobile',      sub: 'React Native · iOS · Android'    },
    { label: 'Strategy',    sub: 'Roadmap · GTM · Growth'          },
  ],

  testimonials: [
    { quote: '3Four delivered our platform 2 weeks early and the quality was exceptional.', author: 'Rafi Hossain',     role: 'CEO, FinTrack'           },
    { quote: "They don't just write code — they think about the product. That's rare.",      author: 'Tasnim Akter',    role: 'Product Lead, MedFlow'   },
    { quote: 'Best investment we made. The app doubled our engagement in 3 months.',         author: 'Nabil Chowdhury', role: 'Founder, LogiCore'        },
  ],

  contactEmail: 'hello@3fourstudio.com',
  socials: ['GitHub', 'LinkedIn', 'Dribbble'],
  footerYear: new Date().getFullYear(),
  footerLocation: 'Dhaka, Bangladesh',
};

/**
 * Homepage services — single data file (future: hydrate from /api/services).
 * Each item uses static image paths today; swap `image` for DB URLs when CMS is live.
 */
export const serviceCategories = [
  {
    id: 'development',
    title: 'Full-Stack Development',
    description:
      'React/Vite frontends, Python or Node APIs, SQLite/Postgres, and cPanel or Render deploys.',
    items: [
      {
        id: 'frontend',
        title: 'Frontend & UX',
        blurb: 'This site — React 19, Vite, GSAP, Tailwind. Fast, responsive, conversion-focused.',
        stack: ['React', 'Vite', 'Tailwind', 'GSAP'],
        image: '/assets/projects/velare.jpg',
        href: 'https://velare-site.netlify.app',
      },
      {
        id: 'backend',
        title: 'APIs & Auth',
        blurb: 'Express/Python REST, session auth, contact forms, Stripe hooks, admin dashboards.',
        stack: ['Python', 'Node.js', 'SQLite', 'Stripe'],
        image: '/images/captainfunds1.png',
        href: '/demo',
      },
      {
        id: 'engines',
        title: 'Systems & Graphics',
        blurb: 'C++20 game loop, OpenGL, WASM builds — Light Years engine and graphics coursework.',
        stack: ['C++20', 'OpenGL', 'WASM', 'CMake'],
        image: '/assets/projects/light-years.png',
        href: '/demo',
      },
    ],
  },
  {
    id: 'media',
    title: 'Video & Motion',
    description: 'Selected reels and athletics work — full portfolio in Work.',
    items: [
      {
        id: 'sports',
        title: 'Athletics & Events',
        blurb: 'University athletics — game recaps, multi-cam, fast social cuts.',
        stack: ['Premiere', 'Sony A6100', 'Sports'],
        image: '/assets/projects/mens-basketball.jpg',
        video: '/assets/videos/mens-basketball.mp4',
        href: '/#work',
      },
      {
        id: 'commercial',
        title: 'Brand & Promo',
        blurb: 'Short-form promos for local businesses — hooks, color, platform-ready exports.',
        stack: ['Premiere', 'Color', 'Social'],
        image: '/assets/projects/barbershop-promo.jpg',
        video: '/assets/videos/barbershop-promo.mp4',
        href: '/#work',
      },
      {
        id: 'motion',
        title: '3D & Motion',
        blurb: 'WebGL product landings and Blender motion — Velare and campus 3D assets.',
        stack: ['Three.js', 'Blender', 'GSAP'],
        image: '/assets/projects/velare.jpg',
        href: 'https://velare-site.netlify.app',
      },
    ],
  },
];

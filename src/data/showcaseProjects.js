/**
 * Single source of truth for portfolio / Works section.
 * demoUrl: Netlify until cPanel subdomain verified — see src/data/portfolioDemos.js
 */

export const SHOWCASE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'development', label: 'Code' },
  { id: 'video', label: 'Video' },
  { id: 'motion', label: 'Motion' },
  { id: 'wip', label: 'WIP' },
];

export const showcaseProjects = [
  // --- CODE / FULL-STACK ---
  {
    id: 'captain-funds',
    name: 'Captain Funds — MERN Fundraising',
    category: 'development',
    status: 'live',
    demoUrl: 'https://captainfunds.netlify.app',
    githubUrl: 'https://github.com/solufelo/CAPTAIN-FUNDS-MERN',
    caseStudyUrl: null,
    image: '/assets/projects/captainfunds.png',
    bgImage: '/assets/projects/captainfunds.png',
    video: null,
    stack: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
    blurb: 'Campaign creation, donations, role-based access, admin analytics.',
  },
  {
    id: 'velare',
    name: 'Velare — 3D Motorbike Landing',
    category: 'motion',
    status: 'wip',
    demoUrl: 'https://velare-site.netlify.app', // cPanel: velare.captainsolo.ca when uploaded
    githubUrl: 'https://github.com/solufelo/velare-site',
    caseStudyUrl: null,
    image: '/assets/projects/velare.png',
    bgImage: '/assets/projects/velare.png',
    video: null,
    stack: ['Next.js', 'Three.js', 'R3F', 'GSAP'],
    blurb: 'Immersive WebGL product showcase with scroll-driven motion.',
  },
  {
    id: 'suburbia',
    name: 'Suburbia — Skate Shop',
    category: 'development',
    status: 'wip',
    demoUrl: 'https://suburbia-solo.netlify.app',
    githubUrl: 'https://github.com/solufelo/suburbia-solo',
    caseStudyUrl: null,
    image: '/assets/projects/suburbia.png',
    bgImage: '/assets/projects/suburbia.png',
    video: null,
    stack: ['Next.js', 'Prismic CMS', 'Tailwind'],
    blurb: 'Headless CMS e-commerce with SEO-focused product pages.',
  },
  {
    id: 'cinemaverse',
    name: 'CinemaVerse — Movie Tracker',
    category: 'development',
    status: 'wip',
    demoUrl: 'https://cinemaverse-solo.netlify.app',
    githubUrl: 'https://github.com/solufelo/CinemaVerse',
    caseStudyUrl: null,
    image: '/assets/projects/cinemaverse.png',
    bgImage: '/assets/projects/cinemaverse.png',
    video: null,
    stack: ['Wasp', 'React', 'PostgreSQL', 'AI'],
    blurb: 'Watchlists + AI recommendations via TMDB and OpenRouter.',
  },
  {
    id: 'findyou',
    name: 'findYOU OS',
    category: 'development',
    status: 'wip',
    demoUrl: '/demo',
    githubUrl: 'https://github.com/solufelo',
    caseStudyUrl: '/demo',
    image: '/assets/projects/findyou.png',
    bgImage: '/assets/projects/findyou.png',
    video: null,
    stack: ['React', 'Python', 'Playwright', 'SQLite'],
    blurb: 'My productivity OS — rough walkthrough on /demo. Still building.',
    internalDemo: true,
  },
  {
    id: 'light-years',
    name: 'Light Years — C++20 Engine',
    category: 'development',
    status: 'wip',
    demoUrl: '/demo',
    githubUrl: 'https://github.com/solufelo/light-years-cpp',
    caseStudyUrl: '/demo',
    image: '/assets/projects/light-years.png',
    bgImage: '/assets/projects/light-years.png',
    video: null,
    stack: ['C++20', 'SFML', 'CMake', 'Box2D', 'WASM'],
    blurb: 'Space shooter engine — architecture walkthrough on /demo.',
    internalDemo: true,
  },
  {
    id: 'captainsolo-site',
    name: 'captainsolo.ca — This Site',
    category: 'development',
    status: 'live',
    demoUrl: 'https://captainsolo.ca',
    githubUrl: 'https://github.com/solufelo',
    caseStudyUrl: null,
    image: '/assets/projects/captainsolo.png',
    bgImage: '/assets/projects/captainsolo.png',
    video: null,
    stack: ['React', 'Vite', 'GSAP', 'cPanel', 'Python'],
    blurb: 'Netlify → cPanel migration, SSL, DNS, Private Email, deploy pipeline.',
  },

  // --- VIDEO ---
  {
    id: 'barbershop',
    name: 'Barbershop Promotional Content',
    category: 'video',
    status: 'live',
    demoUrl: 'https://www.instagram.com/reel/CsCKDtUJGo2/',
    githubUrl: null,
    caseStudyUrl: null,
    image: '/assets/projects/barbershop-promo.jpg',
    bgImage: '/assets/projects/barbershop-promo.jpg',
    video: '/assets/videos/barbershop-promo.mp4',
    stack: ['Premiere Pro', 'Sony A6100'],
    blurb: 'High-energy social promo — cinematic cuts, music sync.',
  },
  {
    id: 'club-event',
    name: 'Club Event Coverage',
    category: 'video',
    status: 'live',
    demoUrl: 'https://www.instagram.com/reel/CqQzDikJRQj/',
    githubUrl: null,
    caseStudyUrl: null,
    image: '/assets/projects/club-event.jpg',
    bgImage: '/assets/projects/club-event.jpg',
    video: '/assets/videos/club-event.mp4',
    stack: ['Multi-Cam', 'Gimbal', 'Live Coverage'],
    blurb: 'Event energy capture with fast-paced beat-synced editing.',
  },
  {
    id: 'womens-bball',
    name: "Women's University Basketball",
    category: 'video',
    status: 'live',
    demoUrl: 'https://www.instagram.com/reel/Coi6VfvuGDq/',
    githubUrl: null,
    caseStudyUrl: null,
    image: '/assets/projects/womens-basketball.jpg',
    bgImage: '/assets/projects/womens-basketball.jpg',
    video: '/assets/videos/womens-basketball.mp4',
    stack: ['Sports Video', 'Telephoto'],
    blurb: 'Athletic highlights for university athletics.',
  },
  {
    id: 'mens-bball',
    name: "Men's Basketball — Game Recap",
    category: 'video',
    status: 'live',
    demoUrl: 'https://www.instagram.com/reel/C0VtaMVM0iF/',
    githubUrl: null,
    caseStudyUrl: null,
    image: '/assets/projects/mens-basketball.jpg',
    bgImage: '/assets/projects/mens-basketball.jpg',
    video: '/assets/videos/mens-basketball.mp4',
    stack: ['Athletics', 'Game Recap'],
    blurb: 'University athletics recap — multi-cam, beat-synced cuts.',
  },
];

export function filterShowcaseProjects(projects, filterId) {
  if (filterId === 'all') return projects;
  if (filterId === 'wip') return projects.filter((p) => p.status === 'wip');
  return projects.filter((p) => p.category === filterId);
}

/**
 * Map a `projects` DB row (snake_case, from the admin CMS) into the shape the
 * Works UI expects. Keeps the frontend decoupled from the DB column names.
 */
export function mapProjectRow(row) {
  let stack = [];
  if (Array.isArray(row.stack)) {
    stack = row.stack;
  } else if (typeof row.stack === 'string' && row.stack.trim()) {
    try {
      stack = JSON.parse(row.stack);
    } catch {
      stack = row.stack.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    status: row.status || 'wip',
    demoUrl: row.demo_url || null,
    githubUrl: row.github_url || null,
    caseStudyUrl: row.case_study_url || null,
    image: row.image_url || null,
    bgImage: row.image_url || null,
    video: row.video_url || null,
    stack,
    blurb: row.blurb || '',
    internalDemo: row.internal_demo === 1 || row.internal_demo === true,
  };
}

/**
 * Load published projects from the CMS API. Falls back to the static
 * `showcaseProjects` array if the API is unavailable or returns nothing, so the
 * site always renders.
 */
export async function loadShowcaseProjects() {
  try {
    const { supabase } = await import('../lib/supabase');
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', 1)
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return showcaseProjects;
    return data.map(mapProjectRow);
  } catch {
    return showcaseProjects;
  }
}

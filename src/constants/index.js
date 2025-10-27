// Solomon Olufelo - Captain Solo Portfolio Constants
// Contact: work@captainsolo.ca
// Instagram: @caaptainsolo

// =============================================================================
// SERVICES DATA - Full-Stack Development + Video Production
// =============================================================================
export const servicesData = [
  {
    title: "Full-Stack Web Development",
    description:
      "Build fast, scalable web applications with modern tech. From MVP to production—clean code, optimized databases, seamless user experiences. React, Next.js, Node.js, and everything needed to bring your digital vision to life.",
    items: [
      {
        title: "Frontend Development",
        description: "(React, Next.js, TypeScript, Tailwind CSS)",
        hoverDescription: "This portfolio you're viewing right now? Built from scratch with React + Vite, GSAP animations, and Tailwind CSS. Responsive, fast, and optimized for conversions.",
      },
      {
        title: "Backend Engineering",
        description: "(Node.js, Express, REST APIs, Authentication)",
        hoverDescription: "I integrate secure backend systems, user authentication, payment processing (Stripe), and RESTful APIs to power your web apps—like the contact form system on this site.",
      },
      {
        title: "Database Design",
        description: "(MongoDB, PostgreSQL, Firebase)",
        hoverDescription: "I architect scalable database structures for user accounts, e-commerce inventory, booking systems, and content management—ensuring your data is organized and secure.",
      },
    ],
  },
  {
    title: "Video Production & Content",
    description:
      "Content that converts attention into customers. 6 years experience, 1,400+ projects, 4.8★ rating. Social media reels, promotional videos, event coverage, music videos—shot, edited, and optimized for results.",
    items: [
      {
        title: "Social Media Content",
        description: "(Reels, TikToks, YouTube Shorts, Algorithm-optimized)",
        hoverDescription: "Shot and edited 1,400+ social media videos with Sony A6100, gimbal work, and color grading. I understand platform algorithms—vertical format, hook in 3 seconds, trending audio.",
      },
      {
        title: "Commercial & Promo",
        description: "(Brand videos, Product demos, Service showcases)",
        hoverDescription: "Created promo content for barbershops, restaurants, and service businesses. I capture your brand story in 30-60 seconds that actually drives bookings and sales.",
      },
      {
        title: "Event Coverage",
        description: "(Corporate events, Launches, Performances, Real-time social)",
        hoverDescription: "Covered 100+ events including university basketball, club nights, and performances. Multi-camera setups, real-time social media delivery, and same-day highlights.",
      },
    ],
  },
  {
    title: "Artist & Music Content",
    description:
      "Professional visuals for independent artists. Music videos, performance capture, mic freestyle promos, press kits. Industry-quality production that fits independent budgets. Proven results: 2-4x stream increase, booking credibility.",
    items: [
      {
        title: "Music Video Production",
        description: "(Single & multi-location, Cinematic, Color grading)",
        hoverDescription: "Directed and shot music videos for independent artists—cinematic color grading, gimbal work, multi-location shoots. Run & gun or full production—I adapt to your budget and vision.",
      },
      {
        title: "Performance Content",
        description: "(Live capture, Mic promos, Behind-the-scenes)",
        hoverDescription: "Quick-turnaround freestyle captures and performance videos that artists use for social media promo. Professional audio sync, energy editing, delivered within 48 hours.",
      },
      {
        title: "Artist Branding",
        description: "(Press kits, Social content, Portfolio shoots)",
        hoverDescription: "I help artists build their visual brand—press kits for booking, portfolio content for pitches, and social media content that grows their following and streams.",
      },
    ],
  },
  {
    title: "Integrated Digital Solutions",
    description:
      "The sweet spot—where code meets creativity. Build the website AND create the content to fill it. Cohesive brand experience from platform to posts. One point of contact for complete digital presence.",
    items: [
      {
        title: "Website + Content Packages",
        description: "(Restaurant sites + menu photos, Artist portfolios + press kits)",
        hoverDescription: "I build the website AND shoot the content to fill it—restaurant sites with professional menu photography, artist portfolios with press kit videos. One cohesive brand experience.",
      },
      {
        title: "E-commerce + Media",
        description: "(Online store + product photography + social content)",
        hoverDescription: "Complete e-commerce solution: I develop the online store, photograph your products, and create social media content to drive traffic. From code to camera—all handled.",
      },
      {
        title: "Content Strategy",
        description: "(Platform optimization + posting guides + analytics)",
        hoverDescription: "I analyze what's working (and what's not), create posting schedules, optimize for each platform's algorithm, and track performance so you know your ROI.",
      },
    ],
  },
];

// =============================================================================
// PORTFOLIO PROJECTS - Real Completed Work
// =============================================================================
export const projects = [
  // === WEB DEVELOPMENT PROJECTS ===
  {
    id: 1,
    name: "Captain Funds - Fundraising Platform",
    description:
      "Full-stack MERN application for campaign creation and donation management. Role-based access control, user authentication, real-time analytics, and comprehensive reporting.",
    href: "https://github.com/solufelo/CAPTAIN-FUNDS-MERN",
    image: "/images/captainfunds1.png",
    bgImage: "/images/captainfunds1.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Express" },
      { id: 5, name: "TypeScript" },
    ],
    category: "development",
    results: "Complete fundraising system with admin panel",
  },
  {
    id: 2,
    name: "Velare - 3D Creative Studio",
    description:
      "Immersive 3D portfolio website with Three.js and React Three Fiber. Interactive WebGL experiences, smooth scroll animations, and responsive 3D environments.",
    href: "https://github.com/solufelo/velare-site",
    image: "/assets/projects/velare.jpg",
    bgImage: "/assets/projects/velare.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Three.js" },
      { id: 3, name: "R3F" },
      { id: 4, name: "GSAP" },
      { id: 5, name: "TypeScript" },
    ],
    category: "development",
    results: "Award-worthy 3D interactive experience",
  },
  {
    id: 3,
    name: "Suburbia - Modern Portfolio",
    description:
      "Next.js portfolio with Prismic CMS integration. Dynamic content management, SEO optimization, and modern design system with Tailwind CSS.",
    href: "https://github.com/solufelo/suburbia-solo",
    image: "/assets/projects/suburbia.jpg",
    bgImage: "/assets/projects/suburbia.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Prismic CMS" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "Tailwind CSS" },
    ],
    category: "development",
    results: "Production-ready CMS-powered portfolio",
  },
  {
    id: 4,
    name: "CinemaVerse - Movie Tracker",
    description:
      "Full-stack movie and TV show tracking platform with AI recommendations. Built with Wasp framework, TMDB API integration, and OpenRouter AI for personalized suggestions.",
    href: "https://github.com/solufelo/CinemaVerse",
    image: "/assets/projects/cinemaverse.jpg",
    bgImage: "/assets/projects/cinemaverse.jpg",
    frameworks: [
      { id: 1, name: "Wasp" },
      { id: 2, name: "React" },
      { id: 3, name: "PostgreSQL" },
      { id: 4, name: "AI Integration" },
    ],
    category: "development",
    results: "AI-powered content tracking with watchlists",
  },

  // === VIDEO PRODUCTION PROJECTS ===
  {
    id: 5,
    name: "Barbershop Promotional Content",
    description:
      "High-energy social media promo for Haircut House Call. Cinematic shots, smooth transitions, music sync. Direct engagement with service-based business content.",
    href: "https://www.instagram.com/reel/CsCKDtUJGo2/",
    image: "/assets/projects/barbershop-promo.jpg",
    bgImage: "/assets/projects/barbershop-promo.jpg",
    video: "/assets/videos/barbershop-promo.mp4", // Add video file for hover preview
    frameworks: [
      { id: 1, name: "Premiere Pro" },
      { id: 2, name: "After Effects" },
      { id: 3, name: "Sony A6100" },
    ],
    category: "video",
    results: "Featured content for local business growth",
  },
  {
    id: 6,
    name: "Club Event Coverage",
    description:
      "Dynamic event videography capturing energy, atmosphere, and key moments. Fast-paced editing, color grading, beat-synced cuts for maximum social media impact.",
    href: "https://www.instagram.com/reel/CqQzDikJRQj/",
    image: "/assets/projects/club-event.jpg",
    bgImage: "/assets/projects/club-event.jpg",
    video: "/assets/videos/club-event.mp4", // Add video file for hover preview
    frameworks: [
      { id: 1, name: "Multi-Cam" },
      { id: 2, name: "Gimbal Work" },
      { id: 3, name: "Live Coverage" },
    ],
    category: "video",
    results: "50+ shares, client repeat bookings",
  },
  {
    id: 7,
    name: "Women's University Basketball",
    description:
      "Athletic videography showcasing game highlights, player performance, and team energy. Capturing pivotal moments with professional sports coverage quality.",
    href: "https://www.instagram.com/reel/Coi6VfvuGDq/",
    image: "/assets/projects/womens-basketball.jpg",
    bgImage: "/assets/projects/womens-basketball.jpg",
    video: "/assets/videos/womens-basketball.mp4", // Add video file for hover preview
    frameworks: [
      { id: 1, name: "Sports Videography" },
      { id: 2, name: "Telephoto 55-210mm" },
      { id: 3, name: "Action Capture" },
    ],
    category: "video",
    results: "Bronze medal athletic videography",
  },
  {
    id: 8,
    name: "Men's Basketball Game Recap",
    description:
      "High-energy game recap with quick cuts, dramatic angles, and music sync. Professional athletic content for university sports teams and recruitment.",
    href: "https://www.instagram.com/reel/C0VtaMVM0iF/",
    image: "/assets/projects/mens-basketball.jpg",
    bgImage: "/assets/projects/mens-basketball.jpg",
    video: "/assets/videos/mens-basketball.mp4", // Add video file for hover preview
    frameworks: [
      { id: 1, name: "Game Coverage" },
      { id: 2, name: "Highlight Editing" },
      { id: 3, name: "WLU Official" },
    ],
    category: "video",
    results: "Official WLU videographer content",
  },
];

// =============================================================================
// SOCIAL MEDIA LINKS - Solomon Olufelo
// =============================================================================
export const socials = [
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/caaptainsolo/",
    handle: "@caaptainsolo"
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/solomon-olufeo-854360241/",
    handle: "Solomon Olufelo"
  },
  { 
    name: "GitHub", 
    href: "https://github.com/solufelo",
    handle: "@solufelo"
  },
  // { 
  //   name: "Email", 
  //   href: "mailto:hello@captainsolo.ca",
  //   handle: "hello@captainsolo.ca"
  // },
  { 
    name: "YouTube", 
    href: "https://www.youtube.com/@captainsolo",
    handle: "Captain Solo"
  },
];

// =============================================================================
// CONTACT INFORMATION
// =============================================================================
export const contactInfo = {
  email: "work@captainsolo.ca",
  emailAlt: "solomonolufelo@outlook.com",
  phone: "289-233-8317",
  phoneFormatted: "(289) 233-8317",
  location: "Brampton, Ontario, Canada",
  locationShort: "Brampton, ON",
  website: "https://www.captainsolo.ca/",
  availability: "Monday-Sunday (See schedule for details)",
};

// =============================================================================
// STATS FOR HERO SECTION
// =============================================================================
export const stats = [
  { label: "Projects Completed", value: "1,400+" },
  { label: "Client Rating", value: "4.8/5.0" },
  { label: "Years Experience", value: "6+" },
  { label: "On-Time Delivery", value: "99%" },
  { label: "Client Reviews", value: "700+" },
  { label: "Revenue Generated", value: "$30K+" },
];

// =============================================================================
// NAVIGATION LINKS
// =============================================================================
export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

// =============================================================================
// TECH STACK / SKILLS
// =============================================================================
export const skills = {
  development: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "Python",
    "MongoDB",
    "PostgreSQL",
    "Firebase",
    "Tailwind CSS",
    "Git/GitHub",
  ],
  video: [
    "Adobe Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "Photoshop",
    "Illustrator",
    "Sony A6100",
    "Gimbal Work",
    "Drone (DJI Mini 3)",
    "Sound Design",
    "Color Grading",
  ],
  soft: [
    "Project Management",
    "Client Communication",
    "Problem Solving",
    "Time Management",
    "Creative Direction",
    "Strategic Planning",
  ],
};

// =============================================================================
// TESTIMONIALS (Placeholder - collect real ones)
// =============================================================================
export const testimonials = [
  {
    id: 1,
    name: "Client Name",
    role: "Business Owner",
    company: "Company Name",
    content: "Working with Solomon was a game-changer for our business. Professional, reliable, and delivered results that exceeded expectations.",
    rating: 5,
    project: "Brand Content Package",
  },
  // Add more testimonials as you collect them
];

// =============================================================================
// PRICING DATA - Realistic starter prices for portfolio building
// =============================================================================
export const pricingPackages = [
  {
    id: 1,
    name: "Landing Page",
    category: "Web Development",
    description: "Perfect for businesses that need a professional online presence fast",
    features: [
      "Single page responsive site",
      "Mobile-optimized design",
      "Contact form integration",
      "SEO basics",
      "1 round of revisions",
      "2-week delivery",
    ],
    priceRange: "$400 - $600",
    priceNote: "Starting at",
    ideal: "Freelancers, consultants, small businesses",
    turnaround: "1-2 weeks",
    color: "blue", // Theme color
  },
  {
    id: 2,
    name: "Business Website",
    category: "Web Development",
    description: "Multi-page site with custom design for established businesses",
    features: [
      "5-8 page custom site",
      "Advanced animations",
      "Custom contact forms",
      "Google Analytics",
      "2 rounds of revisions",
      "Content upload assistance",
    ],
    priceRange: "$800 - $1,500",
    priceNote: "Starting at",
    ideal: "Local businesses, agencies, service providers",
    turnaround: "2-3 weeks",
    color: "gold",
  },
  {
    id: 3,
    name: "Video Content Package",
    category: "Video Production",
    description: "Professional video content for social media and marketing",
    features: [
      "2-3 edited videos (30-60s each)",
      "Location filming session",
      "Professional equipment (Sony A6100)",
      "Music licensing",
      "Color grading & effects",
      "Social media optimization",
    ],
    priceRange: "$500 - $900",
    priceNote: "Starting at",
    ideal: "Restaurants, salons, fitness studios, artists",
    turnaround: "1-2 weeks",
    color: "blue",
  },
  {
    id: 4,
    name: "Website + Video Combo",
    category: "Integrated Solution",
    description: "The complete package - website AND professional content to fill it",
    features: [
      "Multi-page responsive website",
      "3-5 professional videos",
      "Photo + video shoot session",
      "Content strategy consultation",
      "SEO optimization",
      "3 months basic maintenance",
    ],
    priceRange: "$1,500 - $2,500",
    priceNote: "Starting at",
    ideal: "Service businesses ready to scale digital presence",
    turnaround: "3-4 weeks",
    color: "gold",
    badge: "Most Popular",
  },
  {
    id: 5,
    name: "Full Web App",
    category: "Web Development",
    description: "Custom web application with backend, database, and user features",
    features: [
      "Custom frontend & backend",
      "User authentication",
      "Database integration",
      "Admin dashboard",
      "Payment processing (optional)",
      "Deployment & hosting setup",
    ],
    priceRange: "$2,500 - $5,000",
    priceNote: "Starting at",
    ideal: "E-commerce, booking systems, membership sites",
    turnaround: "4-8 weeks",
    color: "blue",
  },
  {
    id: 6,
    name: "Music Video Production",
    category: "Video Production",
    description: "Professional music video for independent artists",
    features: [
      "Pre-production planning",
      "Multi-location filming",
      "Cinematic shots & gimbal work",
      "Professional editing & color",
      "2 rounds of revisions",
      "Raw footage included",
    ],
    priceRange: "$600 - $1,200",
    priceNote: "Starting at",
    ideal: "Independent artists, rappers, singers",
    turnaround: "2-3 weeks",
    color: "gold",
  },
  {
    id: 7,
    name: "Run & Gun Music Video",
    category: "Video Production",
    description: "Quick, single-location music video for artists on a budget",
    features: [
      "Single location shoot (2-3 hours)",
      "Run & gun style filming",
      "Professional editing & color",
      "1 round of revisions",
      "Vertical + horizontal formats",
      "Same-week delivery",
    ],
    priceRange: "$300",
    priceNote: "Fixed price",
    ideal: "Independent artists, content creators, quick releases",
    turnaround: "3-5 days",
    color: "blue",
    badge: "Budget Friendly",
  },
  {
    id: 8,
    name: "Freestyle Mic Promo",
    category: "Video Production",
    description: "Quick mic freestyle capture for social media promo",
    features: [
      "30-90 second freestyle capture",
      "Professional audio recording",
      "Quick cuts & energy editing",
      "Social media optimized",
      "Delivered within 48 hours",
      "Perfect for promo content",
    ],
    priceRange: "$150",
    priceNote: "Fixed price",
    ideal: "Rappers, artists, social media content",
    turnaround: "1-2 days",
    color: "blue",
    badge: "Quick Turnaround",
  },
];

// =============================================================================
// SERVICE AREAS
// =============================================================================
export const serviceAreas = {
  primary: [
    "Brampton",
    "Mississauga",
    "Toronto",
    "Vaughan",
    "Etobicoke",
    "Scarborough",
  ],
  extended: [
    "Oakville",
    "Burlington",
    "Hamilton",
    "Milton",
    "Markham",
  ],
  remote: "Web development services available globally",
};

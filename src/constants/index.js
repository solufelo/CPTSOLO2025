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
      "Fast, scalable web apps with modern tech. MVP to production—clean code, optimized databases, seamless UX.",
    items: [
      {
        title: "Frontend Development",
        description: "(React, Next.js, TypeScript, Tailwind CSS)",
        hoverDescription: "This portfolio? Built with React + Vite, GSAP animations, Tailwind CSS. Responsive, fast, conversion-optimized.",
      },
      {
        title: "Backend Engineering",
        description: "(Node.js, Express, REST APIs, Authentication)",
        hoverDescription: "Secure backends, user auth, payment processing (Stripe), RESTful APIs. Like the contact system on this site.",
      },
      {
        title: "Database Design",
        description: "(MongoDB, PostgreSQL, Firebase)",
        hoverDescription: "Scalable database structures for user accounts, e-commerce, booking systems, CMS. Organized and secure.",
      },
    ],
  },
  {
    title: "Video Production & Content",
    description:
      "Content that converts. 6 years experience, 100+ video projects, 4.8★ rating. Social reels, promos, events, music videos—shot, edited, optimized.",
    items: [
      {
        title: "Social Media Content",
        description: "(Reels, TikToks, YouTube Shorts, Algorithm-optimized)",
        hoverDescription: "100+ social videos. Sony A6100, gimbal, color grading. Algorithm-optimized: vertical format, 3-sec hooks, trending audio.",
      },
      {
        title: "Commercial & Promo",
        description: "(Brand videos, Product demos, Service showcases)",
        hoverDescription: "Promo content for barbershops, restaurants, service businesses. 30-60 second brand stories that drive bookings.",
      },
      {
        title: "Event Coverage",
        description: "(Corporate events, Launches, Performances, Real-time social)",
        hoverDescription: "100+ events: basketball, club nights, performances. Multi-cam setups, real-time delivery, same-day highlights.",
      },
    ],
  },
  {
    title: "Artist & Music Content",
    description:
      "Professional visuals for independent artists. Music videos, performance capture, press kits. Industry-quality for indie budgets.",
    items: [
      {
        title: "Music Video Production",
        description: "(Single & multi-location, Cinematic, Color grading)",
        hoverDescription: "Music videos for indie artists. Cinematic color grading, gimbal, multi-location. Run & gun or full production.",
      },
      {
        title: "Performance Content",
        description: "(Live capture, Mic promos, Behind-the-scenes)",
        hoverDescription: "Quick freestyle captures and performance videos. Pro audio sync, energy editing, 48-hour delivery.",
      },
      {
        title: "Artist Branding",
        description: "(Press kits, Social content, Portfolio shoots)",
        hoverDescription: "Visual branding: press kits for booking, portfolio content for pitches, social media that grows streams.",
      },
    ],
  },
  {
    title: "Integrated Digital Solutions",
    description:
      "Code meets creativity. Website + content to fill it. One point of contact for complete digital presence.",
    items: [
      {
        title: "Website + Content Packages",
        description: "(Restaurant sites + menu photos, Artist portfolios + press kits)",
        hoverDescription: "Website + content together. Restaurant sites with menu photos, artist portfolios with press videos. One brand experience.",
      },
      {
        title: "E-commerce + Media",
        description: "(Online store + product photography + social content)",
        hoverDescription: "Complete e-commerce: store development, product photography, social content. Code to camera—all handled.",
      },
      {
        title: "Content Strategy",
        description: "(Platform optimization + posting guides + analytics)",
        hoverDescription: "Analyze what works, create posting schedules, optimize for algorithms, track ROI.",
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
      "Full-stack MERN fundraising platform. Campaign creation, donation management, role-based access, real-time analytics.",
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
    name: "Velare - Motorbike Landing Page",
    description:
      "Immersive 3D motorbike landing page with Three.js. Interactive WebGL, smooth scroll, responsive 3D model showcase.",
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
    name: "Suburbia - Skate Shop",
    description:
      "E-commerce skate shop with Prismic CMS. Dynamic product management, SEO optimization, modern design with Tailwind CSS.",
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
    results: "Production-ready e-commerce site",
  },
  {
    id: 4,
    name: "CinemaVerse - Movie Tracker",
    description:
      "Full-stack movie tracker with AI recommendations. Wasp framework, TMDB API, OpenRouter AI for personalized suggestions.",
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
      "High-energy social promo for Haircut House Call. Cinematic shots, smooth transitions, music sync.",
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
      "Dynamic event videography capturing energy and key moments. Fast-paced editing, color grading, beat-synced cuts.",
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
      "Athletic videography showcasing highlights, player performance, team energy. Professional sports coverage quality.",
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
      "High-energy game recap with quick cuts, dramatic angles, music sync. Professional athletic content for teams and recruitment.",
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
  { label: "Video Projects", value: "100+" },
  { label: "Client Rating", value: "4.8/5.0" },
  { label: "Years Experience", value: "6+" },
  { label: "On-Time Delivery", value: "99%" },
  { label: "Happy Clients", value: "50+" },
  { label: "Combined Experience", value: "Dev + Video" },
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
    description: "Professional online presence, fast",
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
    description: "Multi-page custom site for established businesses",
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
    description: "Professional video for social media & marketing",
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
    description: "Complete package—website + content to fill it",
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
    ideal: "Service businesses ready to scale",
    turnaround: "3-4 weeks",
    color: "gold",
    badge: "Most Popular",
  },
  {
    id: 5,
    name: "Full Web App",
    category: "Web Development",
    description: "Custom web app with backend & database",
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
    description: "Professional music video for indie artists",
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
    description: "Quick single-location music video",
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
    ideal: "Indie artists, creators, quick releases",
    turnaround: "3-5 days",
    color: "blue",
    badge: "Budget Friendly",
  },
  {
    id: 8,
    name: "Freestyle Mic Promo",
    category: "Video Production",
    description: "Quick freestyle capture for social promo",
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
    ideal: "Rappers, artists, social content",
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

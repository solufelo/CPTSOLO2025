// Solomon Olufelo - Captain Solo Portfolio Constants
// Contact: hello@captainsolo.ca | 289-233-8317
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
      },
      {
        title: "Backend Engineering",
        description: "(Node.js, Express, REST APIs, Authentication)",
      },
      {
        title: "Database Design",
        description: "(MongoDB, PostgreSQL, Firebase)",
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
      },
      {
        title: "Commercial & Promo",
        description: "(Brand videos, Product demos, Service showcases)",
      },
      {
        title: "Event Coverage",
        description: "(Corporate events, Launches, Performances, Real-time social)",
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
      },
      {
        title: "Performance Content",
        description: "(Live capture, Mic promos, Behind-the-scenes)",
      },
      {
        title: "Artist Branding",
        description: "(Press kits, Social content, Portfolio shoots)",
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
      },
      {
        title: "E-commerce + Media",
        description: "(Online store + product photography + social content)",
      },
      {
        title: "Content Strategy",
        description: "(Platform optimization + posting guides + analytics)",
      },
    ],
  },
];

// =============================================================================
// PORTFOLIO PROJECTS - Replace with actual completed work
// =============================================================================
export const projects = [
  {
    id: 1,
    name: "Barbershop Promotional Content",
    description:
      "High-energy social media promo for Haircut House Call. Cinematic shots, smooth transitions, music sync. Direct engagement with service-based business content.",
    href: "https://www.instagram.com/reel/CsCKDtUJGo2/",
    image: "/assets/projects/barbershop-promo.jpg", // Add actual image
    bgImage: "/assets/backgrounds/barbershop-bg.jpg",
    frameworks: [
      { id: 1, name: "Premiere Pro" },
      { id: 2, name: "After Effects" },
      { id: 3, name: "Sony A6100" },
    ],
    category: "video",
    results: "Featured content for local business growth",
  },
  {
    id: 2,
    name: "Club Event Coverage",
    description:
      "Dynamic event videography capturing energy, atmosphere, and key moments. Fast-paced editing, color grading, beat-synced cuts for maximum social media impact.",
    href: "https://www.instagram.com/reel/CqQzDikJRQj/",
    image: "/assets/projects/club-event.jpg",
    bgImage: "/assets/backgrounds/event-bg.jpg",
    frameworks: [
      { id: 1, name: "Multi-Cam" },
      { id: 2, name: "Gimbal Work" },
      { id: 3, name: "Live Coverage" },
    ],
    category: "video",
    results: "50+ shares, client repeat bookings",
  },
  {
    id: 3,
    name: "Women's University Basketball",
    description:
      "Athletic videography showcasing game highlights, player performance, and team energy. Capturing pivotal moments with professional sports coverage quality.",
    href: "https://www.instagram.com/reel/Coi6VfvuGDq/",
    image: "/assets/projects/womens-basketball.jpg",
    bgImage: "/assets/backgrounds/sports-bg.jpg",
    frameworks: [
      { id: 1, name: "Sports Videography" },
      { id: 2, name: "Telephoto 55-210mm" },
      { id: 3, name: "Action Capture" },
    ],
    category: "video",
    results: "Bronze medal athletic videography",
  },
  {
    id: 4,
    name: "Men's Basketball Game Recap",
    description:
      "High-energy game recap with quick cuts, dramatic angles, and music sync. Professional athletic content for university sports teams and recruitment.",
    href: "https://www.instagram.com/reel/C0VtaMVM0iF/",
    image: "/assets/projects/mens-basketball.jpg",
    bgImage: "/assets/backgrounds/basketball-bg.jpg",
    frameworks: [
      { id: 1, name: "Game Coverage" },
      { id: 2, name: "Highlight Editing" },
      { id: 3, name: "WLU Official" },
    ],
    category: "video",
    results: "Official WLU videographer content",
  },
  {
    id: 5,
    name: "Full-Stack E-commerce Platform",
    description:
      "Custom online store with payment integration, inventory management, and responsive design. Built with React, Node.js, and MongoDB for scalability.",
    href: "", // Add project link when available
    image: "/assets/projects/ecommerce-dev.jpg",
    bgImage: "/assets/backgrounds/code-bg.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Stripe API" },
    ],
    category: "development",
    results: "Scalable platform with payment processing",
  },
  {
    id: 6,
    name: "Restaurant Landing Page + Content",
    description:
      "Integrated solution: responsive website with menu, online ordering, and professional food photography. Complete digital presence package.",
    href: "", // Add project link when available
    image: "/assets/projects/restaurant-web.jpg",
    bgImage: "/assets/backgrounds/restaurant-bg.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Photography" },
      { id: 4, name: "Content Strategy" },
    ],
    category: "integrated",
    results: "Website + content driving reservations",
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
  email: "hello@captainsolo.ca",
  emailAlt: "solomonolufelo@outlook.com",
  phone: "289-233-8317",
  phoneFormatted: "(289) 233-8317",
  location: "Waterloo, Ontario, Canada",
  locationShort: "Waterloo, ON",
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
// SERVICE AREAS
// =============================================================================
export const serviceAreas = {
  primary: [
    "Waterloo",
    "Kitchener",
    "Cambridge",
    "Guelph",
    "Brampton",
    "Mississauga",
  ],
  extended: [
    "Toronto",
    "Hamilton",
    "Oakville",
    "Burlington",
    "Milton",
  ],
  remote: "Web development services available globally",
};

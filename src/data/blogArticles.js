/**
 * Shared Blog Articles Data
 * Used across blog index and blog post pages for navigation
 */
export const blogArticles = [
  {
    slug: 'what-is-a-voice-tag',
    title: 'What is a Voice Tag? Complete Guide for Producers',
    description: 'Learn everything about voice tags (producer tags). What they are, why you need one, and how to use them effectively.',
    category: 'Music Production',
    readTime: '8 min',
    date: '2025-01-01'
  },
  {
    slug: 'metro-boomin-producer-tag',
    title: 'Metro Boomin Producer Tag: How He Made the Most Iconic Tag',
    description: 'Deep dive into Metro Boomin\'s legendary producer tag and learn how to get a similar style for your beats.',
    category: 'Music Production',
    readTime: '6 min',
    date: '2025-01-01'
  },
  {
    slug: 'best-voice-tags-trap',
    title: 'Best Voice Tags for Trap Music: 10 Styles That Hit Hard',
    description: 'Discover the best voice tag styles for trap and drill beats with real examples from top producers.',
    category: 'Music Production',
    readTime: '7 min',
    date: '2025-01-01'
  },
  {
    slug: 'videography-brampton',
    title: 'Professional Videographer in Brampton: Your Complete Guide',
    description: 'Find videography services in Brampton. Pricing, services, portfolio tips, and what to expect when hiring a local videographer.',
    category: 'Local Business',
    readTime: '12 min',
    date: '2025-01-07'
  },
  {
    slug: 'web-developer-brampton',
    title: 'Web Developer in Brampton: What You Need to Know',
    description: 'Hiring a web developer in Brampton? Learn about costs, tech stack, questions to ask, and the development process.',
    category: 'Local Business',
    readTime: '15 min',
    date: '2025-01-07'
  },
  {
    slug: 'small-business-website-brampton',
    title: 'Do I Need a Website for My Brampton Small Business?',
    description: 'Why Brampton small businesses need websites in 2025, what to include, real costs, and ROI examples.',
    category: 'Local Business',
    readTime: '8 min',
    date: '2025-01-07'
  },
  {
    slug: 'how-to-optimize-website-for-seo',
    title: 'How to Optimize Your Website for SEO in 2025: Complete Guide',
    description: 'Learn how to optimize your website for SEO in 2025. Complete guide with technical SEO, on-page optimization, content strategy, and real examples.',
    category: 'Web Development',
    readTime: '12 min',
    date: '2025-01-15'
  },
  {
    slug: 'ai-tools-creative-workflow',
    title: '10 AI Tools That Boost Your Creative Workflow in 2025',
    description: 'Discover 10 powerful AI tools that boost your creative workflow. From coding to design, video editing to writing - transform how you work with AI.',
    category: 'Productivity',
    readTime: '10 min',
    date: '2025-01-15'
  },
  {
    slug: 'ai-tools-videography',
    title: 'AI Tools for Videography: Transform Your Video Production Workflow',
    description: 'Discover AI tools that transform videography workflows. From automated editing to AI color grading, learn how to use AI in video production.',
    category: 'Productivity',
    readTime: '8 min',
    date: '2025-01-15'
  },
  {
    slug: 'ai-tools-students',
    title: 'AI Tools for Students: How to Boost Your Academic Success in 2025',
    description: 'Discover AI tools that help students study smarter, write better, and manage time effectively. Learn how to use AI to boost your academic success.',
    category: 'Productivity',
    readTime: '9 min',
    date: '2025-01-15'
  },
  {
    slug: 'solo-body-recode',
    title: 'SOLO BODY RECODE: Complete Body Realignment System',
    description: 'Discover the SOLO BODY RECODE system - a 3-phase approach to fix posture, build strength, and integrate movement. From ankle mobility to neck alignment, transform your body from the ground up.',
    category: 'Fitness',
    readTime: '15 min',
    date: '2025-01-20'
  },
  {
    slug: 'study-optimization-guide',
    title: 'How to Optimize Studying: Ultimate Guide for University & High School Students',
    description: 'Learn proven study optimization techniques for university and high school students. From time management to active recall, discover how to study smarter and achieve better grades.',
    category: 'Productivity',
    readTime: '12 min',
    date: '2025-01-25'
  },
  {
    slug: 'gemini-visual-prompts-study-guide',
    title: 'How I Used Gemini Visual Prompts to Ace My OOP, Swing & Input Exams',
    description: 'Struggling with abstract concepts? Learn how I used Gemini to generate custom visual study aids for OOP, Swing, and Input Methods.',
    category: 'Productivity',
    readTime: '15 min',
    date: '2025-12-08'
  }
];

/**
 * Get recent blog posts (excluding current post)
 * @param {string} currentSlug - Slug of current post to exclude
 * @param {number} limit - Number of posts to return
 * @returns {Array} Recent blog posts
 */
export const getRecentPosts = (currentSlug, limit = 4) => {
  return blogArticles
    .filter(article => article.slug !== currentSlug)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

/**
 * Get related posts by category
 * @param {string} category - Category to filter by
 * @param {string} currentSlug - Slug of current post to exclude
 * @param {number} limit - Number of posts to return
 * @returns {Array} Related blog posts
 */
export const getRelatedPosts = (category, currentSlug, limit = 3) => {
  return blogArticles
    .filter(article => article.category === category && article.slug !== currentSlug)
    .slice(0, limit);
};


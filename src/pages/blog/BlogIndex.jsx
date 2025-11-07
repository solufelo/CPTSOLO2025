import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';

/**
 * Blog Index Page - SEO Hub for All Content
 * Target Keywords: "voice tag blog", "producer tag guides", "web development brampton", "videographer brampton"
 */
const BlogIndex = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');

  const articles = [
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
    }
  ];

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'All Articles' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  // Get category counts
  const categoryCounts = {
    'All Articles': articles.length,
    'Music Production': articles.filter(a => a.category === 'Music Production').length,
    'Local Business': articles.filter(a => a.category === 'Local Business').length,
  };

  return (
    <>
      <Helmet>
        <title>CaptainSolo Blog | Web Dev, Videography & Music Production Tips</title>
        <meta name="description" content="Expert guides on web development, videography, and music production. Local Brampton/GTA services, voice tag tutorials, and professional tips." />
        <meta name="keywords" content="web development blog, videography tips, voice tag guides, brampton business, producer tag tutorials, local seo" />
        <link rel="canonical" href="https://captainsolo.ca/blog" />
      </Helmet>

      <Navbar />

      <section className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-amiamie-round text-5xl sm:text-6xl md:text-7xl font-black text-primary mb-6">
              <span className="text-gold">Knowledge</span> Hub
            </h1>
            <p className="font-amiamie text-lg text-SageGray max-w-2xl mx-auto">
              Expert guides on web development, videography, music production, and local business tips for Brampton & GTA.
            </p>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button 
              onClick={() => setSelectedCategory('All Articles')}
              className={`px-4 py-2 font-amiamie-round font-bold rounded transition ${
                selectedCategory === 'All Articles' 
                  ? 'bg-gold text-DarkLava' 
                  : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20'
              }`}
            >
              All Articles ({categoryCounts['All Articles']})
            </button>
            <button 
              onClick={() => setSelectedCategory('Music Production')}
              className={`px-4 py-2 font-amiamie-round font-bold rounded transition ${
                selectedCategory === 'Music Production' 
                  ? 'bg-gold text-DarkLava' 
                  : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20'
              }`}
            >
              Music Production ({categoryCounts['Music Production']})
            </button>
            <button 
              onClick={() => setSelectedCategory('Local Business')}
              className={`px-4 py-2 font-amiamie-round font-bold rounded transition ${
                selectedCategory === 'Local Business' 
                  ? 'bg-gold text-DarkLava' 
                  : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20'
              }`}
            >
              Local Business ({categoryCounts['Local Business']})
            </button>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredArticles.map((article, index) => (
              <Link 
                key={index}
                to={`/blog/${article.slug}`}
                className="bg-primary/5 border border-SageGray/30 rounded-lg overflow-hidden hover:border-gold transition-all hover:shadow-xl hover:shadow-gold/10 group"
              >
                {/* Article Card */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gold/20 border border-gold/50 text-gold text-xs font-amiamie-round font-bold rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-SageGray font-amiamie">{article.readTime}</span>
                  </div>
                  
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3 group-hover:text-gold transition">
                    {article.title}
                  </h3>
                  
                  <p className="font-amiamie text-sm text-SageGray mb-4">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <time className="text-xs text-SageGray/70 font-amiamie" dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                    <span className="text-gold font-amiamie-round font-bold group-hover:translate-x-1 transition">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-gold/20 to-gold/10 border-2 border-gold rounded-lg p-8 sm:p-12 text-center">
            <h2 className="font-amiamie-round text-3xl sm:text-4xl font-black text-primary mb-4">
              Ready to Get Your Own Voice Tag?
            </h2>
            <p className="font-amiamie text-lg text-SageGray mb-8 max-w-2xl mx-auto">
              Stop learning — start creating. Get a professional, studio-quality voice tag delivered in 24 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/voice-tags"
                className="inline-block px-8 py-4 bg-gold text-DarkLava font-amiamie-round font-bold text-lg rounded hover:bg-gold/90 transition"
              >
                View Voice Tag Services
              </Link>
              <a
                href="https://www.fiverr.com/solufelo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-primary text-DarkLava font-amiamie-round font-bold text-lg rounded hover:bg-primary/90 transition"
              >
                Order Now on Fiverr
              </a>
            </div>
          </div>

        </div>
      </section>

      <Contact />
    </>
  );
};

export default BlogIndex;


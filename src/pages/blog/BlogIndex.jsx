import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';
import LogoHeader from '../../components/LogoHeader';
import { blogArticles } from '../../data/blogArticles';
import { useTheme } from '../../context/ThemeContext';

/**
 * Blog Index Page - SEO Hub for All Content
 * Target Keywords: "voice tag blog", "producer tag guides", "web development brampton", "videographer brampton"
 */
const BlogIndex = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [dbArticles, setDbArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch published blog posts from database
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform database posts to match blogArticles format
        const transformedPosts = (data || []).map(post => ({
          slug: post.slug,
          title: post.title,
          description: post.description || '',
          category: post.category || 'Music Production',
          readTime: post.read_time || '5 min',
          date: post.created_at || new Date().toISOString(),
          isFromDb: true, // Flag to identify database posts
        }));

        setDbArticles(transformedPosts);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Combine static articles with database articles
  // Database articles take precedence if slug matches
  const allArticles = [...blogArticles];
  dbArticles.forEach(dbArticle => {
    const existingIndex = allArticles.findIndex(a => a.slug === dbArticle.slug);
    if (existingIndex >= 0) {
      // Replace static article with database version
      allArticles[existingIndex] = dbArticle;
    } else {
      // Add new database article
      allArticles.push(dbArticle);
    }
  });

  // Sort by date (newest first)
  const articles = allArticles.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  // Get category counts (calculated from all articles)
  const categoryCounts = {
    'All Articles': articles.length,
    'Music Production': articles.filter(a => a.category === 'Music Production').length,
    'Local Business (Brampton/GTA)': articles.filter(a => a.category === 'Local Business (Brampton/GTA)' || a.category === 'Local Business').length,
    'Web Development': articles.filter(a => a.category === 'Web Development').length,
    'Videography': articles.filter(a => a.category === 'Videography').length,
    'Productivity': articles.filter(a => a.category === 'Productivity').length,
    'Fitness': articles.filter(a => a.category === 'Fitness').length,
  };

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'All Articles' 
    ? articles 
    : articles.filter(article => {
        // Handle category matching (some categories might have variations)
        if (selectedCategory === 'Local Business (Brampton/GTA)') {
          return article.category === 'Local Business (Brampton/GTA)' || article.category === 'Local Business';
        }
        return article.category === selectedCategory;
      });

  // Theme-aware styling
  const getSectionBg = () => {
    switch(theme) {
      case 'glass': return 'bg-[rgba(15,20,35,0.98)]';
      case 'light': return 'bg-gray-50';
      default: return 'bg-DarkLava';
    }
  };

  const getTextColor = () => {
    switch(theme) {
      case 'glass': return 'text-white';
      case 'light': return 'text-gray-900';
      default: return 'text-primary';
    }
  };

  const getMutedTextColor = () => {
    switch(theme) {
      case 'glass': return 'text-white/60';
      case 'light': return 'text-gray-500';
      default: return 'text-SageGray';
    }
  };

  const getAccentColor = () => {
    switch(theme) {
      case 'glass': return 'text-cyan-400';
      case 'light': return 'text-blue-600';
      default: return 'text-gold';
    }
  };

  const getAccentBg = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-500 text-black';
      case 'light': return 'bg-blue-600 text-white';
      default: return 'bg-gold text-DarkLava';
    }
  };

  const getCardBg = () => {
    switch(theme) {
      case 'glass': return 'bg-white/5 border-white/10 hover:border-cyan-400/50';
      case 'light': return 'bg-white border-gray-200 hover:border-blue-400';
      default: return 'bg-primary/5 border-SageGray/30 hover:border-gold';
    }
  };

  const getCategoryBtnActive = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-500 text-black';
      case 'light': return 'bg-blue-600 text-white';
      default: return 'bg-gold text-DarkLava';
    }
  };

  const getCategoryBtnInactive = () => {
    switch(theme) {
      case 'glass': return 'bg-white/10 border border-white/20 text-white hover:bg-white/20';
      case 'light': return 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200';
      default: return 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20';
    }
  };

  const getTagBg = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-400/20 border-cyan-400/50 text-cyan-400';
      case 'light': return 'bg-blue-100 border-blue-200 text-blue-600';
      default: return 'bg-gold/20 border-gold/50 text-gold';
    }
  };

  const getCTAGradient = () => {
    switch(theme) {
      case 'glass': return 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border-2 border-cyan-400';
      case 'light': return 'bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-400';
      default: return 'bg-gradient-to-r from-gold/20 to-gold/10 border-2 border-gold';
    }
  };

  return (
    <>
      <Helmet>
        <title>CaptainSolo Blog | Web Dev, Videography, AI Tools & Music Production</title>
        <meta name="description" content="Expert guides on web development, videography, AI tools, and music production. SEO optimization, productivity tips, local Brampton/GTA services, and professional tutorials." />
        <meta name="keywords" content="web development blog, videography tips, ai tools, voice tag guides, seo optimization, productivity tools, brampton business, producer tag tutorials, local seo, ai workflow tools" />
        <link rel="canonical" href="https://captainsolo.ca/blog" />
      </Helmet>

      <LogoHeader />
      <Navbar />

      <section className={`min-h-screen py-20 px-4 sm:px-8 ${getSectionBg()}`}>
        <div className="max-w-6xl mx-auto">
          
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className={`font-amiamie-round text-5xl sm:text-6xl md:text-7xl font-black mb-6 ${getTextColor()}`}>
              <span className={getAccentColor()}>Knowledge</span> Hub
            </h1>
            <p className={`font-amiamie text-lg max-w-2xl mx-auto ${getMutedTextColor()}`}>
              Expert guides on web development, videography, music production, and local business tips for Brampton & GTA.
            </p>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button 
              onClick={() => setSelectedCategory('All Articles')}
              className={`px-4 py-2 font-amiamie-round font-bold rounded transition ${
                selectedCategory === 'All Articles' 
                  ? getCategoryBtnActive()
                  : getCategoryBtnInactive()
              }`}
            >
              All Articles ({categoryCounts['All Articles']})
            </button>
            <button 
              onClick={() => setSelectedCategory('Music Production')}
              className={`px-4 py-2 font-amiamie-round font-bold rounded transition ${
                selectedCategory === 'Music Production' 
                  ? getCategoryBtnActive()
                  : getCategoryBtnInactive()
              }`}
            >
              Music Production ({categoryCounts['Music Production']})
            </button>
            <button 
              onClick={() => setSelectedCategory('Local Business (Brampton/GTA)')}
              className={`px-4 py-2 font-amiamie-round font-bold rounded transition ${
                selectedCategory === 'Local Business (Brampton/GTA)' 
                  ? getCategoryBtnActive()
                  : getCategoryBtnInactive()
              }`}
            >
              Local Business (Brampton/GTA) ({categoryCounts['Local Business (Brampton/GTA)']})
            </button>
            <button 
              onClick={() => setSelectedCategory('Web Development')}
              className={`px-4 py-2 font-amiamie-round font-bold rounded transition ${
                selectedCategory === 'Web Development' 
                  ? getCategoryBtnActive()
                  : getCategoryBtnInactive()
              }`}
            >
              Web Development ({categoryCounts['Web Development']})
            </button>
            <button 
              onClick={() => setSelectedCategory('Videography')}
              className={`px-4 py-2 font-amiamie-round font-bold rounded transition ${
                selectedCategory === 'Videography' 
                  ? getCategoryBtnActive()
                  : getCategoryBtnInactive()
              }`}
            >
              Videography ({categoryCounts['Videography'] || 0})
            </button>
            <button 
              onClick={() => setSelectedCategory('Productivity')}
              className={`px-4 py-2 font-amiamie-round font-bold rounded transition ${
                selectedCategory === 'Productivity' 
                  ? getCategoryBtnActive()
                  : getCategoryBtnInactive()
              }`}
            >
              Productivity ({categoryCounts['Productivity']})
            </button>
            {categoryCounts['Fitness'] > 0 && (
              <button 
                onClick={() => setSelectedCategory('Fitness')}
                className={`px-4 py-2 font-amiamie-round font-bold rounded transition ${
                  selectedCategory === 'Fitness' 
                    ? getCategoryBtnActive()
                    : getCategoryBtnInactive()
                }`}
              >
                Fitness ({categoryCounts['Fitness']})
              </button>
            )}
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className={getMutedTextColor()}>Loading blog posts...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className={getMutedTextColor()}>No blog posts found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredArticles.map((article, index) => (
                <Link 
                  key={`${article.slug}-${index}`}
                  to={`/blog/${article.slug}`}
                  className={`rounded-lg overflow-hidden transition-all hover:shadow-xl group border ${getCardBg()}`}
                >
                  {/* Article Card */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 border text-xs font-amiamie-round font-bold rounded ${getTagBg()}`}>
                        {article.category}
                      </span>
                      <span className={`text-xs font-amiamie ${getMutedTextColor()}`}>{article.readTime}</span>
                    </div>
                    
                    <h3 className={`font-amiamie-round text-xl font-bold mb-3 transition ${getTextColor()} group-hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'}`}>
                      {article.title}
                    </h3>
                    
                    <p className={`font-amiamie text-sm mb-4 ${getMutedTextColor()}`}>
                      {article.description || 'No description available.'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <time className={`text-xs font-amiamie ${getMutedTextColor()}`} dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </time>
                      <span className={`font-amiamie-round font-bold group-hover:translate-x-1 transition ${getAccentColor()}`}>
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className={`rounded-lg p-8 sm:p-12 text-center ${getCTAGradient()}`}>
            <h2 className={`font-amiamie-round text-3xl sm:text-4xl font-black mb-4 ${getTextColor()}`}>
              Ready to Get Your Own Voice Tag?
            </h2>
            <p className={`font-amiamie text-lg mb-8 max-w-2xl mx-auto ${getMutedTextColor()}`}>
              Stop learning — start creating. Get a professional, studio-quality voice tag delivered in 24 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/voice-tags"
                className={`inline-block px-8 py-4 font-amiamie-round font-bold text-lg rounded hover:opacity-90 transition ${getAccentBg()}`}
              >
                View Voice Tag Services
              </Link>
              <a
                href="https://www.fiverr.com/solufelo/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block px-8 py-4 font-amiamie-round font-bold text-lg rounded transition ${
                  theme === 'glass' 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : theme === 'light'
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-primary text-DarkLava hover:bg-primary/90'
                }`}
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

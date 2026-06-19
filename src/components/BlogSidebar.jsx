import { Link } from 'react-router-dom';
import { getRecentPosts, blogArticles } from '../data/blogArticles';
import { useTheme } from '../context/ThemeContext';

/**
 * BlogSidebar Component
 * Displays recent blog posts, categories, and navigation
 * Appears on the right side of blog post pages
 */
const BlogSidebar = ({ currentSlug }) => {
  const { theme } = useTheme();
  const recentPosts = getRecentPosts(currentSlug, 5);
  
  // Get unique categories
  const categories = [...new Set(blogArticles.map(article => article.category))];
  
  // Get category counts
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = blogArticles.filter(article => article.category === category).length;
    return acc;
  }, {});

  // Theme-aware styles
  const getCardStyle = () => {
    switch(theme) {
      case 'glass': return 'bg-white/5 border-white/10';
      case 'light': return 'bg-white border-gray-200 shadow-sm';
      default: return 'bg-primary/5 border-SageGray/30';
    }
  };

  const getTextColor = () => {
    switch(theme) {
      case 'glass': return 'text-white';
      case 'light': return 'text-gray-900';
      default: return 'text-primary';
    }
  };

  const getMutedColor = () => {
    switch(theme) {
      case 'glass': return 'text-white/60';
      case 'light': return 'text-gray-600';
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

  const getHoverBg = () => {
    switch(theme) {
      case 'glass': return 'hover:bg-white/10';
      case 'light': return 'hover:bg-gray-50';
      default: return 'hover:bg-primary/10';
    }
  };

  const getBadgeStyle = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-500/20 text-cyan-400';
      case 'light': return 'bg-blue-50 text-blue-600';
      default: return 'bg-primary/10 text-gold';
    }
  };

  return (
    <aside className="hidden lg:block lg:w-80 xl:w-96 lg:flex-shrink-0 lg:pl-8">
      <div className="sticky top-24 space-y-8">
        
        {/* Back to Blog Index */}
        <div className={`${getCardStyle()} border rounded-lg p-6`}>
          <Link 
            to="/blog"
            className={`group flex items-center gap-2 ${getAccentColor()} transition-colors`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-amiamie-round font-bold">Back to Blog</span>
          </Link>
        </div>

        {/* Recent Posts */}
        <div className={`${getCardStyle()} border rounded-lg p-6`}>
          <h3 className={`font-amiamie-round text-xl font-black mb-4 ${getTextColor()}`}>
            📚 Recent Posts
          </h3>
          <ul className="space-y-4">
            {recentPosts.map((post, index) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className={`block group ${getHoverBg()} rounded p-3 -m-3 transition-colors`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`${getAccentColor()} font-amiamie-round font-bold text-sm flex-shrink-0`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-amiamie-round font-bold transition-colors line-clamp-2 mb-1 ${getTextColor()} group-hover:${theme === 'light' ? 'text-blue-600' : theme === 'glass' ? 'text-cyan-400' : 'text-gold'}`}>
                        {post.title}
                      </h4>
                      <div className={`flex items-center gap-2 text-xs ${getMutedColor()}`}>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span className={`px-2 py-0.5 rounded ${getBadgeStyle()}`}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className={`${getCardStyle()} border rounded-lg p-6`}>
          <h3 className={`font-amiamie-round text-xl font-black mb-4 ${getTextColor()}`}>
            🏷️ Categories
          </h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
                <Link
                  to={`/blog?category=${encodeURIComponent(category)}`}
                  className={`flex items-center justify-between group ${getHoverBg()} rounded p-2 -m-2 transition-colors`}
                >
                  <span className={`font-amiamie transition-colors ${getTextColor()} group-hover:${theme === 'light' ? 'text-blue-600' : theme === 'glass' ? 'text-cyan-400' : 'text-gold'}`}>
                    {category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${getBadgeStyle()}`}>
                    {categoryCounts[category]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className={`rounded-lg p-6 border ${
          theme === 'glass' 
            ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 border-cyan-400/30'
            : theme === 'light'
            ? 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200'
            : 'bg-gradient-to-br from-gold/20 to-gold/10 border-gold/30'
        }`}>
          <h3 className={`font-amiamie-round text-lg font-black mb-2 ${getTextColor()}`}>
            Need a Voice Tag?
          </h3>
          <p className={`font-amiamie text-sm mb-4 ${getMutedColor()}`}>
            Get professional voice tags delivered in 24 hours.
          </p>
          <Link
            to="/voice-tags"
            className={`inline-block font-amiamie-round font-bold px-4 py-2 rounded transition-colors ${
              theme === 'glass'
                ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                : theme === 'light'
                ? 'bg-blue-600 text-white hover:bg-blue-500'
                : 'bg-gold text-DarkLava hover:bg-gold/90'
            }`}
          >
            Order Now →
          </Link>
        </div>

      </div>
    </aside>
  );
};

export default BlogSidebar;


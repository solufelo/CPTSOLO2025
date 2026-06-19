import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * BlogAuthorBio Component
 * Displays author information and bio at the end of blog posts
 */
const BlogAuthorBio = () => {
  const { theme } = useTheme();

  // Theme-aware styles
  const getBorderColor = () => {
    switch(theme) {
      case 'glass': return 'border-white/20';
      case 'light': return 'border-gray-200';
      default: return 'border-SageGray/30';
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
      case 'glass': return 'text-white/70';
      case 'light': return 'text-gray-600';
      default: return 'text-SageGray';
    }
  };

  const getAccentColor = () => {
    switch(theme) {
      case 'glass': return 'text-cyan-400 hover:text-cyan-300';
      case 'light': return 'text-blue-600 hover:text-blue-700';
      default: return 'text-gold hover:text-gold/80';
    }
  };

  const getAvatarBg = () => {
    switch(theme) {
      case 'glass': return 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400/50';
      case 'light': return 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400/50 text-white';
      default: return 'bg-gradient-to-br from-gold to-primary border-gold/50 text-DarkLava';
    }
  };

  return (
    <div className={`mt-12 pt-8 border-t ${getBorderColor()}`}>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center ${getAvatarBg()}`}>
            <span className={`text-2xl font-amiamie-round font-black ${theme === 'light' ? 'text-white' : 'text-inherit'}`}>CS</span>
          </div>
        </div>
        
        {/* Author Info */}
        <div className="flex-1">
          <h3 className={`font-amiamie-round text-xl font-black mb-2 ${getTextColor()}`}>
            About CaptainSolo
          </h3>
          <p className={`font-amiamie mb-4 leading-relaxed ${getMutedColor()}`}>
            Web developer, videographer, and content creator based in Brampton, ON. 
            I build full-stack web applications, create video content, and help businesses 
            establish their online presence. Passionate about sharing knowledge through 
            blog posts and tutorials.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className={`font-amiamie font-bold text-sm transition-colors ${getAccentColor()}`}
            >
              View Portfolio →
            </Link>
            <a
              href="mailto:work@captainsolo.ca"
              className={`font-amiamie font-bold text-sm transition-colors ${getAccentColor()}`}
            >
              Get in Touch →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAuthorBio;

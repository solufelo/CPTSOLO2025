import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * LogoHeader Component
 * Displays CaptainSolo logo in top-left corner on all pages
 * - On home page: Scrolls to top on click
 * - On other pages: Navigates back to homepage
 */
const LogoHeader = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { theme } = useTheme();

  const handleClick = (e) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Theme-aware glow effect
  const getHoverGlow = () => {
    switch(theme) {
      case 'glass':
        return 'hover:drop-shadow-[0_0_12px_rgba(0,212,255,0.7)]';
      case 'light':
        return 'hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]';
      default:
        return 'hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]';
    }
  };

  const logoElement = (
    <img 
      src="/assets/videos/logo-helmet-TRANSPARENT_.png" 
      alt="CaptainSolo Logo" 
      className={`w-12 h-12 sm:w-16 sm:h-16 object-contain transition-all duration-300 ${
        theme === 'glass' ? 'brightness-110' : ''
      }`}
    />
  );

  return (
    <div className="fixed top-6 left-6 z-40">
      {isHomePage ? (
        <button
          onClick={handleClick}
          className={`block transition-all duration-300 hover:scale-110 cursor-pointer ${getHoverGlow()}`}
          aria-label="Scroll to top"
        >
          {logoElement}
        </button>
      ) : (
        <Link 
          to="/"
          className={`block transition-all duration-300 hover:scale-110 ${getHoverGlow()}`}
          aria-label="Return to CaptainSolo homepage"
        >
          {logoElement}
        </Link>
      )}
    </div>
  );
};

export default LogoHeader;

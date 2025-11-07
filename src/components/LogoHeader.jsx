import { Link, useLocation } from 'react-router-dom';

/**
 * LogoHeader Component
 * Displays CaptainSolo logo in top-left corner on all pages
 * - On home page: Scrolls to top on click
 * - On other pages: Navigates back to homepage
 */
const LogoHeader = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleClick = (e) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const logoElement = (
    <img 
      src="/assets/videos/logo-helmet-TRANSPARENT_.png" 
      alt="CaptainSolo Logo" 
      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
    />
  );

  return (
    <div className="fixed top-6 left-6 z-40">
      {isHomePage ? (
        <button
          onClick={handleClick}
          className="block transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] cursor-pointer"
          aria-label="Scroll to top"
        >
          {logoElement}
        </button>
      ) : (
        <Link 
          to="/"
          className="block transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
          aria-label="Return to CaptainSolo homepage"
        >
          {logoElement}
        </Link>
      )}
    </div>
  );
};

export default LogoHeader;


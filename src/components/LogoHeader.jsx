import { Link } from 'react-router-dom';

/**
 * LogoHeader Component
 * Displays CaptainSolo logo in top-left corner on blog/voice tags pages
 * Links back to homepage on click
 */
const LogoHeader = () => {
  return (
    <div className="fixed top-6 left-6 z-40">
      <Link 
        to="/"
        className="block transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
        aria-label="Return to CaptainSolo homepage"
      >
        <img 
          src="/assets/videos/logo-helmet-TRANSPARENT_.png" 
          alt="CaptainSolo Logo" 
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
        />
      </Link>
    </div>
  );
};

export default LogoHeader;


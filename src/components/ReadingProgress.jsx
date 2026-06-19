import { useEffect, useState } from 'react';

/**
 * ReadingProgress Component
 * Site-wide reading progress indicator at the top of all pages
 * Shows scroll progress as a visual progress bar
 */
const ReadingProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || window.pageYOffset;
      
      // Only show progress bar if content is scrollable
      const scrollableHeight = documentHeight - windowHeight;
      const hasScrollableContent = scrollableHeight > 100; // Only show if more than 100px scrollable
      
      if (!hasScrollableContent) {
        setIsVisible(false);
        setScrollProgress(0);
        return;
      }
      
      setIsVisible(true);
      
      // Calculate progress percentage
      const progress = scrollableHeight > 0 
        ? (scrollTop / scrollableHeight) * 100 
        : 0;
      
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    updateScrollProgress();
    
    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  // Don't render if no scrollable content
  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-SageGray/20 z-[100] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-gold via-gold/90 to-primary transition-all duration-300 ease-out shadow-sm"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;


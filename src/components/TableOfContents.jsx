import { useEffect, useState } from 'react';

/**
 * TableOfContents Component
 * Auto-generates table of contents from h2 headings in blog posts
 */
const TableOfContents = ({ contentRef }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!contentRef?.current) return;

    // Find all h2 and h3 headings
    const headingElements = contentRef.current.querySelectorAll('h2, h3');
    const headingData = Array.from(headingElements).map((heading, index) => {
      // Create ID if it doesn't exist
      if (!heading.id) {
        heading.id = `heading-${index}-${heading.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')}`;
      }
      
      return {
        id: heading.id,
        text: heading.textContent,
        level: heading.tagName.toLowerCase(),
      };
    });

    setHeadings(headingData);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => {
      headingElements.forEach((heading) => observer.unobserve(heading));
    };
  }, [contentRef]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-primary/5 border border-SageGray/30 rounded-lg p-6 mb-8">
      <h3 className="font-amiamie-round text-lg font-black text-primary mb-4">
        📑 Table of Contents
      </h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`block w-full text-left font-amiamie text-sm transition-colors ${
              heading.level === 'h3' ? 'ml-4' : ''
            } ${
              activeId === heading.id
                ? 'text-gold font-bold'
                : 'text-SageGray hover:text-primary'
            }`}
          >
            {heading.level === 'h3' && '• '}
            {heading.text}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import ProjectShowcaseCard from '../components/ProjectShowcaseCard';
import { showcaseProjects, SHOWCASE_FILTERS, filterShowcaseProjects, loadShowcaseProjects } from '../data/showcaseProjects';
import { useTheme } from '../context/ThemeContext';

/**
 * Works / Portfolio — filterable grid with dual Demo + GitHub links.
 * Replaces fragile cursor-following GSAP hover with inline expand cards.
 * Renders the static `showcaseProjects` immediately, then upgrades to
 * CMS-managed projects from the API if any are published.
 */
const Works = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState(showcaseProjects);

  useEffect(() => {
    let active = true;
    loadShowcaseProjects().then((list) => {
      if (active && Array.isArray(list) && list.length) setProjects(list);
    });
    return () => {
      active = false;
    };
  }, []);

  const text = `Live demos, source, and reels — works in progress included. Honest labels.`;

  const filtered = filterShowcaseProjects(projects, filter);

  const getTextColor = () => {
    switch (theme) {
      case 'glass':
        return 'text-white';
      case 'light':
        return 'text-gray-900';
      default:
        return 'text-black';
    }
  };

  const tabClass = (id) => {
    const active = filter === id;
    if (theme === 'light') {
      return active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
    if (theme === 'glass') {
      return active ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white/80 hover:bg-white/20';
    }
    return active ? 'bg-gold text-DarkLava' : 'bg-white/10 text-white/80 hover:bg-white/20';
  };

  return (
    <section
      id="work"
      className={`flex flex-col min-h-screen pb-16 ${
        theme === 'glass' ? 'bg-transparent' : theme === 'light' ? 'bg-[#fafafa]' : ''
      }`}
    >
      <AnimatedHeaderSection
        subTitle="Selected work"
        title="Works"
        text={text}
        textColor={getTextColor()}
        withScrollTrigger={true}
      />

      <div className="px-6 md:px-10 max-w-5xl mx-auto w-full flex flex-col gap-6">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {SHOWCASE_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-wider transition-colors ${tabClass(f.id)}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className={`text-sm font-body ${theme === 'light' ? 'text-gray-600' : 'text-white/50'}`}>
          Interactive code walkthroughs:{' '}
          <Link to="/demo" className="underline hover:opacity-80">
            /demo
          </Link>{' '}
          (findYOU, Light Years)
        </p>

        {/* Project grid */}
        <div className="flex flex-col gap-4">
          {filtered.map((project) => (
            <ProjectShowcaseCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={`text-center py-12 font-amiamie ${theme === 'light' ? 'text-gray-500' : 'text-white/40'}`}>
            No projects in this filter yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default Works;

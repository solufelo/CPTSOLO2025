import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const isExternal = (url) => url?.startsWith('http');

const ActionLink = ({ href, label, icon, accent, srLabel }) => {
  if (!href) return null;
  const className = `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-display font-bold uppercase tracking-wide border transition-colors ${accent}`;
  const ariaLabel = srLabel ? `${label} — ${srLabel}` : undefined;

  if (!isExternal(href)) {
    return (
      <Link to={href} className={className} aria-label={ariaLabel}>
        <Icon icon={icon} className="size-3.5" aria-hidden="true" />
        {label}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
      <Icon icon={icon} className="size-3.5" aria-hidden="true" />
      {label}
    </a>
  );
};

const StatusBadge = ({ status, theme }) => {
  const dark = {
    live: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    wip: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
    video: 'bg-sky-500/20 text-sky-200 border-sky-500/40',
  };
  const light = {
    live: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    wip: 'bg-amber-100 text-amber-800 border-amber-400',
    video: 'bg-sky-100 text-sky-700 border-sky-300',
  };
  const styles = theme === 'light' ? light : dark;
  const labels = { live: 'Live', wip: 'WIP', video: 'Reel' };
  return (
    <span className={`shrink-0 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${styles[status] || styles.wip}`}>
      {labels[status] || status}
    </span>
  );
};

/**
 * Reliable showcase card — no cursor-chasing GSAP.
 * Hover expands inline preview; explicit Demo / GitHub / Case Study links.
 */
export default function ProjectShowcaseCard({ project }) {
  const { theme } = useTheme();

  const border =
    theme === 'light' ? 'border-gray-200 hover:border-blue-400' : theme === 'glass' ? 'border-white/10 hover:border-cyan-400/50' : 'border-white/15 hover:border-gold/50';

  const bg =
    theme === 'light' ? 'bg-white' : theme === 'glass' ? 'bg-white/5 backdrop-blur-sm' : 'bg-neutral-950/80';

  const titleColor = theme === 'light' ? 'text-gray-900' : 'text-white';
  const muted = theme === 'light' ? 'text-gray-600' : 'text-white/60';

  const accent =
    theme === 'light'
      ? 'border-blue-200 text-blue-700 hover:bg-blue-50'
      : theme === 'glass'
        ? 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10'
        : 'border-gold/40 text-gold hover:bg-gold/10';

  const preview = project.video ? (
    <video src={project.video} autoPlay loop muted playsInline aria-hidden="true" className="w-full h-full object-cover" />
  ) : (
    <img src={project.image} alt={`${project.name} preview`} loading="lazy" className="w-full h-full object-cover" />
  );

  return (
    <article
      className={`group rounded-sm border ${border} ${bg} overflow-hidden transition-colors duration-300`}
    >
      <div className="p-5 md:p-6 flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`font-display text-xl md:text-2xl font-bold leading-tight ${titleColor}`}>
                {project.name}
              </h3>
              <StatusBadge status={project.status} theme={theme} />
            </div>
            <p className={`text-sm md:text-base font-body ${muted}`}>{project.blurb}</p>
          </div>
          <Icon icon="lucide:arrow-up-right" aria-hidden="true" className={`size-5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity ${titleColor}`} />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-white/10 text-white/70'}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <ActionLink
            href={project.demoUrl}
            label={project.internalDemo ? 'Walkthrough' : 'Live demo'}
            icon="lucide:external-link"
            accent={accent}
            srLabel={project.name}
          />
          <ActionLink href={project.githubUrl} label="GitHub" icon="mdi:github" accent={accent} srLabel={project.name} />
          <ActionLink href={project.caseStudyUrl} label="Details" icon="lucide:file-text" accent={accent} srLabel={project.name} />
        </div>
      </div>

      {/* Inline preview — expands on hover (desktop) or always visible (mobile) */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out max-h-0 opacity-0 md:group-hover:max-h-72 md:group-hover:opacity-100 max-md:max-h-56 max-md:opacity-100`}
      >
        <div className="h-48 md:h-64 w-full bg-black border-t border-white/10">{preview}</div>
      </div>
    </article>
  );
}

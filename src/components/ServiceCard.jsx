import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const isExternal = (url) => url?.startsWith('http');

function ActionLink({ href, label, accent }) {
  if (!href) return null;
  const className = `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-display font-bold uppercase tracking-wide border transition-colors ${accent}`;

  if (href.startsWith('/#')) {
    return (
      <a href={href} className={className}>
        <Icon icon="lucide:arrow-up-right" className="size-3.5" />
        {label}
      </a>
    );
  }

  if (!isExternal(href)) {
    return (
      <Link to={href} className={className}>
        <Icon icon="lucide:arrow-up-right" className="size-3.5" />
        {label}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <Icon icon="lucide:external-link" className="size-3.5" />
      {label}
    </a>
  );
}

/**
 * Stable service row — inline image/video preview on hover (same pattern as ProjectShowcaseCard).
 */
export default function ServiceCard({ item }) {
  const { theme } = useTheme();

  const border =
    theme === 'light' ? 'border-gray-200 hover:border-blue-400' : theme === 'glass' ? 'border-white/10 hover:border-cyan-400/50' : 'border-white/15 hover:border-gold/50';
  const bg = theme === 'light' ? 'bg-white' : theme === 'glass' ? 'bg-white/5 backdrop-blur-sm' : 'bg-neutral-950/80';
  const titleColor = theme === 'light' ? 'text-gray-900' : 'text-white';
  const muted = theme === 'light' ? 'text-gray-600' : 'text-white/60';
  const accent =
    theme === 'light'
      ? 'border-blue-200 text-blue-700 hover:bg-blue-50'
      : theme === 'glass'
        ? 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10'
        : 'border-gold/40 text-gold hover:bg-gold/10';

  const preview = item.video ? (
    <video src={item.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
  ) : (
    <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
  );

  return (
    <article className={`group rounded-sm border ${border} ${bg} overflow-hidden transition-colors duration-300`}>
      <div className="p-5 md:p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className={`font-display text-lg md:text-xl font-bold ${titleColor}`}>{item.title}</h4>
            <p className={`text-sm font-body mt-1 ${muted}`}>{item.blurb}</p>
          </div>
          <Icon icon="lucide:arrow-up-right" className={`size-5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity ${titleColor}`} />
        </div>

        {item.stack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.stack.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-white/10 text-white/70'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <ActionLink href={item.href} label={isExternal(item.href) ? 'Live demo' : 'View work'} accent={accent} />
      </div>

      <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 opacity-0 md:group-hover:max-h-56 md:group-hover:opacity-100 max-md:max-h-44 max-md:opacity-100">
        <div className="h-40 md:h-52 w-full bg-black border-t border-white/10">{preview}</div>
      </div>
    </article>
  );
}

/**
 * Portfolio demo hosting registry — Netlify (now) → cPanel subdomain (later).
 * Sync with showcaseProjects.js `id` fields.
 *
 * Phases: netlify-live → polish → cpanel-migrate → showcase-live
 */

export const PORTFOLIO_DEMO_HOSTS = {
  'captain-funds': {
    netlifySite: 'captainfunds',
    netlifyUrl: null, // Site returns 404 at captainfunds.netlify.app — grab URL from Netlify dashboard
    cpanelSubdomain: 'funds.captainsolo.ca',
    githubRepo: 'https://github.com/solufelo/CAPTAIN-FUNDS-MERN',
    localPath: 'CAPTAIN-FUNDS-MERN/client',
    stack: 'vite-react',
    staticCpanel: true,
    needsBackend: true,
    backendNote: 'MERN API on Vercel/Railway; static cPanel = UI preview only',
    migratePhase: 'polish',
  },
  velare: {
    netlifySite: 'velare-site',
    netlifyUrl: 'https://velare-site.netlify.app',
    cpanelSubdomain: 'velare.captainsolo.ca',
    githubRepo: 'https://github.com/solufelo/velare-site',
    localPath: 'velare-site',
    stack: 'next-static',
    staticCpanel: true,
    migratePhase: 'cpanel-ready',
  },
  suburbia: {
    netlifySite: 'suburbia-solo',
    netlifyUrl: 'https://suburbia-solo.netlify.app',
    cpanelSubdomain: 'suburbia.captainsolo.ca',
    githubRepo: 'https://github.com/solufelo/suburbia-solo',
    localPath: 'suburbia-solo',
    stack: 'next-prismic',
    staticCpanel: true,
    needsBackend: true,
    backendNote: 'Prismic CMS + preview API routes; strip /api for static export or stay on Netlify',
    migratePhase: 'polish',
  },
  cinemaverse: {
    netlifySite: 'cinemaverse-solo',
    netlifyUrl: 'https://cinemaverse-solo.netlify.app',
    cpanelSubdomain: null,
    githubRepo: 'https://github.com/solufelo/CinemaVerse',
    localPath: 'CinemaVerse',
    stack: 'wasp',
    staticCpanel: false,
    needsBackend: true,
    backendNote: 'Wasp + Postgres — keep on Netlify/Render until backend plan',
    migratePhase: 'netlify-only',
  },
  'captainsolo-site': {
    netlifySite: 'captainsolo',
    netlifyUrl: 'https://captainsolo.netlify.app',
    cpanelSubdomain: 'captainsolo.ca',
    githubRepo: 'https://github.com/solufelo/captainsoloHQ',
    localPath: 'captainsoloHQ',
    stack: 'vite-react',
    staticCpanel: true,
    migratePhase: 'live-production',
  },
  'sparkling-llama': {
    netlifySite: 'sparkling-llama-2a5477',
    netlifyUrl: 'https://sparkling-llama-2a5477.netlify.app',
    cpanelSubdomain: null,
    githubRepo: null,
    stack: 'netlify-drop',
    staticCpanel: false,
    migratePhase: 'archive',
    note: 'Older portfolio drop — reference only, not in showcase',
  },
};

/** Prefer Netlify until cPanel subdomain is verified live. */
export function resolveDemoUrl(projectId, cpanelLive = false) {
  const host = PORTFOLIO_DEMO_HOSTS[projectId];
  if (!host) return null;
  if (cpanelLive && host.cpanelSubdomain) {
    return `https://${host.cpanelSubdomain}`;
  }
  return host.netlifyUrl;
}

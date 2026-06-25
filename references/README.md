# References / Source Archive

Your own copies of project source content, so the portfolio never depends on a
third party keeping a post or host alive. If an owner archives an Instagram reel
or a Netlify demo goes down, the site still renders from these local files.

## Backup status (2026-06-24)

| Project | Live source | Local copy used by site | Visual archive |
|---------|-------------|--------------------------|----------------|
| CinemaVerse | cinemaverse-solo.netlify.app | `public/assets/projects/cinemaverse.png` | `site-archives/cinemaverse-2026-06-24.png` |
| Velare | velare-site.netlify.app | `public/assets/projects/velare.png` | `site-archives/velare-2026-06-24.png` |
| Suburbia | suburbia-solo.netlify.app | `public/assets/projects/suburbia.png` | `site-archives/suburbia-2026-06-24.png` |
| Captain Funds | captainfunds.netlify.app | `public/assets/projects/captainfunds.png` | `site-archives/captainfunds-2026-06-24.png` |
| findYOU | internal `/demo` | `public/assets/projects/findyou.png` | n/a (own app) |
| Light Years | internal `/demo` | `public/assets/projects/light-years.png` | n/a (own app) |
| captainsolo.ca | this site | `public/assets/projects/captainsolo.png` | n/a (own site) |

### Video reels (Instagram source — most at risk)
The original IG posts can vanish, but the actual edited videos are already
self-hosted here, so the cards keep playing regardless:

- `public/assets/videos/barbershop-promo.mp4`
- `public/assets/videos/club-event.mp4`
- `public/assets/videos/mens-basketball.mp4`
- `public/assets/videos/womens-basketball.mp4`

The `demoUrl` Instagram links in `showcaseProjects.js` are outbound links only —
if a post is removed, the thumbnail + local video still show; only the "view on
IG" link breaks.

### Code projects
Backed up by source on GitHub (`github.com/solufelo/...`), which you own — that
is the truest archive for the web demos.

## Notes
- This folder is **not** shipped in the production build (kept out of `dist`).
- To refresh a visual archive: open the live site, screenshot, save here with a
  dated filename (`<project>-YYYY-MM-DD.png`).
- Outstanding: paste the live Captain Funds Netlify URL so it can be snapshotted.

# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added - October 26, 2025
- **ContactSummary Section with Brand CTA**
  - Added new section between Works and Contact
  - Top marquee: Code, Creativity, Results, Innovation, Excellence
  - Center CTA message: "I don't just build your website — I shoot the content to fill it"
  - Bottom marquee: "Let's create something legendary" (reverse scroll)
  - Pinned scroll animation (stays pinned for 800px)
  - Creates smooth transition from portfolio to contact info
  - **Files Changed:**
    - `src/sections/ContactSummary.jsx` - New component
    - `src/App.jsx` - Added to layout between Works and Contact
  - **Commits:**
    - `31c9716` - feat: Personalize ContactSummary section
    - `87af3c4` - feat: Add ContactSummary section to App layout

### Changed - October 26, 2025
- **Updated Contact Information**
  - Email changed: hello@captainsolo.ca → work@captainsolo.ca
  - Location updated: Waterloo/Brampton → Brampton, ON (primary residence)
  - Removed phone number from public contact page
  - Updated service areas: Brampton now first in primary areas
  - Primary areas: Brampton, Mississauga, Toronto, Vaughan, Etobicoke, Scarborough
  - Extended areas: Oakville, Burlington, Hamilton, Milton, Markham
  - **Files Changed:**
    - `src/sections/Contact.jsx` - Updated email, location, removed phone
    - `src/sections/About.jsx` - Updated location text
    - `src/constants/index.js` - Updated contactInfo and serviceAreas
  - **Commit:** `4802272` - feat: Update contact info - Brampton location, new email, remove phone

### Changed - October 26, 2025
- **Profile Photo - Temporary Logo**
  - Changed About section image from man.jpg to android-chrome-512x512.png
  - Uses existing Captain Solo logo/icon as placeholder
  - Ready to replace with actual profile photo when available
  - **Files Changed:**
    - `src/sections/About.jsx` - Updated image src
  - **Commit:** `652899c` - feat: Use android-chrome icon as temporary profile photo

### Added - October 26, 2025
- **Personalized Contact Section**
  - Replaced placeholder with Solomon's actual contact information
  - Email: hello@captainsolo.ca (clickable mailto: link with hover effect)
  - Phone: (289) 233-8317 (clickable tel: link)
  - Location: Waterloo/Brampton, ON • Serving GTA
  - Social media links from constants: Instagram, LinkedIn, GitHub, YouTube
  - Updated CTA: "Need a website AND the content to fill it? Let's build something unforgettable"
  - Subtitle: "Let's Create Something Legendary"
  - Brand marquee messages:
    - "Code it. Film it. Ship it."
    - "Where creativity meets execution."
    - "Full-Stack Development + Video Production."
  - GSAP staggered animations (y: 100, stagger: 0.3s, back.out easing)
  - All external links open in new tab (target="_blank")
  - **Files Changed:**
    - `src/sections/Contact.jsx` - Complete personalization
  - **Commit:** `92fdcc3` - feat: Personalize Contact section and install @iconify/react

### Added - October 26, 2025
- **Personalized Works/Portfolio Section**
  - Updated header text to reflect Solomon's portfolio
  - "Real projects. Real results. From barbershop promos to full-stack platforms"
  - "1,400+ projects that combine code with creativity"
  - Interactive hover previews on desktop
  - Projects loaded from constants (barbershop, club events, basketball, web dev, integrated)
  - GSAP animations: entrance (y: 100, stagger: 0.3s), hover effects
  - Floating preview follows mouse on desktop
  - Mobile: static image previews
  - **Files Changed:**
    - `src/sections/Works.jsx` - Renamed from Work.jsx, updated content
  - **Commit:** `92fdcc3` - feat: Personalize Contact section and install @iconify/react

### Added - October 26, 2025
- **Dependencies: @iconify/react Package**
  - Installed @iconify/react for icon support
  - Required for Works and Marquee components
  - Fixes import errors for Icon component
  - **Commit:** `92fdcc3` - feat: Personalize Contact section and install @iconify/react

### Added - October 26, 2025
- **Personalized About Section**
  - Implemented full About component with authentic Captain Solo story
  - Highlights dual expertise: Full-Stack Developer + Videographer
  - Real stats included: 6 years experience, 1,400+ projects, 4.8★ rating
  - GSAP scroll animations:
    - Section scale down to 0.95 for depth effect
    - Image clip-path reveal animation (bottom-to-top, 2s duration)
  - Personal touches: gaming, basketball, music, cinematography interests
  - Location: Waterloo/Brampton, serving GTA
  - Unique value proposition: "I don't just build your website—I shoot the content to fill it"
  - Profile image: `images/solomon-profile.jpg` (needs to be added)
  - Mobile responsive: stacks vertically on small screens
  - **Files Changed:**
    - `src/sections/About.jsx` - Complete rewrite from placeholder
  - **Commit:** `05511b7` - feat: Implement personalized About section

### Added - October 26, 2025
- **Complete Services Section with Sticky Scroll**
  - Implemented full Services component with GSAP scroll animations
  - Added sticky scroll effect on desktop (5em stacking per card)
  - Mobile responsive: normal scroll on screens <768px
  - Service entrance animation: y: 200 with circ.out easing
  - Display 4 service categories:
    1. Full-Stack Web Development (Frontend, Backend, Database)
    2. Video Production & Content (Social Media, Commercial, Event Coverage)
    3. Artist & Music Content (Music Videos, Performance, Branding)
    4. Integrated Digital Solutions (Website + Content packages)
  - Numbered service items (01, 02, 03) with divider lines
  - Dark theme (bg-black) with rounded-t-4xl top corners
  - ScrollTrigger start: "top 80%", duration: 1s
  - Added to App layout: Hero → ServiceSummary → **Services** → About → Work → Contact
  - **Files Changed:**
    - `src/sections/Services.jsx` - Complete rewrite from placeholder
    - `src/App.jsx` - Added Services import and render
  - **Commits:** 
    - `d0f7f7f` - feat: Implement full Services section with sticky scroll
    - `83b1e74` - feat: Add Services section to App layout

### Added - October 26, 2025
- **Personalized ServiceSummary Component**
  - Replaced generic tech terms with Solomon's actual services
  - Line 1: Web Development
  - Line 2: React & Node.js (main tech stack)
  - Line 3: APIs, Databases, Deployment (full-stack capabilities)
  - Line 4: Video Production (creative services)
  - Maintained GSAP scroll animations (xPercent transforms)
  - Added inline comments for maintainability
  - **Files Changed:**
    - `src/sections/ServiceSummary.jsx`
  - **Commit:** `e7dbb82` - feat: Personalize ServiceSummary with web dev + video production

### Added - October 26, 2025
- **3D Planet Background to Hero Section**
  - Implemented Canvas with React Three Fiber for 3D rendering
  - Added animated floating planet component with GSAP animations
  - Configured Environment lighting system with 4 Lightformers for professional lighting
  - Implemented responsive scaling: 70% on mobile (≤853px), 100% on desktop
  - Added comprehensive code comments for maintainability
  - Camera positioned at [0, 0, -10] with 17.5° FOV for optimal viewing
  - Float speed set to 0.5 for subtle animation
  - Ambient light intensity: 0.5
  - Planet model location: `/models/Planet.glb`
  - **Files Changed:**
    - `src/sections/Hero.jsx` - Complete rewrite with 3D canvas integration
  - **Commit:** `bf5d2f2` - feat: Add 3D planet background to Hero section

---

## Notes
- This changelog follows the format from [Keep a Changelog](https://keepachangelog.com/)
- Changes are grouped by: Added, Changed, Deprecated, Removed, Fixed, Security


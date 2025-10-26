# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

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


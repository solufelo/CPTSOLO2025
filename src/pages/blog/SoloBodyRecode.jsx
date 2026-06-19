import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';
import LogoHeader from '../../components/LogoHeader';
import BlogSidebar from '../../components/BlogSidebar';
import ShareButton from '../../components/ShareButton';
import BlogAuthorBio from '../../components/BlogAuthorBio';
import { getRelatedPosts } from '../../data/blogArticles';
import { useTheme } from '../../context/ThemeContext';

/**
 * SEO Blog Post: SOLO BODY RECODE - Complete Body Realignment System
 * Target Keywords: "body realignment", "posture correction", "calisthenics routine", "mobility exercises"
 */

// Exercise illustration components (SVG)
const AnkleDorsiflexion = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect x="20" y="140" width="160" height="8" fill="#94a3b8" rx="2"/>
    <line x1="100" y1="140" x2="100" y2="80" stroke="#334155" strokeWidth="12" strokeLinecap="round"/>
    <ellipse cx="100" cy="145" rx="8" ry="6" fill="#475569"/>
    <path d="M 92 145 L 70 155 L 72 160 L 94 150 Z" fill="#475569"/>
    <path d="M 70 155 Q 60 130 65 100" stroke="#06b6d4" strokeWidth="3" fill="none" strokeDasharray="5,3"/>
    <circle cx="65" cy="100" r="4" fill="#06b6d4"/>
    <path d="M 75 145 L 85 135" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
      </marker>
    </defs>
    <circle cx="100" cy="60" r="15" fill="#e2e8f0"/>
    <line x1="100" y1="75" x2="100" y2="80" stroke="#334155" strokeWidth="8"/>
  </svg>
);

const GluteBridge = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect x="20" y="140" width="160" height="8" fill="#94a3b8" rx="2"/>
    <circle cx="50" cy="125" r="12" fill="#e2e8f0"/>
    <path d="M 62 125 Q 100 85 138 125" stroke="#334155" strokeWidth="14" fill="none" strokeLinecap="round"/>
    <path d="M 138 125 L 145 140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
    <path d="M 100 90 L 95 140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
    <ellipse cx="145" cy="143" rx="8" ry="5" fill="#475569"/>
    <ellipse cx="95" cy="143" rx="8" ry="5" fill="#475569"/>
    <path d="M 100 110 L 100 95" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead2)" />
    <defs>
      <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
      </marker>
    </defs>
    <circle cx="100" cy="100" r="8" fill="#06b6d4" opacity="0.3"/>
  </svg>
);

const WallBreathing = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect x="140" y="0" width="60" height="200" fill="#cbd5e1"/>
    <rect x="20" y="140" width="120" height="8" fill="#94a3b8" rx="2"/>
    <circle cx="80" cy="125" r="12" fill="#e2e8f0"/>
    <line x1="92" y1="125" x2="130" y2="125" stroke="#334155" strokeWidth="12" strokeLinecap="round"/>
    <line x1="130" y1="125" x2="140" y2="125" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
    <line x1="140" y1="125" x2="140" y2="60" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
    <line x1="130" y1="125" x2="138" y2="125" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
    <line x1="138" y1="125" x2="138" y2="65" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
    <ellipse cx="110" cy="120" rx="6" ry="10" fill="#475569"/>
    <ellipse cx="110" cy="130" rx="6" ry="10" fill="#475569"/>
    <circle cx="110" cy="125" r="15" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.5"/>
    <circle cx="110" cy="125" r="20" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.3" strokeDasharray="3,3"/>
  </svg>
);

const ChinTuck = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <circle cx="100" cy="50" r="15" fill="#e2e8f0"/>
    <line x1="100" y1="65" x2="100" y2="80" stroke="#334155" strokeWidth="6" strokeLinecap="round"/>
    <rect x="85" y="80" width="30" height="45" fill="#334155" rx="8"/>
    <line x1="85" y1="85" x2="60" y2="40" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
    <line x1="115" y1="85" x2="140" y2="40" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="60" cy="35" r="5" fill="#475569"/>
    <circle cx="140" cy="35" r="5" fill="#475569"/>
    <line x1="92" y1="125" x2="92" y2="165" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
    <line x1="108" y1="125" x2="108" y2="165" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
    <path d="M 115 50 L 125 50" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead3)" />
    <defs>
      <marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
      </marker>
    </defs>
    <line x1="100" y1="50" x2="100" y2="165" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4,4" opacity="0.5"/>
  </svg>
);

const ScapularPushup = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect x="60" y="130" width="8" height="40" fill="#64748b" rx="2"/>
    <rect x="132" y="130" width="8" height="40" fill="#64748b" rx="2"/>
    <rect x="50" y="125" width="28" height="6" fill="#64748b" rx="3"/>
    <rect x="122" y="125" width="28" height="6" fill="#64748b" rx="3"/>
    <ellipse cx="64" cy="125" rx="6" ry="4" fill="#475569"/>
    <ellipse cx="136" cy="125" rx="6" ry="4" fill="#475569"/>
    <line x1="64" y1="125" x2="75" y2="110" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
    <line x1="136" y1="125" x2="125" y2="110" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
    <line x1="75" y1="110" x2="125" y2="110" stroke="#334155" strokeWidth="14" strokeLinecap="round"/>
    <circle cx="100" cy="95" r="12" fill="#e2e8f0"/>
    <line x1="100" y1="110" x2="100" y2="140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
    <circle cx="85" cy="108" r="8" fill="#06b6d4" opacity="0.3"/>
    <circle cx="115" cy="108" r="8" fill="#06b6d4" opacity="0.3"/>
    <path d="M 85 108 L 75 108" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead4)" />
    <path d="M 115 108 L 125 108" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead4)" />
    <defs>
      <marker id="arrowhead4" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
      </marker>
    </defs>
  </svg>
);

const FacePulls = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <circle cx="180" cy="100" r="8" fill="#64748b"/>
    <path d="M 180 100 Q 140 95 100 100" stroke="#06b6d4" strokeWidth="4" fill="none"/>
    <path d="M 180 100 Q 140 105 100 100" stroke="#06b6d4" strokeWidth="4" fill="none"/>
    <circle cx="60" cy="70" r="12" fill="#e2e8f0"/>
    <rect x="50" y="82" width="20" height="35" fill="#334155" rx="6"/>
    <line x1="50" y1="95" x2="85" y2="95" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
    <line x1="70" y1="95" x2="95" y2="105" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="95" cy="95" r="5" fill="#475569"/>
    <circle cx="95" cy="105" r="5" fill="#475569"/>
    <line x1="55" y1="117" x2="55" y2="160" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
    <line x1="65" y1="117" x2="65" y2="160" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
    <circle cx="48" cy="92" r="6" fill="#14b8a6" opacity="0.4"/>
    <path d="M 110 100 L 90 100" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead5)" />
    <defs>
      <marker id="arrowhead5" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
      </marker>
    </defs>
  </svg>
);

const ScapularPullup = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect x="60" y="30" width="80" height="6" fill="#64748b" rx="3"/>
    <rect x="50" y="20" width="6" height="180" fill="#cbd5e1"/>
    <rect x="144" y="20" width="6" height="180" fill="#cbd5e1"/>
    <circle cx="100" cy="65" r="12" fill="#e2e8f0"/>
    <line x1="80" y1="36" x2="92" y2="55" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
    <line x1="120" y1="36" x2="108" y2="55" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="80" cy="33" r="5" fill="#475569"/>
    <circle cx="120" cy="33" r="5" fill="#475569"/>
    <rect x="90" y="77" width="20" height="35" fill="#334155" rx="6"/>
    <line x1="95" y1="112" x2="95" y2="150" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
    <line x1="105" y1="112" x2="105" y2="150" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
    <circle cx="92" cy="55" r="6" fill="#06b6d4" opacity="0.4"/>
    <circle cx="108" cy="55" r="6" fill="#06b6d4" opacity="0.4"/>
    <path d="M 100 120 L 100 115" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead6)" />
    <defs>
      <marker id="arrowhead6" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
      </marker>
    </defs>
  </svg>
);

const BulgarianSplitSquat = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect x="130" y="120" width="50" height="12" fill="#64748b" rx="2"/>
    <rect x="135" y="132" width="6" height="30" fill="#64748b"/>
    <rect x="169" y="132" width="6" height="30" fill="#64748b"/>
    <circle cx="80" cy="60" r="12" fill="#e2e8f0"/>
    <rect x="70" y="72" width="20" height="35" fill="#334155" rx="6"/>
    <line x1="75" y1="107" x2="70" y2="140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
    <line x1="70" y1="140" x2="65" y2="165" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
    <ellipse cx="65" cy="168" rx="8" ry="5" fill="#475569"/>
    <line x1="85" y1="107" x2="110" y2="120" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
    <line x1="110" y1="120" x2="145" y2="120" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
    <ellipse cx="145" cy="120" rx="6" ry="4" fill="#475569"/>
    <line x1="70" y1="140" x2="65" y2="165" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" opacity="0.6"/>
    <path d="M 80 90 L 80 100" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead7)" />
    <defs>
      <marker id="arrowhead7" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
      </marker>
    </defs>
  </svg>
);

const SoloBodyRecode = () => {
  const { theme } = useTheme();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [fullscreenExercise, setFullscreenExercise] = useState(null);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://captainsolo.ca/blog/solo-body-recode';
  const title = 'SOLO BODY RECODE: Complete Body Realignment System';
  const description = 'Discover the SOLO BODY RECODE system - a 3-phase approach to fix posture, build strength, and integrate movement. From ankle mobility to neck alignment, transform your body from the ground up.';
  const relatedPosts = getRelatedPosts('Fitness', 'solo-body-recode', 3);

  // Theme-aware styling
  const getSectionBg = () => {
    switch(theme) {
      case 'glass': return 'bg-[rgba(15,20,35,0.98)]';
      case 'light': return 'bg-gray-50';
      default: return 'bg-DarkLava';
    }
  };

  const getTextColor = () => {
    switch(theme) {
      case 'glass': return 'text-white';
      case 'light': return 'text-gray-900';
      default: return 'text-primary';
    }
  };

  const getMutedTextColor = () => {
    switch(theme) {
      case 'glass': return 'text-white/60';
      case 'light': return 'text-gray-600';
      default: return 'text-SageGray';
    }
  };

  const getAccentColor = () => {
    switch(theme) {
      case 'glass': return 'text-cyan-400';
      case 'light': return 'text-blue-600';
      default: return 'text-gold';
    }
  };

  const getTagBg = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-400/20 border-cyan-400/50 text-cyan-400';
      case 'light': return 'bg-blue-100 border-blue-200 text-blue-600';
      default: return 'bg-gold/20 border-gold/50 text-gold';
    }
  };

  const getBorderColor = () => {
    switch(theme) {
      case 'glass': return 'border-white/20';
      case 'light': return 'border-gray-200';
      default: return 'border-SageGray/30';
    }
  };

  const getCardBg = () => {
    switch(theme) {
      case 'glass': return 'bg-white/5 border-white/10 hover:border-cyan-400/50';
      case 'light': return 'bg-white border-gray-200 hover:border-blue-400';
      default: return 'bg-primary/5 border-SageGray/30 hover:border-gold';
    }
  };

  // Handle escape key to close fullscreen and prevent body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && fullscreenExercise) {
        setFullscreenExercise(null);
      }
    };
    
    if (fullscreenExercise) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [fullscreenExercise]);

  const exercises = [
    {
      phase: 0,
      items: [
        { name: "Ankle Dorsiflexion", illustration: AnkleDorsiflexion, description: "Seated model flexing ankle toward shin with resistance band", sets: "2-3 sets", reps: "10-15 reps", cue: "ALIGN" },
        { name: "Glute Bridge with Posterior Pelvic Tilt", illustration: GluteBridge, description: "Lying on mat, hips lifted, core tight", sets: "2-3 sets", reps: "10-15 reps", cue: "BREATHE" },
        { name: "90/90 Wall Breathing", illustration: WallBreathing, description: "Feet on wall, hands on ribs, deep inhaling", sets: "2-3 sets", reps: "10-15 reps", cue: "RESET" },
        { name: "Chin Tuck with Overhead Reach", illustration: ChinTuck, description: "Retracting chin while raising arms overhead", sets: "2-3 sets", reps: "10-15 reps", cue: "ALIGN" }
      ]
    },
    {
      phase: 1,
      items: [
        { name: "Scapular Push-ups on Parallettes", illustration: ScapularPushup, description: "Elbows locked, shoulder blades protracting/retracting", sets: "3 sets", reps: "8-12 reps", cue: "CORE ENGAGED" },
        { name: "Band External Rotations / Face Pulls", illustration: FacePulls, description: "Resistance band at chest height, elbows aligned", sets: "3 sets", reps: "8-12 reps", cue: "SHOULDERS BACK" },
        { name: "Scapular Pull-ups", illustration: ScapularPullup, description: "Hanging from pull-up bar, small scapular depression", sets: "3 sets", reps: "8-12 reps", cue: "CONTROL EVERY REP" },
        { name: "Bulgarian Split Squats", illustration: BulgarianSplitSquat, description: "Rear foot elevated, front knee tracking over ankle", sets: "3 sets", reps: "8-12 reps", cue: "SHOULDERS BACK" }
      ]
    },
    {
      phase: 2,
      items: [
        { name: "Active Hang + Scapular Pull-up Flow", illustration: ScapularPullup, description: "Hanging with controlled movement", sets: "2-4 sets", reps: "6-10 reps", cue: "FLOW" },
        { name: "Parallette L-sit → Tuck Hold", illustration: ScapularPushup, description: "Progression shown in two stages", sets: "2-4 sets", reps: "6-10 reps per side", cue: "CONTROL" },
        { name: "Wall Angels with Glute Engagement", illustration: ChinTuck, description: "Back flat on wall, arms sliding overhead", sets: "2-4 sets", reps: "6-10 reps per side", cue: "INTEGRATE" },
        { name: "Cossack Squats", illustration: BulgarianSplitSquat, description: "Deep side lunge, opposite leg extended, chest upright", sets: "2-4 sets", reps: "6-10 reps per side", cue: "FLOW" }
      ]
    }
  ];

  const phases = [
    {
      id: 0,
      title: "PHASE 1: RESET",
      subtitle: "Realign posture from the ground up",
      goal: "Mobility, stability, and alignment from ankles to neck",
      color: "bg-gradient-to-br from-cyan-50 to-slate-50",
      accentColor: "text-cyan-600",
      borderColor: "border-cyan-400"
    },
    {
      id: 1,
      title: "PHASE 2: STRENGTHEN",
      subtitle: "Build control, power, and posture",
      goal: "Reinforce core, posterior chain, and shoulder stability",
      color: "bg-gradient-to-br from-slate-50 to-zinc-50",
      accentColor: "text-slate-700",
      borderColor: "border-slate-400"
    },
    {
      id: 2,
      title: "PHASE 3: INTEGRATE",
      subtitle: "Link the chain — movement meets control",
      goal: "Synchronize breath, posture, and movement for functional flow",
      color: "bg-gradient-to-br from-cyan-50 via-slate-50 to-zinc-50",
      accentColor: "text-cyan-700",
      borderColor: "border-cyan-500"
    },
    {
      id: 3,
      title: "BODY MAP & DAILY RECODE ROUTINE",
      subtitle: "Solo Body Recode — Your Full-Body System",
      goal: "A visual summary connecting all phases with complete integration",
      color: "bg-gradient-to-br from-slate-100 via-cyan-50 to-slate-100",
      accentColor: "text-slate-800",
      borderColor: "border-slate-500"
    }
  ];

  const nextPhase = () => {
    setCurrentPhase((prev) => (prev + 1) % phases.length);
  };

  const prevPhase = () => {
    setCurrentPhase((prev) => (prev - 1 + phases.length) % phases.length);
  };

  const currentData = phases[currentPhase];
  const currentExercises = exercises[currentPhase]?.items || [];

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>SOLO BODY RECODE: Complete Body Realignment System | Posture & Mobility Guide</title>
        <meta name="title" content="SOLO BODY RECODE: Complete Body Realignment System | Posture & Mobility Guide" />
        <meta name="description" content="SOLO BODY RECODE: Fix posture for students, desk workers, and inactive lifestyles. Combat stress, improve mobility, and learn nutrition for recovery. Full-screen exercise views included." />
        <meta name="keywords" content="body realignment, posture correction, calisthenics routine, mobility exercises, strength training, functional fitness, physiotherapy exercises, home workout program, athletic posture, ankle mobility, scapular health, core strength, posture exercises, student posture, desk worker exercises, stress relief exercises, inactive lifestyle, sedentary lifestyle exercises, nutrition for recovery, study breaks, neck pain from studying, back pain from sitting" />
        <link rel="canonical" href="https://captainsolo.ca/blog/solo-body-recode" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="CaptainSolo" />
        <meta property="og:title" content="SOLO BODY RECODE: Transform Your Posture & Movement" />
        <meta property="og:description" content="A complete 3-phase system for body realignment, strength, and functional movement integration." />
        <meta property="og:url" content="https://captainsolo.ca/blog/solo-body-recode" />
        
        {/* Comprehensive Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": "https://captainsolo.ca/blog/solo-body-recode#article",
                "headline": "SOLO BODY RECODE: Complete Body Realignment System",
                "description": "A comprehensive 3-phase system for body realignment, posture correction, and functional movement integration. From ankle mobility to neck alignment.",
                "image": "https://captainsolo.ca/og-solo-body-recode.jpg",
                "author": {
                  "@type": "Person",
                  "@id": "https://captainsolo.ca/#person",
                  "name": "Solomon Olufelo",
                  "url": "https://captainsolo.ca"
                },
                "publisher": {
                  "@type": "Organization",
                  "@id": "https://captainsolo.ca/#organization",
                  "name": "CaptainSolo Media",
                  "url": "https://captainsolo.ca",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://captainsolo.ca/logo.png"
                  }
                },
                "datePublished": "2025-01-20",
                "dateModified": "2025-01-20",
                "mainEntityOfPage": "https://captainsolo.ca/blog/solo-body-recode",
                "articleSection": "Fitness",
                "keywords": "body realignment, posture correction, calisthenics routine, mobility exercises",
                "inLanguage": "en-CA"
              }
            ]
          })}
        </script>
      </Helmet>

      <LogoHeader />
      <Navbar />

      <div className={`min-h-screen py-20 px-4 sm:px-8 ${getSectionBg()}`}>
        <div className="max-w-7xl mx-auto flex gap-8 lg:gap-12">
          {/* Main Article Content */}
          <article className="flex-1 min-w-0">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className={`font-amiamie text-sm mb-8 ${getMutedTextColor()}`}>
                <Link to="/" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'}`}>Home</Link>
                <span className="mx-2">/</span>
                <Link to="/blog" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'}`}>Blog</Link>
                <span className="mx-2">/</span>
                <span className={getTextColor()}>SOLO BODY RECODE</span>
              </nav>

              {/* Article Header */}
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 text-xs font-amiamie-round font-bold rounded ${getTagBg()}`}>
                    Fitness
                  </span>
                  <span className={`text-xs font-amiamie ${getMutedTextColor()}`}>15 min read</span>
                  <time className={`text-xs font-amiamie ${getMutedTextColor()}`} dateTime="2025-01-20">
                    January 20, 2025
                  </time>
                </div>
                <h1 className={`font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black mb-4 ${getTextColor()}`}>
                  {title}
                </h1>
                <p className={`font-amiamie text-xl mb-4 ${getAccentColor()}`}>
                  Rebuild. Recode. Rise — Transform Your Posture from Ankles to Neck
                </p>
                <p className={`font-amiamie text-lg mb-6 ${getMutedTextColor()}`}>
                  {description}
                </p>
                
                {/* Share Button */}
                <div className="flex items-center gap-4 mb-8">
                  <ShareButton url={currentUrl} title={title} description={description} />
                </div>
              </header>

              {/* Introduction */}
              <section className="mb-12">
                <div className="prose prose-invert prose-lg max-w-none">
                  <div className={`font-amiamie space-y-6 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <p className={`text-xl leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                      <strong className={getAccentColor()}>SOLO BODY RECODE</strong> is a complete 3-phase system designed to realign your body from the ground up. Whether you're a <strong className={getAccentColor()}>student</strong> spending hours at a desk, a <strong className={getAccentColor()}>desk worker</strong> dealing with forward head posture, dealing with <strong className={getAccentColor()}>stress</strong> and tension, living an <strong className={getAccentColor()}>inactive lifestyle</strong>, or an athlete looking to optimize movement patterns, this system addresses posture and mobility issues systematically.
                    </p>
                    <p className="leading-relaxed">
                      The program follows a simple progression: <strong className={getAccentColor()}>RESET</strong> your alignment, <strong className={getAccentColor()}>STRENGTHEN</strong> your foundation, and <strong className={getAccentColor()}>INTEGRATE</strong> movement patterns into your daily life. Each phase builds on the previous one, creating a comprehensive approach to body realignment that targets everything from ankle mobility to neck alignment. Plus, we'll cover how <strong className={getAccentColor()}>nutrition and diet</strong> support your body's recovery and transformation.
                    </p>
                    <div className={`border-l-4 p-6 rounded my-6 ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                      <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                        Quick Stats
                      </h3>
                      <ul className={`space-y-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/90'}`}>
                        <li>• <strong>3 Phases</strong> of progressive training</li>
                        <li>• <strong>12 Key Exercises</strong> with detailed instructions</li>
                        <li>• <strong>40-60 Minutes</strong> daily commitment</li>
                        <li>• <strong>No Gym Required</strong> - minimal equipment needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Interactive Phase Navigator */}
              <section className="mb-12">
                <div className={`border rounded-lg p-6 mb-8 ${theme === 'light' ? 'bg-gray-50 border-gray-200' : theme === 'glass' ? 'bg-white/5 border-white/20' : 'bg-primary/10 border-SageGray/30'}`}>
                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={prevPhase}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-amiamie ${theme === 'light' ? 'bg-white hover:bg-gray-100 text-gray-700' : 'bg-primary/20 hover:bg-primary/30 text-primary'}`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                    
                    <div className="flex gap-2">
                      {phases.map((phase, idx) => (
                        <button
                          key={phase.id}
                          onClick={() => setCurrentPhase(idx)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            idx === currentPhase 
                              ? (theme === 'glass' ? 'bg-cyan-400 w-8' : theme === 'light' ? 'bg-blue-600 w-8' : 'bg-gold w-8') 
                              : 'bg-SageGray/50'
                          }`}
                          aria-label={`Go to ${phase.title}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextPhase}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-amiamie ${theme === 'light' ? 'bg-white hover:bg-gray-100 text-gray-700' : 'bg-primary/20 hover:bg-primary/30 text-primary'}`}
                    >
                      Next
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Current Phase Display */}
                  <div className={`${currentData.color} rounded-xl p-8 border-2 ${currentData.borderColor} min-h-[400px]`}>
                    <div className="mb-6">
                      <h2 className={`text-3xl font-amiamie-round font-black ${currentData.accentColor} mb-2`}>
                        {currentData.title}
                      </h2>
                      <p className="text-xl text-slate-700 font-amiamie font-medium mb-2">
                        {currentData.subtitle}
                      </p>
                      <p className="text-slate-600 font-amiamie">
                        <span className="font-semibold">Goal:</span> {currentData.goal}
                      </p>
                    </div>

                    {/* Exercises Grid */}
                    {currentPhase < 3 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentExercises.map((exercise, idx) => {
                          const IllustrationComponent = exercise.illustration;
                          return (
                            <div
                              key={idx}
                              className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-xl transition-shadow"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-amiamie-round font-bold text-slate-800 flex-1">
                                  {exercise.name}
                                </h3>
                                <span className={`${currentData.accentColor} font-amiamie font-bold text-sm px-3 py-1 bg-cyan-100 rounded-full whitespace-nowrap ml-2`}>
                                  {exercise.cue}
                                </span>
                              </div>
                              
                              <p className="text-slate-600 mb-4 text-sm font-amiamie">
                                {exercise.description}
                              </p>
                              
                              <div className="flex gap-4 text-sm mb-4">
                                <div className="bg-slate-100 px-3 py-2 rounded-lg">
                                  <span className="font-semibold text-slate-700 font-amiamie">{exercise.sets}</span>
                                </div>
                                <div className="bg-slate-100 px-3 py-2 rounded-lg">
                                  <span className="font-semibold text-slate-700 font-amiamie">{exercise.reps}</span>
                                </div>
                              </div>
                              
                              {/* Exercise Illustration */}
                              <div className="relative h-48 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg flex items-center justify-center border border-slate-300 p-4 cursor-pointer group" onClick={() => setFullscreenExercise(exercise)}>
                                <IllustrationComponent />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-lg flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                    <span className="text-slate-700 font-amiamie text-sm font-semibold">View Full Screen</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Body Map Summary View */
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left: Body Map */}
                        <div className="bg-white rounded-xl p-8 shadow-md">
                          <h3 className="text-2xl font-amiamie-round font-bold text-slate-800 mb-6 text-center">
                            Full-Body System Map
                          </h3>
                          
                          <div className="relative h-96 bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg border-2 border-slate-300 flex items-center justify-center mb-6">
                            <svg viewBox="0 0 200 400" className="w-full h-full p-4">
                              <circle cx="100" cy="40" r="20" fill="#e2e8f0" stroke="#334155" strokeWidth="2"/>
                              <line x1="100" y1="60" x2="100" y2="100" stroke="#334155" strokeWidth="12" strokeLinecap="round"/>
                              <rect x="75" y="100" width="50" height="80" fill="#334155" rx="10"/>
                              <line x1="75" y1="120" x2="40" y2="140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
                              <line x1="125" y1="120" x2="160" y2="140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
                              <line x1="85" y1="180" x2="85" y2="280" stroke="#334155" strokeWidth="11" strokeLinecap="round"/>
                              <line x1="115" y1="180" x2="115" y2="280" stroke="#334155" strokeWidth="11" strokeLinecap="round"/>
                              
                              <path d="M 100 320 L 100 300" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#flow1)"/>
                              <path d="M 100 280 L 100 240" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#flow1)"/>
                              <path d="M 100 220 L 100 180" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#flow1)"/>
                              <path d="M 100 160 L 100 120" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#flow1)"/>
                              <path d="M 100 100 L 100 70" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#flow1)"/>
                              
                              <defs>
                                <marker id="flow1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                                  <circle cx="4" cy="4" r="3" fill="#06b6d4"/>
                                </marker>
                              </defs>
                              
                              <text x="130" y="45" fontSize="10" fill="#334155" fontWeight="bold">Scalp & Neck</text>
                              <text x="130" y="140" fontSize="10" fill="#334155" fontWeight="bold">Diaphragm</text>
                              <text x="130" y="200" fontSize="10" fill="#334155" fontWeight="bold">Pelvis</text>
                              <text x="130" y="290" fontSize="10" fill="#334155" fontWeight="bold">Ankles & Feet</text>
                              
                              <circle cx="100" cy="40" r="12" fill="#06b6d4" opacity="0.2"/>
                              <ellipse cx="100" cy="70" rx="15" ry="8" fill="#14b8a6" opacity="0.2"/>
                              <ellipse cx="100" cy="140" rx="30" ry="20" fill="#06b6d4" opacity="0.2"/>
                              <ellipse cx="100" cy="200" rx="28" ry="15" fill="#14b8a6" opacity="0.2"/>
                              <circle cx="100" cy="290" r="15" fill="#06b6d4" opacity="0.2"/>
                            </svg>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <div className="text-2xl mb-1">🧘</div>
                              <div className="text-xs font-semibold text-slate-700 font-amiamie">Foam Roller</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <div className="text-2xl mb-1">💆</div>
                              <div className="text-xs font-semibold text-slate-700 font-amiamie">Scalp Massage</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <div className="text-2xl mb-1">🎯</div>
                              <div className="text-xs font-semibold text-slate-700 font-amiamie">Peanut Ball</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <div className="text-2xl mb-1">🪢</div>
                              <div className="text-xs font-semibold text-slate-700 font-amiamie">Jump Rope</div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Daily Routine Schedule */}
                        <div className="bg-white rounded-xl p-8 shadow-md">
                          <h3 className="text-2xl font-amiamie-round font-bold text-slate-800 mb-6">
                            Daily Recode Routine
                          </h3>
                          
                          <div className="space-y-4 mb-8">
                            <div className="border-l-4 border-cyan-500 pl-4 py-3 bg-cyan-50 rounded-r-lg">
                              <div className="font-bold text-slate-800 mb-1 font-amiamie-round">Reset (Mobility & Posture)</div>
                              <div className="text-sm text-slate-600 font-amiamie">10-15 minutes</div>
                            </div>
                            
                            <div className="border-l-4 border-slate-500 pl-4 py-3 bg-slate-50 rounded-r-lg">
                              <div className="font-bold text-slate-800 mb-1 font-amiamie-round">Strengthen (Power & Stability)</div>
                              <div className="text-sm text-slate-600 font-amiamie">15-25 minutes</div>
                            </div>
                            
                            <div className="border-l-4 border-cyan-600 pl-4 py-3 bg-cyan-50 rounded-r-lg">
                              <div className="font-bold text-slate-800 mb-1 font-amiamie-round">Integrate (Flow & Function)</div>
                              <div className="text-sm text-slate-600 font-amiamie">15-20 minutes</div>
                            </div>
                            
                            <div className="border-l-4 border-slate-400 pl-4 py-3 bg-slate-50 rounded-r-lg">
                              <div className="font-bold text-slate-800 mb-1 font-amiamie-round">Optional Finisher</div>
                              <div className="text-sm text-slate-600 font-amiamie">Scalp massage & deep breathing (5 min)</div>
                            </div>
                          </div>

                          {/* Quote */}
                          <div className="bg-gradient-to-r from-cyan-500 to-slate-700 text-white p-6 rounded-xl text-center">
                            <p className="text-2xl font-amiamie-round font-bold mb-2">
                              "Rebuild. Recode. Rise."
                            </p>
                            <p className="text-sm opacity-90 font-amiamie">
                              The Solo Body Recode System
                            </p>
                          </div>

                          {/* Equipment List */}
                          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h4 className="font-bold text-slate-800 mb-3 text-sm font-amiamie-round">Equipment Needed:</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-amiamie">
                              <div>• Parallettes</div>
                              <div>• Pull-up Bar</div>
                              <div>• Resistance Bands</div>
                              <div>• Yoga Mat</div>
                              <div>• Foam Roller</div>
                              <div>• Peanut Ball</div>
                              <div>• Jump Rope</div>
                              <div>• Scalp Massager</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Why This Matters: Students, Stress, Inactive Lifestyle */}
              <section className="mb-12">
                <h2 className={`font-amiamie-round text-3xl font-black mb-6 ${getAccentColor()}`}>
                  Why SOLO BODY RECODE Matters for You
                </h2>
                
                <div className="space-y-6">
                  {/* Students Section */}
                  <div className={`border-l-4 p-6 rounded-lg ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                    <h3 className={`font-amiamie-round text-2xl font-bold mb-4 flex items-center gap-3 ${getTextColor()}`}>
                      <span className="text-3xl">📚</span>
                      Students: Fix Your Study Posture
                    </h3>
                    <p className={`font-amiamie mb-3 leading-relaxed ${getMutedTextColor()}`}>
                      Spending 6-8 hours a day hunched over textbooks or a laptop? You're not alone. <strong className={getTextColor()}>90% of students</strong> experience neck and back pain from poor study posture. SOLO BODY RECODE addresses the specific issues students face:
                    </p>
                    <ul className={`list-disc list-inside space-y-2 font-amiamie ml-4 ${getMutedTextColor()}`}>
                      <li><strong className={getTextColor()}>Forward head posture</strong> from looking down at books</li>
                      <li><strong className={getTextColor()}>Rounded shoulders</strong> from sitting at desks</li>
                      <li><strong className={getTextColor()}>Tight hip flexors</strong> from prolonged sitting</li>
                      <li><strong className={getTextColor()}>Lower back pain</strong> from improper chair setup</li>
                    </ul>
                    <p className={`font-amiamie mt-4 leading-relaxed ${getMutedTextColor()}`}>
                      <strong className={getAccentColor()}>Quick Study Break Routine:</strong> Do Phase 1 exercises (Reset) during your study breaks - just 10 minutes every 2 hours can prevent pain and improve focus. The 90/90 Wall Breathing exercise is perfect for resetting your nervous system between study sessions.
                    </p>
                  </div>

                  {/* Stress Section */}
                  <div className={`border-l-4 p-6 rounded-lg ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                    <h3 className={`font-amiamie-round text-2xl font-bold mb-4 flex items-center gap-3 ${getTextColor()}`}>
                      <span className="text-3xl">😰</span>
                      Stress & Tension: Release What's Holding You Back
                    </h3>
                    <p className={`font-amiamie mb-3 leading-relaxed ${getMutedTextColor()}`}>
                      Chronic stress doesn't just affect your mind - it <strong className={getTextColor()}>locks tension into your body</strong>. When you're stressed, your shoulders hike up, your jaw clenches, and your breathing becomes shallow. This creates a cycle of pain and tension that's hard to break.
                    </p>
                    <p className={`font-amiamie mb-3 leading-relaxed ${getMutedTextColor()}`}>
                      SOLO BODY RECODE breaks this cycle by:
                    </p>
                    <ul className={`list-disc list-inside space-y-2 font-amiamie ml-4 ${getMutedTextColor()}`}>
                      <li><strong className={getTextColor()}>Activating your parasympathetic nervous system</strong> through breathing exercises</li>
                      <li><strong className={getTextColor()}>Releasing shoulder and neck tension</strong> with scapular work</li>
                      <li><strong className={getTextColor()}>Improving blood flow</strong> to reduce stress-related muscle tightness</li>
                      <li><strong className={getTextColor()}>Creating body awareness</strong> to catch tension before it builds</li>
                    </ul>
                    <p className={`font-amiamie mt-4 leading-relaxed ${getMutedTextColor()}`}>
                      <strong className={getAccentColor()}>Stress Relief Tip:</strong> The 90/90 Wall Breathing exercise in Phase 1 is scientifically proven to activate your vagus nerve, reducing cortisol levels and promoting relaxation. Do it for 5 minutes before bed or during stressful moments.
                    </p>
                  </div>

                  {/* Inactive Lifestyle Section */}
                  <div className={`border-l-4 p-6 rounded-lg ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                    <h3 className={`font-amiamie-round text-2xl font-bold mb-4 flex items-center gap-3 ${getTextColor()}`}>
                      <span className="text-3xl">🛋️</span>
                      Inactive Lifestyle: Move Better, Feel Better
                    </h3>
                    <p className={`font-amiamie mb-3 leading-relaxed ${getMutedTextColor()}`}>
                      Sitting is the new smoking. If you spend most of your day sedentary (desk job, gaming, watching TV), your body adapts by <strong className={getTextColor()}>shortening certain muscles and weakening others</strong>. This creates imbalances that lead to pain, poor posture, and decreased mobility.
                    </p>
                    <p className={`font-amiamie mb-3 leading-relaxed ${getMutedTextColor()}`}>
                      SOLO BODY RECODE reverses these adaptations:
                    </p>
                    <ul className={`list-disc list-inside space-y-2 font-amiamie ml-4 ${getMutedTextColor()}`}>
                      <li><strong className={getTextColor()}>Restores hip flexor length</strong> with ankle and glute work</li>
                      <li><strong className={getTextColor()}>Rebuilds posterior chain strength</strong> to counteract forward-leaning posture</li>
                      <li><strong className={getTextColor()}>Improves spinal mobility</strong> that's lost from constant sitting</li>
                      <li><strong className={getTextColor()}>Reactivates glutes and core</strong> that "shut off" from inactivity</li>
                    </ul>
                    <p className={`font-amiamie mt-4 leading-relaxed ${getMutedTextColor()}`}>
                      <strong className={getAccentColor()}>Sedentary Worker's Routine:</strong> Do the full Phase 1 (Reset) in the morning before work, Phase 2 (Strengthen) exercises during your lunch break, and Phase 3 (Integrate) in the evening. This breaks up your sedentary time and prevents the negative effects of sitting.
                    </p>
                  </div>

                  {/* Nutrition Section */}
                  <div className={`border-l-4 p-6 rounded-lg ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                    <h3 className={`font-amiamie-round text-2xl font-bold mb-4 flex items-center gap-3 ${getTextColor()}`}>
                      <span className="text-3xl">🥗</span>
                      Nutrition & Diet: Fuel Your Recovery
                    </h3>
                    <p className={`font-amiamie mb-3 leading-relaxed ${getMutedTextColor()}`}>
                      Exercise is only half the equation. Your body needs proper <strong className={getTextColor()}>nutrition to repair, recover, and rebuild</strong>. Poor diet can sabotage your progress by increasing inflammation, slowing recovery, and depleting energy.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 my-4">
                      <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-DarkLava/50'}`}>
                        <h4 className={`font-amiamie-round font-bold mb-2 ${getAccentColor()}`}>Anti-Inflammatory Foods</h4>
                        <ul className={`font-amiamie text-sm space-y-1 ${getMutedTextColor()}`}>
                          <li>• Omega-3 rich foods (salmon, walnuts, chia seeds)</li>
                          <li>• Turmeric and ginger (natural inflammation fighters)</li>
                          <li>• Leafy greens (spinach, kale, broccoli)</li>
                          <li>• Berries (antioxidants for recovery)</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-DarkLava/50'}`}>
                        <h4 className={`font-amiamie-round font-bold mb-2 ${getAccentColor()}`}>Muscle Recovery Nutrients</h4>
                        <ul className={`font-amiamie text-sm space-y-1 ${getMutedTextColor()}`}>
                          <li>• Protein (chicken, eggs, Greek yogurt, legumes)</li>
                          <li>• Magnesium (dark chocolate, nuts, seeds)</li>
                          <li>• Vitamin D (sunlight, fatty fish, fortified foods)</li>
                          <li>• Hydration (water, herbal teas, electrolyte drinks)</li>
                        </ul>
                      </div>
                    </div>
                    <p className={`font-amiamie mt-4 leading-relaxed ${getMutedTextColor()}`}>
                      <strong className={getAccentColor()}>Nutrition Timing:</strong> Eat a protein-rich meal within 30-60 minutes after your SOLO BODY RECODE session to maximize muscle repair. Stay hydrated throughout the day - dehydration increases muscle tension and decreases mobility. Avoid processed foods and sugar, which increase inflammation and slow recovery.
                    </p>
                    <p className={`font-amiamie mt-3 leading-relaxed ${getMutedTextColor()}`}>
                      <strong className={getAccentColor()}>Student Nutrition Hack:</strong> Keep healthy snacks (nuts, fruit, protein bars) nearby during study sessions. This prevents energy crashes and supports your body's ability to maintain good posture throughout long study periods.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mb-12">
                <h2 className={`font-amiamie-round text-3xl font-black mb-6 ${getAccentColor()}`}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className={`border rounded-lg p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                      How long does SOLO BODY RECODE take to see results?
                    </h3>
                    <p className={`font-amiamie ${getMutedTextColor()}`}>
                      Most people notice improved posture and reduced tension within 2-3 weeks of consistent practice. Significant changes in mobility and strength typically occur after 4-6 weeks.
                    </p>
                  </div>
                  
                  <div className={`border rounded-lg p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                      Can beginners do this program?
                    </h3>
                    <p className={`font-amiamie ${getMutedTextColor()}`}>
                      Yes, the program is designed for all fitness levels. Start with Phase 1 and progress at your own pace. Each exercise can be modified to suit your current ability level.
                    </p>
                  </div>
                  
                  <div className={`border rounded-lg p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                      Do I need a gym membership?
                    </h3>
                    <p className={`font-amiamie ${getMutedTextColor()}`}>
                      No, most exercises can be done at home with minimal equipment like resistance bands, parallettes, and a pull-up bar. A door-frame pull-up bar works perfectly for most exercises.
                    </p>
                  </div>
                  
                  <div className={`border rounded-lg p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                      How often should I practice each phase?
                    </h3>
                    <p className={`font-amiamie ${getMutedTextColor()}`}>
                      Aim for 3-5 sessions per week. You can combine phases or focus on one phase per session. The key is consistency rather than frequency.
                    </p>
                  </div>
                  
                  <div className={`border rounded-lg p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                      Can this help with back/neck pain?
                    </h3>
                    <p className={`font-amiamie ${getMutedTextColor()}`}>
                      Many people report reduced back and neck pain after following the program, as it addresses postural imbalances that often contribute to pain. However, consult with a healthcare professional if you have chronic pain or injuries.
                    </p>
                  </div>
                  
                  <div className={`border rounded-lg p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                      Is this good for students who study a lot?
                    </h3>
                    <p className={`font-amiamie ${getMutedTextColor()}`}>
                      Absolutely! Students are one of the main groups who benefit from SOLO BODY RECODE. The program addresses forward head posture, rounded shoulders, and hip tightness that come from hours of studying. The exercises can be done during study breaks and take just 10-15 minutes.
                    </p>
                  </div>
                  
                  <div className={`border rounded-lg p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                      Can this help with stress and anxiety?
                    </h3>
                    <p className={`font-amiamie ${getMutedTextColor()}`}>
                      Yes! The breathing exercises in Phase 1 activate your parasympathetic nervous system, which helps reduce stress and anxiety. Many people find that the program helps them manage stress better by releasing physical tension that contributes to mental stress.
                    </p>
                  </div>
                  
                  <div className={`border rounded-lg p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                      Do I need to change my diet to see results?
                    </h3>
                    <p className={`font-amiamie ${getMutedTextColor()}`}>
                      While the exercises will work regardless of diet, proper nutrition accelerates results. Anti-inflammatory foods, adequate protein, and proper hydration support muscle recovery and reduce inflammation. However, you can start with just the exercises and add nutrition improvements gradually.
                    </p>
                  </div>
                </div>
              </section>

              {/* Author Bio */}
              <BlogAuthorBio />

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className={`mb-12 mt-12 pt-8 border-t ${getBorderColor()}`}>
                  <h2 className={`font-amiamie-round text-2xl font-black mb-6 ${getTextColor()}`}>
                    Related Articles
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        to={`/blog/${relatedPost.slug}`}
                        className={`rounded-lg p-4 transition-all group border ${getCardBg()}`}
                      >
                        <h3 className={`font-amiamie-round font-bold mb-2 transition-colors ${getTextColor()} group-hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'}`}>
                          {relatedPost.title}
                        </h3>
                        <p className={`text-sm line-clamp-2 ${getMutedTextColor()}`}>
                          {relatedPost.description}
                        </p>
                        <div className={`flex items-center gap-2 mt-2 text-xs ${getMutedTextColor()}`}>
                          <span>{relatedPost.readTime}</span>
                          <span>•</span>
                          <span>{relatedPost.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Call to Action */}
              <section className="mb-12">
                <div className={`rounded-lg p-8 text-center border-2 ${
                  theme === 'light' 
                    ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-600'
                    : theme === 'glass'
                    ? 'bg-gradient-to-r from-cyan-900/20 to-cyan-400/10 border-cyan-400'
                    : 'bg-gradient-to-r from-primary/20 to-gold/20 border-gold/50'
                }`}>
                  <h2 className={`font-amiamie-round text-3xl font-black mb-4 ${getTextColor()}`}>
                    Ready to Transform Your Posture?
                  </h2>
                  <p className={`font-amiamie mb-6 text-lg ${getMutedTextColor()}`}>
                    Start your SOLO BODY RECODE journey today. Consistency is key - even 15 minutes a day can make a difference.
                  </p>
                  <Link 
                    to="/contact"
                    className={`inline-block px-8 py-4 font-amiamie-round font-bold rounded-lg transition-colors ${
                      theme === 'glass' 
                        ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                        : theme === 'light'
                        ? 'bg-blue-600 text-white hover:bg-blue-500'
                        : 'bg-gold text-DarkLava hover:bg-gold/90'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </section>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <BlogSidebar currentSlug="solo-body-recode" />
          </aside>
        </div>
      </div>

      {/* Fullscreen Exercise Modal */}
      {fullscreenExercise && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setFullscreenExercise(null)}
        >
          <div className={`max-w-4xl w-full rounded-xl p-6 sm:p-8 border-2 relative my-8 sm:my-12 ${
            theme === 'light' ? 'bg-white border-blue-600' : 'bg-DarkLava border-gold/50'
          }`} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setFullscreenExercise(null)}
              className={`absolute top-3 right-3 sm:top-4 sm:right-4 transition-colors p-2 z-10 rounded-lg ${
                theme === 'light' ? 'text-blue-600 hover:bg-blue-50' : 'text-gold hover:text-gold/80 bg-DarkLava/80'
              }`}
              aria-label="Close fullscreen view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Exercise Content - Scrollable */}
            <div className="text-center space-y-4 sm:space-y-6">
              <h3 className={`font-amiamie-round text-2xl sm:text-3xl md:text-4xl font-black mb-4 px-2 break-words ${
                theme === 'light' ? 'text-gray-900' : 'text-primary'
              }`}>
                {fullscreenExercise.name}
              </h3>
              
              {/* Fullscreen Illustration - Responsive Height */}
              <div 
                className={`w-full min-h-[40vh] sm:h-[50vh] md:h-[60vh] max-h-[70vh] rounded-lg flex items-center justify-center border-2 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 overflow-hidden ${
                  theme === 'light' ? 'bg-gray-50 border-blue-200' : 'bg-gradient-to-br from-slate-800 to-slate-900 border-gold/30'
                }`}
              >
                <div className="w-full h-full max-w-2xl flex items-center justify-center">
                  {(() => {
                    const IllustrationComponent = fullscreenExercise.illustration;
                    return <IllustrationComponent />;
                  })()}
                </div>
              </div>

              {/* Exercise Details - Responsive Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className={`rounded-lg p-3 sm:p-4 border ${
                  theme === 'light' ? 'bg-blue-50 border-blue-200' : 'bg-primary/10 border-gold/30'
                }`}>
                  <div className={`font-amiamie-round font-bold mb-1 sm:mb-2 text-sm sm:text-base ${
                    theme === 'light' ? 'text-blue-600' : 'text-gold'
                  }`}>Sets</div>
                  <div className={`font-amiamie text-lg sm:text-xl break-words ${
                    theme === 'light' ? 'text-gray-900' : 'text-primary'
                  }`}>{fullscreenExercise.sets}</div>
                </div>
                <div className={`rounded-lg p-3 sm:p-4 border ${
                  theme === 'light' ? 'bg-blue-50 border-blue-200' : 'bg-primary/10 border-gold/30'
                }`}>
                  <div className={`font-amiamie-round font-bold mb-1 sm:mb-2 text-sm sm:text-base ${
                    theme === 'light' ? 'text-blue-600' : 'text-gold'
                  }`}>Reps</div>
                  <div className={`font-amiamie text-lg sm:text-xl break-words ${
                    theme === 'light' ? 'text-gray-900' : 'text-primary'
                  }`}>{fullscreenExercise.reps}</div>
                </div>
              </div>

              <div className={`rounded-lg p-3 sm:p-4 mb-4 border ${
                theme === 'light' ? 'bg-blue-50 border-blue-200' : 'bg-primary/10 border-gold/30'
              }`}>
                <div className={`font-amiamie-round font-bold mb-1 sm:mb-2 text-sm sm:text-base ${
                  theme === 'light' ? 'text-blue-600' : 'text-gold'
                }`}>Focus Cue</div>
                <div className={`font-amiamie text-lg sm:text-xl break-words ${
                  theme === 'light' ? 'text-gray-900' : 'text-primary'
                }`}>{fullscreenExercise.cue}</div>
              </div>

              <p className={`font-amiamie text-base sm:text-lg leading-relaxed px-2 break-words ${
                theme === 'light' ? 'text-gray-600' : 'text-SageGray'
              }`}>
                {fullscreenExercise.description}
              </p>

              {/* Instructions - Responsive */}
              <div className={`mt-4 sm:mt-6 text-left rounded-lg p-4 sm:p-6 border ${
                theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava/50 border-SageGray/30'
              }`}>
                <h4 className={`font-amiamie-round font-bold mb-3 text-lg sm:text-xl ${
                  theme === 'light' ? 'text-blue-600' : 'text-gold'
                }`}>How to Perform:</h4>
                <ul className={`space-y-2 font-amiamie text-sm sm:text-base ${
                  theme === 'light' ? 'text-gray-700' : 'text-SageGray'
                }`}>
                  <li className="break-words">• Focus on proper form over speed</li>
                  <li className="break-words">• Breathe steadily throughout the movement</li>
                  <li className="break-words">• If you feel pain (not just discomfort), stop immediately</li>
                  <li className="break-words">• Start with fewer reps and build up gradually</li>
                  <li className="break-words">• Rest 60-90 seconds between sets</li>
                </ul>
              </div>

              {/* Press ESC hint */}
              <p className={`font-amiamie text-xs sm:text-sm pt-2 ${
                theme === 'light' ? 'text-gray-400' : 'text-SageGray/60'
              }`}>
                Press ESC or click outside to close
              </p>
            </div>
          </div>
        </div>
      )}

      <Contact />
    </>
  );
};

export default SoloBodyRecode;

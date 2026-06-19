import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';
import LogoHeader from '../../components/LogoHeader';
import BlogSidebar from '../../components/BlogSidebar';
import { useTheme } from '../../context/ThemeContext';

/**
 * Local SEO Blog: Videography Services in Brampton
 * Target: "videographer brampton", "video production brampton", "brampton videography"
 */
const VideographyBrampton = () => {
  const { theme } = useTheme();

  // Theme-aware helper functions
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
      case 'glass': return 'text-white/70';
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

  const getBorderColor = () => {
    switch(theme) {
      case 'glass': return 'border-white/20';
      case 'light': return 'border-gray-200';
      default: return 'border-SageGray/30';
    }
  };

  const getCardBg = () => {
    switch(theme) {
      case 'glass': return 'bg-white/5 border-white/10';
      case 'light': return 'bg-white border-gray-200';
      default: return 'bg-primary/5 border-gold/30';
    }
  };

  const getTableHeadBg = () => {
    switch(theme) {
      case 'glass': return 'bg-white/10';
      case 'light': return 'bg-gray-100';
      default: return 'bg-primary/10';
    }
  };

  const getTableBorderColor = () => {
    switch(theme) {
      case 'glass': return 'border-white/20';
      case 'light': return 'border-gray-200';
      default: return 'border-SageGray/30';
    }
  };

  const getCTAGradient = () => {
    switch(theme) {
      case 'glass': return 'bg-gradient-to-r from-cyan-900/20 to-cyan-400/10 border-2 border-cyan-400';
      case 'light': return 'bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-600';
      default: return 'bg-gradient-to-r from-gold/20 to-gold/10 border-2 border-gold';
    }
  };

  const getPrimaryButtonClass = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-500 text-black hover:bg-cyan-400';
      case 'light': return 'bg-blue-600 text-white hover:bg-blue-500';
      default: return 'bg-gold text-DarkLava hover:bg-gold/90';
    }
  };

  const getSecondaryButtonClass = () => {
    switch(theme) {
      case 'glass': return 'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black';
      case 'light': return 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';
      default: return 'border-2 border-gold text-gold hover:bg-gold hover:text-DarkLava';
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Professional Videographer in Brampton, ON | CaptainSolo Media</title>
        <meta name="title" content="Professional Videographer in Brampton, ON | CaptainSolo Media" />
        <meta name="description" content="Looking for a videographer in Brampton? CaptainSolo offers professional video production for events, corporate, music videos, and more. Serving Brampton, Mississauga, and GTA. Get a free quote today!" />
        <meta name="keywords" content="videographer brampton, video production brampton, brampton videography, videographer gta, video services brampton ontario, brampton video production company, event videographer brampton, corporate video brampton, music video brampton, wedding videographer brampton, videographer near me, brampton film production, drone videography brampton, professional videographer gta" />
        <meta name="author" content="Solomon Olufelo - CaptainSolo" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://captainsolo.ca/blog/videography-brampton" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="CaptainSolo" />
        <meta property="og:title" content="Professional Videographer in Brampton, ON | Events, Corporate & Music Videos" />
        <meta property="og:description" content="Professional video production services in Brampton & GTA. Events, corporate videos, music videos, and more. $200-$3500. Free consultation." />
        <meta property="og:url" content="https://captainsolo.ca/blog/videography-brampton" />
        <meta property="og:image" content="https://captainsolo.ca/og-videography.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="article:published_time" content="2025-01-07T00:00:00-05:00" />
        <meta property="article:modified_time" content="2025-01-07T00:00:00-05:00" />
        <meta property="article:author" content="Solomon Olufelo" />
        <meta property="article:section" content="Local Business" />
        <meta property="article:tag" content="Videography" />
        <meta property="article:tag" content="Brampton" />
        <meta property="article:tag" content="Video Production" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Videographer in Brampton, ON | CaptainSolo Media" />
        <meta name="twitter:description" content="Professional video production in Brampton & GTA. Events, corporate, music videos. Get a free quote!" />
        <meta name="twitter:image" content="https://captainsolo.ca/og-videography.jpg" />
        <meta name="twitter:creator" content="@caaptainsolo" />
        
        {/* Additional SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Brampton" />
        <meta name="geo.position" content="43.7315;-79.7624" />
        <meta name="ICBM" content="43.7315, -79.7624" />
        
        {/* Comprehensive Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": "https://captainsolo.ca/blog/videography-brampton#article",
                "headline": "Professional Videographer in Brampton, ON: Your Complete Guide",
                "description": "Complete guide to finding and hiring professional videography services in Brampton, Ontario. Pricing, services, and what to expect.",
                "image": "https://captainsolo.ca/og-videography.jpg",
                "author": {
                  "@type": "Person",
                  "@id": "https://captainsolo.ca/#person",
                  "name": "Solomon Olufelo",
                  "url": "https://captainsolo.ca",
                  "jobTitle": "Videographer & Web Developer",
                  "sameAs": [
                    "https://instagram.com/caaptainsolo",
                    "https://linkedin.com/in/solomon-olufelo",
                    "https://github.com/solufelo"
                  ]
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
                "datePublished": "2025-01-07",
                "dateModified": "2025-01-07",
                "mainEntityOfPage": "https://captainsolo.ca/blog/videography-brampton",
                "articleSection": "Local Business",
                "keywords": "videographer brampton, video production brampton, brampton videography, event videographer, corporate video",
                "inLanguage": "en-CA"
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://captainsolo.ca/#localbusiness",
                "name": "CaptainSolo Media - Videography Brampton",
                "image": "https://captainsolo.ca/og-image.jpg",
                "description": "Professional videography and video production services in Brampton, Ontario. Events, corporate videos, music videos, and promotional content.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Brampton",
                  "addressRegion": "ON",
                  "postalCode": "L6T",
                  "addressCountry": "CA"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "43.7315",
                  "longitude": "-79.7624"
                },
                "url": "https://captainsolo.ca",
                "email": "work@captainsolo.ca",
                "telephone": "+1-289-XXX-XXXX",
                "priceRange": "$$",
                "paymentAccepted": "Cash, Credit Card, E-Transfer, PayPal",
                "currenciesAccepted": "CAD",
                "openingHours": "Mo-Su 09:00-21:00",
                "areaServed": [
                  {
                    "@type": "City",
                    "name": "Brampton",
                    "containedInPlace": {
                      "@type": "State",
                      "name": "Ontario"
                    }
                  },
                  {
                    "@type": "City",
                    "name": "Mississauga"
                  },
                  {
                    "@type": "City",
                    "name": "Toronto"
                  }
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Videography Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Event Videography",
                        "description": "Professional coverage of weddings, corporate events, birthday parties, and cultural ceremonies"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Music Video Production",
                        "description": "Hip-hop, R&B, Punjabi, and Bollywood music video production"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Corporate Video",
                        "description": "Company culture videos, training videos, and promotional content"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Commercial Video Production",
                        "description": "Business promotional videos, product demos, and real estate tours"
                      }
                    }
                  ]
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "50",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://captainsolo.ca/blog/videography-brampton#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://captainsolo.ca"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": "https://captainsolo.ca/blog"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Videographer Brampton",
                    "item": "https://captainsolo.ca/blog/videography-brampton"
                  }
                ]
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
          
          {/* Breadcrumbs */}
          <nav className={`mb-8 text-sm ${getMutedTextColor()}`}>
            <Link to="/" className={`hover:${getAccentColor()} transition`}>Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className={`hover:${getAccentColor()} transition`}>Blog</Link>
            <span className="mx-2">/</span>
            <span className={getTextColor()}>Videographer Brampton</span>
          </nav>

          {/* Hero */}
          <header className="mb-12">
            <h1 className={`font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight ${getTextColor()}`}>
              Professional Videographer in Brampton, ON: Your Complete Guide
            </h1>
            <div className={`flex items-center gap-4 text-sm mb-6 ${getMutedTextColor()}`}>
              <time dateTime="2025-01-01">January 2025</time>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span className={getAccentColor()}>Local Guide</span>
            </div>
            <p className={`font-amiamie text-xl leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/80'}`}>
              Looking for professional videography services in Brampton or the GTA? Whether you need event coverage, corporate videos, music videos, or promotional content, this guide covers everything you need to know about hiring a videographer in Brampton, Ontario.
            </p>
          </header>

          {/* Table of Contents */}
          <div className={`${getCardBg()} border rounded-lg p-6 mb-12`}>
            <h2 className={`font-amiamie-round text-xl font-bold mb-4 ${getAccentColor()}`}>Quick Navigation</h2>
            <ul className={`font-amiamie space-y-2 ${getTextColor()}`}>
              <li>→ <a href="#why-brampton" className={`hover:${getAccentColor()} transition`}>Why Choose a Local Brampton Videographer</a></li>
              <li>→ <a href="#services" className={`hover:${getAccentColor()} transition`}>Video Production Services Available</a></li>
              <li>→ <a href="#pricing" className={`hover:${getAccentColor()} transition`}>Videography Pricing in Brampton</a></li>
              <li>→ <a href="#portfolio" className={`hover:${getAccentColor()} transition`}>What to Look for in a Portfolio</a></li>
              <li>→ <a href="#equipment" className={`hover:${getAccentColor()} transition`}>Equipment & Quality Standards</a></li>
              <li>→ <a href="#booking" className={`hover:${getAccentColor()} transition`}>How to Book & What to Expect</a></li>
            </ul>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            
            <section id="why-brampton" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                Why Hire a Local Brampton Videographer?
              </h2>
              <p className={`font-amiamie text-lg mb-4 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                Brampton is Ontario's third-largest city with a thriving business community, diverse cultural events, and growing creative scene. Hiring a local videographer offers several advantages:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className={`${getCardBg()} border-l-4 ${getAccentColor().replace('text-', 'border-')} p-4 rounded`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-2 ${getTextColor()}`}>🌍 Local Knowledge</h3>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    We know the best filming locations in Brampton — from Gage Park and Heart Lake Conservation Area to downtown Brampton's vibrant streets. We understand permits, lighting conditions, and local regulations.
                  </p>
                </div>

                <div className={`${getCardBg()} border-l-4 ${getAccentColor().replace('text-', 'border-')} p-4 rounded`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-2 ${getTextColor()}`}>💰 No Travel Fees</h3>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Hiring a Toronto or Mississauga videographer means paying travel costs. A Brampton-based videographer arrives faster and charges less — saving you money without sacrificing quality.
                  </p>
                </div>

                <div className={`${getCardBg()} border-l-4 ${getAccentColor().replace('text-', 'border-')} p-4 rounded`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-2 ${getTextColor()}`}>⚡ Faster Turnaround</h3>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Need to add shots or do a quick re-shoot? Being local means we can meet in person easily, adjust on short notice, and deliver edits faster than out-of-town crews.
                  </p>
                </div>

                <div className={`${getCardBg()} border-l-4 ${getAccentColor().replace('text-', 'border-')} p-4 rounded`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-2 ${getTextColor()}`}>🤝 Community Connection</h3>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    We're part of the Brampton community. We've filmed at local businesses, cultural festivals, temples, churches, and community centers. We understand Brampton's diverse culture and values.
                  </p>
                </div>
              </div>
            </section>

            <section id="services" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                Video Production Services in Brampton
              </h2>
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                CaptainSolo offers full-service video production for Brampton and GTA clients. Here's what we specialize in:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-6`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>📹 Event Videography</h3>
                  <ul className={`font-amiamie space-y-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <li>• Weddings & Engagements</li>
                    <li>• Corporate Events & Conferences</li>
                    <li>• Birthday Parties & Anniversaries</li>
                    <li>• Cultural & Religious Ceremonies</li>
                    <li>• Graduation Ceremonies</li>
                  </ul>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-6`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>🎬 Commercial Video</h3>
                  <ul className={`font-amiamie space-y-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <li>• Business Promotional Videos</li>
                    <li>• Product Demonstrations</li>
                    <li>• Real Estate Tours</li>
                    <li>• Restaurant & Storefront Videos</li>
                    <li>• Social Media Content</li>
                  </ul>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-6`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>🎵 Music Videos</h3>
                  <ul className={`font-amiamie space-y-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <li>• Hip-Hop & Rap Videos</li>
                    <li>• R&B & Soul</li>
                    <li>• Punjabi & Bollywood</li>
                    <li>• Performance Videos</li>
                    <li>• Lyric Videos</li>
                  </ul>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-6`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>💼 Corporate Video</h3>
                  <ul className={`font-amiamie space-y-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <li>• Company Culture Videos</li>
                    <li>• Training & Educational Videos</li>
                    <li>• Executive Interviews</li>
                    <li>• Testimonial Videos</li>
                    <li>• LinkedIn Video Content</li>
                  </ul>
                </div>
              </div>

              <div className={`${theme === 'light' ? 'bg-blue-50 border-blue-600' : theme === 'glass' ? 'bg-cyan-900/20 border-cyan-400' : 'bg-gold/10 border-gold/50'} border-2 rounded-lg p-6`}>
                <p className={`font-amiamie mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                  <strong className={getAccentColor()}>🎯 GTA Coverage:</strong> While based in Brampton, we serve the entire Greater Toronto Area including Mississauga, Toronto, Vaughan, Caledon, and surrounding cities.
                </p>
              </div>
            </section>

            <section id="pricing" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                Videography Pricing in Brampton: What to Expect
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                Videography costs in Brampton vary based on project scope, duration, and deliverables. Here's a breakdown of typical pricing:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className={`w-full border ${getTableBorderColor()}`}>
                  <thead className={getTableHeadBg()}>
                    <tr>
                      <th className={`font-amiamie-round text-left p-4 border-b ${getTableBorderColor()} ${getAccentColor()}`}>Service Type</th>
                      <th className={`font-amiamie-round text-left p-4 border-b ${getTableBorderColor()} ${getAccentColor()}`}>Duration</th>
                      <th className={`font-amiamie-round text-left p-4 border-b ${getTableBorderColor()} ${getAccentColor()}`}>Price Range</th>
                    </tr>
                  </thead>
                  <tbody className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <tr>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>Music Video</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>1-2 days</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>$500 - $2,000</td>
                    </tr>
                    <tr>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>Wedding Coverage</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>6-10 hours</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>$1,200 - $3,500</td>
                    </tr>
                    <tr>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>Corporate Video</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>Half day</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>$800 - $2,000</td>
                    </tr>
                    <tr>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>Promotional Video</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>1-2 hours</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>$400 - $1,200</td>
                    </tr>
                    <tr>
                      <td className="p-4">Social Media Content</td>
                      <td className="p-4">1 hour</td>
                      <td className="p-4">$200 - $600</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={`${getCardBg()} border rounded-lg p-6`}>
                <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>💡 What Affects Pricing?</h3>
                <ul className={`font-amiamie space-y-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                  <li>• <strong>Shoot duration</strong> (hourly vs. full day)</li>
                  <li>• <strong>Equipment needed</strong> (drone, gimbal, multiple cameras)</li>
                  <li>• <strong>Editing complexity</strong> (color grading, VFX, motion graphics)</li>
                  <li>• <strong>Turnaround time</strong> (rush delivery costs extra)</li>
                  <li>• <strong>Number of revisions</strong> included</li>
                  <li>• <strong>Licensing needs</strong> (music, b-roll, stock footage)</li>
                </ul>
              </div>
            </section>

            <section id="portfolio" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                What to Look for in a Videographer's Portfolio
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                Before hiring a videographer in Brampton, review their portfolio and ask yourself:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className={`${getAccentColor()} text-xl`}>✓</span>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>Do they have experience in your type of project?</strong> If you need a music video, check if they've done music videos before.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className={`${getAccentColor()} text-xl`}>✓</span>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>Is the production quality consistent?</strong> Check audio quality, stabilization, lighting, and color grading across multiple videos.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className={`${getAccentColor()} text-xl`}>✓</span>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>Do they tell a story?</strong> Good videography isn't just pretty shots — it should engage viewers and tell a compelling story.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className={`${getAccentColor()} text-xl`}>✓</span>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>Are they local?</strong> Look for Brampton or GTA locations in their work to confirm they know the area.
                  </p>
                </div>
              </div>
            </section>

            <section id="equipment" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                Professional Equipment & Quality Standards
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                Quality videography requires professional gear. Here's what CaptainSolo brings to every Brampton shoot:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>📷 Cameras</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>4K/6K cinema cameras, mirrorless systems, multiple angles</p>
                </div>
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>🎤 Audio</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>Wireless mics, boom audio, field recorders for crystal-clear sound</p>
                </div>
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>💡 Lighting</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>Professional LED panels, softboxes, portable light kits</p>
                </div>
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>🚁 Aerial</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>Drone footage for stunning overhead shots (licensed & insured)</p>
                </div>
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>📐 Stabilization</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>Gimbals, sliders, tripods for smooth cinematic movement</p>
                </div>
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>💻 Editing</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>Adobe Premiere, DaVinci Resolve, color grading & VFX</p>
                </div>
              </div>
            </section>

            <section id="booking" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                How to Book Videography Services in Brampton
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                Ready to hire a videographer? Here's the typical process when working with CaptainSolo:
              </p>

              <ol className="space-y-6 mb-8">
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>1</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Initial Consultation (Free)</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      We discuss your project, vision, timeline, and budget. This can be done in person in Brampton or over video call.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>2</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Proposal & Quote</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      You receive a detailed proposal outlining deliverables, timeline, pricing, and terms.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>3</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Contract & Deposit</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      Sign the contract and pay a 50% deposit to secure your date. Dates book fast, especially in summer!
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>4</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Pre-Production Planning</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      We create a shot list, schedule, scout locations if needed, and confirm all logistics.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>5</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Filming Day</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      We arrive on time, capture all footage according to plan, and adapt to any changes on the fly.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>6</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Editing & Revisions</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      You receive a draft for review, provide feedback, and we make revisions until you're 100% satisfied.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>7</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Final Delivery</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      Get your completed video in multiple formats (4K, 1080p, social media versions) plus raw footage if requested.
                    </p>
                  </div>
                </li>
              </ol>
            </section>

          </div>

          {/* CTA Section */}
          <div className={`${getCTAGradient()} rounded-lg p-8 sm:p-12 text-center mt-16`}>
            <h2 className={`font-amiamie-round text-3xl sm:text-4xl font-black mb-4 ${getTextColor()}`}>
              Ready to Start Your Video Project?
            </h2>
            <p className={`font-amiamie text-lg mb-8 max-w-2xl mx-auto ${getMutedTextColor()}`}>
              Based in Brampton, serving the entire GTA. Let's create something amazing together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/#contact"
                className={`inline-block px-8 py-4 font-amiamie-round font-bold text-lg rounded transition ${getPrimaryButtonClass()}`}
              >
                Get a Free Quote
              </a>
              <Link
                to="/blog"
                className={`inline-block px-8 py-4 font-amiamie-round font-bold text-lg rounded transition ${getSecondaryButtonClass()}`}
              >
                Read More Articles
              </Link>
            </div>
          </div>
            </div>
          </article>

          {/* Sidebar */}
          <BlogSidebar currentSlug="videography-brampton" />
        </div>
      </div>

      <Contact />
    </>
  );
};

export default VideographyBrampton;

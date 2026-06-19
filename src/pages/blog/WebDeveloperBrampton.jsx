import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';
import LogoHeader from '../../components/LogoHeader';
import BlogSidebar from '../../components/BlogSidebar';
import { useTheme } from '../../context/ThemeContext';

/**
 * Local SEO Blog: Web Development Services in Brampton
 * Target: "web developer brampton", "website design brampton", "brampton web development"
 */
const WebDeveloperBrampton = () => {
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
        <title>Web Developer in Brampton | Custom Websites & Web Design | CaptainSolo</title>
        <meta name="title" content="Web Developer in Brampton, ON | Custom Website Design & Development" />
        <meta name="description" content="Professional web developer in Brampton, ON. Custom website design, development, and SEO services for local businesses. $500-$15k. Free consultation. Serving Brampton, Mississauga, and GTA." />
        <meta name="keywords" content="web developer brampton, website design brampton, brampton web development, web designer brampton ontario, brampton website developer, web design gta, custom website brampton, ecommerce brampton, small business website brampton, react developer brampton, full stack developer brampton, freelance web developer brampton, affordable web design brampton, responsive web design gta" />
        <meta name="author" content="Solomon Olufelo - CaptainSolo" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://captainsolo.ca/blog/web-developer-brampton" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="CaptainSolo" />
        <meta property="og:title" content="Web Developer in Brampton | Modern, Fast, Mobile-Friendly Websites" />
        <meta property="og:description" content="Professional web development in Brampton & GTA. Custom websites, e-commerce, web apps. React, Next.js, modern tech. $500-$15k. Free consultation." />
        <meta property="og:url" content="https://captainsolo.ca/blog/web-developer-brampton" />
        <meta property="og:image" content="https://captainsolo.ca/og-webdev.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="article:published_time" content="2025-01-07T00:00:00-05:00" />
        <meta property="article:modified_time" content="2025-01-07T00:00:00-05:00" />
        <meta property="article:author" content="Solomon Olufelo" />
        <meta property="article:section" content="Local Business" />
        <meta property="article:tag" content="Web Development" />
        <meta property="article:tag" content="Brampton" />
        <meta property="article:tag" content="Website Design" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Developer in Brampton | Custom Websites & Web Design" />
        <meta name="twitter:description" content="Professional web development in Brampton. Custom sites, e-commerce, modern tech. Free consultation!" />
        <meta name="twitter:image" content="https://captainsolo.ca/og-webdev.jpg" />
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
                "@id": "https://captainsolo.ca/blog/web-developer-brampton#article",
                "headline": "Looking for a Web Developer in Brampton? Here's What You Need to Know",
                "description": "Complete guide to hiring a web developer in Brampton. Services, pricing, tech stack, questions to ask, and the development process.",
                "image": "https://captainsolo.ca/og-webdev.jpg",
                "author": {
                  "@type": "Person",
                  "@id": "https://captainsolo.ca/#person",
                  "name": "Solomon Olufelo",
                  "url": "https://captainsolo.ca",
                  "jobTitle": "Full Stack Web Developer & Videographer",
                  "sameAs": [
                    "https://instagram.com/caaptainsolo",
                    "https://linkedin.com/in/solomon-olufelo",
                    "https://github.com/solufelo"
                  ],
                  "knowsAbout": ["Web Development", "React", "Next.js", "Node.js", "JavaScript", "Python", "SEO", "UI/UX Design"]
                },
                "publisher": {
                  "@type": "Organization",
                  "@id": "https://captainsolo.ca/#organization",
                  "name": "CaptainSolo",
                  "url": "https://captainsolo.ca",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://captainsolo.ca/logo.png"
                  }
                },
                "datePublished": "2025-01-07",
                "dateModified": "2025-01-07",
                "mainEntityOfPage": "https://captainsolo.ca/blog/web-developer-brampton",
                "articleSection": "Local Business",
                "keywords": "web developer brampton, website design brampton, web development cost, hiring web developer, brampton tech",
                "inLanguage": "en-CA",
                "wordCount": 4000
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://captainsolo.ca/#webdev",
                "name": "CaptainSolo - Web Developer Brampton",
                "image": "https://captainsolo.ca/og-image.jpg",
                "description": "Professional web development and design services in Brampton, Ontario. Custom websites, e-commerce, web applications, and SEO optimization.",
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
                "priceRange": "$$-$$$",
                "paymentAccepted": "Cash, Credit Card, E-Transfer, PayPal",
                "currenciesAccepted": "CAD, USD",
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
                  },
                  {
                    "@type": "City",
                    "name": "Vaughan"
                  },
                  {
                    "@type": "City",
                    "name": "Caledon"
                  }
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Web Development Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Business Website Development",
                        "description": "Professional websites for local businesses, restaurants, retail stores, and service providers",
                        "provider": {
                          "@type": "Person",
                          "name": "Solomon Olufelo"
                        }
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "E-Commerce Development",
                        "description": "Custom Shopify stores and e-commerce platforms with payment processing and inventory management"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Web Application Development",
                        "description": "Custom web apps, booking systems, dashboards, and SaaS products"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Website Redesign",
                        "description": "Modernization and optimization of existing websites"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "SEO Optimization",
                        "description": "Search engine optimization to improve Google rankings"
                      }
                    }
                  ]
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5.0",
                  "reviewCount": "30",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://captainsolo.ca/blog/web-developer-brampton#breadcrumb",
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
                    "name": "Web Developer Brampton",
                    "item": "https://captainsolo.ca/blog/web-developer-brampton"
                  }
                ]
              },
              {
                "@type": "ProfessionalService",
                "@id": "https://captainsolo.ca/#professionalservice",
                "name": "Web Development Services",
                "description": "Professional web development and design for Brampton businesses",
                "provider": {
                  "@type": "Person",
                  "name": "Solomon Olufelo"
                },
                "areaServed": "Brampton, ON",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Web Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "price": "500-1500",
                      "priceCurrency": "CAD",
                      "name": "Landing Page",
                      "description": "Single page website"
                    },
                    {
                      "@type": "Offer",
                      "price": "2000-5000",
                      "priceCurrency": "CAD",
                      "name": "Small Business Website",
                      "description": "5-7 page professional website"
                    },
                    {
                      "@type": "Offer",
                      "price": "3000-8000",
                      "priceCurrency": "CAD",
                      "name": "E-Commerce Store",
                      "description": "Online store with product catalog"
                    },
                    {
                      "@type": "Offer",
                      "price": "5000-15000",
                      "priceCurrency": "CAD",
                      "name": "Custom Web Application",
                      "description": "Full-featured web application"
                    }
                  ]
                }
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
            <span className={getTextColor()}>Web Developer Brampton</span>
          </nav>

          {/* Hero */}
          <header className="mb-12">
            <h1 className={`font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight ${getTextColor()}`}>
              Looking for a Web Developer in Brampton? Here's What You Need to Know
            </h1>
            <div className={`flex items-center gap-4 text-sm mb-6 ${getMutedTextColor()}`}>
              <time dateTime="2025-01-07">January 7, 2025</time>
              <span>•</span>
              <span>15 min read</span>
              <span>•</span>
              <span className={getAccentColor()}>Local Business Guide</span>
            </div>
            <p className={`font-amiamie text-xl leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/80'}`}>
              Your business needs a website that works. Whether you're a Brampton restaurant, retailer, service provider, or startup, this guide explains what to look for in a web developer, what it costs, and how to get a website that actually brings in customers.
            </p>
          </header>

          {/* Table of Contents */}
          <div className={`${getCardBg()} border rounded-lg p-6 mb-12`}>
            <h2 className={`font-amiamie-round text-xl font-bold mb-4 ${getAccentColor()}`}>Quick Navigation</h2>
            <ul className={`font-amiamie space-y-2 ${getTextColor()}`}>
              <li>→ <a href="#why-local" className={`hover:${getAccentColor()} transition`}>Why Hire a Local Brampton Web Developer</a></li>
              <li>→ <a href="#services" className={`hover:${getAccentColor()} transition`}>Web Development Services Available</a></li>
              <li>→ <a href="#pricing" className={`hover:${getAccentColor()} transition`}>Website Costs in Brampton (Real Numbers)</a></li>
              <li>→ <a href="#tech-stack" className={`hover:${getAccentColor()} transition`}>Modern Tech Stack & Best Practices</a></li>
              <li>→ <a href="#portfolio" className={`hover:${getAccentColor()} transition`}>Questions to Ask Before Hiring</a></li>
              <li>→ <a href="#process" className={`hover:${getAccentColor()} transition`}>The Web Development Process</a></li>
            </ul>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            
            <section id="why-local" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                Why Hire a Brampton-Based Web Developer?
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                You could hire anyone on the internet to build your website. So why choose a local Brampton developer? Here's why it matters:
              </p>

              <div className="space-y-4 mb-6">
                <div className={`${getCardBg()} border-l-4 ${getAccentColor().replace('text-', 'border-')} p-4 rounded`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-2 ${getTextColor()}`}>🤝 Face-to-Face Meetings</h3>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Meet in person to discuss your vision, review designs, and see progress. No timezone issues, no email-only communication with someone you'll never meet.
                  </p>
                </div>

                <div className={`${getCardBg()} border-l-4 ${getAccentColor().replace('text-', 'border-')} p-4 rounded`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-2 ${getTextColor()}`}>🎯 Local Market Knowledge</h3>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    I understand Brampton's diverse market — from Punjabi-speaking customers to multicultural communities. I can optimize your site for local search ("near me" queries) and build bilingual sites if needed.
                  </p>
                </div>

                <div className={`${getCardBg()} border-l-4 ${getAccentColor().replace('text-', 'border-')} p-4 rounded`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-2 ${getTextColor()}`}>⚡ Fast Response Time</h3>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Website down? Need an urgent update? Being local means I can respond quickly — not waiting 12 hours for someone in a different timezone to wake up.
                  </p>
                </div>

                <div className={`${getCardBg()} border-l-4 ${getAccentColor().replace('text-', 'border-')} p-4 rounded`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-2 ${getTextColor()}`}>💼 Support Local Economy</h3>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Your money stays in the community. Plus, you're working with someone who understands Brampton's business landscape and can refer you to other local professionals (photographers, marketers, etc.).
                  </p>
                </div>
              </div>
            </section>

            <section id="services" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                Web Development Services I Offer in Brampton
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                CaptainSolo provides full-stack web development for Brampton businesses and GTA clients. Here's what I specialize in:
              </p>

              <div className="space-y-6 mb-8">
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-6`}>
                  <h3 className={`font-amiamie-round text-2xl font-bold mb-3 ${getTextColor()}`}>🏢 Business Websites</h3>
                  <p className={`font-amiamie mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Professional websites for local businesses — restaurants, retail stores, salons, contractors, consultants, and service providers.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Multi-page sites</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Mobile-first design</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>SEO optimized</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Fast loading</span>
                  </div>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-6`}>
                  <h3 className={`font-amiamie-round text-2xl font-bold mb-3 ${getTextColor()}`}>🛒 E-Commerce Stores</h3>
                  <p className={`font-amiamie mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Sell online with custom Shopify stores or custom-built e-commerce platforms. Inventory management, payment processing, shipping integration.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Shopify</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>WooCommerce</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Custom carts</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Payment gateways</span>
                  </div>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-6`}>
                  <h3 className={`font-amiamie-round text-2xl font-bold mb-3 ${getTextColor()}`}>⚡ Web Applications</h3>
                  <p className={`font-amiamie mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Custom web apps, booking systems, dashboards, admin panels, SaaS products — anything that requires user accounts and real-time data.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>React/Next.js</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Node.js backend</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Database design</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>APIs</span>
                  </div>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-6`}>
                  <h3 className={`font-amiamie-round text-2xl font-bold mb-3 ${getTextColor()}`}>📱 Portfolio & Personal Sites</h3>
                  <p className={`font-amiamie mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Stunning portfolio websites for creatives, artists, photographers, videographers, musicians, and professionals.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Modern design</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Animations</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Gallery/Video</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Contact forms</span>
                  </div>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-6`}>
                  <h3 className={`font-amiamie-round text-2xl font-bold mb-3 ${getTextColor()}`}>🔧 Website Redesign & Updates</h3>
                  <p className={`font-amiamie mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Already have a website but it's outdated, slow, or not mobile-friendly? I can redesign it or migrate to modern tech.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Modernization</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Speed optimization</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>Mobile responsive</span>
                    <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gold/20 text-gold'} text-sm rounded`}>SEO fixes</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="pricing" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                How Much Does a Website Cost in Brampton?
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                Let's talk real numbers. Website costs vary wildly based on complexity, but here's what you can expect in the Brampton/GTA market:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className={`w-full border ${getTableBorderColor()}`}>
                  <thead className={getTableHeadBg()}>
                    <tr>
                      <th className={`font-amiamie-round text-left p-4 border-b ${getTableBorderColor()} ${getAccentColor()}`}>Website Type</th>
                      <th className={`font-amiamie-round text-left p-4 border-b ${getTableBorderColor()} ${getAccentColor()}`}>Pages</th>
                      <th className={`font-amiamie-round text-left p-4 border-b ${getTableBorderColor()} ${getAccentColor()}`}>Timeline</th>
                      <th className={`font-amiamie-round text-left p-4 border-b ${getTableBorderColor()} ${getAccentColor()}`}>Price Range</th>
                    </tr>
                  </thead>
                  <tbody className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <tr>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>Landing Page</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>1 page</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>3-5 days</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>$500 - $1,500</td>
                    </tr>
                    <tr>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>Small Business Site</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>5-7 pages</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>2-3 weeks</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>$2,000 - $5,000</td>
                    </tr>
                    <tr>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>E-Commerce Store</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>10-20 products</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>3-6 weeks</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>$3,000 - $8,000</td>
                    </tr>
                    <tr>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>Custom Web App</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>Multiple features</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>6-12 weeks</td>
                      <td className={`p-4 border-b ${getTableBorderColor()}`}>$5,000 - $15,000+</td>
                    </tr>
                    <tr>
                      <td className="p-4">Website Redesign</td>
                      <td className="p-4">Existing structure</td>
                      <td className="p-4">2-4 weeks</td>
                      <td className="p-4">$1,500 - $5,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={`${theme === 'light' ? 'bg-blue-50 border-blue-600' : theme === 'glass' ? 'bg-cyan-900/20 border-cyan-400' : 'bg-gold/10 border-gold/50'} border-2 rounded-lg p-6 mb-6`}>
                <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>💡 What Affects Website Pricing?</h3>
                <ul className={`font-amiamie space-y-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                  <li>• <strong>Number of pages</strong> and content volume</li>
                  <li>• <strong>Custom design</strong> vs. template-based</li>
                  <li>• <strong>Features needed</strong> (booking systems, payment processing, user accounts)</li>
                  <li>• <strong>Content creation</strong> (do you provide text/images or do I write it?)</li>
                  <li>• <strong>Integrations</strong> (CRM, email marketing, analytics, etc.)</li>
                  <li>• <strong>SEO & marketing</strong> setup</li>
                  <li>• <strong>Ongoing maintenance</strong> (hosting, updates, support)</li>
                </ul>
              </div>

              <div className={`${getCardBg()} border rounded-lg p-6`}>
                <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>🚫 Red Flags: Prices Too Good to Be True</h3>
                <p className={`font-amiamie mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                  Beware of "$99 websites" or "free website" offers. They usually mean:
                </p>
                <ul className={`font-amiamie space-y-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                  <li>• Pre-made templates with no customization</li>
                  <li>• Hidden monthly fees that add up quickly</li>
                  <li>• You don't own the site (vendor lock-in)</li>
                  <li>• Poor mobile experience and slow loading</li>
                  <li>• No SEO or marketing value</li>
                </ul>
                <p className={`font-amiamie mt-4 italic ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                  A professional website is an investment, not an expense. It should pay for itself through increased business.
                </p>
              </div>
            </section>

            <section id="tech-stack" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                Modern Tech Stack & Best Practices
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                I build websites with modern, industry-standard technologies that are fast, secure, and scalable:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>⚛️ Frontend</h4>
                  <p className={`font-amiamie text-sm mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>React, Next.js, Vue, Tailwind CSS, GSAP animations</p>
                  <p className={`font-amiamie text-xs ${getMutedTextColor()}`}>Lightning-fast, interactive user interfaces</p>
                </div>
                
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>🔧 Backend</h4>
                  <p className={`font-amiamie text-sm mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>Node.js, Express, Python, RESTful APIs</p>
                  <p className={`font-amiamie text-xs ${getMutedTextColor()}`}>Robust server-side logic and data processing</p>
                </div>
                
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>🗄️ Database</h4>
                  <p className={`font-amiamie text-sm mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>PostgreSQL, MongoDB, Firebase, Supabase</p>
                  <p className={`font-amiamie text-xs ${getMutedTextColor()}`}>Secure data storage and management</p>
                </div>
                
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>☁️ Hosting</h4>
                  <p className={`font-amiamie text-sm mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>Vercel, Netlify, AWS, DigitalOcean</p>
                  <p className={`font-amiamie text-xs ${getMutedTextColor()}`}>Fast global CDN delivery, auto-scaling</p>
                </div>
                
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>📈 SEO & Analytics</h4>
                  <p className={`font-amiamie text-sm mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>Google Analytics, Search Console, schema markup</p>
                  <p className={`font-amiamie text-xs ${getMutedTextColor()}`}>Track performance and rank on Google</p>
                </div>
                
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-gold/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>🔒 Security</h4>
                  <p className={`font-amiamie text-sm mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>SSL certificates, secure authentication, data encryption</p>
                  <p className={`font-amiamie text-xs ${getMutedTextColor()}`}>Protect your site and customer data</p>
                </div>
              </div>

              <div className={`${getCardBg()} border rounded-lg p-6`}>
                <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>✅ Every Website Includes:</h3>
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                  <div className="flex items-center gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Mobile-first responsive design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Fast page load times (&lt;3 seconds)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>SEO optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>SSL certificate (HTTPS)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Cross-browser compatibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Analytics setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Contact forms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Social media integration</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="portfolio" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                Questions to Ask Before Hiring a Web Developer
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                Before you hire anyone (including me), ask these questions to ensure you're making the right choice:
              </p>

              <div className="space-y-4">
                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>1. Can I see your portfolio?</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Look for variety, quality, and sites similar to what you need. Check if their sites are actually live and functional.
                  </p>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>2. Do you provide ongoing support?</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    What happens after launch? Do they offer maintenance, updates, and bug fixes? Is there a monthly retainer or hourly rate?
                  </p>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>3. Will my site be mobile-friendly?</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Over 60% of web traffic is mobile. Your site MUST look good and work well on phones and tablets.
                  </p>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>4. Do you handle SEO?</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    A beautiful site is useless if no one can find it. Make sure they include basic SEO (meta tags, sitemap, schema markup, page speed).
                  </p>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>5. Will I own the website?</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Some developers lock you into their platform. Ensure you own the domain, hosting, and all code/content.
                  </p>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>6. What's your revision policy?</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    How many rounds of changes are included? What happens if you need major changes after approval?
                  </p>
                </div>

                <div className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-DarkLava border-SageGray/30'} border rounded-lg p-4`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>7. Can you show me references?</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Talk to past clients. Ask about communication, timeliness, and whether the developer was easy to work with.
                  </p>
                </div>
              </div>
            </section>

            <section id="process" className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                How the Web Development Process Works
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                Here's what you can expect when working with CaptainSolo on your Brampton website project:
              </p>

              <ol className="space-y-6 mb-8">
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>1</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Discovery Call (Free)</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      We discuss your business, goals, target audience, competitors, and budget. I ask questions to understand what you really need.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>2</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Proposal & Contract</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      You receive a detailed proposal with scope, timeline, pricing, and deliverables. Once approved, we sign a contract.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>3</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Design Mockups</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      I create visual designs (mockups) of your site. You review, provide feedback, and we refine until you love it.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>4</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Development</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      I build the site using modern tech. You'll get progress updates and staging links to see the site as it's being built.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>5</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Content & Testing</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      We add your content (text, images, videos). I test on multiple devices/browsers and fix any bugs.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>6</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Launch</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      Your site goes live! I handle domain setup, hosting, SSL certificate, analytics, and ensure everything works perfectly.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-amiamie-round font-bold ${theme === 'glass' ? 'bg-cyan-500 text-black' : theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gold text-DarkLava'}`}>7</span>
                  <div>
                    <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Training & Support</h4>
                    <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                      I teach you how to update content, add blog posts, etc. Ongoing support available if needed.
                    </p>
                  </div>
                </li>
              </ol>
            </section>

          </div>

          {/* CTA Section */}
          <div className={`${getCTAGradient()} rounded-lg p-8 sm:p-12 text-center mt-16`}>
            <h2 className={`font-amiamie-round text-3xl sm:text-4xl font-black mb-4 ${getTextColor()}`}>
              Ready to Build Your Website?
            </h2>
            <p className={`font-amiamie text-lg mb-8 max-w-2xl mx-auto ${getMutedTextColor()}`}>
              Based in Brampton, serving businesses across the GTA. Let's create a website that drives real results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/#contact"
                className={`inline-block px-8 py-4 font-amiamie-round font-bold text-lg rounded transition ${getPrimaryButtonClass()}`}
              >
                Get a Free Consultation
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
          <BlogSidebar currentSlug="web-developer-brampton" />
        </div>
      </div>

      <Contact />
    </>
  );
};

export default WebDeveloperBrampton;

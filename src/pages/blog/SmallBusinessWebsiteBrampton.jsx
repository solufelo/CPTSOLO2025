import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';
import LogoHeader from '../../components/LogoHeader';
import BlogSidebar from '../../components/BlogSidebar';
import { useTheme } from '../../context/ThemeContext';

/**
 * Local SEO Blog: Small Business Website Guide for Brampton
 * Target: "small business website brampton", "brampton small business", "website for small business"
 */
const SmallBusinessWebsiteBrampton = () => {
  const { theme } = useTheme();

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

  const getInnerCardBg = () => {
    switch(theme) {
      case 'glass': return 'bg-white/5 border-white/10';
      case 'light': return 'bg-gray-100 border-gray-200';
      default: return 'bg-DarkLava border-SageGray/30';
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Do I Need a Website for My Brampton Small Business? | Complete Guide</title>
        <meta name="title" content="Do I Need a Website for My Brampton Small Business? ROI, Costs & Examples" />
        <meta name="description" content="Starting a business in Brampton? Learn why you NEED a website in 2025, what it costs ($500-$10k), real ROI examples, and how to get online fast. Free consultation available." />
        <meta name="keywords" content="small business website brampton, brampton entrepreneur, business website cost, small business web design, brampton startup, do i need a website, website for small business, brampton small business online, affordable website brampton, website roi brampton" />
        <meta name="author" content="Solomon Olufelo - CaptainSolo" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://captainsolo.ca/blog/small-business-website-brampton" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="CaptainSolo" />
        <meta property="og:title" content="Do I Really Need a Website for My Brampton Small Business?" />
        <meta property="og:description" content="5 reasons why Brampton businesses need websites in 2025. Real costs, ROI examples, and success stories." />
        <meta property="og:url" content="https://captainsolo.ca/blog/small-business-website-brampton" />
        <meta property="og:image" content="https://captainsolo.ca/og-smallbiz.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="article:published_time" content="2025-01-07T00:00:00-05:00" />
        <meta property="article:modified_time" content="2025-01-07T00:00:00-05:00" />
        <meta property="article:author" content="Solomon Olufelo" />
        <meta property="article:section" content="Small Business" />
        <meta property="article:tag" content="Small Business" />
        <meta property="article:tag" content="Brampton" />
        <meta property="article:tag" content="Website" />
        <meta property="article:tag" content="ROI" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Do I Need a Website for My Brampton Small Business?" />
        <meta name="twitter:description" content="Why Brampton businesses need websites, real costs, and ROI examples. Free consultation!" />
        <meta name="twitter:image" content="https://captainsolo.ca/og-smallbiz.jpg" />
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
                "@id": "https://captainsolo.ca/blog/small-business-website-brampton#article",
                "headline": "Do I Really Need a Website for My Brampton Small Business?",
                "description": "Complete guide explaining why Brampton small businesses need websites, what to include, real costs, and ROI examples.",
                "image": "https://captainsolo.ca/og-smallbiz.jpg",
                "author": {
                  "@type": "Person",
                  "@id": "https://captainsolo.ca/#person",
                  "name": "Solomon Olufelo",
                  "url": "https://captainsolo.ca",
                  "jobTitle": "Web Developer & Digital Marketing Consultant"
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
                "mainEntityOfPage": "https://captainsolo.ca/blog/small-business-website-brampton",
                "articleSection": "Small Business",
                "keywords": "small business website, website cost, business online, brampton entrepreneur, website roi",
                "inLanguage": "en-CA",
                "wordCount": 2200,
                "about": {
                  "@type": "Thing",
                  "name": "Small Business Websites",
                  "description": "Websites for small businesses"
                }
              },
              {
                "@type": "FAQPage",
                "@id": "https://captainsolo.ca/blog/small-business-website-brampton#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Do I really need a website for my small business?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes! In 2025, customers search for businesses online before visiting or calling. If you don't have a website, you're invisible. Your competitors with websites show up first on Google and get the customers."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much does a website cost for a small business in Brampton?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Costs range from $500-$1,500 for basic sites, $2,000-$5,000 for professional business sites, and $5,000-$10,000+ for e-commerce or custom web applications. The investment typically pays for itself through increased business within 3-6 months."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What should my small business website include?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Essential pages include: Home (clear headline and call-to-action), About (your story), Services/Products (with prices if possible), Testimonials/Reviews (social proof), and Contact (phone, email, address, hours, map). Optional: Blog, FAQ, Gallery, Online Booking."
                    }
                  }
                ]
              },
              {
                "@type": "HowTo",
                "@id": "https://captainsolo.ca/blog/small-business-website-brampton#howto",
                "name": "How to Get Your Small Business Website Online",
                "description": "Step-by-step guide to getting your Brampton small business online",
                "step": [
                  {
                    "@type": "HowToStep",
                    "position": 1,
                    "name": "Decide what you need",
                    "text": "Determine if you need a basic site, e-commerce, or booking system"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 2,
                    "name": "Find a web developer",
                    "text": "Hire a local Brampton web developer for better support and understanding of local market"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 3,
                    "name": "Get a quote",
                    "text": "Request quotes from 2-3 developers, compare pricing and portfolios"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 4,
                    "name": "Build the site",
                    "text": "Work with developer through design, content, and development phases"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 5,
                    "name": "Launch and promote",
                    "text": "Go live, add to Google Business Profile, and promote on social media"
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://captainsolo.ca/blog/small-business-website-brampton#breadcrumb",
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
                    "name": "Small Business Website Brampton",
                    "item": "https://captainsolo.ca/blog/small-business-website-brampton"
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
            <Link to="/" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'} transition`}>Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'} transition`}>Blog</Link>
            <span className="mx-2">/</span>
            <span className={getTextColor()}>Small Business Website Brampton</span>
          </nav>

          {/* Hero */}
          <header className="mb-12">
            <h1 className={`font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight ${getTextColor()}`}>
              Do I Really Need a Website for My Brampton Small Business?
            </h1>
            <div className={`flex items-center gap-4 text-sm mb-6 ${getMutedTextColor()}`}>
              <time dateTime="2025-01-07">January 7, 2025</time>
              <span>•</span>
              <span>8 min read</span>
            </div>
            <p className={`font-amiamie text-xl leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/80'}`}>
              You run a small business in Brampton. You might have a Facebook page, an Instagram account, maybe even a Google Business Profile. So... do you really need a website? The short answer: <strong className={getAccentColor()}>absolutely yes.</strong> Here's why, and what it'll cost you.
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            
            <section className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                Why Brampton Small Businesses Need Websites in 2025
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className={`border-l-4 p-5 rounded ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>🔍 Customers Search for You Online</h3>
                  <p className={`font-amiamie mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    When someone needs a plumber, restaurant, salon, or lawyer in Brampton, what do they do? <strong>They Google it.</strong>
                  </p>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    If you don't have a website, you're invisible. Your competitors with websites show up first — and they get the customer.
                  </p>
                </div>

                <div className={`border-l-4 p-5 rounded ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>💼 You Look More Professional</h3>
                  <p className={`font-amiamie mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    A Facebook page is fine for staying in touch. But when someone's deciding whether to hire you or buy from you, they check your website.
                  </p>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    No website = less trust. A professional website says "I'm serious about my business."
                  </p>
                </div>

                <div className={`border-l-4 p-5 rounded ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>📱 You Own Your Platform</h3>
                  <p className={`font-amiamie mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Social media platforms can ban your account, change their algorithm, or shut down tomorrow. <strong>You don't control them.</strong>
                  </p>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    A website is <strong>yours.</strong> Your domain, your content, your customers. No one can take it away.
                  </p>
                </div>

                <div className={`border-l-4 p-5 rounded ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>💰 It's Open 24/7</h3>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    Your website works while you sleep. Customers can find your hours, see your menu, read reviews, book appointments, and even place orders — all without you answering the phone.
                  </p>
                </div>

                <div className={`border-l-4 p-5 rounded ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>🎯 You Reach More Customers</h3>
                  <p className={`font-amiamie mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    With SEO (search engine optimization), your website can rank on Google for searches like "best pizza Brampton" or "Brampton hair salon near me."
                  </p>
                  <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    That's <strong>free marketing</strong> every time someone searches. Social media can't do that.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                What Should Your Brampton Small Business Website Include?
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                You don't need a 50-page website. For most Brampton small businesses, 5-7 pages is perfect:
              </p>

              <div className="space-y-4 mb-8">
                <div className={`border rounded-lg p-4 ${getInnerCardBg()}`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>🏠 Home Page</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-600' : 'text-primary/80'}`}>
                    Clear headline, what you do, who you serve, and a call-to-action ("Call Now", "Book Online", "Get a Quote").
                  </p>
                </div>

                <div className={`border rounded-lg p-4 ${getInnerCardBg()}`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>ℹ️ About Page</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-600' : 'text-primary/80'}`}>
                    Your story, why you started, what makes you different. Include a photo of yourself or your team.
                  </p>
                </div>

                <div className={`border rounded-lg p-4 ${getInnerCardBg()}`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>🛠️ Services/Products Page</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-600' : 'text-primary/80'}`}>
                    What you offer, with prices if possible. Photos/videos of your work.
                  </p>
                </div>

                <div className={`border rounded-lg p-4 ${getInnerCardBg()}`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>⭐ Testimonials/Reviews</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-600' : 'text-primary/80'}`}>
                    Social proof. What do your customers say? Include names and photos if you can.
                  </p>
                </div>

                <div className={`border rounded-lg p-4 ${getInnerCardBg()}`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>📞 Contact Page</h4>
                  <p className={`font-amiamie text-sm ${theme === 'light' ? 'text-gray-600' : 'text-primary/80'}`}>
                    Phone number, email, address, hours, contact form, map. Make it EASY to reach you.
                  </p>
                </div>
              </div>

              <div className={`border-2 rounded-lg p-6 ${
                theme === 'light' 
                  ? 'bg-blue-50 border-blue-600' 
                  : theme === 'glass'
                  ? 'bg-cyan-900/20 border-cyan-400'
                  : 'bg-gold/10 border-gold/50'
              }`}>
                <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>💡 Optional But Helpful:</h3>
                <ul className={`font-amiamie space-y-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                  <li>• <strong>Blog</strong> — Share tips, news, updates (great for SEO)</li>
                  <li>• <strong>FAQ</strong> — Answer common questions to save time</li>
                  <li>• <strong>Gallery/Portfolio</strong> — Show off your work</li>
                  <li>• <strong>Online Booking</strong> — Let customers book appointments 24/7</li>
                  <li>• <strong>E-Commerce</strong> — Sell products online</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                How Much Does a Website Cost for a Brampton Small Business?
              </h2>
              
              <p className={`font-amiamie text-lg mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                Let's be real about costs. Here's what you should expect:
              </p>

              <div className="space-y-4 mb-6">
                <div className={`border rounded-lg p-5 ${theme === 'light' ? 'bg-gray-50 border-gray-300' : theme === 'glass' ? 'bg-white/5 border-white/20' : 'bg-primary/5 border-gold/30'}`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>💸 Budget Option: $500 - $1,500</h4>
                  <p className={`font-amiamie text-sm mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>What you get:</strong> Template-based site, 3-5 pages, basic SEO, mobile-responsive.
                  </p>
                  <p className={`font-amiamie text-sm ${getMutedTextColor()}`}>
                    Good for: Brand new businesses that just need something online quickly.
                  </p>
                </div>

                <div className={`border rounded-lg p-5 ${theme === 'light' ? 'bg-gray-50 border-gray-300' : theme === 'glass' ? 'bg-white/5 border-white/20' : 'bg-primary/5 border-gold/30'}`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>💼 Professional Option: $2,000 - $5,000</h4>
                  <p className={`font-amiamie text-sm mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>What you get:</strong> Custom design, 5-7 pages, full SEO, contact forms, Google Maps integration, analytics.
                  </p>
                  <p className={`font-amiamie text-sm ${getMutedTextColor()}`}>
                    Good for: Established businesses that want to compete professionally and rank on Google.
                  </p>
                </div>

                <div className={`border rounded-lg p-5 ${theme === 'light' ? 'bg-gray-50 border-gray-300' : theme === 'glass' ? 'bg-white/5 border-white/20' : 'bg-primary/5 border-gold/30'}`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>🚀 Premium Option: $5,000 - $10,000+</h4>
                  <p className={`font-amiamie text-sm mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>What you get:</strong> Fully custom web application, e-commerce, booking systems, multiple integrations, content writing, photography.
                  </p>
                  <p className={`font-amiamie text-sm ${getMutedTextColor()}`}>
                    Good for: Businesses serious about growth and willing to invest in a site that drives serious revenue.
                  </p>
                </div>
              </div>

              <div className={`border rounded-lg p-6 ${getInnerCardBg()}`}>
                <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>🎯 What's the ROI?</h3>
                <p className={`font-amiamie mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                  If your website brings in just <strong>1-2 extra customers per month</strong>, it pays for itself fast.
                </p>
                <p className={`font-amiamie ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                  Example: You're a Brampton contractor. Your website costs $3,000. If it brings you ONE $5,000 job, you've already 
                  made your money back — plus that website keeps working for years.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                Real Brampton Business Success Stories
              </h2>
              
              <div className="space-y-6">
                <div className={`border-l-4 p-5 rounded ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>🍕 Local Pizza Shop</h4>
                  <p className={`font-amiamie mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>Before:</strong> Only taking phone orders, hard to compete with chains.
                  </p>
                  <p className={`font-amiamie mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>After:</strong> Website with online ordering. Sales increased 40% in 6 months. Now ranks #1 for "best pizza Brampton."
                  </p>
                </div>

                <div className={`border-l-4 p-5 rounded ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>💇 Hair Salon</h4>
                  <p className={`font-amiamie mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>Before:</strong> Customers calling to book, lots of phone tag.
                  </p>
                  <p className={`font-amiamie mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>After:</strong> Website with online booking system. Cut phone calls by 60%, bookings increased 35%.
                  </p>
                </div>

                <div className={`border-l-4 p-5 rounded ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h4 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>🔧 HVAC Company</h4>
                  <p className={`font-amiamie mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>Before:</strong> Relying on word-of-mouth only.
                  </p>
                  <p className={`font-amiamie mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
                    <strong>After:</strong> Website optimized for "furnace repair Brampton." Now gets 10-15 quote requests per month from Google.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* CTA Section */}
          <div className={`rounded-lg p-8 sm:p-12 text-center mt-16 border-2 ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-600'
              : theme === 'glass'
              ? 'bg-gradient-to-r from-cyan-900/20 to-cyan-400/10 border-cyan-400'
              : 'bg-gradient-to-r from-gold/20 to-gold/10 border-gold'
          }`}>
            <h2 className={`font-amiamie-round text-3xl sm:text-4xl font-black mb-4 ${getTextColor()}`}>
              Ready to Get Your Business Online?
            </h2>
            <p className={`font-amiamie text-lg mb-8 max-w-2xl mx-auto ${getMutedTextColor()}`}>
              Based in Brampton, I build websites that bring in customers. Let's talk about your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/#contact"
                className={`inline-block px-8 py-4 font-amiamie-round font-bold text-lg rounded transition ${
                  theme === 'glass' 
                    ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                    : theme === 'light'
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-gold text-DarkLava hover:bg-gold/90'
                }`}
              >
                Get a Free Quote
              </a>
              <Link
                to="/blog/web-developer-brampton"
                className={`inline-block px-8 py-4 border-2 font-amiamie-round font-bold text-lg rounded transition ${
                  theme === 'glass'
                    ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
                    : theme === 'light'
                    ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                    : 'border-gold text-gold hover:bg-gold hover:text-DarkLava'
                }`}
              >
                Read Full Web Dev Guide
              </Link>
            </div>
          </div>
            </div>
          </article>

          {/* Sidebar */}
          <BlogSidebar currentSlug="small-business-website-brampton" />
        </div>
      </div>

      <Contact />
    </>
  );
};

export default SmallBusinessWebsiteBrampton;

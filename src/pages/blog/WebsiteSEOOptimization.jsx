import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';
import LogoHeader from '../../components/LogoHeader';
import BlogSidebar from '../../components/BlogSidebar';
import { useTheme } from '../../context/ThemeContext';

/**
 * SEO Blog: How to Optimize Your Website for SEO
 * Target Keywords: "how to optimize website for seo", "website seo optimization", "seo best practices 2025"
 */
const WebsiteSEOOptimization = () => {
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

  const getCodeBg = () => {
    switch(theme) {
      case 'glass': return 'bg-black/50 text-white/90 border border-white/10';
      case 'light': return 'bg-gray-100 text-gray-800 border border-gray-200';
      default: return 'bg-black/30 text-gold border border-gold/20';
    }
  };

  return (
    <>
      <Helmet>
        <title>How to Optimize Your Website for SEO in 2025: Complete Guide</title>
        <meta name="description" content="Learn how to optimize your website for SEO in 2025. Complete guide with technical SEO, on-page optimization, content strategy, and real examples. Get found on Google." />
        <meta name="keywords" content="how to optimize website for seo, website seo optimization, seo best practices 2025, technical seo, on-page seo, local seo, website optimization guide, seo checklist 2025" />
        <link rel="canonical" href="https://captainsolo.ca/blog/how-to-optimize-website-for-seo" />
        
        {/* Open Graph */}
        <meta property="og:title" content="How to Optimize Your Website for SEO in 2025: Complete Guide" />
        <meta property="og:description" content="Learn how to optimize your website for SEO in 2025. Complete guide with technical SEO, on-page optimization, content strategy, and real examples." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://captainsolo.ca/blog/how-to-optimize-website-for-seo" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Optimize Your Website for SEO in 2025" />
        <meta name="twitter:description" content="Complete SEO optimization guide with technical SEO, on-page optimization, and content strategy." />
      </Helmet>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "How to Optimize Your Website for SEO in 2025: Complete Guide",
          "description": "Learn how to optimize your website for SEO in 2025. Complete guide with technical SEO, on-page optimization, content strategy, and real examples.",
          "image": "https://captainsolo.ca/og-image.jpg",
          "author": {
            "@type": "Person",
            "name": "CaptainSolo",
            "url": "https://captainsolo.ca"
          },
          "publisher": {
            "@type": "Organization",
            "name": "CaptainSolo",
            "logo": {
              "@type": "ImageObject",
              "url": "https://captainsolo.ca/logo.png"
            }
          },
          "datePublished": "2025-01-15",
          "dateModified": "2025-01-15",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://captainsolo.ca/blog/how-to-optimize-website-for-seo"
          }
        })}
      </script>

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
            <span className={getTextColor()}>Website SEO Optimization</span>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className={`font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black mb-4 ${getTextColor()}`}>
              How to Optimize Your Website for SEO in 2025: Complete Guide
            </h1>
            <div className={`flex items-center gap-4 font-amiamie text-sm ${getMutedTextColor()}`}>
              <time dateTime="2025-01-15">Updated: January 2025</time>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span>By CaptainSolo</span>
            </div>
          </header>

          {/* Article Content */}
          <div className={`font-amiamie space-y-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/80'}`}>
            
            <section>
              <p className={`text-xl leading-relaxed mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-primary/90'}`}>
                Your website is live, but nobody can find it on Google. Sound familiar? 
                SEO (Search Engine Optimization) is the key to getting your website discovered 
                by potential customers. In this comprehensive guide, I'll walk you through 
                everything you need to optimize your website for SEO in 2025.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                What is SEO and Why Does It Matter?
              </h2>
              <p className="mb-4">
                SEO is the practice of optimizing your website so search engines like Google 
                can understand and rank your content. When done right, SEO drives organic 
                (free) traffic to your website from people actively searching for what you offer.
              </p>
              <p className="mb-4">
                <strong className={getAccentColor()}>Here's why SEO matters in 2025:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>93% of online experiences</strong> begin with a search engine</li>
                <li><strong>75% of users</strong> never scroll past the first page of results</li>
                <li><strong>Organic search</strong> drives 53% of all website traffic</li>
                <li><strong>Local SEO</strong> helps businesses get found by customers nearby</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                1. Technical SEO: The Foundation
              </h2>
              <p className="mb-4">
                Technical SEO ensures search engines can crawl, index, and understand your website. 
                This is the foundation everything else builds on.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Site Speed & Performance
              </h3>
              <p className="mb-4">
                Google uses page speed as a ranking factor. Sites that load in under 3 seconds 
                rank higher and keep users engaged.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Optimize images:</strong> Compress images before uploading (use tools like TinyPNG or ImageOptim)</li>
                <li><strong>Enable browser caching:</strong> Reduces load time for returning visitors</li>
                <li><strong>Minify CSS/JavaScript:</strong> Remove unnecessary code and whitespace</li>
                <li><strong>Use a CDN:</strong> Content Delivery Networks serve your site from servers closer to users</li>
                <li><strong>Choose fast hosting:</strong> Invest in quality hosting (not the cheapest option)</li>
              </ul>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Mobile Responsiveness
              </h3>
              <p className="mb-4">
                <strong>61% of Google searches</strong> happen on mobile devices. Your website 
                must be mobile-friendly or Google won't rank it well.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Test your site on real mobile devices (not just browser dev tools)</li>
                <li>Ensure buttons and links are easy to tap</li>
                <li>Use responsive design (your site adapts to screen size automatically)</li>
                <li>Check text readability on small screens</li>
              </ul>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                SSL Certificate (HTTPS)
              </h3>
              <p className="mb-4">
                Google marks non-HTTPS sites as "not secure." This hurts trust and rankings. 
                Most hosting providers offer free SSL certificates (Let's Encrypt).
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                XML Sitemap & Robots.txt
              </h3>
              <p className="mb-4">
                A sitemap helps Google find and index all your pages. Robots.txt tells search 
                engines which pages to crawl (and which to ignore).
              </p>
              <p className="mb-4">
                <strong>Pro Tip:</strong> Submit your sitemap to Google Search Console for faster indexing.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                2. On-Page SEO: Optimize Your Content
              </h2>
              <p className="mb-4">
                On-page SEO is about optimizing individual pages to rank for specific keywords.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Title Tags & Meta Descriptions
              </h3>
              <p className="mb-4">
                Your title tag is what appears in Google search results. It's one of the most 
                important SEO elements.
              </p>
              <div className={`${getCardBg()} border rounded p-4 mb-4`}>
                <p className={`text-sm mb-2 ${getMutedTextColor()}`}>Good Title Tag Example:</p>
                <p className={`font-mono ${getAccentColor()}`}>Web Developer in Brampton | React Development & Video Production</p>
                <p className={`text-sm mt-4 mb-2 ${getMutedTextColor()}`}>Bad Title Tag Example:</p>
                <p className={`font-mono ${theme === 'light' ? 'text-gray-400' : 'text-primary/60'}`}>Home</p>
              </div>
              <p className="mb-4">
                <strong>Best Practices:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Keep title tags under 60 characters (or they get cut off)</li>
                <li>Include your primary keyword near the beginning</li>
                <li>Make it compelling (people actually want to click)</li>
                <li>Include location if you're a local business</li>
              </ul>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Header Tags (H1, H2, H3)
              </h3>
              <p className="mb-4">
                Header tags structure your content and help Google understand what your page is about.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>H1:</strong> One per page, includes your main keyword</li>
                <li><strong>H2:</strong> Main sections, includes related keywords</li>
                <li><strong>H3:</strong> Subsections, adds more context</li>
              </ul>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Keyword Research & Usage
              </h3>
              <p className="mb-4">
                Keywords are the terms people search for. Use tools like Google Keyword Planner, 
                Ahrefs, or Ubersuggest to find relevant keywords.
              </p>
              <p className="mb-4">
                <strong>How to use keywords effectively:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Use your primary keyword in the H1, first paragraph, and URL</li>
                <li>Include related keywords naturally throughout the content</li>
                <li>Don't stuff keywords (Google penalizes this)</li>
                <li>Target long-tail keywords (more specific, less competition)</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                3. Content Strategy: Create Value
              </h2>
              <p className="mb-4">
                Google rewards websites that provide valuable, helpful content. This is where 
                most businesses fail at SEO.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Quality Over Quantity
              </h3>
              <p className="mb-4">
                One comprehensive, 2,000-word article that answers a question completely is 
                better than ten 200-word blog posts with thin content.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Answer User Intent
              </h3>
              <p className="mb-4">
                Understand why someone is searching for a keyword. Are they looking to buy, 
                learn, or find a location? Match your content to their intent.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Create Pillar Content
              </h3>
              <p className="mb-4">
                Create comprehensive guides (like this one) that cover a topic thoroughly. 
                Then create supporting articles that link back to your pillar content.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                4. Local SEO (For Local Businesses)
              </h2>
              <p className="mb-4">
                If you serve customers in a specific area, local SEO is crucial. This helps 
                you show up in "near me" searches.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Google Business Profile
              </h3>
              <p className="mb-4">
                Claim and optimize your Google Business Profile. This is free and essential 
                for local rankings.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Add accurate business information (name, address, phone)</li>
                <li>Choose the right categories</li>
                <li>Add high-quality photos</li>
                <li>Get customer reviews (respond to all of them)</li>
                <li>Post regularly (updates, offers, events)</li>
              </ul>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Local Keywords
              </h3>
              <p className="mb-4">
                Include your city/region in your content naturally. For example: 
                "web developer in Brampton" or "videographer serving the GTA."
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                NAP Consistency
              </h3>
              <p className="mb-4">
                NAP = Name, Address, Phone. Keep this information consistent across your 
                website, Google Business Profile, and all online directories.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                5. Link Building: Build Authority
              </h2>
              <p className="mb-4">
                Backlinks (links from other websites to yours) are a major ranking factor. 
                Quality over quantity matters here.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                How to Get Backlinks
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Create shareable content:</strong> Guides, infographics, tools</li>
                <li><strong>Guest posting:</strong> Write for relevant blogs in your industry</li>
                <li><strong>Local directories:</strong> Get listed in local business directories</li>
                <li><strong>Partner with others:</strong> Collaborate with complementary businesses</li>
                <li><strong>Get mentioned:</strong> Reach out when you're mentioned (but not linked)</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                6. Schema Markup: Help Google Understand
              </h2>
              <p className="mb-4">
                Schema markup (structured data) tells Google exactly what your content is about. 
                This can lead to rich snippets in search results.
              </p>
              <p className="mb-4">
                Common schema types:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>LocalBusiness:</strong> For local businesses</li>
                <li><strong>Article:</strong> For blog posts</li>
                <li><strong>FAQPage:</strong> For FAQ sections</li>
                <li><strong>Service:</strong> For service pages</li>
                <li><strong>Review:</strong> For customer reviews</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                SEO Checklist: Quick Reference
              </h2>
              <div className={`${getCardBg()} border rounded p-6 mb-6`}>
                <h3 className={`font-amiamie-round text-xl font-bold mb-4 ${getTextColor()}`}>Technical SEO</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Site loads in under 3 seconds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Mobile-responsive design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>HTTPS enabled (SSL certificate)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>XML sitemap created and submitted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Robots.txt configured</span>
                  </li>
                </ul>

                <h3 className={`font-amiamie-round text-xl font-bold mb-4 mt-6 ${getTextColor()}`}>On-Page SEO</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Unique title tags on every page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Meta descriptions written</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>H1 tag with primary keyword</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Alt text on all images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Internal linking between pages</span>
                  </li>
                </ul>

                <h3 className={`font-amiamie-round text-xl font-bold mb-4 mt-6 ${getTextColor()}`}>Content</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Regular blog/content updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Content answers user questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Keywords used naturally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>FAQ section included</span>
                  </li>
                </ul>

                <h3 className={`font-amiamie-round text-xl font-bold mb-4 mt-6 ${getTextColor()}`}>Local SEO</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Google Business Profile claimed and optimized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>NAP consistent across all platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Local keywords in content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Customer reviews collected</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                Common SEO Mistakes to Avoid
              </h2>
              <ul className="list-disc list-inside space-y-3 ml-4 mb-4">
                <li><strong>Keyword stuffing:</strong> Don't repeat keywords unnaturally. Write for humans first.</li>
                <li><strong>Ignoring mobile:</strong> Most traffic is mobile. If your site isn't mobile-friendly, you're losing rankings.</li>
                <li><strong>Duplicate content:</strong> Don't copy content from other sites (or even from your own pages).</li>
                <li><strong>Slow site speed:</strong> Users leave slow sites. So does Google's algorithm.</li>
                <li><strong>No blog/content:</strong> Fresh content signals an active, relevant business.</li>
                <li><strong>Ignoring local SEO:</strong> If you serve local customers, local SEO is non-negotiable.</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                How Long Does SEO Take?
              </h2>
              <p className="mb-4">
                SEO is a long-term strategy. Here's a realistic timeline:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>1-3 months:</strong> Technical fixes show results (site speed, mobile, etc.)</li>
                <li><strong>3-6 months:</strong> Content starts ranking for long-tail keywords</li>
                <li><strong>6-12 months:</strong> Significant traffic increases for competitive keywords</li>
                <li><strong>12+ months:</strong> Authority building and competitive rankings</li>
              </ul>
              <p className="mb-4">
                <strong>Pro Tip:</strong> SEO is not a one-time task. It requires ongoing optimization, 
                fresh content, and monitoring. But the results compound over time.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                Tools to Help with SEO
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Google Search Console:</strong> Free tool to monitor your site's performance in Google</li>
                <li><strong>Google Analytics:</strong> Track website traffic and user behavior</li>
                <li><strong>Ahrefs / SEMrush:</strong> Keyword research and competitor analysis (paid)</li>
                <li><strong>PageSpeed Insights:</strong> Test your site speed</li>
                <li><strong>Schema.org Validator:</strong> Test your schema markup</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                Need Help with SEO?
              </h2>
              <p className="mb-4">
                SEO can be overwhelming, especially if you're running a business. That's where 
                I come in. As a web developer and SEO specialist, I help businesses in Brampton 
                and the GTA optimize their websites for search engines.
              </p>
              <p className="mb-6">
                Whether you need technical SEO fixes, content strategy, or a complete SEO overhaul, 
                I can help. <Link to="/contact" className={`${getAccentColor()} hover:underline`}>Get in touch</Link> for a free consultation.
              </p>
            </section>

            {/* Related Articles */}
            <section className={`mt-12 pt-8 border-t ${getBorderColor()}`}>
              <h2 className={`font-amiamie-round text-2xl font-black mb-6 ${getTextColor()}`}>
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/blog/web-developer-brampton" className={`${getCardBg()} border rounded p-4 hover:${getAccentColor().replace('text-', 'border-')} transition`}>
                  <h3 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Web Developer in Brampton</h3>
                  <p className={`text-sm ${getMutedTextColor()}`}>What you need to know about hiring a web developer</p>
                </Link>
                <Link to="/blog/small-business-website-brampton" className={`${getCardBg()} border rounded p-4 hover:${getAccentColor().replace('text-', 'border-')} transition`}>
                  <h3 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Do I Need a Website for My Small Business?</h3>
                  <p className={`text-sm ${getMutedTextColor()}`}>Why your Brampton business needs a website</p>
                </Link>
              </div>
            </section>

          </div>
            </div>
          </article>

          {/* Sidebar */}
          <BlogSidebar currentSlug="how-to-optimize-website-for-seo" />
        </div>
      </div>

      <Contact />
    </>
  );
};

export default WebsiteSEOOptimization;

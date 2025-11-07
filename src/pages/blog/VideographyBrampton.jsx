import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';

/**
 * Local SEO Blog: Videography Services in Brampton
 * Target: "videographer brampton", "video production brampton", "brampton videography"
 */
const VideographyBrampton = () => {
  return (
    <>
      <Helmet>
        <title>Professional Videographer in Brampton, ON | CaptainSolo Media</title>
        <meta name="description" content="Looking for a videographer in Brampton? CaptainSolo offers professional video production for events, corporate, music videos, and more. Serving Brampton, Mississauga, and GTA." />
        <meta name="keywords" content="videographer brampton, video production brampton, brampton videography, videographer gta, video services brampton ontario, brampton video production company" />
        <link rel="canonical" href="https://captainsolo.ca/blog/videography-brampton" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Professional Videographer in Brampton, ON | CaptainSolo" />
        <meta property="og:description" content="Professional video production services in Brampton & GTA. Events, corporate videos, music videos, and more." />
        <meta property="og:url" content="https://captainsolo.ca/blog/videography-brampton" />
        <meta property="og:type" content="article" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "CaptainSolo Media - Videography Brampton",
            "image": "https://captainsolo.ca/og-image.jpg",
            "description": "Professional videography and video production services in Brampton, Ontario",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Brampton",
              "addressRegion": "ON",
              "addressCountry": "CA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "43.7315",
              "longitude": "-79.7624"
            },
            "url": "https://captainsolo.ca",
            "telephone": "+1-289-XXX-XXXX",
            "priceRange": "$$",
            "areaServed": ["Brampton", "Mississauga", "Toronto", "GTA", "Ontario"],
            "serviceType": ["Videography", "Video Production", "Event Videography", "Corporate Videos", "Music Videos"]
          })}
        </script>
      </Helmet>

      <Navbar />

      <article className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-SageGray">
            <Link to="/" className="hover:text-gold transition">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-gold transition">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">Videographer Brampton</span>
          </nav>

          {/* Hero */}
          <header className="mb-12">
            <h1 className="font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-6 leading-tight">
              Professional Videographer in Brampton, ON: Your Complete Guide
            </h1>
            <div className="flex items-center gap-4 text-SageGray text-sm mb-6">
              <time dateTime="2025-01-01">January 2025</time>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span className="text-gold">Local Guide</span>
            </div>
            <p className="font-amiamie text-xl text-primary/80 leading-relaxed">
              Looking for professional videography services in Brampton or the GTA? Whether you need event coverage, corporate videos, music videos, or promotional content, this guide covers everything you need to know about hiring a videographer in Brampton, Ontario.
            </p>
          </header>

          {/* Table of Contents */}
          <div className="bg-primary/5 border border-gold/30 rounded-lg p-6 mb-12">
            <h2 className="font-amiamie-round text-xl font-bold text-gold mb-4">Quick Navigation</h2>
            <ul className="font-amiamie text-primary/80 space-y-2">
              <li>→ <a href="#why-brampton" className="hover:text-gold transition">Why Choose a Local Brampton Videographer</a></li>
              <li>→ <a href="#services" className="hover:text-gold transition">Video Production Services Available</a></li>
              <li>→ <a href="#pricing" className="hover:text-gold transition">Videography Pricing in Brampton</a></li>
              <li>→ <a href="#portfolio" className="hover:text-gold transition">What to Look for in a Portfolio</a></li>
              <li>→ <a href="#equipment" className="hover:text-gold transition">Equipment & Quality Standards</a></li>
              <li>→ <a href="#booking" className="hover:text-gold transition">How to Book & What to Expect</a></li>
            </ul>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            
            <section id="why-brampton" className="mb-12">
              <h2 className="font-amiamie-round text-3xl font-bold text-gold mb-6">
                Why Hire a Local Brampton Videographer?
              </h2>
              <p className="font-amiamie text-lg text-primary/90 mb-4 leading-relaxed">
                Brampton is Ontario's third-largest city with a thriving business community, diverse cultural events, and growing creative scene. Hiring a local videographer offers several advantages:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-primary/5 border-l-4 border-gold p-4 rounded">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-2">🌍 Local Knowledge</h3>
                  <p className="font-amiamie text-primary/80">
                    We know the best filming locations in Brampton — from Gage Park and Heart Lake Conservation Area to downtown Brampton's vibrant streets. We understand permits, lighting conditions, and local regulations.
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-gold p-4 rounded">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-2">💰 No Travel Fees</h3>
                  <p className="font-amiamie text-primary/80">
                    Hiring a Toronto or Mississauga videographer means paying travel costs. A Brampton-based videographer arrives faster and charges less — saving you money without sacrificing quality.
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-gold p-4 rounded">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-2">⚡ Faster Turnaround</h3>
                  <p className="font-amiamie text-primary/80">
                    Need to add shots or do a quick re-shoot? Being local means we can meet in person easily, adjust on short notice, and deliver edits faster than out-of-town crews.
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-gold p-4 rounded">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-2">🤝 Community Connection</h3>
                  <p className="font-amiamie text-primary/80">
                    We're part of the Brampton community. We've filmed at local businesses, cultural festivals, temples, churches, and community centers. We understand Brampton's diverse culture and values.
                  </p>
                </div>
              </div>
            </section>

            <section id="services" className="mb-12">
              <h2 className="font-amiamie-round text-3xl font-bold text-gold mb-6">
                Video Production Services in Brampton
              </h2>
              <p className="font-amiamie text-lg text-primary/90 mb-6 leading-relaxed">
                CaptainSolo offers full-service video production for Brampton and GTA clients. Here's what we specialize in:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-DarkLava border border-SageGray/30 rounded-lg p-6">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">📹 Event Videography</h3>
                  <ul className="font-amiamie text-primary/80 space-y-2">
                    <li>• Weddings & Engagements</li>
                    <li>• Corporate Events & Conferences</li>
                    <li>• Birthday Parties & Anniversaries</li>
                    <li>• Cultural & Religious Ceremonies</li>
                    <li>• Graduation Ceremonies</li>
                  </ul>
                </div>

                <div className="bg-DarkLava border border-SageGray/30 rounded-lg p-6">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">🎬 Commercial Video</h3>
                  <ul className="font-amiamie text-primary/80 space-y-2">
                    <li>• Business Promotional Videos</li>
                    <li>• Product Demonstrations</li>
                    <li>• Real Estate Tours</li>
                    <li>• Restaurant & Storefront Videos</li>
                    <li>• Social Media Content</li>
                  </ul>
                </div>

                <div className="bg-DarkLava border border-SageGray/30 rounded-lg p-6">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">🎵 Music Videos</h3>
                  <ul className="font-amiamie text-primary/80 space-y-2">
                    <li>• Hip-Hop & Rap Videos</li>
                    <li>• R&B & Soul</li>
                    <li>• Punjabi & Bollywood</li>
                    <li>• Performance Videos</li>
                    <li>• Lyric Videos</li>
                  </ul>
                </div>

                <div className="bg-DarkLava border border-SageGray/30 rounded-lg p-6">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">💼 Corporate Video</h3>
                  <ul className="font-amiamie text-primary/80 space-y-2">
                    <li>• Company Culture Videos</li>
                    <li>• Training & Educational Videos</li>
                    <li>• Executive Interviews</li>
                    <li>• Testimonial Videos</li>
                    <li>• LinkedIn Video Content</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gold/10 border-2 border-gold/50 rounded-lg p-6">
                <p className="font-amiamie text-primary/90 mb-4">
                  <strong className="text-gold">🎯 GTA Coverage:</strong> While based in Brampton, we serve the entire Greater Toronto Area including Mississauga, Toronto, Vaughan, Caledon, and surrounding cities.
                </p>
              </div>
            </section>

            <section id="pricing" className="mb-12">
              <h2 className="font-amiamie-round text-3xl font-bold text-gold mb-6">
                Videography Pricing in Brampton: What to Expect
              </h2>
              
              <p className="font-amiamie text-lg text-primary/90 mb-6 leading-relaxed">
                Videography costs in Brampton vary based on project scope, duration, and deliverables. Here's a breakdown of typical pricing:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border border-SageGray/30">
                  <thead className="bg-primary/10">
                    <tr>
                      <th className="font-amiamie-round text-left p-4 border-b border-SageGray/30 text-gold">Service Type</th>
                      <th className="font-amiamie-round text-left p-4 border-b border-SageGray/30 text-gold">Duration</th>
                      <th className="font-amiamie-round text-left p-4 border-b border-SageGray/30 text-gold">Price Range</th>
                    </tr>
                  </thead>
                  <tbody className="font-amiamie text-primary/80">
                    <tr>
                      <td className="p-4 border-b border-SageGray/20">Music Video</td>
                      <td className="p-4 border-b border-SageGray/20">1-2 days</td>
                      <td className="p-4 border-b border-SageGray/20">$500 - $2,000</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-SageGray/20">Wedding Coverage</td>
                      <td className="p-4 border-b border-SageGray/20">6-10 hours</td>
                      <td className="p-4 border-b border-SageGray/20">$1,200 - $3,500</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-SageGray/20">Corporate Video</td>
                      <td className="p-4 border-b border-SageGray/20">Half day</td>
                      <td className="p-4 border-b border-SageGray/20">$800 - $2,000</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-SageGray/20">Promotional Video</td>
                      <td className="p-4 border-b border-SageGray/20">1-2 hours</td>
                      <td className="p-4 border-b border-SageGray/20">$400 - $1,200</td>
                    </tr>
                    <tr>
                      <td className="p-4">Social Media Content</td>
                      <td className="p-4">1 hour</td>
                      <td className="p-4">$200 - $600</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-primary/5 border border-SageGray/30 rounded-lg p-6">
                <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">💡 What Affects Pricing?</h3>
                <ul className="font-amiamie text-primary/80 space-y-2">
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
              <h2 className="font-amiamie-round text-3xl font-bold text-gold mb-6">
                What to Look for in a Videographer's Portfolio
              </h2>
              
              <p className="font-amiamie text-lg text-primary/90 mb-6 leading-relaxed">
                Before hiring a videographer in Brampton, review their portfolio and ask yourself:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <p className="font-amiamie text-primary/80">
                    <strong>Do they have experience in your type of project?</strong> If you need a music video, check if they've done music videos before.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <p className="font-amiamie text-primary/80">
                    <strong>Is the production quality consistent?</strong> Check audio quality, stabilization, lighting, and color grading across multiple videos.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <p className="font-amiamie text-primary/80">
                    <strong>Do they tell a story?</strong> Good videography isn't just pretty shots — it should engage viewers and tell a compelling story.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <p className="font-amiamie text-primary/80">
                    <strong>Are they local?</strong> Look for Brampton or GTA locations in their work to confirm they know the area.
                  </p>
                </div>
              </div>
            </section>

            <section id="equipment" className="mb-12">
              <h2 className="font-amiamie-round text-3xl font-bold text-gold mb-6">
                Professional Equipment & Quality Standards
              </h2>
              
              <p className="font-amiamie text-lg text-primary/90 mb-6 leading-relaxed">
                Quality videography requires professional gear. Here's what CaptainSolo brings to every Brampton shoot:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-DarkLava border border-gold/30 rounded-lg p-4">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">📷 Cameras</h4>
                  <p className="font-amiamie text-sm text-primary/80">4K/6K cinema cameras, mirrorless systems, multiple angles</p>
                </div>
                <div className="bg-DarkLava border border-gold/30 rounded-lg p-4">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">🎤 Audio</h4>
                  <p className="font-amiamie text-sm text-primary/80">Wireless mics, boom audio, field recorders for crystal-clear sound</p>
                </div>
                <div className="bg-DarkLava border border-gold/30 rounded-lg p-4">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">💡 Lighting</h4>
                  <p className="font-amiamie text-sm text-primary/80">Professional LED panels, softboxes, portable light kits</p>
                </div>
                <div className="bg-DarkLava border border-gold/30 rounded-lg p-4">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">🚁 Aerial</h4>
                  <p className="font-amiamie text-sm text-primary/80">Drone footage for stunning overhead shots (licensed & insured)</p>
                </div>
                <div className="bg-DarkLava border border-gold/30 rounded-lg p-4">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">📐 Stabilization</h4>
                  <p className="font-amiamie text-sm text-primary/80">Gimbals, sliders, tripods for smooth cinematic movement</p>
                </div>
                <div className="bg-DarkLava border border-gold/30 rounded-lg p-4">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">💻 Editing</h4>
                  <p className="font-amiamie text-sm text-primary/80">Adobe Premiere, DaVinci Resolve, color grading & VFX</p>
                </div>
              </div>
            </section>

            <section id="booking" className="mb-12">
              <h2 className="font-amiamie-round text-3xl font-bold text-gold mb-6">
                How to Book Videography Services in Brampton
              </h2>
              
              <p className="font-amiamie text-lg text-primary/90 mb-6 leading-relaxed">
                Ready to hire a videographer? Here's the typical process when working with CaptainSolo:
              </p>

              <ol className="space-y-6 mb-8">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center font-amiamie-round font-bold text-DarkLava">1</span>
                  <div>
                    <h4 className="font-amiamie-round font-bold text-primary mb-2">Initial Consultation (Free)</h4>
                    <p className="font-amiamie text-primary/80">
                      We discuss your project, vision, timeline, and budget. This can be done in person in Brampton or over video call.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center font-amiamie-round font-bold text-DarkLava">2</span>
                  <div>
                    <h4 className="font-amiamie-round font-bold text-primary mb-2">Proposal & Quote</h4>
                    <p className="font-amiamie text-primary/80">
                      You receive a detailed proposal outlining deliverables, timeline, pricing, and terms.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center font-amiamie-round font-bold text-DarkLava">3</span>
                  <div>
                    <h4 className="font-amiamie-round font-bold text-primary mb-2">Contract & Deposit</h4>
                    <p className="font-amiamie text-primary/80">
                      Sign the contract and pay a 50% deposit to secure your date. Dates book fast, especially in summer!
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center font-amiamie-round font-bold text-DarkLava">4</span>
                  <div>
                    <h4 className="font-amiamie-round font-bold text-primary mb-2">Pre-Production Planning</h4>
                    <p className="font-amiamie text-primary/80">
                      We create a shot list, schedule, scout locations if needed, and confirm all logistics.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center font-amiamie-round font-bold text-DarkLava">5</span>
                  <div>
                    <h4 className="font-amiamie-round font-bold text-primary mb-2">Filming Day</h4>
                    <p className="font-amiamie text-primary/80">
                      We arrive on time, capture all footage according to plan, and adapt to any changes on the fly.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center font-amiamie-round font-bold text-DarkLava">6</span>
                  <div>
                    <h4 className="font-amiamie-round font-bold text-primary mb-2">Editing & Revisions</h4>
                    <p className="font-amiamie text-primary/80">
                      You receive a draft for review, provide feedback, and we make revisions until you're 100% satisfied.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center font-amiamie-round font-bold text-DarkLava">7</span>
                  <div>
                    <h4 className="font-amiamie-round font-bold text-primary mb-2">Final Delivery</h4>
                    <p className="font-amiamie text-primary/80">
                      Get your completed video in multiple formats (4K, 1080p, social media versions) plus raw footage if requested.
                    </p>
                  </div>
                </li>
              </ol>
            </section>

          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-gold/20 to-gold/10 border-2 border-gold rounded-lg p-8 sm:p-12 text-center mt-16">
            <h2 className="font-amiamie-round text-3xl sm:text-4xl font-black text-primary mb-4">
              Ready to Start Your Video Project?
            </h2>
            <p className="font-amiamie text-lg text-SageGray mb-8 max-w-2xl mx-auto">
              Based in Brampton, serving the entire GTA. Let's create something amazing together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/#contact"
                className="inline-block px-8 py-4 bg-gold text-DarkLava font-amiamie-round font-bold text-lg rounded hover:bg-gold/90 transition"
              >
                Get a Free Quote
              </a>
              <Link
                to="/blog"
                className="inline-block px-8 py-4 border-2 border-gold text-gold font-amiamie-round font-bold text-lg rounded hover:bg-gold hover:text-DarkLava transition"
              >
                Read More Articles
              </Link>
            </div>
          </div>

        </div>
      </article>

      <Contact />
    </>
  );
};

export default VideographyBrampton;


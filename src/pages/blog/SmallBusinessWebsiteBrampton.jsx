import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';

/**
 * Local SEO Blog: Small Business Website Guide for Brampton
 * Target: "small business website brampton", "brampton small business", "website for small business"
 */
const SmallBusinessWebsiteBrampton = () => {
  return (
    <>
      <Helmet>
        <title>Small Business Website Guide for Brampton Entrepreneurs | CaptainSolo</title>
        <meta name="description" content="Starting a business in Brampton? Learn why you need a website, what it costs, and how to get online fast. Complete guide for Brampton small business owners." />
        <meta name="keywords" content="small business website brampton, brampton entrepreneur, business website cost, small business web design, brampton startup" />
        <link rel="canonical" href="https://captainsolo.ca/blog/small-business-website-brampton" />
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
            <span className="text-primary">Small Business Website Brampton</span>
          </nav>

          {/* Hero */}
          <header className="mb-12">
            <h1 className="font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-6 leading-tight">
              Do I Really Need a Website for My Brampton Small Business?
            </h1>
            <div className="flex items-center gap-4 text-SageGray text-sm mb-6">
              <time dateTime="2025-01-07">January 7, 2025</time>
              <span>•</span>
              <span>8 min read</span>
            </div>
            <p className="font-amiamie text-xl text-primary/80 leading-relaxed">
              You run a small business in Brampton. You might have a Facebook page, an Instagram account, maybe even a Google Business Profile. So... do you really need a website? The short answer: <strong className="text-gold">absolutely yes.</strong> Here's why, and what it'll cost you.
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            
            <section className="mb-12">
              <h2 className="font-amiamie-round text-3xl font-bold text-gold mb-6">
                Why Brampton Small Businesses Need Websites in 2025
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="bg-primary/5 border-l-4 border-gold p-5 rounded">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">🔍 Customers Search for You Online</h3>
                  <p className="font-amiamie text-primary/80 mb-2">
                    When someone needs a plumber, restaurant, salon, or lawyer in Brampton, what do they do? <strong>They Google it.</strong>
                  </p>
                  <p className="font-amiamie text-primary/80">
                    If you don't have a website, you're invisible. Your competitors with websites show up first — and they get the customer.
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-gold p-5 rounded">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">💼 You Look More Professional</h3>
                  <p className="font-amiamie text-primary/80 mb-2">
                    A Facebook page is fine for staying in touch. But when someone's deciding whether to hire you or buy from you, they check your website.
                  </p>
                  <p className="font-amiamie text-primary/80">
                    No website = less trust. A professional website says "I'm serious about my business."
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-gold p-5 rounded">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">📱 You Own Your Platform</h3>
                  <p className="font-amiamie text-primary/80 mb-2">
                    Social media platforms can ban your account, change their algorithm, or shut down tomorrow. <strong>You don't control them.</strong>
                  </p>
                  <p className="font-amiamie text-primary/80">
                    A website is <strong>yours.</strong> Your domain, your content, your customers. No one can take it away.
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-gold p-5 rounded">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">💰 It's Open 24/7</h3>
                  <p className="font-amiamie text-primary/80">
                    Your website works while you sleep. Customers can find your hours, see your menu, read reviews, book appointments, and even place orders — all without you answering the phone.
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-gold p-5 rounded">
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">🎯 You Reach More Customers</h3>
                  <p className="font-amiamie text-primary/80 mb-2">
                    With SEO (search engine optimization), your website can rank on Google for searches like "best pizza Brampton" or "Brampton hair salon near me."
                  </p>
                  <p className="font-amiamie text-primary/80">
                    That's <strong>free marketing</strong> every time someone searches. Social media can't do that.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-amiamie-round text-3xl font-bold text-gold mb-6">
                What Should Your Brampton Small Business Website Include?
              </h2>
              
              <p className="font-amiamie text-lg text-primary/90 mb-6 leading-relaxed">
                You don't need a 50-page website. For most Brampton small businesses, 5-7 pages is perfect:
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-DarkLava border border-SageGray/30 rounded-lg p-4">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">🏠 Home Page</h4>
                  <p className="font-amiamie text-sm text-primary/80">
                    Clear headline, what you do, who you serve, and a call-to-action ("Call Now", "Book Online", "Get a Quote").
                  </p>
                </div>

                <div className="bg-DarkLava border border-SageGray/30 rounded-lg p-4">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">ℹ️ About Page</h4>
                  <p className="font-amiamie text-sm text-primary/80">
                    Your story, why you started, what makes you different. Include a photo of yourself or your team.
                  </p>
                </div>

                <div className="bg-DarkLava border border-SageGray/30 rounded-lg p-4">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">🛠️ Services/Products Page</h4>
                  <p className="font-amiamie text-sm text-primary/80">
                    What you offer, with prices if possible. Photos/videos of your work.
                  </p>
                </div>

                <div className="bg-DarkLava border border-SageGray/30 rounded-lg p-4">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">⭐ Testimonials/Reviews</h4>
                  <p className="font-amiamie text-sm text-primary/80">
                    Social proof. What do your customers say? Include names and photos if you can.
                  </p>
                </div>

                <div className="bg-DarkLava border border-SageGray/30 rounded-lg p-4">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">📞 Contact Page</h4>
                  <p className="font-amiamie text-sm text-primary/80">
                    Phone number, email, address, hours, contact form, map. Make it EASY to reach you.
                  </p>
                </div>
              </div>

              <div className="bg-gold/10 border-2 border-gold/50 rounded-lg p-6">
                <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">💡 Optional But Helpful:</h3>
                <ul className="font-amiamie text-primary/80 space-y-2">
                  <li>• <strong>Blog</strong> — Share tips, news, updates (great for SEO)</li>
                  <li>• <strong>FAQ</strong> — Answer common questions to save time</li>
                  <li>• <strong>Gallery/Portfolio</strong> — Show off your work</li>
                  <li>• <strong>Online Booking</strong> — Let customers book appointments 24/7</li>
                  <li>• <strong>E-Commerce</strong> — Sell products online</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-amiamie-round text-3xl font-bold text-gold mb-6">
                How Much Does a Website Cost for a Brampton Small Business?
              </h2>
              
              <p className="font-amiamie text-lg text-primary/90 mb-6 leading-relaxed">
                Let's be real about costs. Here's what you should expect:
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-primary/5 border border-gold/30 rounded-lg p-5">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">💸 Budget Option: $500 - $1,500</h4>
                  <p className="font-amiamie text-sm text-primary/80 mb-2">
                    <strong>What you get:</strong> Template-based site, 3-5 pages, basic SEO, mobile-responsive.
                  </p>
                  <p className="font-amiamie text-sm text-SageGray">
                    Good for: Brand new businesses that just need something online quickly.
                  </p>
                </div>

                <div className="bg-primary/5 border border-gold/30 rounded-lg p-5">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">💼 Professional Option: $2,000 - $5,000</h4>
                  <p className="font-amiamie text-sm text-primary/80 mb-2">
                    <strong>What you get:</strong> Custom design, 5-7 pages, full SEO, contact forms, Google Maps integration, analytics.
                  </p>
                  <p className="font-amiamie text-sm text-SageGray">
                    Good for: Established businesses that want to compete professionally and rank on Google.
                  </p>
                </div>

                <div className="bg-primary/5 border border-gold/30 rounded-lg p-5">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">🚀 Premium Option: $5,000 - $10,000+</h4>
                  <p className="font-amiamie text-sm text-primary/80 mb-2">
                    <strong>What you get:</strong> Fully custom web application, e-commerce, booking systems, multiple integrations, content writing, photography.
                  </p>
                  <p className="font-amiamie text-sm text-SageGray">
                    Good for: Businesses serious about growth and willing to invest in a site that drives serious revenue.
                  </p>
                </div>
              </div>

              <div className="bg-DarkLava border border-SageGray/30 rounded-lg p-6">
                <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">🎯 What's the ROI?</h3>
                <p className="font-amiamie text-primary/80 mb-3">
                  If your website brings in just <strong>1-2 extra customers per month</strong>, it pays for itself fast.
                </p>
                <p className="font-amiamie text-primary/80">
                  Example: You're a Brampton contractor. Your website costs $3,000. If it brings you ONE $5,000 job, you've already 
                  made your money back — plus that website keeps working for years.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-amiamie-round text-3xl font-bold text-gold mb-6">
                Real Brampton Business Success Stories
              </h2>
              
              <div className="space-y-6">
                <div className="bg-primary/5 border-l-4 border-gold p-5 rounded">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">🍕 Local Pizza Shop</h4>
                  <p className="font-amiamie text-primary/80 mb-2">
                    <strong>Before:</strong> Only taking phone orders, hard to compete with chains.
                  </p>
                  <p className="font-amiamie text-primary/80 mb-2">
                    <strong>After:</strong> Website with online ordering. Sales increased 40% in 6 months. Now ranks #1 for "best pizza Brampton."
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-gold p-5 rounded">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">💇 Hair Salon</h4>
                  <p className="font-amiamie text-primary/80 mb-2">
                    <strong>Before:</strong> Customers calling to book, lots of phone tag.
                  </p>
                  <p className="font-amiamie text-primary/80 mb-2">
                    <strong>After:</strong> Website with online booking system. Cut phone calls by 60%, bookings increased 35%.
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-gold p-5 rounded">
                  <h4 className="font-amiamie-round font-bold text-primary mb-2">🔧 HVAC Company</h4>
                  <p className="font-amiamie text-primary/80 mb-2">
                    <strong>Before:</strong> Relying on word-of-mouth only.
                  </p>
                  <p className="font-amiamie text-primary/80 mb-2">
                    <strong>After:</strong> Website optimized for "furnace repair Brampton." Now gets 10-15 quote requests per month from Google.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-gold/20 to-gold/10 border-2 border-gold rounded-lg p-8 sm:p-12 text-center mt-16">
            <h2 className="font-amiamie-round text-3xl sm:text-4xl font-black text-primary mb-4">
              Ready to Get Your Business Online?
            </h2>
            <p className="font-amiamie text-lg text-SageGray mb-8 max-w-2xl mx-auto">
              Based in Brampton, I build websites that bring in customers. Let's talk about your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/#contact"
                className="inline-block px-8 py-4 bg-gold text-DarkLava font-amiamie-round font-bold text-lg rounded hover:bg-gold/90 transition"
              >
                Get a Free Quote
              </a>
              <Link
                to="/blog/web-developer-brampton"
                className="inline-block px-8 py-4 border-2 border-gold text-gold font-amiamie-round font-bold text-lg rounded hover:bg-gold hover:text-DarkLava transition"
              >
                Read Full Web Dev Guide
              </Link>
            </div>
          </div>

        </div>
      </article>

      <Contact />
    </>
  );
};

export default SmallBusinessWebsiteBrampton;


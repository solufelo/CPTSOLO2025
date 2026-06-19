import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../sections/Navbar';
import LogoHeader from '../components/LogoHeader';
import ContactForm from '../components/ContactForm';
import Marquee from '../components/Marquee';
import { socials } from '../constants';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';

/**
 * Contact Page
 * Dedicated contact page at /contact route
 * Features contact form, contact information, and call-to-action
 */
const ContactPage = () => {
  // Header text - CTA for potential clients
  const text = `Got a project idea? Need a website AND the content to fill it?
    Let's build something unforgettable together.`;
  
  // Marquee items - Captain Solo brand messages
  const items = [
    "Code it. Film it. Ship it.",
    "Where creativity meets execution.",
    "Full-Stack Development + Video Production.",
    "Code it. Film it. Ship it.",
    "Where creativity meets execution.",
  ];

  return (
    <>
      <Helmet>
        <title>Contact | CaptainSolo - Web Development & Videography Services</title>
        <meta name="description" content="Get in touch with CaptainSolo for web development, videography, and content creation services. Based in Brampton, ON, serving the GTA." />
        <meta name="keywords" content="contact, web developer brampton, videographer brampton, web development services, video production, contact form" />
        <link rel="canonical" href="https://captainsolo.ca/contact" />
        <meta property="og:title" content="Contact | CaptainSolo" />
        <meta property="og:description" content="Get in touch for web development and videography services." />
        <meta property="og:url" content="https://captainsolo.ca/contact" />
        <meta property="og:type" content="website" />
      </Helmet>

      <LogoHeader />
      <Navbar />

      <section className="flex flex-col justify-between min-h-screen bg-black pb-0 overflow-hidden">
        <div className="flex-grow">
          {/* Animated header */}
          <AnimatedHeaderSection
            subTitle={"Let's Create Something Legendary"}
            title={"Contact"}
            text={text}
            textColor={"text-white"}
            withScrollTrigger={true}
          />
          
          {/* Contact Form */}
          <div className="px-4 sm:px-6 lg:px-10 mb-20">
            <ContactForm />
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20 mb-20" />
          
          {/* Contact information */}
          <div className="flex px-4 sm:px-6 lg:px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-20">
            <div className="flex flex-col w-full gap-10">
              {/* Email */}
              <div className="social-link">
                <h2>E-mail</h2>
                <div className="w-full h-px my-2 bg-white/30" />
                <a 
                  href="mailto:work@captainsolo.ca"
                  className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl hover:text-white/80 transition-colors duration-200"
                >
                  work@captainsolo.ca
                </a>
              </div>
              
              {/* Location */}
              <div className="social-link">
                <h2>Location</h2>
                <div className="w-full h-px my-2 bg-white/30" />
                <p className="text-xl tracking-wider md:text-2xl lg:text-3xl">
                  Brampton, ON • Serving GTA
                </p>
              </div>
              
              {/* Social Media */}
              <div className="social-link">
                <h2>Social Media</h2>
                <div className="w-full h-px my-2 bg-white/30" />
                <div className="flex flex-wrap gap-2">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs leading-loose tracking-wides uppercase md:text-sm hover:text-white/80 transition-colors duration-200"
                    >
                      {"{ "}
                      {social.name}
                      {" }"}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Services Quick Links */}
          <div className="px-4 sm:px-6 lg:px-10 mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-amiamie-round text-3xl md:text-4xl font-black text-white mb-8 text-center">
                What I Offer
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  to="/"
                  className="bg-white/5 border border-white/20 rounded-lg p-6 hover:border-gold transition-all hover:bg-white/10 group"
                >
                  <h3 className="font-amiamie-round text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                    Web Development
                  </h3>
                  <p className="text-white/70 font-amiamie text-sm">
                    Full-stack web applications, landing pages, and business websites
                  </p>
                </Link>
                <Link
                  to="/"
                  className="bg-white/5 border border-white/20 rounded-lg p-6 hover:border-gold transition-all hover:bg-white/10 group"
                >
                  <h3 className="font-amiamie-round text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                    Videography
                  </h3>
                  <p className="text-white/70 font-amiamie text-sm">
                    Video production, content creation, and social media content
                  </p>
                </Link>
                <Link
                  to="/voice-tags"
                  className="bg-white/5 border border-white/20 rounded-lg p-6 hover:border-gold transition-all hover:bg-white/10 group"
                >
                  <h3 className="font-amiamie-round text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                    Voice Tags
                  </h3>
                  <p className="text-white/70 font-amiamie text-sm">
                    Professional producer tags and voice overs for music production
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Get Started CTA */}
          <div className="px-4 sm:px-6 lg:px-10 mb-20">
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="font-amiamie-round text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl">
                Create an account to place orders, track your projects, and communicate directly with us.
              </p>
              <Link
                to="/signup"
                className="inline-block bg-gold text-DarkLava font-amiamie-round font-bold text-xl md:text-2xl px-8 md:px-12 py-4 md:py-5 rounded-lg
                         hover:bg-gold/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-gold/50"
              >
                Get Started
              </Link>
              <p className="text-white/60 text-sm mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-gold hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom marquee with brand messages - Fixed to bottom */}
        <div className="mt-auto">
          <Marquee items={items} className="text-white bg-transparent" />
        </div>
      </section>
    </>
  );
};

export default ContactPage;


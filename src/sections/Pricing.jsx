import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { pricingPackages } from "../constants";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Pricing Section Component
 * Sales-optimized pricing display with on-brand dark design
 * Features 3-package focus, social proof, and clear CTAs
 */
const Pricing = () => {
  // Refs for GSAP animations
  const cardRefs = useRef([]);
  const allPackagesRef = useRef(null);
  
  // State for showing all packages
  const [showAllPackages, setShowAllPackages] = useState(false);
  
  // Header text - more conversion-focused
  const text = `Transparent pricing. No hidden fees. First 3 clients get priority booking + 15% discount.`;

  // Filter packages based on selection
  const featuredPackages = [
    pricingPackages.find(p => p.id === 4), // Combo package (hero)
    pricingPackages.find(p => p.id === 2), // Business Website
    pricingPackages.find(p => p.id === 3), // Video Package
  ].filter(Boolean);
  
  // Remaining packages for "View All"
  const otherPackages = pricingPackages.filter(p => ![2, 3, 4].includes(p.id));

  // GSAP scroll animations for pricing cards
  useGSAP(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <section id="pricing" className="min-h-screen bg-black pt-16 pb-20">
      {/* Animated header */}
      <AnimatedHeaderSection
        subTitle={"Investment that pays for itself"}
        title={"Packages"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      {/* Social proof bar */}
      <div className="px-10 mb-12">
        <div className="max-w-5xl mx-auto bg-gold/10 border border-gold/30 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">1,400+</div>
              <div className="text-sm text-white/60">Projects Completed</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block" />
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">4.8★</div>
              <div className="text-sm text-white/60">Client Rating</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block" />
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">6 Years</div>
              <div className="text-sm text-white/60">Experience</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block" />
            <div className="text-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-white/80">Available Now</span>
              </div>
              <div className="text-xs text-white/50">Responding within 24hrs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main package grid - responsive based on screen size */}
      <div className="px-10 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {featuredPackages.map((pkg, index) => {
            const isHero = pkg.id === 4; // Combo package
            
            return (
              <div
                key={pkg.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="relative group"
              >
                {/* Glow effect for hero package */}
                {isHero && (
                  <div className="absolute inset-0 bg-gradient-to-b from-gold/20 to-transparent rounded-2xl blur-2xl opacity-50" />
                )}
                
                <div
                  className={`
                    relative h-full
                    bg-gradient-to-br from-white/5 to-white/[0.02]
                    border-2 rounded-2xl p-6 lg:p-8
                    backdrop-blur-sm
                    transition-all duration-300
                    ${isHero 
                      ? 'border-gold hover:border-gold/80 hover:from-gold/10' 
                      : 'border-white/10 hover:border-white/20 hover:from-white/10'
                    }
                    hover:scale-[1.01] hover:shadow-2xl
                  `}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gold text-black px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-4">
                    <div className="text-gold text-xs font-medium uppercase tracking-widest mb-2">
                      {pkg.category}
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-5xl font-bold text-white">
                        {pkg.priceRange.split('-')[0].trim()}
                      </span>
                      <span className="text-2xl text-white/60">
                        - {pkg.priceRange.split('-')[1]?.trim() || ''}
                      </span>
                    </div>
                    <div className="text-sm text-white/50">
                      {pkg.turnaround} • No contracts
                    </div>
                  </div>

                  {/* Hover Details - Hidden by default, shown on hover (desktop) or always visible (mobile) */}
                  <div className="mb-6 relative">
                    {/* Trigger area */}
                    <div className="flex items-center justify-between text-sm text-white/70 py-2 border-y border-white/10 cursor-help">
                      <span className="font-medium">
                        <span className="hidden md:inline">Hover for details • </span>
                        {pkg.features.length} features included
                      </span>
                      <span className="hidden md:inline text-white/50">↓</span>
                    </div>
                    
                    {/* Features - Hidden on desktop (shows on hover), always visible on mobile */}
                    <div className="mt-4 space-y-2.5 md:opacity-0 md:max-h-0 md:overflow-hidden md:group-hover:opacity-100 md:group-hover:max-h-[500px] transition-all duration-300 ease-in-out">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`
                            w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                            ${isHero ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/60'}
                          `}>
                            ✓
                          </div>
                          <span className="text-sm text-white/80">{feature}</span>
                        </div>
                      ))}
                      
                      {/* Ideal for */}
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="text-xs text-white/50 uppercase tracking-wider mb-2">
                          Perfect For:
                        </div>
                        <div className="text-sm text-white/80">{pkg.ideal}</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={`#contact?package=${encodeURIComponent(pkg.name)}&budget=${encodeURIComponent(pkg.priceRange)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      sessionStorage.setItem('selectedPackage', JSON.stringify({
                        name: pkg.name,
                        price: pkg.priceRange,
                        category: pkg.category,
                      }));
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`
                      block w-full py-4 rounded-lg text-center font-medium
                      transition-all duration-200
                      ${isHero
                        ? 'bg-gold text-black hover:bg-gold/90 hover:scale-[1.02]'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                      }
                    `}
                  >
                    {isHero ? 'Book Free Consultation' : 'Get Started'}
                  </a>

                  {/* Value prop for hero */}
                  {isHero && (
                    <div className="mt-4 text-center text-xs text-gold/80">
                      💎 Best value • 15% discount for first 3 clients
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle all packages button */}
        <div className="text-center">
          <button
            onClick={() => {
              setShowAllPackages(!showAllPackages);
              if (!showAllPackages) {
                setTimeout(() => {
                  allPackagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }
            }}
            className="text-white/60 hover:text-white text-sm underline underline-offset-4 transition-colors"
          >
            {showAllPackages 
              ? '← Hide additional packages' 
              : 'Need something else? View all packages & custom options →'
            }
          </button>
        </div>
      </div>

      {/* All Packages Grid - Expandable */}
      {showAllPackages && (
        <div ref={allPackagesRef} className="px-10 max-w-[1800px] mx-auto mt-12 pt-12 border-t border-white/10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-medium text-white mb-3">Additional Packages</h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              More specialized services for specific needs. All packages can be customized to fit your requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mb-12">
            {otherPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="relative group h-full"
              >
                <div
                  className="
                    relative h-full
                    bg-gradient-to-br from-white/5 to-white/[0.02]
                    border-2 border-white/10 rounded-2xl p-5 lg:p-6
                    backdrop-blur-sm
                    transition-all duration-300
                    hover:border-white/20 hover:from-white/10
                    hover:scale-[1.01] hover:shadow-2xl
                  "
                >
                  {/* Header */}
                  <div className="mb-4">
                    <div className="text-gold text-xs font-medium uppercase tracking-widest mb-2">
                      {pkg.category}
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-3xl font-bold text-white">
                        {pkg.priceRange.split('-')[0].trim()}
                      </span>
                      {pkg.priceRange.includes('-') && (
                        <span className="text-xl text-white/60">
                          - {pkg.priceRange.split('-')[1]?.trim()}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-white/50">
                      {pkg.turnaround} • No contracts
                    </div>
                  </div>

                  {/* Hover Details */}
                  <div className="mb-4 relative">
                    <div className="flex items-center justify-between text-xs text-white/70 py-2 border-y border-white/10 cursor-help">
                      <span className="font-medium">
                        <span className="hidden md:inline">Hover • </span>
                        {pkg.features.length} features
                      </span>
                      <span className="hidden md:inline text-white/50">↓</span>
                    </div>
                    
                    <div className="mt-3 space-y-2 md:opacity-0 md:max-h-0 md:overflow-hidden md:group-hover:opacity-100 md:group-hover:max-h-[500px] transition-all duration-300 ease-in-out">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/10 text-white/60 text-xs">
                            ✓
                          </div>
                          <span className="text-xs text-white/80">{feature}</span>
                        </div>
                      ))}
                      
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                          Perfect For:
                        </div>
                        <div className="text-xs text-white/80">{pkg.ideal}</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={`#contact?package=${encodeURIComponent(pkg.name)}&budget=${encodeURIComponent(pkg.priceRange)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      // Store package info for contact form
                      sessionStorage.setItem('selectedPackage', JSON.stringify({
                        name: pkg.name,
                        price: pkg.priceRange,
                        category: pkg.category,
                      }));
                      // Smooth scroll to contact
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="
                      block w-full py-3 rounded-lg text-center font-medium
                      bg-white/10 text-white hover:bg-white/20 border border-white/20
                      transition-all duration-200
                    "
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Custom pricing card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-white/5 to-white/[0.02] border-2 border-white/10 rounded-2xl p-8 text-center">
              <div className="text-gold text-sm font-medium uppercase tracking-widest mb-4">
                Custom Solutions
              </div>
              <h3 className="text-3xl font-medium text-white mb-4">
                Need something custom?
              </h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto text-lg">
                Monthly retainers, enterprise solutions, ongoing maintenance, or something unique. Let's build a custom package for your exact needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a
                  href="#contact"
                  className="bg-gold text-black px-8 py-4 rounded-lg font-medium hover:bg-gold/90 transition-all hover:scale-[1.02]"
                >
                  Request Custom Quote
                </a>
                <a
                  href="mailto:work@captainsolo.ca"
                  className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg font-medium hover:bg-white/20 transition-all"
                >
                  Email Directly
                </a>
              </div>
              <div className="text-sm text-white/50">
                💼 Enterprise clients: Ask about volume discounts and retainer agreements
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Pricing;



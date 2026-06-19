import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { pricingPackages } from "../constants";
import { useTheme } from "../context/ThemeContext";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Pricing Section Component
 * Sales-optimized pricing display with on-brand dark design
 * Features 3-package focus, social proof, and clear CTAs
 */
const Pricing = () => {
  const { theme } = useTheme();
  // Refs for GSAP animations
  const cardRefs = useRef([]);
  const allPackagesRef = useRef(null);
  
  // State for showing packages
  const [showMainPackages, setShowMainPackages] = useState(false);
  const [showAllPackages, setShowAllPackages] = useState(false);

  // Reset secondary toggle when main toggle is closed
  useEffect(() => {
    if (!showMainPackages) {
      setShowAllPackages(false);
    }
  }, [showMainPackages]);
  
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
    if (!showMainPackages) return;
    
    // Refresh ScrollTrigger to account for layout change
    ScrollTrigger.refresh();

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      
      // Reset logic to ensure animation plays
      gsap.fromTo(card, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, [showMainPackages]);

  // Theme-aware styling
  const getAccentColor = () => {
    switch(theme) {
      case 'glass': return 'text-cyan-400';
      case 'light': return 'text-blue-600';
      default: return 'text-gold';
    }
  };

  const getAccentBg = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-500';
      case 'light': return 'bg-blue-600';
      default: return 'bg-gold';
    }
  };

  const getSectionBg = () => {
    switch(theme) {
      case 'glass': return 'bg-[rgba(15,20,35,0.98)]';
      case 'light': return 'bg-gray-50';
      default: return 'bg-black';
    }
  };

  const getCardBg = () => {
    switch(theme) {
      case 'glass': return 'from-white/10 to-white/[0.03] border-white/15 hover:border-white/25';
      case 'light': return 'from-white to-gray-50 border-gray-200 hover:border-gray-300 shadow-lg';
      default: return 'from-white/5 to-white/[0.02] border-white/10 hover:border-white/20';
    }
  };

  const getHeroBorder = () => {
    switch(theme) {
      case 'glass': return 'border-cyan-400 hover:border-cyan-300';
      case 'light': return 'border-blue-500 hover:border-blue-400';
      default: return 'border-gold hover:border-gold/80';
    }
  };

  return (
    <section id="pricing" className={`transition-[min-height] duration-500 pt-16 pb-20 ${showMainPackages ? 'min-h-screen' : ''} ${getSectionBg()}`}>
      {/* Animated header */}
      <AnimatedHeaderSection
        subTitle={"Investment that pays for itself"}
        title={"Packages"}
        text={text}
        textColor={theme === 'light' ? 'text-gray-900' : 'text-white'}
        withScrollTrigger={true}
      />

      {/* Social proof bar */}
      <div className="px-10 mb-12">
        <div className={`max-w-5xl mx-auto rounded-xl p-6 ${
          theme === 'glass' 
            ? 'bg-cyan-400/10 border border-cyan-400/30' 
            : theme === 'light'
            ? 'bg-blue-50 border border-blue-200'
            : 'bg-gold/10 border border-gold/30'
        }`}>
          <div className={`flex flex-col md:flex-row items-center justify-center gap-8 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getAccentColor()}`}>100+</div>
              <div className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-white/60'}`}>Video Projects</div>
            </div>
            <div className={`w-px h-12 hidden md:block ${theme === 'light' ? 'bg-gray-200' : 'bg-white/20'}`} />
            <div className="text-center">
              <div className={`text-3xl font-bold ${getAccentColor()}`}>4.8★</div>
              <div className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-white/60'}`}>Client Rating</div>
            </div>
            <div className={`w-px h-12 hidden md:block ${theme === 'light' ? 'bg-gray-200' : 'bg-white/20'}`} />
            <div className="text-center">
              <div className={`text-3xl font-bold ${getAccentColor()}`}>6 Years</div>
              <div className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-white/60'}`}>Experience</div>
            </div>
            <div className={`w-px h-12 hidden md:block ${theme === 'light' ? 'bg-gray-200' : 'bg-white/20'}`} />
            <div className="text-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-white/80'}`}>Available Now</span>
              </div>
              <div className={`text-xs ${theme === 'light' ? 'text-gray-400' : 'text-white/50'}`}>Responding within 24hrs</div>
            </div>
          </div>
        </div>
      </div>

      {/* View Packages Button (Collapsed State) */}
      {!showMainPackages && (
        <div className="flex justify-center px-10 pb-12">
          <button
            onClick={() => setShowMainPackages(true)}
            className={`px-10 py-5 rounded-lg font-amiamie-round font-bold text-xl transition-all hover:scale-105 shadow-lg ${
              theme === 'glass'
                ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-cyan-500/20'
                : theme === 'light'
                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'
                : 'bg-gold text-black hover:bg-gold/90 shadow-gold/20'
            }`}
          >
            View Packages & Pricing
          </button>
        </div>
      )}

      {/* Main package grid - Expandable */}
      {showMainPackages && (
        <>
          <div className="px-10 max-w-[1800px] mx-auto animate-fade-in">
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
                  <div className={`absolute inset-0 rounded-2xl blur-2xl opacity-50 ${
                    theme === 'glass' 
                      ? 'bg-gradient-to-b from-cyan-400/20 to-transparent'
                      : theme === 'light'
                      ? 'bg-gradient-to-b from-blue-400/20 to-transparent'
                      : 'bg-gradient-to-b from-gold/20 to-transparent'
                  }`} />
                )}
                
                <div
                  className={`
                    relative h-full
                    bg-gradient-to-br ${getCardBg()}
                    border-2 rounded-2xl p-6 lg:p-8
                    backdrop-blur-sm
                    transition-all duration-300
                    ${isHero ? getHeroBorder() : ''}
                    hover:scale-[1.01] hover:shadow-2xl
                  `}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className={`px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${
                        theme === 'glass'
                          ? 'bg-cyan-400 text-black'
                          : theme === 'light'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gold text-black'
                      }`}>
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-4">
                    <div className={`text-xs font-medium uppercase tracking-widest mb-2 ${getAccentColor()}`}>
                      {pkg.category}
                    </div>
                    <h3 className={`text-2xl font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-xs leading-relaxed ${
                      theme === 'light' ? 'text-gray-500' : 'text-white/60'
                    }`}>
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`text-5xl font-bold ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {pkg.priceRange.split('-')[0].trim()}
                      </span>
                      <span className={`text-2xl ${
                        theme === 'light' ? 'text-gray-400' : 'text-white/60'
                      }`}>
                        - {pkg.priceRange.split('-')[1]?.trim() || ''}
                      </span>
                    </div>
                    <div className={`text-sm ${theme === 'light' ? 'text-gray-400' : 'text-white/50'}`}>
                      {pkg.turnaround} • No contracts
                    </div>
                  </div>

                  {/* Hover Details - Hidden by default, shown on hover (desktop) or always visible (mobile) */}
                  <div className="mb-6 relative">
                    {/* Trigger area */}
                    <div className={`flex items-center justify-between text-sm py-2 cursor-help ${
                      theme === 'light' ? 'text-gray-600 border-y border-gray-200' : 'text-white/70 border-y border-white/10'
                    }`}>
                      <span className="font-medium">
                        <span className="hidden md:inline">Hover for details • </span>
                        {pkg.features.length} features included
                      </span>
                      <span className={`hidden md:inline ${theme === 'light' ? 'text-gray-400' : 'text-white/50'}`}>↓</span>
                    </div>
                    
                    {/* Features - Hidden on desktop (shows on hover), always visible on mobile */}
                    <div className="mt-4 space-y-2.5 md:opacity-0 md:max-h-0 md:overflow-hidden md:group-hover:opacity-100 md:group-hover:max-h-[500px] transition-all duration-300 ease-in-out">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`
                            w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                            ${isHero 
                              ? theme === 'glass' ? 'bg-cyan-400/20 text-cyan-400' : theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-gold/20 text-gold'
                              : theme === 'light' ? 'bg-gray-100 text-gray-500' : 'bg-white/10 text-white/60'
                            }
                          `}>
                            ✓
                          </div>
                          <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-white/80'}`}>{feature}</span>
                        </div>
                      ))}
                      
                      {/* Ideal for */}
                      <div className={`mt-4 pt-4 border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
                        <div className={`text-xs uppercase tracking-wider mb-2 ${
                          theme === 'light' ? 'text-gray-400' : 'text-white/50'
                        }`}>
                          Perfect For:
                        </div>
                        <div className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-white/80'}`}>{pkg.ideal}</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {/* Video services redirect to signup/login, others go to contact */}
                  {pkg.category === 'Video Production' ? (
                    <a
                      href="/signup"
                      className={`
                        block w-full py-4 rounded-lg text-center font-medium
                        transition-all duration-200
                        ${isHero
                          ? theme === 'glass' ? 'bg-cyan-500 text-black hover:bg-cyan-400' : theme === 'light' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gold text-black hover:bg-gold/90'
                          : theme === 'light' ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        }
                        hover:scale-[1.02]
                      `}
                    >
                      Create Account to Message
                    </a>
                  ) : (
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
                          ? theme === 'glass' ? 'bg-cyan-500 text-black hover:bg-cyan-400' : theme === 'light' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gold text-black hover:bg-gold/90'
                          : theme === 'light' ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        }
                        hover:scale-[1.02]
                      `}
                    >
                      {isHero ? 'Book Free Consultation' : 'Get Started'}
                    </a>
                  )}

                  {/* Value prop for hero */}
                  {isHero && (
                    <div className={`mt-4 text-center text-xs ${
                      theme === 'glass' ? 'text-cyan-400/80' : theme === 'light' ? 'text-blue-500' : 'text-gold/80'
                    }`}>
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
            className={`text-sm underline underline-offset-4 transition-colors ${
              theme === 'light' 
                ? 'text-gray-500 hover:text-gray-900' 
                : 'text-white/60 hover:text-white'
            }`}
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
        <div ref={allPackagesRef} className={`px-10 max-w-[1800px] mx-auto mt-12 pt-12 border-t ${
          theme === 'light' ? 'border-gray-200' : 'border-white/10'
        }`}>
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-medium mb-3 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>Additional Packages</h3>
            <p className={`max-w-2xl mx-auto ${
              theme === 'light' ? 'text-gray-500' : 'text-white/60'
            }`}>
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
                  className={`
                    relative h-full
                    bg-gradient-to-br ${getCardBg()}
                    border-2 rounded-2xl p-5 lg:p-6
                    backdrop-blur-sm
                    transition-all duration-300
                    hover:scale-[1.01] hover:shadow-2xl
                  `}
                >
                  {/* Header */}
                  <div className="mb-4">
                    <div className={`text-xs font-medium uppercase tracking-widest mb-2 ${getAccentColor()}`}>
                      {pkg.category}
                    </div>
                    <h3 className={`text-xl font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-xs leading-relaxed ${
                      theme === 'light' ? 'text-gray-500' : 'text-white/60'
                    }`}>
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className={`text-3xl font-bold ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {pkg.priceRange.split('-')[0].trim()}
                      </span>
                      {pkg.priceRange.includes('-') && (
                        <span className={`text-xl ${
                          theme === 'light' ? 'text-gray-400' : 'text-white/60'
                        }`}>
                          - {pkg.priceRange.split('-')[1]?.trim()}
                        </span>
                      )}
                    </div>
                    <div className={`text-xs ${theme === 'light' ? 'text-gray-400' : 'text-white/50'}`}>
                      {pkg.turnaround} • No contracts
                    </div>
                  </div>

                  {/* Hover Details */}
                  <div className="mb-4 relative">
                    <div className={`flex items-center justify-between text-xs py-2 cursor-help ${
                      theme === 'light' ? 'text-gray-600 border-y border-gray-200' : 'text-white/70 border-y border-white/10'
                    }`}>
                      <span className="font-medium">
                        <span className="hidden md:inline">Hover • </span>
                        {pkg.features.length} features
                      </span>
                      <span className={`hidden md:inline ${theme === 'light' ? 'text-gray-400' : 'text-white/50'}`}>↓</span>
                    </div>
                    
                    <div className="mt-3 space-y-2 md:opacity-0 md:max-h-0 md:overflow-hidden md:group-hover:opacity-100 md:group-hover:max-h-[500px] transition-all duration-300 ease-in-out">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs ${
                            theme === 'light' ? 'bg-gray-100 text-gray-500' : 'bg-white/10 text-white/60'
                          }`}>
                            ✓
                          </div>
                          <span className={`text-xs ${theme === 'light' ? 'text-gray-700' : 'text-white/80'}`}>{feature}</span>
                        </div>
                      ))}
                      
                      <div className={`mt-3 pt-3 border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
                        <div className={`text-[10px] uppercase tracking-wider mb-1 ${
                          theme === 'light' ? 'text-gray-400' : 'text-white/50'
                        }`}>
                          Perfect For:
                        </div>
                        <div className={`text-xs ${theme === 'light' ? 'text-gray-700' : 'text-white/80'}`}>{pkg.ideal}</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {pkg.category === 'Video Production' ? (
                    <a
                      href="/signup"
                      className={`
                        block w-full py-3 rounded-lg text-center font-medium
                        transition-all duration-200
                        ${theme === 'light' 
                          ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        }
                      `}
                    >
                      Create Account to Message
                    </a>
                  ) : (
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
                        block w-full py-3 rounded-lg text-center font-medium
                        transition-all duration-200
                        ${theme === 'light' 
                          ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        }
                      `}
                    >
                      Get Started
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Custom pricing card */}
          <div className="max-w-4xl mx-auto">
            <div className={`bg-gradient-to-r rounded-2xl p-8 text-center ${
              theme === 'light'
                ? 'from-gray-50 to-white border-2 border-gray-200'
                : 'from-white/5 to-white/[0.02] border-2 border-white/10'
            }`}>
              <div className={`text-sm font-medium uppercase tracking-widest mb-4 ${getAccentColor()}`}>
                Custom Solutions
              </div>
              <h3 className={`text-3xl font-medium mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Need something custom?
              </h3>
              <p className={`mb-6 max-w-2xl mx-auto text-lg ${
                theme === 'light' ? 'text-gray-600' : 'text-white/70'
              }`}>
                Monthly retainers, enterprise solutions, ongoing maintenance, or something unique. Let's build a custom package for your exact needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a
                  href="#contact"
                  className={`px-8 py-4 rounded-lg font-medium transition-all hover:scale-[1.02] ${
                    theme === 'glass'
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                      : theme === 'light'
                      ? 'bg-blue-600 text-white hover:bg-blue-500'
                      : 'bg-gold text-black hover:bg-gold/90'
                  }`}
                >
                  Request Custom Quote
                </a>
                <a
                  href="mailto:work@captainsolo.ca"
                  className={`px-8 py-4 rounded-lg font-medium transition-all ${
                    theme === 'light'
                      ? 'bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  Email Directly
                </a>
              </div>
              <div className={`text-sm ${theme === 'light' ? 'text-gray-400' : 'text-white/50'}`}>
                💼 Enterprise clients: Ask about volume discounts and retainer agreements
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Close main packages conditional render */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => setShowMainPackages(false)}
          className={`text-sm font-medium underline underline-offset-4 ${
            theme === 'light' ? 'text-gray-500 hover:text-gray-900' : 'text-white/50 hover:text-white'
          }`}
        >
          Collapse Packages
        </button>
      </div>
      
      {/* End main packages conditional render */}
      </>
      )}

    </section>
  );
};

export default Pricing;



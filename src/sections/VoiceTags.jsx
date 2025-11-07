import { Link } from 'react-router-dom';

// Data constants - Must be defined before component
const features = [
  {
    icon: '⚡',
    title: 'Fast 24-Hour Delivery',
    description: 'Get your custom voice tag delivered in 24 hours or less. Rush delivery available for urgent projects.',
  },
  {
    icon: '🎤',
    title: 'Multiple Voice Styles',
    description: 'Choose from aggressive trap, smooth Metro Boomin-style, clean versatile, or seductive R&B voices (male & female).',
  },
  {
    icon: '🎛️',
    title: 'Professional Studio Quality',
    description: 'Recorded with professional equipment, mixed, mastered, and ready to drop into your beats.',
  },
  {
    icon: '🔄',
    title: 'Unlimited Revisions',
    description: 'Premium package includes unlimited revisions until you\'re 100% satisfied with your tag.',
  },
  {
    icon: '📁',
    title: 'Wet + Dry Versions',
    description: 'Receive both dry stems (clean vocal) for custom mixing and wet versions (fully produced with FX).',
  },
  {
    icon: '✅',
    title: 'Full Commercial Rights',
    description: 'Use your voice tag on beats you sell, YouTube (monetized), Spotify, Apple Music, DJ sets — anywhere.',
  },
];

const voiceStyles = [
  {
    emoji: '🔥',
    name: 'Aggressive / Trap',
    description: 'High-energy, chesty, powerful delivery. Perfect for trap bangers, drill beats, and hard-hitting production.',
    details: [
      'Best for: Trap, drill, hard-hitting beats',
      'Energy level: 9-10/10',
      'Example: "[NAME] made this heat!"',
    ],
  },
  {
    emoji: '🎵',
    name: 'Smooth / Metro-Style',
    description: 'Confident, breathy, laid-back. Ideal for R&B, melodic hip-hop, and smooth production.',
    details: [
      'Best for: R&B, melodic hip-hop, chill beats',
      'Energy level: 6-7/10',
      'Example: "You know it\'s [NAME]..."',
    ],
  },
  {
    emoji: '🎤',
    name: 'Clean / Versatile',
    description: 'Professional, neutral energy. Works across all genres and beat styles.',
    details: [
      'Best for: Any genre, YouTube beats',
      'Energy level: 7-8/10',
      'Example: "[NAME] on the beat"',
    ],
  },
  {
    emoji: '🌹',
    name: 'Seductive / R&B (Female)',
    description: 'Smooth, breathy, intimate. Perfect for soulful R&B and late-night vibes.',
    details: [
      'Best for: R&B, soul, intimate productions',
      'Energy level: 5-6/10',
      'Example: "It\'s Natasha... you know the vibe"',
    ],
  },
  {
    emoji: '🎮',
    name: 'Playful / Pi\'erre-Style',
    description: 'Staccato, bouncy, energetic. Fun and hype, Pi\'erre Bourne-inspired.',
    details: [
      'Best for: Playful trap, bouncy beats',
      'Energy level: 9-10/10',
      'Example: "[NAME]! Let\'s go!"',
    ],
  },
  {
    emoji: '📻',
    name: 'Radio / DJ Drop',
    description: 'Professional announcer voice. Perfect for DJ sets, podcasts, and radio shows.',
    details: [
      'Best for: DJ sets, mixtapes, radio',
      'Energy level: 7-8/10',
      'Example: "DJ [NAME] in the mix"',
    ],
  },
];

const pricingPackages = [
  {
    name: 'Basic',
    price: 10,
    popular: false,
    features: [
      '1 Dry Tag (clean vocal stem)',
      '10-second max length',
      '1 revision included',
      '2-day delivery',
      'WAV + MP3 formats',
      'Commercial rights included',
    ],
  },
  {
    name: 'Standard',
    price: 20,
    popular: true,
    features: [
      '2 Tags (1 wet + 1 dry)',
      'Multiple delivery styles',
      '2 revisions included',
      '24-hour delivery',
      'WAV + MP3 formats',
      'Commercial rights included',
    ],
  },
  {
    name: 'Premium',
    price: 35,
    popular: false,
    features: [
      '3 Tags (wet + dry + FX)',
      'FX variations (stutter, tape-stop)',
      'Unlimited revisions',
      '24-hour priority delivery',
      'Vocal tuning & radio polish',
      'DAW-ready exports',
    ],
  },
];

const testimonials = [
  {
    quote: 'Bro\'s tag sounds crazy — fits perfectly with my beats. Fast delivery and exactly what I needed.',
    author: '@TrillBeats',
    role: 'Trap Producer',
  },
  {
    quote: 'Fast, loud, clean — exactly what I needed. The Metro Boomin style tag is fire!',
    author: 'Producer_Jay',
    role: 'Hip-Hop Producer',
  },
  {
    quote: 'Best tag I\'ve used. Natasha voice is fire for R&B. Highly recommend for smooth vibes.',
    author: 'BeatsBy_Marcus',
    role: 'R&B Producer',
  },
];

const faqs = [
  {
    question: 'What is a voice tag (producer tag)?',
    answer: 'A voice tag (also called a producer tag or beat tag) is a short vocal recording of your name or catchphrase that identifies you as the creator of a beat. It\'s your sonic business card that makes your work instantly recognizable.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard and Premium packages include 24-hour delivery. Basic package delivers in 2 days. Rush delivery (12 hours) is available for +$10.',
  },
  {
    question: 'Can you match Metro Boomin / Pi\'erre Bourne style?',
    answer: 'Yes! I\'ll match the style and energy of any producer you reference. Send me examples and I\'ll capture the vibe while keeping it original.',
  },
  {
    question: 'Do you offer female voices?',
    answer: 'Yes! Natasha (female voice) is available for seductive, smooth, R&B-style tags. Perfect for soulful and intimate productions.',
  },
  {
    question: 'Can I use this on YouTube and Spotify?',
    answer: 'Yes! Full commercial rights are included with every order. Use your voice tag on beats you sell, YouTube (monetized), Spotify, Apple Music, DJ sets — anywhere.',
  },
  {
    question: 'What if I don\'t like the first version?',
    answer: 'I\'ll revise until you\'re satisfied! Basic includes 1 revision, Standard includes 2 revisions, Premium includes unlimited revisions.',
  },
];

/**
 * Voice Tags Landing Page Component
 * SEO-optimized section for professional voice tag services
 * Matches CaptainSolo portfolio theme with Amiamie font and custom colors
 */
const VoiceTags = () => {
  // Disabled animations temporarily to ensure all content is visible
  // If animations are needed later, they can be re-enabled with proper fixes

  return (
    <section
      id="voice-tags"
      className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-amiamie-round text-5xl sm:text-6xl md:text-7xl font-black text-primary mb-6">
            Professional Voice Tags & Producer Tags
          </h1>
          <p className="font-amiamie text-xl sm:text-2xl text-gold mb-4">
            Industry-Quality Custom Voice Tags in 24 Hours
          </p>
          <p className="font-amiamie text-lg text-primary/80 max-w-3xl mx-auto mb-8">
            Trusted by 500+ producers worldwide. Get custom voice tags, producer tags, and DJ drops that make your beats instantly recognizable.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['24-Hour Delivery', '500+ Clients', '4.9★ Rating', 'Unlimited Revisions'].map((badge, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold font-amiamie text-sm font-semibold"
              >
                ✓ {badge}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.fiverr.com/solufelo/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gold text-DarkLava font-amiamie-round font-black text-lg rounded hover:bg-gold/90 transition-all hover:scale-105"
            >
              Order Now
            </a>
            <a
              href="#voice-styles"
              className="px-8 py-4 bg-transparent border-2 border-primary text-primary font-amiamie-round font-bold text-lg rounded hover:bg-primary hover:text-DarkLava transition-all"
            >
              Listen to Samples
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-primary/5 border border-SageGray/30 rounded-lg p-6 hover:border-gold/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-amiamie-round text-xl font-bold text-gold mb-3">
                {feature.title}
              </h3>
              <p className="font-amiamie text-primary/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Voice Styles Section */}
        <div id="voice-styles" className="mb-20">
          <h2 className="font-amiamie-round text-4xl sm:text-5xl font-black text-gold text-center mb-4">
            Voice Tag Styles Available
          </h2>
          <p className="font-amiamie text-lg text-primary/70 text-center max-w-3xl mx-auto mb-12">
            Choose the perfect style for your sound. Each professionally recorded and engineered to cut through your mix.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voiceStyles.map((style, index) => (
              <div
                key={index}
                className="bg-DarkLava border-2 border-SageGray/40 rounded-lg p-6 hover:border-gold transition-all duration-300"
              >
                <h3 className="font-amiamie-round text-2xl font-bold text-primary mb-3 flex items-center gap-2">
                  <span className="text-3xl">{style.emoji}</span>
                  {style.name}
                </h3>
                <p className="font-amiamie text-primary/80 mb-4">
                  {style.description}
                </p>
                <div className="space-y-2">
                  {style.details.map((detail, idx) => (
                    <p key={idx} className="font-amiamie text-sm text-SageGray border-b border-SageGray/20 pb-2">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mb-20">
          <h2 className="font-amiamie-round text-4xl sm:text-5xl font-black text-gold text-center mb-12">
            Voice Tag Packages & Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPackages.map((pkg, index) => (
              <div
                key={index}
                className={`rounded-lg p-8 relative ${
                  pkg.popular
                    ? 'bg-gold/10 border-2 border-gold'
                    : 'bg-primary/5 border border-SageGray/30'
                } hover:transform hover:-translate-y-2 transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gold text-DarkLava px-4 py-1 rounded-full font-amiamie-round font-black text-sm">
                    🔥 MOST POPULAR
                  </div>
                )}
                
                <h3 className="font-amiamie-round text-2xl font-black text-primary mb-2 uppercase">
                  {pkg.name}
                </h3>
                
                <div className="mb-6">
                  <span className="font-amiamie-round text-5xl font-black text-gold">
                    ${pkg.price}
                  </span>
                  <span className="font-amiamie text-lg text-primary/60"> USD</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="font-amiamie text-primary/80 flex items-start gap-2">
                      <span className="text-gold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="https://www.fiverr.com/solufelo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 rounded font-amiamie-round font-bold transition-all ${
                    pkg.popular
                      ? 'bg-gold text-DarkLava hover:bg-gold/90'
                      : 'bg-primary/10 text-gold border border-gold hover:bg-gold hover:text-DarkLava'
                  }`}
                >
                  Order {pkg.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <h2 className="font-amiamie-round text-4xl sm:text-5xl font-black text-gold text-center mb-12">
            What Producers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-primary/5 border-l-4 border-gold rounded-lg p-6"
              >
                <div className="text-gold mb-3">★★★★★</div>
                <p className="font-amiamie text-lg text-primary/90 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="font-amiamie-round font-bold text-gold">
                  — {testimonial.author}
                </p>
                <p className="font-amiamie text-sm text-SageGray">
                  {testimonial.role}
                </p>
              </div>
            ))}
          </div>

          <p className="font-amiamie text-xl text-gold text-center mt-8">
            <strong>500+ producers served | 4.9★ average rating</strong>
          </p>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mb-20">
          <h2 className="font-amiamie-round text-4xl sm:text-5xl font-black text-gold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-primary/5 border border-SageGray/30 rounded-lg p-6"
              >
                <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3">
                  {faq.question}
                </h3>
                <p className="font-amiamie text-primary/80">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Blog / Resources Section (for SEO internal linking) */}
        <div className="mb-20">
          <h2 className="font-amiamie-round text-4xl sm:text-5xl font-black text-gold text-center mb-6">
            Learn More About Voice Tags
          </h2>
          <p className="font-amiamie text-lg text-primary/70 text-center mb-12 max-w-2xl mx-auto">
            Expert guides, producer breakdowns, and tips to help you make the perfect voice tag
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link
              to="/blog/what-is-a-voice-tag"
              className="bg-primary/5 border border-SageGray/30 rounded-lg p-6 hover:border-gold transition-all hover:shadow-lg hover:shadow-gold/10 group"
            >
              <div className="mb-4 text-4xl">📖</div>
              <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3 group-hover:text-gold transition">
                What is a Voice Tag?
              </h3>
              <p className="font-amiamie text-sm text-SageGray mb-4">
                Complete beginner's guide to voice tags, why you need one, and how to use them.
              </p>
              <span className="text-gold font-amiamie-round font-bold group-hover:translate-x-1 inline-block transition">
                Read Article →
              </span>
            </Link>

            <Link
              to="/blog/metro-boomin-producer-tag"
              className="bg-primary/5 border border-SageGray/30 rounded-lg p-6 hover:border-gold transition-all hover:shadow-lg hover:shadow-gold/10 group"
            >
              <div className="mb-4 text-4xl">🎤</div>
              <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3 group-hover:text-gold transition">
                Metro Boomin Tag Breakdown
              </h3>
              <p className="font-amiamie text-sm text-SageGray mb-4">
                Learn the secrets behind Metro's iconic producer tag and how to get a similar style.
              </p>
              <span className="text-gold font-amiamie-round font-bold group-hover:translate-x-1 inline-block transition">
                Read Article →
              </span>
            </Link>

            <Link
              to="/blog/best-voice-tags-trap"
              className="bg-primary/5 border border-SageGray/30 rounded-lg p-6 hover:border-gold transition-all hover:shadow-lg hover:shadow-gold/10 group"
            >
              <div className="mb-4 text-4xl">🔥</div>
              <h3 className="font-amiamie-round text-xl font-bold text-primary mb-3 group-hover:text-gold transition">
                Best Tags for Trap Music
              </h3>
              <p className="font-amiamie text-sm text-SageGray mb-4">
                10 voice tag styles that hit hard in trap and drill beats with real examples.
              </p>
              <span className="text-gold font-amiamie-round font-bold group-hover:translate-x-1 inline-block transition">
                Read Article →
              </span>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/blog"
              className="inline-block px-8 py-3 border-2 border-gold text-gold font-amiamie-round font-bold rounded hover:bg-gold hover:text-DarkLava transition-all"
            >
              View All Articles
            </Link>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-gold/20 to-gold/10 border-2 border-gold rounded-lg p-12 text-center">
          <h2 className="font-amiamie-round text-3xl sm:text-4xl font-black text-primary mb-4">
            Ready to Get Your Professional Voice Tag?
          </h2>
          <p className="font-amiamie text-xl text-primary/80 mb-8">
            Join 500+ producers who trust CaptainSolo for studio-quality voice tags
          </p>
          <a
            href="https://www.fiverr.com/solufelo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-gold text-DarkLava font-amiamie-round font-black text-xl rounded hover:bg-gold/90 transition-all hover:scale-105"
          >
            Order Your Voice Tag Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default VoiceTags;


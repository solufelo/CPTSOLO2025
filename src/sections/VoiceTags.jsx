import { Link } from 'react-router-dom';
import VoiceTagPlayer from '../components/VoiceTagPlayer';
import { useTheme } from '../context/ThemeContext';

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
      'Commercial rights included',
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

// Voice Tag Demo Tracks — REAL CLIENT DELIVERIES with actual phrases
const voiceTagDemos = [
  {
    name: 'Doxy',
    file: '/assets/voicetags/doxy tag 1 95bpm.mp3',
    description: '"Doxy" — Smooth, laid-back 95 BPM vibe',
    style: 'Smooth',
    type: 'Wet (FX)',
    phrase: 'Doxy'
  },
  {
    name: 'Callout',
    file: '/assets/voicetags/callout tag 1 130bpm.mp3',
    description: '"What? Callout!" — Hype trap energy at 130 BPM',
    style: 'Aggressive',
    type: 'Wet (FX)',
    phrase: 'What? Callout'
  },
  {
    name: 'Bizzy Beats',
    file: '/assets/voicetags/bizzy 1 130bpm.mp3',
    description: '"Lil Bizzy Beats" — Energetic 130 BPM trap tag',
    style: 'Aggressive',
    type: 'Wet (FX)',
    phrase: 'Lil Bizzy Beats'
  },
  {
    name: 'CJ',
    file: '/assets/voicetags/cj tag 1 110bpm.mp3',
    description: '"CJ, turn off the aux" — Confident 110 BPM drill vibe',
    style: 'Smooth',
    type: 'Wet (FX)',
    phrase: 'CJ, turn off the aux'
  },
  {
    name: 'Base',
    file: '/assets/voicetags/base tag 1 130bpm.mp3',
    description: '"Running back Base" — Hard-hitting 130 BPM trap',
    style: 'Aggressive',
    type: 'Wet (FX)',
    phrase: 'Running back Base'
  },
  {
    name: 'Badman',
    file: '/assets/voicetags/badman tag 1 110bpm.mp3',
    description: '"Hey yo, Badman" — UK drill style at 110 BPM',
    style: 'Aggressive',
    type: 'Wet (FX)',
    phrase: 'Hey yo, Badman'
  },
  {
    name: 'Maisie (Female)',
    file: '/assets/voicetags/ElevenLabs_2025-10-23T20_43_42_Natasha - Whispery ASMR _pvc_sp115_s50_sb16_se95_b_m2.mp3',
    description: '"Only hits Maisie" — Seductive female R&B tag',
    style: 'Seductive',
    type: 'Female Voice',
    phrase: 'Only hits Maisie'
  },
  {
    name: 'Maki',
    file: '/assets/voicetags/all dry manic tag 140bpm.mp3',
    description: '"Maki made it" — Clean versatile dry stem at 140 BPM',
    style: 'Versatile',
    type: 'Dry Stem',
    phrase: 'Maki made it'
  },
  {
    name: 'T Lou (Lew)',
    file: '/assets/voicetags/dry Lew what it do tag 1 140bpm.mp3',
    description: '"They ready for this, T Lou?" — Smooth dry stem 140 BPM',
    style: 'Smooth',
    type: 'Dry Stem',
    phrase: 'They ready for this, T Lou?'
  },
  {
    name: 'Drackz (DRX)',
    file: '/assets/voicetags/drackz tag 1 110bpm.mp3',
    description: '"DRX" — Professional versatile tag at 110 BPM',
    style: 'Versatile',
    type: 'Wet (FX)',
    phrase: 'DRX'
  },
  {
    name: 'Naari/Napalm',
    file: '/assets/voicetags/dry Naari TAG 1 140BPM.mp3',
    description: '"Damn Napalm, you going crazy" — Aggressive dry stem 140 BPM',
    style: 'Aggressive',
    type: 'Dry Stem',
    phrase: 'Damn Napalm, you going crazy'
  },
  {
    name: 'Molly/Manic',
    file: '/assets/voicetags/dry snoo tag 1 140bpm.mp3',
    description: '"Molly" / "This has to be 9-5" — High-energy dry stem 140 BPM',
    style: 'Aggressive',
    type: 'Dry Stem',
    phrase: 'Molly / 9-5'
  },
];

/**
 * Voice Tags Landing Page Component
 * SEO-optimized section for professional voice tag services
 * Matches CaptainSolo portfolio theme with Amiamie font and custom colors
 */
const VoiceTags = () => {
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
      default: return 'text-primary/80';
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
      case 'glass': return 'border-white/10 hover:border-cyan-400/50';
      case 'light': return 'border-gray-200 hover:border-blue-400';
      default: return 'border-SageGray/30 hover:border-gold/50';
    }
  };

  const getCardBg = () => {
    switch(theme) {
      case 'glass': return 'bg-white/5';
      case 'light': return 'bg-white shadow-sm hover:shadow-md';
      default: return 'bg-primary/5';
    }
  };

  const getButtonPrimary = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-500 text-black hover:bg-cyan-400';
      case 'light': return 'bg-blue-600 text-white hover:bg-blue-500';
      default: return 'bg-gold text-DarkLava hover:bg-gold/90';
    }
  };

  const getButtonSecondary = () => {
    switch(theme) {
      case 'glass': return 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black';
      case 'light': return 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';
      default: return 'border-primary text-primary hover:bg-primary hover:text-DarkLava';
    }
  };

  return (
    <section
      id="voice-tags"
      className={`min-h-screen py-20 px-4 sm:px-8 ${getSectionBg()}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`font-amiamie-round text-5xl sm:text-6xl md:text-7xl font-black mb-6 ${getTextColor()}`}>
            Professional Voice Tags & Producer Tags
          </h1>
          <p className={`font-amiamie text-xl sm:text-2xl mb-4 ${getAccentColor()}`}>
            Industry-Quality Custom Voice Tags in 24 Hours
          </p>
          <p className={`font-amiamie text-lg max-w-3xl mx-auto mb-8 ${getMutedTextColor()}`}>
            Trusted by 500+ producers worldwide. Get custom voice tags, producer tags, and DJ drops that make your beats instantly recognizable.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['24-Hour Delivery', '500+ Clients', '4.9★ Rating', 'Unlimited Revisions'].map((badge, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full font-amiamie text-sm font-semibold border ${
                  theme === 'light' 
                    ? 'bg-blue-50 border-blue-200 text-blue-600' 
                    : theme === 'glass'
                    ? 'bg-cyan-900/20 border-cyan-500/30 text-cyan-400'
                    : 'bg-gold/10 border-gold/30 text-gold'
                }`}
              >
                ✓ {badge}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/order/voice-tag"
              className={`px-8 py-4 font-amiamie-round font-black text-lg rounded transition-all hover:scale-105 ${getButtonPrimary()}`}
            >
              Order Now
            </Link>
            <a
              href="#voice-styles"
              className={`px-8 py-4 bg-transparent border-2 font-amiamie-round font-bold text-lg rounded transition-all ${getButtonSecondary()}`}
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
              className={`border rounded-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-2 ${getCardBg()} ${getBorderColor()}`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getAccentColor()}`}>
                {feature.title}
              </h3>
              <p className={`font-amiamie ${getMutedTextColor()}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Live Audio Demos Section */}
        <div className="mb-20">
          <h2 className={`font-amiamie-round text-4xl sm:text-5xl font-black text-center mb-4 ${getAccentColor()}`}>
            🎧 Listen to Real Demos
          </h2>
          <p className={`font-amiamie text-lg text-center max-w-3xl mx-auto mb-12 ${getMutedTextColor()}`}>
            Hear the quality for yourself. These are real voice tags delivered to clients. Click play to listen!
          </p>

          <div className="max-w-2xl mx-auto">
            <VoiceTagPlayer demos={voiceTagDemos} />
          </div>
        </div>

        {/* Voice Styles Section */}
        <div id="voice-styles" className="mb-20">
          <h2 className={`font-amiamie-round text-4xl sm:text-5xl font-black text-center mb-4 ${getAccentColor()}`}>
            Voice Tag Styles Available
          </h2>
          <p className={`font-amiamie text-lg text-center max-w-3xl mx-auto mb-12 ${getMutedTextColor()}`}>
            Choose the perfect style for your sound. Each professionally recorded and engineered to cut through your mix.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voiceStyles.map((style, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-6 transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-white border-gray-200 hover:border-blue-600' 
                    : theme === 'glass'
                    ? 'bg-white/5 border-white/10 hover:border-cyan-400'
                    : 'bg-DarkLava border-SageGray/40 hover:border-gold'
                }`}
              >
                <h3 className={`font-amiamie-round text-2xl font-bold mb-3 flex items-center gap-2 ${getTextColor()}`}>
                  <span className="text-3xl">{style.emoji}</span>
                  {style.name}
                </h3>
                <p className={`font-amiamie mb-4 ${getMutedTextColor()}`}>
                  {style.description}
                </p>
                <div className="space-y-2">
                  {style.details.map((detail, idx) => (
                    <p key={idx} className={`font-amiamie text-sm border-b pb-2 ${
                      theme === 'light' ? 'text-gray-500 border-gray-100' : 'text-SageGray border-SageGray/20'
                    }`}>
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
          <h2 className={`font-amiamie-round text-4xl sm:text-5xl font-black text-center mb-12 ${getAccentColor()}`}>
            Voice Tag Packages & Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPackages.map((pkg, index) => (
              <div
                key={index}
                className={`rounded-lg p-8 relative hover:transform hover:-translate-y-2 transition-all duration-300 ${
                  pkg.popular
                    ? theme === 'light' 
                      ? 'bg-blue-50 border-2 border-blue-600' 
                      : theme === 'glass'
                      ? 'bg-cyan-900/20 border-2 border-cyan-500'
                      : 'bg-gold/10 border-2 border-gold'
                    : getCardBg() + ' border ' + (theme === 'light' ? 'border-gray-200' : 'border-SageGray/30')
                }`}
              >
                {pkg.popular && (
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full font-amiamie-round font-black text-sm ${
                    theme === 'light' ? 'bg-blue-600 text-white' : theme === 'glass' ? 'bg-cyan-500 text-black' : 'bg-gold text-DarkLava'
                  }`}>
                    🔥 MOST POPULAR
                  </div>
                )}
                
                <h3 className={`font-amiamie-round text-2xl font-black mb-2 uppercase ${getTextColor()}`}>
                  {pkg.name}
                </h3>
                
                <div className="mb-6">
                  <span className={`font-amiamie-round text-5xl font-black ${getAccentColor()}`}>
                    ${pkg.price}
                  </span>
                  <span className={`font-amiamie text-lg ${
                    theme === 'light' ? 'text-gray-400' : 'text-primary/60'
                  }`}> USD</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className={`font-amiamie flex items-start gap-2 ${getMutedTextColor()}`}>
                      <span className={getAccentColor()}>✓</span>
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
                      ? getButtonPrimary()
                      : theme === 'light'
                      ? 'bg-gray-100 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white'
                      : theme === 'glass'
                      ? 'bg-white/5 text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black'
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
          <h2 className={`font-amiamie-round text-4xl sm:text-5xl font-black text-center mb-12 ${getAccentColor()}`}>
            What Producers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${getCardBg()} border-l-4 rounded-lg p-6 ${
                  theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'
                }`}
              >
                <div className={`mb-3 ${getAccentColor()}`}>★★★★★</div>
                <p className={`font-amiamie text-lg italic mb-4 ${getTextColor()}`}>
                  "{testimonial.quote}"
                </p>
                <p className={`font-amiamie-round font-bold ${getAccentColor()}`}>
                  — {testimonial.author}
                </p>
                <p className={`font-amiamie text-sm ${
                  theme === 'light' ? 'text-gray-500' : 'text-SageGray'
                }`}>
                  {testimonial.role}
                </p>
              </div>
            ))}
          </div>

          <p className={`font-amiamie text-xl text-center mt-8 ${getAccentColor()}`}>
            <strong>500+ producers served | 4.9★ average rating</strong>
          </p>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mb-20">
          <h2 className={`font-amiamie-round text-4xl sm:text-5xl font-black text-center mb-12 ${getAccentColor()}`}>
            Frequently Asked Questions
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-lg p-6 ${getCardBg()} ${getBorderColor()}`}
              >
                <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                  {faq.question}
                </h3>
                <p className={`font-amiamie ${getMutedTextColor()}`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Blog / Resources Section (for SEO internal linking) */}
        <div className="mb-20">
          <h2 className={`font-amiamie-round text-4xl sm:text-5xl font-black text-center mb-6 ${getAccentColor()}`}>
            Learn More About Voice Tags
          </h2>
          <p className={`font-amiamie text-lg text-center mb-12 max-w-2xl mx-auto ${getMutedTextColor()}`}>
            Expert guides, producer breakdowns, and tips to help you make the perfect voice tag
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link
              to="/blog/what-is-a-voice-tag"
              className={`border rounded-lg p-6 transition-all hover:shadow-lg group ${getCardBg()} ${getBorderColor()}`}
            >
              <div className="mb-4 text-4xl">📖</div>
              <h3 className={`font-amiamie-round text-xl font-bold mb-3 transition group-hover:${theme === 'light' ? 'text-blue-600' : theme === 'glass' ? 'text-cyan-400' : 'text-gold'} ${getTextColor()}`}>
                What is a Voice Tag?
              </h3>
              <p className={`font-amiamie text-sm mb-4 ${
                theme === 'light' ? 'text-gray-500' : 'text-SageGray'
              }`}>
                Complete beginner's guide to voice tags, why you need one, and how to use them.
              </p>
              <span className={`font-amiamie-round font-bold group-hover:translate-x-1 inline-block transition ${getAccentColor()}`}>
                Read Article →
              </span>
            </Link>

            <Link
              to="/blog/metro-boomin-producer-tag"
              className={`border rounded-lg p-6 transition-all hover:shadow-lg group ${getCardBg()} ${getBorderColor()}`}
            >
              <div className="mb-4 text-4xl">🎤</div>
              <h3 className={`font-amiamie-round text-xl font-bold mb-3 transition group-hover:${theme === 'light' ? 'text-blue-600' : theme === 'glass' ? 'text-cyan-400' : 'text-gold'} ${getTextColor()}`}>
                Metro Boomin Tag Breakdown
              </h3>
              <p className={`font-amiamie text-sm mb-4 ${
                theme === 'light' ? 'text-gray-500' : 'text-SageGray'
              }`}>
                Learn the secrets behind Metro's iconic producer tag and how to get a similar style.
              </p>
              <span className={`font-amiamie-round font-bold group-hover:translate-x-1 inline-block transition ${getAccentColor()}`}>
                Read Article →
              </span>
            </Link>

            <Link
              to="/blog/best-voice-tags-trap"
              className={`border rounded-lg p-6 transition-all hover:shadow-lg group ${getCardBg()} ${getBorderColor()}`}
            >
              <div className="mb-4 text-4xl">🔥</div>
              <h3 className={`font-amiamie-round text-xl font-bold mb-3 transition group-hover:${theme === 'light' ? 'text-blue-600' : theme === 'glass' ? 'text-cyan-400' : 'text-gold'} ${getTextColor()}`}>
                Best Tags for Trap Music
              </h3>
              <p className={`font-amiamie text-sm mb-4 ${
                theme === 'light' ? 'text-gray-500' : 'text-SageGray'
              }`}>
                10 voice tag styles that hit hard in trap and drill beats with real examples.
              </p>
              <span className={`font-amiamie-round font-bold group-hover:translate-x-1 inline-block transition ${getAccentColor()}`}>
                Read Article →
              </span>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/blog"
              className={`inline-block px-8 py-3 border-2 font-amiamie-round font-bold rounded transition-all ${getButtonSecondary()}`}
            >
              View All Articles
            </Link>
          </div>
        </div>

        {/* Final CTA */}
        <div className={`rounded-lg p-12 text-center border-2 ${
          theme === 'light' 
            ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-600' 
            : theme === 'glass'
            ? 'bg-gradient-to-r from-cyan-900/20 to-cyan-500/10 border-cyan-400'
            : 'bg-gradient-to-r from-gold/20 to-gold/10 border-gold'
        }`}>
          <h2 className={`font-amiamie-round text-3xl sm:text-4xl font-black mb-4 ${getTextColor()}`}>
            Ready to Get Your Professional Voice Tag?
          </h2>
          <p className={`font-amiamie text-xl mb-8 ${getMutedTextColor()}`}>
            Join 500+ producers who trust CaptainSolo for studio-quality voice tags
          </p>
          <Link
            to="/order/voice-tag"
            className={`inline-block px-10 py-4 font-amiamie-round font-black text-xl rounded transition-all hover:scale-105 ${getButtonPrimary()}`}
          >
            Order Your Voice Tag Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VoiceTags;

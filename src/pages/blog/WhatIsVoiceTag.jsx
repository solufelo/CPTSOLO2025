import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';
import LogoHeader from '../../components/LogoHeader';
import BlogSidebar from '../../components/BlogSidebar';
import { useTheme } from '../../context/ThemeContext';

/**
 * SEO Blog Post: What is a Voice Tag?
 * Target Keywords: "what is a voice tag", "voice tag definition", "producer tag explained"
 */
const WhatIsVoiceTag = () => {
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

  const getCardBg = () => {
    switch(theme) {
      case 'glass': return 'bg-white/5 border-white/10';
      case 'light': return 'bg-white border-gray-200';
      default: return 'bg-primary/5 border-SageGray/30';
    }
  };

  return (
    <>
      <Helmet>
        <title>What is a Voice Tag? Complete Guide for Producers (2025)</title>
        <meta name="description" content="Learn everything about voice tags (producer tags). What they are, why you need one, and how to use them effectively in your beats. Complete beginner's guide." />
        <meta name="keywords" content="what is a voice tag, voice tag definition, producer tag explained, beat tag, what is a producer tag, how to use voice tags" />
        <link rel="canonical" href="https://captainsolo.ca/blog/what-is-a-voice-tag" />
      </Helmet>

      <LogoHeader />
      <Navbar />

      <div className={`min-h-screen py-20 px-4 sm:px-8 ${getSectionBg()}`}>
        <div className="max-w-7xl mx-auto flex gap-8 lg:gap-12">
          {/* Main Article Content */}
          <article className="flex-1 min-w-0">
            <div className="max-w-4xl">
          {/* Breadcrumb */}
          <nav className={`font-amiamie text-sm mb-8 ${getMutedTextColor()}`}>
            <Link to="/" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'}`}>Home</Link>
            <span className="mx-2">/</span>
            <Link to="/voice-tags" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'}`}>Voice Tags</Link>
            <span className="mx-2">/</span>
            <span className={getTextColor()}>What is a Voice Tag?</span>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className={`font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black mb-4 ${getTextColor()}`}>
              What is a Voice Tag? Complete Guide for Producers
            </h1>
            <div className={`flex items-center gap-4 font-amiamie text-sm ${getMutedTextColor()}`}>
              <time dateTime="2025-01-01">Updated: January 2025</time>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span>By CaptainSolo</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className={`font-amiamie space-y-6 ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
              
              {/* Introduction */}
              <section>
                <p className={`text-xl leading-relaxed mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                  A <strong className={getAccentColor()}>voice tag</strong> (also called a <strong className={getAccentColor()}>producer tag</strong> or <strong className={getAccentColor()}>beat tag</strong>) is a short audio recording—usually 2-10 seconds—that identifies you as the creator of a beat or instrumental.
                </p>
                <p className="leading-relaxed">
                  Think of it as your sonic signature. When listeners hear your voice tag, they instantly know who produced the beat. It's audio branding at its finest.
                </p>
              </section>

              {/* Why You Need One */}
              <section className="mt-12">
                <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                  Why Every Producer Needs a Voice Tag
                </h2>
                
                <div className={`border-l-4 p-6 rounded mb-6 ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                    1. Brand Recognition
                  </h3>
                  <p>
                    Just like Nike's swoosh or McDonald's golden arches, your voice tag becomes instantly recognizable. Producers like <strong>Metro Boomin</strong> ("Metro Boomin want some more!"), <strong>DJ Mustard</strong> ("Mustard on the beat, ho!"), and <strong>Pi'erre Bourne</strong> ("Yo Pierre, you wanna come out here?") are perfect examples.
                  </p>
                </div>

                <div className={`border-l-4 p-6 rounded mb-6 ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                    2. Protection Against Beat Theft
                  </h3>
                  <p>
                    Your voice tag acts as an audio watermark. Even if someone downloads your beat illegally, your tag is embedded in the audio—making it harder to steal without credit.
                  </p>
                </div>

                <div className={`border-l-4 p-6 rounded mb-6 ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                    3. Professional Credibility
                  </h3>
                  <p>
                    A quality voice tag signals that you're a serious producer. It shows you've invested in your brand and take your craft seriously.
                  </p>
                </div>

                <div className={`border-l-4 p-6 rounded ${getCardBg()} ${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                  <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                    4. Marketing & Discovery
                  </h3>
                  <p>
                    When your beat goes viral on TikTok, Instagram, or YouTube, people will hear your tag and search for you. It's free marketing every time your beat is played.
                  </p>
                </div>
              </section>

              {/* Types of Voice Tags */}
              <section className="mt-12">
                <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                  Types of Voice Tags (With Examples)
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className={`font-amiamie-round text-2xl font-bold mb-3 ${getTextColor()}`}>
                      🔥 Aggressive / Hype Tags
                    </h3>
                    <p className="mb-3">
                      High-energy, in-your-face delivery. Perfect for trap, drill, and hard-hitting beats.
                    </p>
                    <div className={`border rounded p-4 ${theme === 'light' ? 'bg-gray-100 border-gray-300' : theme === 'glass' ? 'bg-white/5 border-white/20' : 'bg-DarkLava border-SageGray/30'}`}>
                      <p className={`text-sm mb-2 ${getMutedTextColor()}`}>Examples:</p>
                      <ul className={`list-disc list-inside space-y-1 ${theme === 'light' ? 'text-gray-900' : 'text-primary'}`}>
                        <li>"[NAME] made this heat!"</li>
                        <li>"It's [NAME] production — turn that up!"</li>
                        <li>"[NAME] just snapped!"</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-amiamie-round text-2xl font-bold mb-3 ${getTextColor()}`}>
                      🎵 Smooth / Metro Boomin-Style Tags
                    </h3>
                    <p className="mb-3">
                      Confident but laid-back. Breathy delivery that sits nicely in R&B and melodic hip-hop.
                    </p>
                    <div className={`border rounded p-4 ${theme === 'light' ? 'bg-gray-100 border-gray-300' : theme === 'glass' ? 'bg-white/5 border-white/20' : 'bg-DarkLava border-SageGray/30'}`}>
                      <p className={`text-sm mb-2 ${getMutedTextColor()}`}>Examples:</p>
                      <ul className={`list-disc list-inside space-y-1 ${theme === 'light' ? 'text-gray-900' : 'text-primary'}`}>
                        <li>"[NAME] did this one"</li>
                        <li>"You know it's [NAME]... turn me up"</li>
                        <li>"If [NAME] made it, you know it's a hit"</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-amiamie-round text-2xl font-bold mb-3 ${getTextColor()}`}>
                      🌹 Seductive / R&B Tags (Female Voice)
                    </h3>
                    <p className="mb-3">
                      Smooth, intimate, breathy. Perfect for soulful production and late-night vibes.
                    </p>
                    <div className={`border rounded p-4 ${theme === 'light' ? 'bg-gray-100 border-gray-300' : theme === 'glass' ? 'bg-white/5 border-white/20' : 'bg-DarkLava border-SageGray/30'}`}>
                      <p className={`text-sm mb-2 ${getMutedTextColor()}`}>Examples:</p>
                      <ul className={`list-disc list-inside space-y-1 ${theme === 'light' ? 'text-gray-900' : 'text-primary'}`}>
                        <li>"It's [NAME]... you know the vibe"</li>
                        <li>"[NAME] on the track... let it breathe"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* How to Use Voice Tags */}
              <section className="mt-12">
                <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                  How to Use Voice Tags in Your Beats
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                      📍 Placement Options
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Intro (0:00-0:05):</strong> Tag plays before the beat drops. Builds anticipation.</li>
                      <li><strong>After first drop (0:15-0:20):</strong> Tag appears after the hook or first verse.</li>
                      <li><strong>Middle (1:00-1:30):</strong> During a beat switch or breakdown.</li>
                      <li><strong>Outro (2:30-end):</strong> As the beat fades out.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className={`font-amiamie-round text-xl font-bold mb-3 ${getTextColor()}`}>
                      🎚️ Mixing Tips
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Keep the tag <strong>-6dB to -12dB below</strong> your beat's peak volume</li>
                      <li>Use <strong>high-pass filter</strong> (cut below 100-150Hz) so it doesn't clash with your 808s</li>
                      <li>Add <strong>slight reverb</strong> to make it sit in the mix naturally</li>
                      <li>Pan slightly left or right (10-20%) for stereo width</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Cost */}
              <section className="mt-12">
                <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                  How Much Does a Professional Voice Tag Cost?
                </h2>
                <p className="mb-4">
                  Professional voice tags typically range from <strong className={getAccentColor()}>$10 to $50</strong>, depending on:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                  <li>Number of versions (dry stem, wet/FX, variations)</li>
                  <li>Delivery speed (24-hour vs. 2-day)</li>
                  <li>Revision count (1-2 revisions vs. unlimited)</li>
                  <li>Voice talent quality and experience</li>
                </ul>
                <div className={`border rounded-lg p-6 ${theme === 'light' ? 'bg-blue-50 border-blue-200' : theme === 'glass' ? 'bg-cyan-900/20 border-cyan-400' : 'bg-gold/10 border-gold'}`}>
                  <p className={`font-semibold mb-2 ${getTextColor()}`}>
                    💰 Average Pricing Breakdown:
                  </p>
                  <ul className={`space-y-2 ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                    <li><strong>Budget:</strong> $5-10 (1 dry tag, basic delivery)</li>
                    <li><strong>Standard:</strong> $15-25 (wet + dry, 24h delivery) ⭐ Most popular</li>
                    <li><strong>Premium:</strong> $30-50 (multiple versions, unlimited revisions, FX variations)</li>
                  </ul>
                </div>
              </section>

              {/* Call to Action */}
              <section className={`mt-12 rounded-lg p-8 border-2 ${
                theme === 'light' 
                  ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-600'
                  : theme === 'glass'
                  ? 'bg-gradient-to-r from-cyan-900/20 to-cyan-400/10 border-cyan-400'
                  : 'bg-gradient-to-r from-gold/20 to-gold/10 border-gold'
              }`}>
                <h2 className={`font-amiamie-round text-3xl font-bold mb-4 ${getTextColor()}`}>
                  Ready to Get Your Voice Tag?
                </h2>
                <p className="mb-6">
                  I deliver professional, studio-quality voice tags in <strong className={getAccentColor()}>24 hours</strong>. Choose from aggressive trap, smooth Metro-style, clean versatile, or seductive R&B voices.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/voice-tags"
                    className={`inline-block px-8 py-3 font-amiamie-round font-bold rounded transition ${
                      theme === 'glass' 
                        ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                        : theme === 'light'
                        ? 'bg-blue-600 text-white hover:bg-blue-500'
                        : 'bg-gold text-DarkLava hover:bg-gold/90'
                    }`}
                  >
                    View Voice Tag Services
                  </Link>
                  <a
                    href="https://www.fiverr.com/solufelo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block px-8 py-3 font-amiamie-round font-bold rounded transition ${
                      theme === 'glass'
                        ? 'bg-white/10 text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black'
                        : theme === 'light'
                        ? 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white'
                        : 'bg-primary text-DarkLava hover:bg-primary/90'
                    }`}
                  >
                    Order Now on Fiverr
                  </a>
                </div>
              </section>

              {/* FAQ */}
              <section className="mt-12">
                <h2 className={`font-amiamie-round text-3xl font-bold mb-6 ${getAccentColor()}`}>
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  <div className={`border rounded p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-lg font-bold mb-2 ${getTextColor()}`}>
                      Should I get a male or female voice tag?
                    </h3>
                    <p>
                      It depends on your brand and genre. Male voices (aggressive or smooth) are more common in trap and hip-hop. Female voices work beautifully for R&B, soul, and intimate productions. Some producers get both!
                    </p>
                  </div>

                  <div className={`border rounded p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-lg font-bold mb-2 ${getTextColor()}`}>
                      How long should my voice tag be?
                    </h3>
                    <p>
                      <strong>2-5 seconds</strong> is ideal. Short enough to not interrupt the flow, long enough to be recognizable. Metro Boomin's tag is ~3 seconds. Pi'erre Bourne's is ~4 seconds.
                    </p>
                  </div>

                  <div className={`border rounded p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-lg font-bold mb-2 ${getTextColor()}`}>
                      Do I need copyright permission to use my voice tag?
                    </h3>
                    <p>
                      If you hire someone to record it, make sure you get <strong>full commercial rights</strong>. Most professional voice tag services (including mine) include commercial rights by default.
                    </p>
                  </div>

                  <div className={`border rounded p-6 ${getCardBg()}`}>
                    <h3 className={`font-amiamie-round text-lg font-bold mb-2 ${getTextColor()}`}>
                      Can I change my voice tag later?
                    </h3>
                    <p>
                      Yes, but it's better to stick with one for brand consistency. If you rebrand, introduce the new tag gradually while phasing out the old one.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Articles */}
              <section className="mt-12">
                <h2 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/blog/metro-boomin-producer-tag" className={`border rounded p-4 transition ${getCardBg()} hover:${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                    <h3 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Metro Boomin Producer Tag Breakdown</h3>
                    <p className={`text-sm ${getMutedTextColor()}`}>Learn the secrets behind Metro's iconic tag</p>
                  </Link>
                  <Link to="/blog/best-voice-tags-trap" className={`border rounded p-4 transition ${getCardBg()} hover:${theme === 'light' ? 'border-blue-600' : theme === 'glass' ? 'border-cyan-400' : 'border-gold'}`}>
                    <h3 className={`font-amiamie-round font-bold mb-2 ${getTextColor()}`}>Best Voice Tags for Trap Music</h3>
                    <p className={`text-sm ${getMutedTextColor()}`}>Top producer tag styles for trap beats</p>
                  </Link>
                </div>
              </section>

            </div>
          </div>
            </div>
          </article>

          {/* Sidebar */}
          <BlogSidebar currentSlug="what-is-a-voice-tag" />
        </div>
      </div>

      <Contact />
    </>
  );
};

export default WhatIsVoiceTag;

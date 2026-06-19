import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';
import LogoHeader from '../../components/LogoHeader';
import BlogSidebar from '../../components/BlogSidebar';
import ShareButton from '../../components/ShareButton';
import BlogAuthorBio from '../../components/BlogAuthorBio';
import TableOfContents from '../../components/TableOfContents';
import { getRelatedPosts } from '../../data/blogArticles';
import { useTheme } from '../../context/ThemeContext';

/**
 * SEO Blog: AI Tools for Creative Workflow
 * Target Keywords: "ai tools for creatives", "ai workflow tools", "best ai tools 2025", "ai tools for productivity"
 */
const AIToolsCreativeWorkflow = () => {
  const { theme } = useTheme();
  const contentRef = useRef(null);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://captainsolo.ca/blog/ai-tools-creative-workflow';
  const title = '10 AI Tools That Boost Your Creative Workflow in 2025';
  const description = 'Discover 10 powerful AI tools that boost your creative workflow in 2025. From coding to design, video editing to writing - transform how you work with AI.';
  const relatedPosts = getRelatedPosts('Productivity', 'ai-tools-creative-workflow', 3);

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

  const getTagBg = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-400/20 border-cyan-400/50 text-cyan-400';
      case 'light': return 'bg-blue-100 border-blue-200 text-blue-600';
      default: return 'bg-gold/20 border-gold/50 text-gold';
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

  const getCTAGradient = () => {
    switch(theme) {
      case 'glass': return 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border-2 border-cyan-400/50';
      case 'light': return 'bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-400/50';
      default: return 'bg-gradient-to-r from-primary/20 to-gold/20 border-2 border-gold/50';
    }
  };

  const getPrimaryButtonClass = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-500 text-black hover:bg-cyan-400';
      case 'light': return 'bg-blue-600 text-white hover:bg-blue-500';
      default: return 'bg-gold text-DarkLava hover:bg-gold/90';
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="ai tools for creatives, ai workflow tools, best ai tools 2025, ai tools for productivity, ai coding tools, ai design tools, creative ai tools, workflow automation" />
        <link rel="canonical" href="https://captainsolo.ca/blog/ai-tools-creative-workflow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "description": description,
          "image": "https://captainsolo.ca/og-image.jpg",
          "author": {
            "@type": "Person",
            "name": "CaptainSolo",
            "url": "https://captainsolo.ca"
          },
          "datePublished": "2025-01-15",
          "dateModified": "2025-01-15"
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
            <Link to="/" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'} transition`}>Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'} transition`}>Blog</Link>
            <span className="mx-2">/</span>
            <span className={getTextColor()}>AI Tools for Creative Workflow</span>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-amiamie-round font-bold rounded ${getTagBg()}`}>
                Productivity
              </span>
              <span className={`text-xs font-amiamie ${getMutedTextColor()}`}>10 min read</span>
              <time className={`text-xs font-amiamie ${getMutedTextColor()}`} dateTime="2025-01-15">
                January 15, 2025
              </time>
            </div>
            <h1 className={`font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black mb-4 ${getTextColor()}`}>
              {title}
            </h1>
            <p className={`font-amiamie text-lg mb-6 ${getMutedTextColor()}`}>
              {description}
            </p>
            
            {/* Share Button */}
            <div className="flex items-center gap-4 mb-8">
              <ShareButton url={currentUrl} title={title} description={description} />
            </div>
          </header>

          {/* Table of Contents */}
          <div ref={contentRef}>
            <TableOfContents contentRef={contentRef} />
          </div>

          {/* Article Content */}
          <div ref={contentRef} className={`font-amiamie space-y-6 leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
            
            <section>
              <p className={`text-xl leading-relaxed mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                AI tools are revolutionizing how creatives work. From coding to design, 
                video editing to writing—AI can accelerate your workflow and help you 
                focus on what matters: creating. After building projects like JobScanner Pro 
                and using AI tools daily, here are 10 AI tools that actually boost your 
                creative workflow in 2025.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                1. Cursor: AI-Powered Code Editor
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Cursor is a code editor 
                built for AI-assisted development. It understands your codebase context and 
                helps you write, refactor, and debug code faster.
              </p>
              <p className="mb-4">
                <strong>Why it's game-changing:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Write entire functions from natural language prompts</li>
                <li>Refactor code across your entire project</li>
                <li>Debug errors with AI explanations</li>
                <li>Understand complex codebases instantly</li>
              </ul>
              <p className="mb-4">
                <strong>Real example:</strong> I used Cursor to build JobScanner Pro, a Python 
                job scraping tool. What would have taken weeks took days because Cursor helped 
                me write boilerplate, debug scraping issues, and implement features faster.
              </p>
              <p className="mb-4">
                <strong>Best for:</strong> Developers, web developers, anyone who codes
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                2. ChatGPT / Claude: Writing & Ideation
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> ChatGPT and Claude are 
                AI assistants that help with writing, brainstorming, and problem-solving.
              </p>
              <p className="mb-4">
                <strong>Creative workflow uses:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Brainstorm blog post ideas and outlines</li>
                <li>Write marketing copy and social media posts</li>
                <li>Generate code snippets and explanations</li>
                <li>Debug and explain technical concepts</li>
                <li>Create documentation and guides</li>
              </ul>
              <p className="mb-4">
                <strong>Pro tip:</strong> Use ChatGPT to generate first drafts, then edit and 
                add your unique voice. Don't publish AI content verbatim—make it yours.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                3. GitHub Copilot: Code Autocomplete
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> GitHub Copilot suggests 
                code as you type, learning from your coding style and the codebase context.
              </p>
              <p className="mb-4">
                <strong>Why developers love it:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Write boilerplate code instantly</li>
                <li>Learn new frameworks faster</li>
                <li>Reduce repetitive coding tasks</li>
                <li>Suggest best practices and patterns</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                4. Runway ML: AI Video Editing
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Runway ML uses AI to 
                automate video editing tasks like object removal, background replacement, 
                and color grading.
              </p>
              <p className="mb-4">
                <strong>Videography workflow uses:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Remove unwanted objects from footage</li>
                <li>Replace backgrounds instantly</li>
                <li>Auto-color grade footage</li>
                <li>Generate motion graphics</li>
                <li>Create video from text prompts</li>
              </ul>
              <p className="mb-4">
                <strong>Time saved:</strong> What takes hours in Premiere Pro takes minutes 
                with Runway ML. Perfect for client projects with tight deadlines.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                5. Midjourney / DALL-E: AI Image Generation
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Generate high-quality 
                images from text prompts. Perfect for concept art, thumbnails, and design mockups.
              </p>
              <p className="mb-4">
                <strong>Creative uses:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Create concept art and mood boards</li>
                <li>Generate social media graphics</li>
                <li>Design website mockups and layouts</li>
                <li>Create thumbnail images for videos</li>
                <li>Brainstorm visual ideas quickly</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                6. Notion AI: Organized Workspace
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Notion is a workspace 
                tool with built-in AI that helps you write, summarize, and organize information.
              </p>
              <p className="mb-4">
                <strong>Workflow benefits:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Write and edit documents with AI assistance</li>
                <li>Summarize meeting notes and articles</li>
                <li>Generate action items from notes</li>
                <li>Create project templates and databases</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                7. ElevenLabs: AI Voice Generation
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Generate realistic 
                voiceovers and narration from text. Perfect for video projects and voice tags.
              </p>
              <p className="mb-4">
                <strong>Use cases:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Create voiceovers for videos</li>
                <li>Generate voice tags for music production</li>
                <li>Narrate explainer videos</li>
                <li>Create multilingual content</li>
              </ul>
              <p className="mb-4">
                <strong>Real example:</strong> I've used ElevenLabs to create female voice 
                tags (Natasha voice) for music producers. The quality is professional-grade 
                and saves hours of recording time.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                8. Loom AI: Video Summaries
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Loom records your screen 
                and automatically generates summaries and transcripts of your videos.
              </p>
              <p className="mb-4">
                <strong>Workflow uses:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Record quick explanations and tutorials</li>
                <li>Auto-generate transcripts for accessibility</li>
                <li>Create summaries of long video calls</li>
                <li>Share screen recordings with clients</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                9. Perplexity: Research Assistant
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Perplexity is an AI 
                research assistant that provides accurate, cited answers to your questions.
              </p>
              <p className="mb-4">
                <strong>Why it's better than ChatGPT for research:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Provides sources and citations</li>
                <li>Accesses real-time information</li>
                <li>More accurate for factual queries</li>
                <li>Great for learning new topics quickly</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                10. Custom AI Tools: Build Your Own
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Sometimes the best AI 
                tool is one you build yourself. Using AI APIs (OpenAI, Anthropic) and Python, 
                you can create custom automation tools.
              </p>
              <p className="mb-4">
                <strong>Real example - JobScanner Pro:</strong>
              </p>
              <p className="mb-4">
                I built JobScanner Pro, a Python tool that scrapes job listings from multiple 
                sources (Canada Job Bank, Kijiji, Craigslist) and filters them. While not 
                strictly AI-powered, it uses automation to save hours of manual job searching. 
                The same approach can be applied to other repetitive tasks.
              </p>
              <p className="mb-4">
                <strong>Ideas for custom AI tools:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Content generation pipelines</li>
                <li>Social media scheduling with AI captions</li>
                <li>Email automation with AI responses</li>
                <li>Data analysis and reporting</li>
                <li>Client communication automation</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                How to Integrate AI Tools Into Your Workflow
              </h2>
              <p className="mb-4">
                Adding AI tools to your workflow isn't about replacing your skills—it's about 
                amplifying them. Here's how to do it right:
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                1. Start Small
              </h3>
              <p className="mb-4">
                Don't try to use 10 AI tools at once. Pick one or two that solve a specific 
                problem, master them, then add more.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                2. Use AI for Repetitive Tasks
              </h3>
              <p className="mb-4">
                AI excels at repetitive, time-consuming tasks. Use it for boilerplate code, 
                first drafts, and data processing—not for creative decisions.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                3. Always Review AI Output
              </h3>
              <p className="mb-4">
                AI makes mistakes. Always review, edit, and fact-check AI-generated content. 
                Use AI as a starting point, not the final product.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                4. Maintain Your Unique Voice
              </h3>
              <p className="mb-4">
                Don't let AI make your work generic. Edit AI content to match your style, 
                add personal insights, and maintain your brand voice.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                The Future of AI in Creative Work
              </h2>
              <p className="mb-4">
                AI tools are getting better every day. What seemed impossible a year ago 
                is now standard. The creatives who embrace AI tools now will have a huge 
                advantage over those who wait.
              </p>
              <p className="mb-4">
                <strong>Key takeaway:</strong> AI won't replace creatives—but creatives who 
                use AI will replace those who don't.
              </p>
            </section>

            {/* Author Bio */}
            <BlogAuthorBio />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className={`mt-12 pt-8 border-t ${getBorderColor()}`}>
                <h2 className={`font-amiamie-round text-2xl font-black mb-6 ${getTextColor()}`}>
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      to={`/blog/${relatedPost.slug}`}
                      className={`rounded-lg p-4 transition-all group border ${getCardBg()}`}
                    >
                      <h3 className={`font-amiamie-round font-bold mb-2 transition-colors ${getTextColor()} group-hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'}`}>
                        {relatedPost.title}
                      </h3>
                      <p className={`text-sm line-clamp-2 ${getMutedTextColor()}`}>
                        {relatedPost.description}
                      </p>
                      <div className={`flex items-center gap-2 mt-2 text-xs ${getMutedTextColor()}`}>
                        <span>{relatedPost.readTime}</span>
                        <span>•</span>
                        <span>{relatedPost.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Call to Action */}
            <div className={`mt-12 pt-8 border-t ${getBorderColor()}`}>
              <div className={`${getCTAGradient()} rounded-lg p-8 text-center`}>
                <h2 className={`font-amiamie-round text-2xl font-black mb-4 ${getTextColor()}`}>
                  Have a Project in Mind?
                </h2>
                <p className={`font-amiamie mb-6 ${getMutedTextColor()}`}>
                  Let's work together to bring your vision to life. Get in touch for web development, 
                  videography, or content creation services.
                </p>
                <Link
                  to="/contact"
                  className={`inline-block px-8 py-4 font-amiamie-round font-bold rounded-lg transition-colors ${getPrimaryButtonClass()}`}
                >
                  Get in Touch
                </Link>
              </div>
            </div>

          </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <BlogSidebar currentSlug="ai-tools-creative-workflow" />
          </aside>
        </div>
      </div>

      <Contact />
    </>
  );
};

export default AIToolsCreativeWorkflow;

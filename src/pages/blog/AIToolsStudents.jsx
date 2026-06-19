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
 * SEO Blog: AI Tools for Students
 * Target Keywords: "ai tools for students", "ai tools for school", "study ai tools", "ai academic tools"
 */
const AIToolsStudents = () => {
  const { theme } = useTheme();
  const contentRef = useRef(null);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://captainsolo.ca/blog/ai-tools-students';
  const title = 'AI Tools for Students: How to Boost Your Academic Success in 2025';
  const description = 'Discover AI tools that help students study smarter, write better, and manage time effectively. Learn how to use AI to boost your academic success in 2025.';
  const relatedPosts = getRelatedPosts('Productivity', 'ai-tools-students', 3);

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
        <meta name="keywords" content="ai tools for students, ai tools for school, study ai tools, ai academic tools, ai study assistant, student productivity ai, ai homework help, ai writing tools students" />
        <link rel="canonical" href="https://captainsolo.ca/blog/ai-tools-students" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <LogoHeader />
      <Navbar />

      <div className={`min-h-screen py-20 px-4 sm:px-8 ${getSectionBg()}`}>
        <div className="max-w-7xl mx-auto flex gap-8 lg:gap-12">
          <article className="flex-1 min-w-0">
            <div className="max-w-4xl">
          
          <nav className={`mb-8 text-sm ${getMutedTextColor()}`}>
            <Link to="/" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'} transition`}>Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'} transition`}>Blog</Link>
            <span className="mx-2">/</span>
            <span className={getTextColor()}>AI Tools for Students</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-amiamie-round font-bold rounded ${getTagBg()}`}>
                Productivity
              </span>
              <span className={`text-xs font-amiamie ${getMutedTextColor()}`}>9 min read</span>
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

          <div ref={contentRef} className={`font-amiamie space-y-6 leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
            
            <section>
              <p className={`text-xl leading-relaxed mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                Being a student is hard. Between classes, assignments, exams, and life—there's 
                never enough time. AI tools can help you study smarter, write better, and manage 
                your time effectively. As someone who's built productivity tools and uses AI daily, 
                here are the best AI tools for students in 2025.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                1. ChatGPT / Claude: Your Study Assistant
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> ChatGPT and Claude are 
                AI assistants that help with studying, writing, and problem-solving.
              </p>
              <p className="mb-4">
                <strong>How students use it:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Explain concepts:</strong> Ask AI to explain complex topics in simple terms</li>
                <li><strong>Brainstorm essay ideas:</strong> Generate outlines and thesis statements</li>
                <li><strong>Practice problems:</strong> Get step-by-step solutions to math and science problems</li>
                <li><strong>Study guides:</strong> Create summaries and study notes from your notes</li>
                <li><strong>Code help:</strong> Debug code and understand programming concepts</li>
              </ul>
              <p className="mb-4">
                <strong>Important:</strong> Use AI to learn and understand, not to cheat. 
                Always review AI explanations and do the work yourself.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                2. Grammarly: Writing Assistant
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Grammarly checks your 
                writing for grammar, spelling, and style errors in real-time.
              </p>
              <p className="mb-4">
                <strong>Why students need it:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Catches grammar and spelling mistakes</li>
                <li>Improves sentence clarity and flow</li>
                <li>Suggests better word choices</li>
                <li>Checks for plagiarism (premium)</li>
                <li>Works in browsers, Word, Google Docs, and more</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                3. Notion AI: Organized Study Space
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Notion is a workspace 
                tool with AI that helps you organize notes, create study guides, and manage projects.
              </p>
              <p className="mb-4">
                <strong>Student uses:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Create organized notes with AI assistance</li>
                <li>Generate study guides from your notes</li>
                <li>Summarize long readings and articles</li>
                <li>Create to-do lists and track assignments</li>
                <li>Build databases for research projects</li>
              </ul>
              <p className="mb-4">
                <strong>Pro tip:</strong> Use Notion's templates for class notes, assignment 
                trackers, and study schedules.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                4. Perplexity: Research Assistant
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
                <li>Great for finding academic papers and articles</li>
                <li>Helps you understand complex topics quickly</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                5. Quizlet: AI-Powered Study Tools
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Quizlet uses AI to 
                create personalized study plans and practice tests.
              </p>
              <p className="mb-4">
                <strong>Features:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Create flashcards from your notes</li>
                <li>AI generates study questions</li>
                <li>Adaptive learning (focuses on what you don't know)</li>
                <li>Practice tests and quizzes</li>
                <li>Study reminders and progress tracking</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                6. Cursor / GitHub Copilot: Coding Help
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> AI-powered code editors 
                that help you write, debug, and understand code.
              </p>
              <p className="mb-4">
                <strong>Why CS students need it:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Get help debugging code errors</li>
                <li>Understand complex code concepts</li>
                <li>Generate code snippets and examples</li>
                <li>Learn new programming languages faster</li>
                <li>Write better, more efficient code</li>
              </ul>
              <p className="mb-4">
                <strong>Real example:</strong> As a student learning Java (CP213), I used 
                Cursor to understand object-oriented programming concepts and debug assignment 
                code. It accelerated my learning significantly.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                7. Otter.ai: Lecture Transcription
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Otter.ai automatically 
                transcribes lectures and meetings in real-time.
              </p>
              <p className="mb-4">
                <strong>Student benefits:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Never miss important points in lectures</li>
                <li>Search transcripts for specific topics</li>
                <li>Generate notes automatically from recordings</li>
                <li>Focus on listening instead of frantically writing</li>
                <li>Review lectures later at your own pace</li>
              </ul>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                8. StudyOS / Custom Study Tools
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>What it does:</strong> Build or use custom 
                study tools that automate repetitive tasks.
              </p>
              <p className="mb-4">
                <strong>Ideas for custom study tools:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Automated flashcard generators</li>
                <li>Assignment tracking and reminder systems</li>
                <li>Study schedule optimizers</li>
                <li>Note-taking automation</li>
                <li>Grade calculators and GPA trackers</li>
              </ul>
              <p className="mb-4">
                <strong>Pro tip:</strong> If you can code (or learn), build custom tools 
                that solve your specific study problems. This is what I did with StudyOS 
                and other productivity tools.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                How to Use AI Tools Ethically as a Student
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>Important:</strong> AI tools are learning 
                aids, not cheating tools. Here's how to use them ethically:
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                1. Use AI to Learn, Not to Cheat
              </h3>
              <p className="mb-4">
                Use AI to understand concepts, not to generate answers for assignments. 
                Always do the work yourself and use AI to help you learn.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                2. Always Review AI Output
              </h3>
              <p className="mb-4">
                AI makes mistakes. Always fact-check AI explanations and verify information 
                from reliable sources.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                3. Cite AI Assistance
              </h3>
              <p className="mb-4">
                If your school allows AI assistance, cite it properly. Be transparent about 
                how you used AI in your work.
              </p>

              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                4. Understand Your School's Policy
              </h3>
              <p className="mb-4">
                Some schools allow AI tools, others don't. Know your school's policy and 
                follow it. When in doubt, ask your professor.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                Study Smarter, Not Harder
              </h2>
              <p className="mb-4">
                AI tools can help you study more efficiently, but they can't replace hard 
                work and dedication. Use AI to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Understand complex concepts faster</li>
                <li>Organize your notes and study materials</li>
                <li>Practice problems and get instant feedback</li>
                <li>Manage your time and track assignments</li>
                <li>Improve your writing and communication</li>
              </ul>
              <p className="mb-4">
                But remember: <strong>you still need to put in the work.</strong> AI is a 
                tool to help you learn, not a shortcut to avoid learning.
              </p>
            </section>

            <section>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                The Future of Learning with AI
              </h2>
              <p className="mb-4">
                AI tools are making education more accessible and personalized. Students 
                who learn to use AI tools effectively will have a significant advantage 
                in their academic and professional careers.
              </p>
              <p className="mb-4">
                <strong>Key takeaway:</strong> AI won't replace students—but students who 
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

          <BlogSidebar currentSlug="ai-tools-students" />
        </div>
      </div>

      <Contact />
    </>
  );
};

export default AIToolsStudents;

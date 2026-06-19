import React, { useRef } from 'react';
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
 * SEO Blog: How to Optimize Studying as a University/High School Student
 * Target Keywords: "how to study better", "study tips for students", "study optimization", "effective studying techniques", "study strategies"
 */
const StudyOptimizationGuide = () => {
  const contentRef = useRef(null);
  const { theme } = useTheme();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://captainsolo.ca/blog/study-optimization-guide';
  const title = 'How to Optimize Studying: Ultimate Guide for University & High School Students';
  const relatedPosts = getRelatedPosts('Productivity', 'study-optimization-guide', 3);
  
  // Theme-aware helper functions
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
      case 'glass': return 'text-white/70';
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

  const getBorderColor = () => {
    switch(theme) {
      case 'glass': return 'border-white/20';
      case 'light': return 'border-gray-200';
      default: return 'border-SageGray/30';
    }
  };

  const getCardBg = () => {
    switch(theme) {
      case 'glass': return 'bg-white/5';
      case 'light': return 'bg-white';
      default: return 'bg-primary/5';
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
        <meta name="description" content="Learn proven study optimization techniques for university and high school students. From time management to active recall, discover how to study smarter and achieve better grades." />
        <meta name="keywords" content="how to study better, study tips for students, study optimization, effective studying techniques, study strategies, study methods, academic success, student productivity, study skills, exam preparation" />
        <link rel="canonical" href="https://captainsolo.ca/blog/study-optimization-guide" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Learn proven study optimization techniques for university and high school students." />
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
            <Link to="/" className={`hover:${getAccentColor()} transition`}>Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className={`hover:${getAccentColor()} transition`}>Blog</Link>
            <span className="mx-2">/</span>
            <span className={getTextColor()}>Study Optimization Guide</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 ${theme === 'glass' ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-400' : theme === 'light' ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-gold/20 border-gold/50 text-gold'} border text-xs font-amiamie-round font-bold rounded`}>
                Productivity
              </span>
              <span className={`text-xs ${getMutedTextColor()} font-amiamie`}>12 min read</span>
              <span className={`text-xs ${theme === 'glass' ? 'text-white/50' : theme === 'light' ? 'text-gray-500' : 'text-SageGray/70'} font-amiamie`} dateTime="2025-01-25">
                January 25, 2025
              </span>
            </div>
            <h1 className={`font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black mb-4 ${getTextColor()}`}>
              How to Optimize Studying: Ultimate Guide for University & High School Students
            </h1>
            <p className={`font-amiamie text-lg mb-6 ${getMutedTextColor()}`}>
              Proven study optimization techniques that actually work. From time management to active recall, 
              learn how to study smarter, not harder, and achieve better grades.
            </p>
            
            {/* Share Button */}
            <div className="flex items-center gap-4 mb-8">
              <ShareButton url={currentUrl} title={title} />
            </div>
          </header>

          {/* Table of Contents */}
          <div ref={contentRef}>
            <TableOfContents contentRef={contentRef} />
          </div>

          <div ref={contentRef} className={`font-amiamie space-y-6 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-primary/80'}`}>
            
            <section>
              <p className={`text-xl leading-relaxed mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-primary/90'}`}>
                Studying doesn't have to be a grind. As a university student who's experimented with countless 
                study methods, I've learned that <strong className={getAccentColor()}>optimization beats brute force every time</strong>. 
                This guide covers proven study optimization techniques that will help you study smarter, retain more, 
                and achieve better grades—whether you're in high school or university.
              </p>
            </section>

            <section id="foundation-memory">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                1. The Foundation: Understanding How Memory Works
              </h2>
              <p className="mb-4">
                Before diving into techniques, understand that <strong className={getAccentColor()}>memory is not a recording device</strong>. 
                Your brain forgets information quickly unless you actively reinforce it.
              </p>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                The Forgetting Curve
              </h3>
              <p className="mb-4">
                Research shows that without reinforcement, you forget <strong>50% of new information within an hour</strong> 
                and <strong>70% within 24 hours</strong>. This is why cramming doesn't work long-term.
              </p>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                The Solution: Spaced Repetition
              </h3>
              <p className="mb-4">
                <strong className={getAccentColor()}>Spaced repetition</strong> is the practice of reviewing material at increasing 
                intervals. Instead of studying everything at once, you review:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Day 1:</strong> Learn new material</li>
                <li><strong>Day 2:</strong> Review (1 day later)</li>
                <li><strong>Day 4:</strong> Review (2 days later)</li>
                <li><strong>Day 8:</strong> Review (4 days later)</li>
                <li><strong>Day 16:</strong> Review (8 days later)</li>
              </ul>
              <p className="mb-4">
                This technique dramatically improves long-term retention. Tools like Anki, Quizlet, or custom 
                spaced repetition systems (like StudyOS) automate this process.
              </p>
            </section>

            <section id="active-recall">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                2. Active Recall: The #1 Study Technique
              </h2>
              <p className="mb-4">
                <strong className={getAccentColor()}>Active recall</strong> is the practice of actively retrieving information 
                from memory instead of passively re-reading notes. Studies show it's 3x more effective than passive review.
              </p>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                How to Practice Active Recall
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Flashcards:</strong> Create flashcards and test yourself regularly</li>
                <li><strong>Practice questions:</strong> Do practice problems without looking at answers first</li>
                <li><strong>Teach someone else:</strong> Explain concepts to a friend or record yourself explaining</li>
                <li><strong>Close the book:</strong> Read a section, close your notes, and write down what you remember</li>
                <li><strong>Self-quizzing:</strong> Create questions from your notes and answer them later</li>
              </ul>
              
              <p className="mb-4">
                <strong>Pro tip:</strong> The struggle to recall information strengthens memory. If you can't remember 
                something, don't immediately look it up—give yourself 30 seconds to think first.
              </p>
            </section>

            <section id="pomodoro-technique">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                3. Time Management: The Pomodoro Technique
              </h2>
              <p className="mb-4">
                Long study sessions lead to burnout and decreased focus. The <strong className={getAccentColor()}>Pomodoro Technique</strong> 
                breaks study time into focused 25-minute blocks with 5-minute breaks.
              </p>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                How to Use Pomodoro
              </h3>
              <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
                <li>Set a timer for 25 minutes</li>
                <li>Study with full focus (no distractions)</li>
                <li>Take a 5-minute break</li>
                <li>Repeat 3-4 times</li>
                <li>Take a longer 15-30 minute break</li>
              </ol>
              
              <p className="mb-4">
                <strong>Why it works:</strong> Short bursts maintain focus and prevent mental fatigue. The breaks give 
                your brain time to consolidate information.
              </p>
              
              <p className="mb-4">
                <strong>Tools:</strong> Use a timer app, browser extension, or study apps with built-in Pomodoro timers.
              </p>
            </section>

            <section id="environment-optimization">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                4. Environment Optimization: Create Your Study Zone
              </h2>
              <p className="mb-4">
                Your study environment significantly impacts focus and retention. Optimize your space for maximum productivity.
              </p>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Physical Environment
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Dedicated space:</strong> Study in the same place consistently to build a routine</li>
                <li><strong>Clean workspace:</strong> Clutter distracts the brain</li>
                <li><strong>Good lighting:</strong> Natural light is best, but bright artificial light works</li>
                <li><strong>Comfortable temperature:</strong> Slightly cool (65-68°F) helps maintain alertness</li>
                <li><strong>Ergonomic setup:</strong> Proper chair and desk height prevent physical distractions</li>
              </ul>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Digital Environment
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Phone on silent:</strong> Put your phone in another room or use focus mode</li>
                <li><strong>Block distracting websites:</strong> Use extensions like Cold Turkey or Freedom</li>
                <li><strong>Close unnecessary tabs:</strong> One task at a time</li>
                <li><strong>Use focus music:</strong> Lo-fi, classical, or white noise (avoid lyrics if reading)</li>
                <li><strong>Turn off notifications:</strong> All notifications off during study blocks</li>
              </ul>
            </section>

            <section id="note-taking-strategies">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                5. Note-Taking Strategies: Cornell Method & Mind Maps
              </h2>
              <p className="mb-4">
                Effective note-taking is crucial for retention. Different methods work for different subjects.
              </p>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Cornell Method (Best for Lectures)
              </h3>
              <p className="mb-4">
                Divide your page into three sections:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Notes (right side):</strong> Main content during lecture</li>
                <li><strong>Cues (left side):</strong> Key questions and keywords</li>
                <li><strong>Summary (bottom):</strong> Main points in 2-3 sentences</li>
              </ul>
              <p className="mb-4">
                After class, review your notes and fill in the cues and summary sections. This forces active engagement.
              </p>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Mind Maps (Best for Complex Topics)
              </h3>
              <p className="mb-4">
                Mind maps visually organize information around a central concept. They're excellent for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Understanding relationships between concepts</li>
                <li>Brainstorming essay ideas</li>
                <li>Reviewing large amounts of material</li>
                <li>Connecting different topics</li>
              </ul>
              
              <p className="mb-4">
                <strong>Tools:</strong> Use paper and pens, or digital tools like Notion, MindMeister, or XMind.
              </p>
            </section>

            <section id="sleep-health">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                6. Sleep & Health: The Foundation of Learning
              </h2>
              <p className="mb-4">
                You can't optimize studying without optimizing your health. Sleep, nutrition, and exercise directly 
                impact memory and focus.
              </p>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Sleep Optimization
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>7-9 hours nightly:</strong> Most students need 8 hours for optimal cognitive function</li>
                <li><strong>Consistent schedule:</strong> Go to bed and wake up at the same time every day</li>
                <li><strong>No screens 1 hour before bed:</strong> Blue light disrupts sleep quality</li>
                <li><strong>Review before sleep:</strong> Your brain consolidates memories during sleep—review key material before bed</li>
                <li><strong>Power naps:</strong> 20-minute naps can boost alertness (avoid longer naps)</li>
              </ul>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Nutrition for Studying
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Brain foods:</strong> Omega-3s (fish, walnuts), antioxidants (berries), complex carbs (oats)</li>
                <li><strong>Stay hydrated:</strong> Dehydration reduces cognitive function</li>
                <li><strong>Avoid sugar crashes:</strong> Limit sugary snacks—they cause energy crashes</li>
                <li><strong>Regular meals:</strong> Don't skip meals—your brain needs fuel</li>
              </ul>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Exercise & Movement
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Regular exercise:</strong> 30 minutes daily improves memory and focus</li>
                <li><strong>Study breaks:</strong> Walk, stretch, or do light exercise during breaks</li>
                <li><strong>Morning exercise:</strong> Exercise in the morning boosts cognitive function for the day</li>
              </ul>
            </section>

            <section id="study-schedule">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                7. Study Schedule: Plan Your Week
              </h2>
              <p className="mb-4">
                A well-planned study schedule prevents cramming and reduces stress. Here's how to create an effective schedule.
              </p>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Time Blocking
              </h3>
              <p className="mb-4">
                Block out specific times for studying each subject. Be realistic about how long tasks take.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Morning study:</strong> Most students are most alert in the morning (8-11 AM)</li>
                <li><strong>Afternoon review:</strong> Review morning material in the afternoon</li>
                <li><strong>Evening light work:</strong> Save easier tasks (organizing notes, reading) for evenings</li>
                <li><strong>Weekly review:</strong> Set aside time each week to review all material</li>
              </ul>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Priority Matrix
              </h3>
              <p className="mb-4">
                Use the Eisenhower Matrix to prioritize tasks:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Urgent + Important:</strong> Do immediately (exams, deadlines)</li>
                <li><strong>Important but not urgent:</strong> Schedule these (regular studying)</li>
                <li><strong>Urgent but not important:</strong> Delegate or minimize (some assignments)</li>
                <li><strong>Neither:</strong> Eliminate (time-wasting activities)</li>
              </ul>
            </section>

            <section id="study-apps-tools">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                8. Technology: Study Apps & Tools
              </h2>
              <p className="mb-4">
                The right tools can dramatically improve your study efficiency. Here are proven apps and tools:
              </p>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Spaced Repetition Apps
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Anki:</strong> Powerful flashcard app with spaced repetition</li>
                <li><strong>Quizlet:</strong> Easy-to-use flashcards with study modes</li>
                <li><strong>StudyOS:</strong> Custom study tools with spaced repetition (if you're building one)</li>
              </ul>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Note-Taking Apps
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Notion:</strong> All-in-one workspace for notes, tasks, and databases</li>
                <li><strong>Obsidian:</strong> Powerful note-taking with linking and graph view</li>
                <li><strong>OneNote:</strong> Free Microsoft app with great organization</li>
                <li><strong>GoodNotes:</strong> Excellent for handwritten notes on iPad</li>
              </ul>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Focus & Productivity
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Forest:</strong> Gamified focus timer (plant trees while studying)</li>
                <li><strong>Cold Turkey:</strong> Block distracting websites and apps</li>
                <li><strong>Focus@Will:</strong> Science-based focus music</li>
                <li><strong>RescueTime:</strong> Track how you spend time on your devices</li>
              </ul>
              
              <p className="mb-4">
                For more AI tools that help with studying, check out our <Link to="/blog/ai-tools-students" className={`${getAccentColor()} hover:underline`}>AI Tools for Students</Link> guide.
              </p>
            </section>

            <section id="exam-preparation">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                9. Exam Preparation: The 2-Week Study Plan
              </h2>
              <p className="mb-4">
                Effective exam preparation starts 2 weeks before the exam. Here's a proven timeline:
              </p>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Week 1: Content Review
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Days 1-3:</strong> Review all material, create summary notes</li>
                <li><strong>Days 4-5:</strong> Create flashcards for key concepts</li>
                <li><strong>Days 6-7:</strong> Practice active recall with flashcards</li>
              </ul>
              
              <h3 className={`font-amiamie-round text-2xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                Week 2: Practice & Refinement
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Days 8-10:</strong> Do practice exams and problems</li>
                <li><strong>Days 11-12:</strong> Review mistakes, focus on weak areas</li>
                <li><strong>Day 13:</strong> Final review of all material</li>
                <li><strong>Day 14 (exam day):</strong> Light review, rest, arrive early</li>
              </ul>
              
              <p className="mb-4">
                <strong>Important:</strong> Don't cram the night before. Get 8 hours of sleep—your brain needs rest to perform.
              </p>
            </section>

            <section id="common-mistakes">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                10. Common Study Mistakes to Avoid
              </h2>
              <p className="mb-4">
                Avoid these common mistakes that waste time and reduce effectiveness:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Passive re-reading:</strong> Just reading notes doesn't help retention—use active recall</li>
                <li><strong>Highlighting everything:</strong> Over-highlighting is passive and ineffective</li>
                <li><strong>Multitasking:</strong> Your brain can't focus on multiple things—one task at a time</li>
                <li><strong>Cramming:</strong> Last-minute studying doesn't work for long-term retention</li>
                <li><strong>Studying when tired:</strong> Fatigue reduces learning efficiency—rest first</li>
                <li><strong>No breaks:</strong> Continuous studying leads to burnout—take regular breaks</li>
                <li><strong>Perfectionism:</strong> Don't spend too much time on one topic—balance is key</li>
                <li><strong>Ignoring weak areas:</strong> Focus extra time on difficult concepts</li>
              </ul>
            </section>

            <section id="study-checklist">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                Putting It All Together: Your Study Optimization Checklist
              </h2>
              <p className="mb-4">
                Here's a weekly checklist to optimize your studying:
              </p>
              
              <div className={`${getCardBg()} ${getBorderColor()} border rounded-lg p-6 mb-6`}>
                <h3 className={`font-amiamie-round text-xl font-bold mb-4 ${getAccentColor()}`}>Weekly Study Checklist</h3>
                <ul className={`space-y-2 font-amiamie ${getTextColor()}`}>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Review all material using spaced repetition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Practice active recall with flashcards or self-quizzing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Use Pomodoro Technique for focused study sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Maintain consistent sleep schedule (7-9 hours)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Exercise regularly (30 minutes daily)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Review notes within 24 hours of class</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Create summary notes for each topic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Do practice problems without looking at solutions first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={getAccentColor()}>✓</span>
                    <span>Plan study schedule for the week ahead</span>
                  </li>
                </ul>
              </div>
            </section>

            <section id="bottom-line">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                The Bottom Line: Study Smart, Not Hard
              </h2>
              <p className="mb-4">
                Study optimization isn't about studying more—it's about studying <strong className={getAccentColor()}>smarter</strong>. 
                By combining spaced repetition, active recall, time management, and a healthy lifestyle, you can achieve 
                better grades with less stress and more retention.
              </p>
              <p className="mb-4">
                <strong>Remember:</strong> These techniques take time to master. Start with one or two methods, build the 
                habit, then add more. Consistency beats intensity every time.
              </p>
              <p className="mb-4">
                As someone who's experimented with countless study methods throughout university, these techniques have 
                made the biggest difference. Focus on the fundamentals—active recall, spaced repetition, and good sleep—and 
                you'll see results.
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
                      className={`${getCardBg()} ${getBorderColor()} border rounded-lg p-4 hover:${getAccentColor().replace('text-', 'border-')} transition-all group`}
                    >
                      <h3 className={`font-amiamie-round font-bold mb-2 group-hover:${getAccentColor()} transition-colors ${getTextColor()}`}>
                        {relatedPost.title}
                      </h3>
                      <p className={`text-sm ${getMutedTextColor()} line-clamp-2`}>
                        {relatedPost.description}
                      </p>
                      <div className={`flex items-center gap-2 mt-2 text-xs ${theme === 'glass' ? 'text-white/50' : theme === 'light' ? 'text-gray-500' : 'text-SageGray/70'}`}>
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

          <BlogSidebar currentSlug="study-optimization-guide" />
        </div>
      </div>

      <Contact />
    </>
  );
};

export default StudyOptimizationGuide;

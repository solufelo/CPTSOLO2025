import React, { useRef, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';
import LogoHeader from '../../components/LogoHeader';
import BlogSidebar from '../../components/BlogSidebar';
import ShareButton from '../../components/ShareButton';
import BlogAuthorBio from '../../components/BlogAuthorBio';
import TableOfContents from '../../components/TableOfContents';
import ImageLightbox from '../../components/ImageLightbox';
import { getRelatedPosts } from '../../data/blogArticles';
import { Icon } from '@iconify/react';
import { useTheme } from '../../context/ThemeContext';

/**
 * SEO Blog: How I Used Gemini Visual Prompts to Ace My OOP Exam
 * Target Keywords: "gemini for studying", "visual study aids", "oop concepts visual", "ai study tools", "gemini prompts for students"
 */
const GeminiStudyGuide = () => {
  const { theme } = useTheme();
  const contentRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://captainsolo.ca/blog/gemini-visual-prompts-study-guide';
  const title = 'How I Used Gemini Visual Prompts to Ace My OOP, Swing & Input Exams';
  const relatedPosts = getRelatedPosts('Productivity', 'gemini-visual-prompts-study-guide', 3);
  
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
      case 'glass': return 'bg-white/5 border-white/10';
      case 'light': return 'bg-white border-gray-200';
      default: return 'bg-primary/5 border-SageGray/30';
    }
  };

  const getCodeBg = () => {
    switch(theme) {
      case 'glass': return 'bg-black/50 text-white/80';
      case 'light': return 'bg-gray-100 text-gray-800 border border-gray-200';
      default: return 'bg-black/30 text-SageGray';
    }
  };

  // Define all images for the lightbox
  const galleryImages = useMemo(() => [
    {
      src: "/images/java-oop/java-oop-concepts.jpg",
      alt: "Java OOP Concepts Overview",
      title: "Overview of Java OOP Concepts",
      description: "Inheritance, Encapsulation, Polymorphism, Abstraction visual overview."
    },
    {
      src: "/images/java-oop/visual-analogy-poster.png",
      alt: "Visual Analogy Poster for OOP Concepts",
      title: "Visual Analogy Poster",
      description: "Abstract Class vs Interface vs Polymorphism vs Inheritance using real-world comparisons."
    },
    {
      src: "/images/java-oop/apie-oom-nnemonic.png",
      alt: "A PIE Mnemonic Poster",
      title: "A PIE Mnemonic",
      description: "Abstraction, Polymorphism, Inheritance, Encapsulation mnemonic."
    },
    {
      src: "/images/java-oop/java-oop-final-exam-cheat-sheet.png",
      alt: "Java OOP Final Exam Cheat Sheet",
      title: "OOP Cheat Sheet",
      description: "Key Java OOP concepts, keywords, and syntax summary."
    },
    {
      src: "/images/java-oop/abstract-class-vs-interface.png",
      alt: "Abstract Class vs Interface Comparison",
      title: "Abstract Class vs Interface",
      description: "Comparison table showing differences between abstract classes and interfaces."
    },
    {
      src: "/images/java-oop/should-i-use-abstract-class-or-interface.png",
      alt: "Abstract Class vs Interface Decision Tree",
      title: "Decision Tree: Abstract vs Interface",
      description: "Flowchart to help decide when to use an abstract class or interface."
    },
    {
      src: "/images/java-oop/take-user-input-across-4-programming-languages.png",
      alt: "Input Comparison Across Languages",
      title: "Input Across Languages",
      description: "Comparing user input syntax in Java, Python, C++, and JavaScript."
    },
    {
      src: "/images/java-oop/scanner-class-mindmap.png",
      alt: "Scanner Class Mind Map",
      title: "Scanner Class Mind Map",
      description: "Mind map of Java Scanner class methods and input sources."
    },
    {
      src: "/images/java-oop/scanners-versatility.png",
      alt: "Scanner Versatility",
      title: "Scanner Versatility",
      description: "Visualizing Scanner usage with Files, Strings, and Input Streams."
    },
    {
      src: "/images/java-oop/scanner-newline-bug.png",
      alt: "Scanner Newline Bug Warning",
      title: "Scanner Newline Bug",
      description: "Visual warning about the common nextInt() skipping nextLine() bug."
    },
    {
      src: "/images/java-oop/which-java-method-should-i-use.png",
      alt: "Java Input Method Decision Tree",
      title: "Input Method Decision Tree",
      description: "Choosing between Scanner, BufferedReader, and Console."
    },
    {
      src: "/images/java-oop/java-swing-component-hierarchy.png",
      alt: "Java Swing Component Hierarchy",
      title: "Swing Component Hierarchy",
      description: "Tree diagram of JFrame, JPanel, and component relationships."
    },
    {
      src: "/images/java-oop/how-to-register-action-listener.png",
      alt: "Ways to Register ActionListener",
      title: "Registering ActionListeners",
      description: "Comparison of Named Inner Class, Anonymous Inner Class, and Lambda Expression."
    },
    {
      src: "/images/java-oop/java-handling-flowchart-mechanism.png",
      alt: "Java Event Handling Flowchart",
      title: "Event Handling Flowchart",
      description: "Step-by-step flow from user action to listener execution."
    },
    {
      src: "/images/java-oop/recipe-button-click-handler.png",
      alt: "Button Click Handler Recipe",
      title: "Button Handler Recipe",
      description: "Code anatomy of a standard button click handler."
    },
    {
      src: "/images/java-oop/which-listener-pattern-should-i-use.png",
      alt: "Listener Pattern Decision Tree",
      title: "Listener Pattern Decision Tree",
      description: "Choosing between anonymous classes and lambda expressions."
    }
  ], []);

  const openLightbox = (imageSrc) => {
    const index = galleryImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  // Helper component for clickable images
  const ZoomableImage = ({ src, alt, title, className = "" }) => (
    <div 
      className={`relative group cursor-zoom-in overflow-hidden rounded-lg border shadow-lg ${
        theme === 'glass' ? 'border-white/20' : 
        theme === 'light' ? 'border-gray-200' : 
        'border-SageGray/30'
      }`}
      onClick={() => openLightbox(src)}
    >
      <img 
        src={src} 
        alt={alt}
        title={title}
        loading="lazy"
        decoding="async"
        className={`w-full transition-all duration-700 group-hover:scale-[1.02] group-hover:brightness-90 ${className}`}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
          <Icon icon="mdi:fullscreen" className="text-xl" />
          <span className="text-sm font-amiamie tracking-wide uppercase">View Fullscreen</span>
        </div>
      </div>
    </div>
  );
  
  // Structured Data (JSON-LD) for Rich Results
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": title,
        "description": "Struggling with abstract concepts? Learn how I used Gemini to generate custom visual study aids for Object-Oriented Programming, Java Swing, and Input Methods.",
        "image": [
          "https://captainsolo.ca/images/java-oop/visual-analogy-poster.png",
          "https://captainsolo.ca/images/java-oop/apie-oom-nnemonic.png",
          "https://captainsolo.ca/images/java-oop/java-oop-final-exam-cheat-sheet.png"
        ],
        "author": {
          "@type": "Person",
          "name": "Captain Solo",
          "url": "https://captainsolo.ca"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Captain Solo",
          "logo": {
            "@type": "ImageObject",
            "url": "https://captainsolo.ca/logo.png"
          }
        },
        "datePublished": "2025-12-08",
        "dateModified": "2025-12-08",
        "keywords": "java oop, gemini study guide, visual learning java, scanner class java, swing listeners java",
        "articleBody": "How I Used Gemini Visual Prompts to Ace My Java Exams...",
        "about": [
          {
            "@type": "ImageObject",
            "contentUrl": "https://captainsolo.ca/images/java-oop/visual-analogy-poster.png",
            "name": "Visual Analogy Poster for OOP Concepts",
            "description": "Visual analogy explaining Abstract Class, Interface, Polymorphism, and Inheritance using real-world comparisons.",
            "license": "https://creativecommons.org/licenses/by-sa/4.0/",
            "acquireLicensePage": "https://captainsolo.ca/contact"
          },
          // ... (other images included via reference or similar if needed, but for brevity main ones here)
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://captainsolo.ca"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://captainsolo.ca/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Gemini Visual Prompts Study Guide",
            "item": "https://captainsolo.ca/blog/gemini-visual-prompts-study-guide"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Struggling with abstract concepts? Learn how I used Gemini to generate custom visual study aids for Object-Oriented Programming, Java Swing, and Input Methods." />
        <meta name="keywords" content="gemini for studying, visual study aids, oop concepts visual, java swing visuals, java input methods visual, ai study tools, gemini prompts for students" />
        <link rel="canonical" href="https://captainsolo.ca/blog/gemini-visual-prompts-study-guide" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Struggling with abstract concepts? Learn how I used Gemini to generate custom visual study aids for Object-Oriented Programming, Swing, and Inputs." />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/java-oop/visual-analogy-poster.png" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <LogoHeader />
      <Navbar />

      <ImageLightbox 
        images={galleryImages} 
        initialIndex={lightboxIndex} 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
      />

      <div className={`min-h-screen py-20 px-4 sm:px-8 ${getSectionBg()}`}>
        <div className="max-w-7xl mx-auto flex gap-8 lg:gap-12">
          <article className="flex-1 min-w-0">
            <div className="max-w-4xl">
          
          <nav className={`mb-8 text-sm ${getMutedTextColor()}`}>
            <Link to="/" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'} transition`}>Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'} transition`}>Blog</Link>
            <span className="mx-2">/</span>
            <span className={getTextColor()}>Gemini Visual Prompts Guide</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-amiamie-round font-bold rounded ${getTagBg()}`}>
                Productivity
              </span>
              <span className={`text-xs font-amiamie ${getMutedTextColor()}`}>15 min read</span>
              <span className={`text-xs font-amiamie ${getMutedTextColor()}`} dateTime="2025-12-08">
                December 8, 2025
              </span>
            </div>
            <h1 className={`font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black mb-4 ${getTextColor()}`}>
              How I Used Gemini Visual Prompts to Ace My Java Exams
            </h1>
            <p className={`font-amiamie text-lg mb-6 ${getMutedTextColor()}`}>
              Java concepts like OOP, Swing events, and Input streams can be abstract and hard to grasp. 
              Here's how I used Gemini to generate custom visual study aids that made everything click—broken down by topic.
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

          <div ref={contentRef} className={`font-amiamie space-y-6 leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-primary/80'}`}>
            
            <section>
              <p className={`text-xl leading-relaxed mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-primary/90'}`}>
                We've all been there—staring at a textbook, trying to wrap our heads around abstract concepts. 
                I'm a visual learner, so I experimented with Google's Gemini to generate specific visual aids for my Java exams.
              </p>
              <p className="mb-4">
                The results were game-changing. Below are the exact prompts I used for <strong>OOP</strong>, <strong>Input Methods</strong>, and <strong>Swing Events</strong>. 
                You can copy these prompts to create your own study materials!
              </p>
            </section>

            {/* PART 1: OOP */}
            <div className={`my-12 pt-8 border-t ${getBorderColor()}`}>
              <h2 className={`font-amiamie-round text-4xl font-black mb-8 ${getTextColor()}`}>
                Part 1: Object-Oriented Programming (OOP)
              </h2>

              <div className="my-8">
                <ZoomableImage 
                  src="/images/java-oop/java-oop-concepts.jpg" 
                  alt="Java OOP Concepts Overview" 
                  title="Overview of Java OOP Concepts: Inheritance, Encapsulation, Polymorphism, Abstraction"
                />
              </div>
              
              <section id="visual-analogies">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  1. Visual Analogies: Making the Abstract Concrete
                </h3>
                <p className="mb-4">
                  Definitions aren't enough. I asked Gemini to create real-world analogies for core OOP concepts.
                </p>
                
                <div className={`border rounded-lg p-6 mb-6 ${getCardBg()}`}>
                  <h4 className={`font-bold mb-2 text-sm uppercase tracking-wider ${getAccentColor()}`}>Prompt Used:</h4>
                  <code className={`block p-4 rounded text-sm font-mono whitespace-pre-wrap ${getCodeBg()}`}>
{`Create a visual analogy poster explaining Java concepts using real-world comparisons:

ABSTRACT CLASS = "Blueprint of a house"
- Shows the plan, but you can't live in a blueprint
- You build a real house (subclass) from it

INTERFACE = "Job contract"
- Lists what you MUST do
- Doesn't tell you HOW to do it
- You can sign multiple contracts

POLYMORPHISM = "Universal remote"
- One button (method call)
- Different TVs respond differently
- The TV (object) decides what happens

INHERITANCE = "Family traits"
- Child gets parent's features
- Child can have their own features too

Style: Split into 4 quadrants, each with concept + real-world image + explanation`}
                  </code>
                </div>

                <div className="my-8">
                  <ZoomableImage 
                    src="/images/java-oop/visual-analogy-poster.png" 
                    alt="Visual Analogy Poster for OOP Concepts"
                    title="Visual Analogy Poster: Abstract Class vs Interface vs Polymorphism vs Inheritance"
                  />
                </div>
              </section>

              <section id="mnemonics">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  2. Mnemonics that Stick
                </h3>
                <p className="mb-4">
                  "A PIE" is a classic mnemonic for the four pillars of OOP. Seeing it visually made it unforgettable.
                </p>
                <div className="my-8">
                  <ZoomableImage 
                    src="/images/java-oop/apie-oom-nnemonic.png" 
                    alt="A PIE Mnemonic Poster" 
                    title="A PIE Mnemonic for OOP: Abstraction, Polymorphism, Inheritance, Encapsulation"
                  />
                </div>
              </section>

              <section id="cheat-sheets">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  3. The Ultimate One-Page Cheat Sheet
                </h3>
                <p className="mb-4">
                  For exam day, I needed a single page with keywords, access modifiers, and syntax.
                </p>
                <div className="my-8">
                  <ZoomableImage 
                    src="/images/java-oop/java-oop-final-exam-cheat-sheet.png" 
                    alt="Java OOP Final Exam Cheat Sheet" 
                    title="Java OOP Final Exam Cheat Sheet - Keywords & Syntax"
                  />
                </div>
              </section>

              <section id="decision-tree-oop">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  4. Comparison: Abstract Class vs. Interface
                </h3>
                <p className="mb-4">
                  This is a classic exam question. This flowchart helps decide which one to use.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                   <ZoomableImage 
                    src="/images/java-oop/abstract-class-vs-interface.png" 
                    alt="Abstract Class vs Interface Comparison" 
                    title="Comparison Table: Abstract Class vs Interface"
                  />
                  <ZoomableImage 
                    src="/images/java-oop/should-i-use-abstract-class-or-interface.png" 
                    alt="Abstract Class vs Interface Decision Tree" 
                    title="Decision Tree: When to use Abstract Class vs Interface"
                  />
                </div>
              </section>
            </div>

            {/* PART 2: INPUT METHODS */}
            <div className={`my-12 pt-8 border-t ${getBorderColor()}`}>
              <h2 className={`font-amiamie-round text-4xl font-black mb-8 ${getTextColor()}`}>
                Part 2: Java Input Methods
              </h2>

              <section id="input-comparison">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  1. Comparing Input Across Languages
                </h3>
                <p className="mb-4">
                  Understanding how Java differs from Python or C++ helped ground my knowledge.
                </p>
                <div className="my-8">
                  <ZoomableImage 
                    src="/images/java-oop/take-user-input-across-4-programming-languages.png" 
                    alt="Input Comparison Across Languages" 
                    title="How to take user input in Java vs Python vs C++ vs JavaScript"
                  />
                </div>
              </section>

              <section id="scanner-mastery">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  2. Mastering the Scanner Class
                </h3>
                <p className="mb-4">
                  The Scanner class is versatile but tricky. These visuals break down its methods and sources.
                </p>
                
                <div className={`border rounded-lg p-6 mb-6 ${getCardBg()}`}>
                  <h4 className={`font-bold mb-2 text-sm uppercase tracking-wider ${getAccentColor()}`}>Prompt Used:</h4>
                  <code className={`block p-4 rounded text-sm font-mono whitespace-pre-wrap ${getCodeBg()}`}>
{`Create a mind map diagram with "Scanner Class" in the center:
BRANCH 1: "Read from KEYBOARD" (System.in)
BRANCH 2: "Read from FILE" (new File)
BRANCH 3: "Read from STRING"
BRANCH 4: "Common Methods" (nextInt, nextLine)
Style: Colorful mind map, curved organic lines, icons at each branch`}
                  </code>
                </div>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <ZoomableImage 
                    src="/images/java-oop/scanner-class-mindmap.png" 
                    alt="Scanner Class Mind Map" 
                    title="Mind Map of Java Scanner Class Methods and Sources"
                  />
                  <ZoomableImage 
                    src="/images/java-oop/scanners-versatility.png" 
                    alt="Scanner Versatility" 
                    title="Scanner Class Versatility - Files, Strings, Input Streams"
                  />
                </div>
              </section>

              <section id="scanner-bug">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  3. The "Newline Bug" Visualized
                </h3>
                <p className="mb-4">
                  The most common Scanner mistake: mixing <code>nextInt()</code> and <code>nextLine()</code>. 
                  This poster warns you before you make the error.
                </p>
                <div className="my-8">
                  <ZoomableImage 
                    src="/images/java-oop/scanner-newline-bug.png" 
                    alt="Scanner Newline Bug Warning" 
                    title="Visual Warning: The Scanner nextInt() skipping nextLine() bug"
                  />
                </div>
              </section>

              <section id="input-decision">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  4. Which Input Method Should I Use?
                </h3>
                <p className="mb-4">
                  <code>Scanner</code> vs <code>BufferedReader</code> vs <code>System.in.read</code>. This flowchart makes the choice easy.
                </p>
                <div className="my-8">
                  <ZoomableImage 
                    src="/images/java-oop/which-java-method-should-i-use.png" 
                    alt="Java Input Method Decision Tree" 
                    title="Decision Tree: Scanner vs BufferedReader vs Console"
                  />
                </div>
              </section>
            </div>

            {/* PART 3: SWING & EVENTS */}
            <div className={`my-12 pt-8 border-t ${getBorderColor()}`}>
              <h2 className={`font-amiamie-round text-4xl font-black mb-8 ${getTextColor()}`}>
                Part 3: Java Swing & Events
              </h2>

              <section id="swing-hierarchy">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  1. Understanding the Hierarchy
                </h3>
                <p className="mb-4">
                  Swing components follow a strict parent-child relationship. This tree diagram shows how JFrames, JPanels, and components fit together.
                </p>
                <div className="my-8">
                  <ZoomableImage 
                    src="/images/java-oop/java-swing-component-hierarchy.png" 
                    alt="Java Swing Component Hierarchy" 
                    title="Tree Diagram: Java Swing Component Hierarchy (JFrame > JPanel > Components)"
                  />
                </div>
              </section>

              <section id="action-listeners">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  2. Demystifying ActionListeners
                </h3>
                <p className="mb-4">
                  There are three main ways to add an event listener. This visual compares them side-by-side.
                </p>
                
                <div className={`border rounded-lg p-6 mb-6 ${getCardBg()}`}>
                  <h4 className={`font-bold mb-2 text-sm uppercase tracking-wider ${getAccentColor()}`}>Prompt Used:</h4>
                  <code className={`block p-4 rounded text-sm font-mono whitespace-pre-wrap ${getCodeBg()}`}>
{`Create a 3-panel comparison showing different ways to register an ActionListener:

PANEL 1: "Named Inner Class" (Reusable, good for complex logic)
PANEL 2: "Anonymous Inner Class" (Inline, standard for simple buttons)
PANEL 3: "Lambda Expression" (Modern, shortest syntax)

Bottom comparison bar showing code length: Lambda < Anonymous < Named`}
                  </code>
                </div>

                <div className="my-8">
                   <ZoomableImage 
                    src="/images/java-oop/how-to-register-action-listener.png" 
                    alt="Ways to Register ActionListener" 
                    title="Comparison: 3 Ways to Register an ActionListener in Java"
                  />
                </div>
              </section>

              <section id="event-flow">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  3. The Flow of an Event
                </h3>
                <p className="mb-4">
                  What actually happens when you click a button? This flowchart traces the path from "User Action" to "Code Execution".
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                   <ZoomableImage 
                    src="/images/java-oop/java-handling-flowchart-mechanism.png" 
                    alt="Java Event Handling Flowchart" 
                    title="Flowchart: How Java Swing Handles Events (User Action -> Listener -> Handler)"
                  />
                  <ZoomableImage 
                    src="/images/java-oop/recipe-button-click-handler.png" 
                    alt="Button Click Handler Recipe" 
                    title="Code Recipe: Anatomy of a Button Click Handler"
                  />
                </div>
              </section>

              <section id="listener-decision">
                <h3 className={`font-amiamie-round text-2xl font-bold mb-4 ${getAccentColor()}`}>
                  4. Which Listener Pattern?
                </h3>
                <p className="mb-4">
                  Should you use an anonymous class or a lambda? Use this decision tree to pick the right tool for the job.
                </p>
                <div className="my-8">
                  <ZoomableImage 
                    src="/images/java-oop/which-listener-pattern-should-i-use.png" 
                    alt="Listener Pattern Decision Tree" 
                    title="Decision Tree: Anonymous Class vs Lambda Expression"
                  />
                </div>
              </section>
            </div>
            
            <section id="how-to-use" className={`mt-12 pt-8 border-t ${getBorderColor()}`}>
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                How You Can Do This
              </h2>
              <p className="mb-4">
                The power here isn't just in these specific images—it's in the method. You can use Gemini (or other AI image tools) to visualize 
                Biology processes, History timelines, or Physics concepts.
              </p>
              <h3 className={`font-amiamie-round text-xl font-bold mb-3 mt-6 ${getTextColor()}`}>
                The Formula for a Good Visual Prompt:
              </h3>
              <ol className={`list-decimal list-inside space-y-2 ml-4 mb-4 ${getMutedTextColor()}`}>
                <li><strong>Define the content:</strong> List exactly what text/concepts need to be on the image.</li>
                <li><strong>Describe the layout:</strong> "Split screen", "Flowchart", "4 quadrants", "Mind map".</li>
                <li><strong>Specify the style:</strong> "Clean infographic", "Hand-drawn aesthetic", "IKEA instruction style".</li>
                <li><strong>Ask for refinement:</strong> If the text comes out garbled, ask it to "Make it simpler" or focus on the structure.</li>
              </ol>
            </section>

            <section id="bottom-line">
              <h2 className={`font-amiamie-round text-3xl font-black mb-4 mt-8 ${getAccentColor()}`}>
                Conclusion
              </h2>
              <p className="mb-4">
                Turning text into images forced me to organize my thoughts and identify exactly what I didn't understand. 
                Whether you're prepping for an OOP exam, wrestling with Swing listeners, or debugging Scanner inputs, try "visual prompting" your way through it.
              </p>
              <p className="mb-4">
                 Good luck with your exams!
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
              <div className={`rounded-lg p-8 text-center ${
                theme === 'glass' 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border-2 border-cyan-400/50'
                  : theme === 'light'
                  ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-400/50'
                  : 'bg-gradient-to-r from-primary/20 to-gold/20 border-2 border-gold/50'
              }`}>
                <h2 className={`font-amiamie-round text-2xl font-black mb-4 ${getTextColor()}`}>
                  Need a Study Break?
                </h2>
                <p className={`font-amiamie mb-6 ${getMutedTextColor()}`}>
                  Check out my latest projects or get in touch if you need a website or video for your own portfolio.
                </p>
                <Link
                  to="/contact"
                  className={`inline-block px-8 py-4 font-amiamie-round font-bold rounded-lg transition-colors ${
                    theme === 'glass' 
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                      : theme === 'light'
                      ? 'bg-blue-600 text-white hover:bg-blue-500'
                      : 'bg-gold text-DarkLava hover:bg-gold/90'
                  }`}
                >
                  Get in Touch
                </Link>
              </div>
            </div>

          </div>
            </div>
          </article>

          <BlogSidebar currentSlug="gemini-visual-prompts-study-guide" />
        </div>
      </div>

      <Contact />
    </>
  );
};

export default GeminiStudyGuide;

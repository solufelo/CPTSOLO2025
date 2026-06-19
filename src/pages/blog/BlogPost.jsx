/**
 * Dynamic Blog Post Page
 * Renders blog posts from database or static files
 */

import { useEffect, useState, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../lib/supabase';
import Navbar from '../../sections/Navbar';
import Contact from '../../sections/Contact';
import LogoHeader from '../../components/LogoHeader';
import BlogSidebar from '../../components/BlogSidebar';
import ShareButton from '../../components/ShareButton';
import BlogAuthorBio from '../../components/BlogAuthorBio';
import TableOfContents from '../../components/TableOfContents';
import { blogArticles, getRelatedPosts } from '../../data/blogArticles';
import { useTheme } from '../../context/ThemeContext';

// Import static blog post components
import WhatIsVoiceTag from './WhatIsVoiceTag';
import MetroBooninTag from './MetroBooninTag';
import BestVoiceTagsTrap from './BestVoiceTagsTrap';
import VideographyBrampton from './VideographyBrampton';
import WebDeveloperBrampton from './WebDeveloperBrampton';
import SmallBusinessWebsiteBrampton from './SmallBusinessWebsiteBrampton';
import WebsiteSEOOptimization from './WebsiteSEOOptimization';
import AIToolsCreativeWorkflow from './AIToolsCreativeWorkflow';
import AIToolsVideography from './AIToolsVideography';
import AIToolsStudents from './AIToolsStudents';
import SoloBodyRecode from './SoloBodyRecode';
import StudyOptimizationGuide from './StudyOptimizationGuide';
import GeminiStudyGuide from './GeminiStudyGuide';

const BlogPost = () => {
  const { slug } = useParams();
  const { theme } = useTheme();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Map of static blog post components
  const staticPosts = {
    'what-is-a-voice-tag': WhatIsVoiceTag,
    'metro-boomin-producer-tag': MetroBooninTag,
    'best-voice-tags-trap': BestVoiceTagsTrap,
    'videography-brampton': VideographyBrampton,
    'web-developer-brampton': WebDeveloperBrampton,
    'small-business-website-brampton': SmallBusinessWebsiteBrampton,
    'how-to-optimize-website-for-seo': WebsiteSEOOptimization,
    'ai-tools-creative-workflow': AIToolsCreativeWorkflow,
    'ai-tools-videography': AIToolsVideography,
    'ai-tools-students': AIToolsStudents,
    'solo-body-recode': SoloBodyRecode,
    'study-optimization-guide': StudyOptimizationGuide,
    'gemini-visual-prompts-study-guide': GeminiStudyGuide,
  };

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

  const getProseClass = () => {
    switch(theme) {
      case 'glass': 
        return `prose prose-invert max-w-none font-amiamie text-white/80
                prose-headings:text-white prose-headings:font-amiamie-round
                prose-headings:scroll-mt-24
                prose-p:text-white/70 prose-p:leading-relaxed
                prose-a:text-cyan-400 prose-a:no-underline prose-a:hover:underline
                prose-strong:text-white prose-code:text-cyan-400
                prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
                prose-ul:text-white/70 prose-ol:text-white/70
                prose-li:text-white/70
                prose-img:rounded-lg prose-img:border prose-img:border-white/10
                prose-blockquote:border-cyan-400 prose-blockquote:text-white/70`;
      case 'light':
        return `prose max-w-none font-amiamie text-gray-700
                prose-headings:text-gray-900 prose-headings:font-amiamie-round
                prose-headings:scroll-mt-24
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline prose-a:hover:underline
                prose-strong:text-gray-900 prose-code:text-blue-600
                prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200
                prose-ul:text-gray-600 prose-ol:text-gray-600
                prose-li:text-gray-600
                prose-img:rounded-lg prose-img:border prose-img:border-gray-200
                prose-blockquote:border-blue-600 prose-blockquote:text-gray-600`;
      default:
        return `prose prose-invert max-w-none font-amiamie text-SageGray
                prose-headings:text-primary prose-headings:font-amiamie-round
                prose-headings:scroll-mt-24
                prose-p:text-SageGray prose-p:leading-relaxed
                prose-a:text-gold prose-a:no-underline prose-a:hover:underline
                prose-strong:text-primary prose-code:text-gold
                prose-pre:bg-primary/10 prose-pre:border prose-pre:border-SageGray/30
                prose-ul:text-SageGray prose-ol:text-SageGray
                prose-li:text-SageGray
                prose-img:rounded-lg prose-img:border prose-img:border-SageGray/30
                prose-blockquote:border-gold prose-blockquote:text-SageGray`;
    }
  };

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      
      // First check if it's a static post
      if (staticPosts[slug]) {
        setPost({ slug, isStatic: true });
        setLoading(false);
        return;
      }

      // Otherwise, fetch from database
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Post not found
          setNotFound(true);
        } else {
          throw error;
        }
      } else {
        setPost({ ...data, isStatic: false });
      }
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <LogoHeader />
        <Navbar />
        <div className={`min-h-screen py-20 px-4 sm:px-8 ${getSectionBg()}`}>
          <div className="max-w-4xl mx-auto text-center">
            <p className={getMutedTextColor()}>Loading blog post...</p>
          </div>
        </div>
      </>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  // Render static post component
  if (post.isStatic) {
    const StaticPostComponent = staticPosts[post.slug];
    // Static components need to handle their own theme context or we need to wrap them/pass props
    // Assuming static components need to be updated individually or they use global theme context
    // For now, let's wrap them in a div with theme styles if they don't handle it
    return (
        <div className={getSectionBg()}>
            <StaticPostComponent />
        </div>
    );
  }

  // Render database post
  const contentRef = useRef(null);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://captainsolo.ca/blog/${post.slug}`;
  const relatedPosts = getRelatedPosts(post.category, post.slug, 3);

  return (
    <>
      <Helmet>
        <title>{post.title} | CaptainSolo Blog</title>
        <meta name="description" content={post.description || post.title} />
        <meta name="keywords" content={post.category} />
        <link rel="canonical" href={`https://captainsolo.ca/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || post.title} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <LogoHeader />
      <Navbar />

      <section className={`min-h-screen py-20 px-4 sm:px-8 ${getSectionBg()}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="flex-1 min-w-0">
              <div className="max-w-4xl">
                {/* Breadcrumb */}
                <nav className={`mb-8 text-sm ${getMutedTextColor()}`}>
                  <Link to="/" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'} transition`}>Home</Link>
                  <span className="mx-2">/</span>
                  <Link to="/blog" className={`hover:${theme === 'glass' ? 'text-cyan-400' : theme === 'light' ? 'text-blue-600' : 'text-gold'} transition`}>Blog</Link>
                  <span className="mx-2">/</span>
                  <span className={getTextColor()}>{post.title}</span>
                </nav>

                {/* Header */}
                <header className="mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 border text-xs font-amiamie-round font-bold rounded ${getTagBg()}`}>
                      {post.category}
                    </span>
                    <span className={`text-xs font-amiamie ${getMutedTextColor()}`}>{post.read_time || '5 min'} read</span>
                    <time className={`text-xs font-amiamie ${getMutedTextColor()}`} dateTime={post.created_at}>
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                  
                  <h1 className={`font-amiamie-round text-4xl sm:text-5xl md:text-6xl font-black mb-4 ${getTextColor()}`}>
                    {post.title}
                  </h1>
                  
                  {post.description && (
                    <p className={`font-amiamie text-lg mb-6 ${getMutedTextColor()}`}>
                      {post.description}
                    </p>
                  )}

                  {/* Share Button */}
                  <div className="flex items-center gap-4 mb-8">
                    <ShareButton url={currentUrl} title={post.title} description={post.description} />
                  </div>
                </header>

                {/* Table of Contents */}
                <div ref={contentRef}>
                  <TableOfContents contentRef={contentRef} />
                </div>

                {/* Content */}
                <div 
                  ref={contentRef}
                  className={getProseClass()}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Author Bio */}
                <BlogAuthorBio />

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className={`mt-12 pt-8 border-t ${getBorderColor()}`}>
                    <h2 className={`font-amiamie-round text-2xl font-black mb-6 ${getTextColor()}`}>
                      Related Articles
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
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
                  </div>
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
                      Have a Project in Mind?
                    </h2>
                    <p className={`font-amiamie mb-6 ${getMutedTextColor()}`}>
                      Let's work together to bring your vision to life. Get in touch for web development, 
                      videography, or content creation services.
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
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <BlogSidebar currentSlug={post.slug} />
            </aside>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
};

export default BlogPost;

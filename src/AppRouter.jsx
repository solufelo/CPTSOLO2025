import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import ReadingProgress from './components/ReadingProgress';
import App from './App';

// Everything except the homepage is code-split so each route loads only its own
// JS. This keeps the initial bundle small and makes every page fast to reach.
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectsDemoPage = lazy(() => import('./pages/ProjectsDemoPage'));
const VoiceTagsPage = lazy(() => import('./pages/VoiceTagsPage'));

// Blog pages
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));
const WhatIsVoiceTag = lazy(() => import('./pages/blog/WhatIsVoiceTag'));
const MetroBooninTag = lazy(() => import('./pages/blog/MetroBooninTag'));
const BestVoiceTagsTrap = lazy(() => import('./pages/blog/BestVoiceTagsTrap'));
const VideographyBrampton = lazy(() => import('./pages/blog/VideographyBrampton'));
const WebDeveloperBrampton = lazy(() => import('./pages/blog/WebDeveloperBrampton'));
const SmallBusinessWebsiteBrampton = lazy(() => import('./pages/blog/SmallBusinessWebsiteBrampton'));
const WebsiteSEOOptimization = lazy(() => import('./pages/blog/WebsiteSEOOptimization'));
const AIToolsCreativeWorkflow = lazy(() => import('./pages/blog/AIToolsCreativeWorkflow'));
const AIToolsVideography = lazy(() => import('./pages/blog/AIToolsVideography'));
const AIToolsStudents = lazy(() => import('./pages/blog/AIToolsStudents'));
const SoloBodyRecode = lazy(() => import('./pages/blog/SoloBodyRecode'));
const StudyOptimizationGuide = lazy(() => import('./pages/blog/StudyOptimizationGuide'));
const GeminiStudyGuide = lazy(() => import('./pages/blog/GeminiStudyGuide'));

// Auth & Order pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const VoiceTagOrderPage = lazy(() => import('./pages/VoiceTagOrderPage'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const OrderCancel = lazy(() => import('./pages/OrderCancel'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const WebDevelopmentOrderPage = lazy(() => import('./pages/WebDevelopmentOrderPage'));
const VideographyOrderPage = lazy(() => import('./pages/VideographyOrderPage'));
const OrderDetailPage = lazy(() => import('./pages/OrderDetailPage'));
const Settings = lazy(() => import('./pages/Settings'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));

// Admin pages
const AdminBlogEditor = lazy(() => import('./pages/admin/AdminBlogEditor'));
const AdminProjectsPage = lazy(() => import('./pages/admin/AdminProjectsPage'));
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminUserManagement = lazy(() => import('./pages/admin/AdminUserManagement'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

const RouteFallback = () => (
  <div className="min-h-screen bg-DarkLava flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
  </div>
);

/**
 * Main Application Router
 * Handles routing between main portfolio, voice tags landing page, and blog
 */
const AppRouter = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          {/* Keyboard users can jump straight past the nav to the content */}
          <a href="#main-content" className="skip-link">Skip to content</a>
          {/* Site-wide Reading Progress Bar */}
          <ReadingProgress />
          <main id="main-content" tabIndex={-1}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              {/* Main Portfolio Page */}
              <Route path="/" element={<App />} />

              {/* Contact Page */}
              <Route path="/contact" element={<ContactPage />} />

              {/* Interactive Projects Demo Dashboard */}
              <Route path="/demo" element={<ProjectsDemoPage />} />

              {/* Voice Tags Landing Page - SEO Optimized */}
              <Route path="/voice-tags" element={<VoiceTagsPage />} />

              {/* Blog Routes - SEO Content Hub */}
              <Route path="/blog" element={<BlogIndex />} />
              {/* Dynamic blog post route - handles both static and database posts */}
              <Route path="/blog/:slug" element={<BlogPost />} />
              {/* Keep static routes for backward compatibility */}
              <Route path="/blog/what-is-a-voice-tag" element={<WhatIsVoiceTag />} />
              <Route path="/blog/metro-boomin-producer-tag" element={<MetroBooninTag />} />
              <Route path="/blog/best-voice-tags-trap" element={<BestVoiceTagsTrap />} />
              <Route path="/blog/videography-brampton" element={<VideographyBrampton />} />
              <Route path="/blog/web-developer-brampton" element={<WebDeveloperBrampton />} />
              <Route path="/blog/small-business-website-brampton" element={<SmallBusinessWebsiteBrampton />} />
              <Route path="/blog/how-to-optimize-website-for-seo" element={<WebsiteSEOOptimization />} />
              <Route path="/blog/ai-tools-creative-workflow" element={<AIToolsCreativeWorkflow />} />
              <Route path="/blog/ai-tools-videography" element={<AIToolsVideography />} />
              <Route path="/blog/ai-tools-students" element={<AIToolsStudents />} />
              <Route path="/blog/solo-body-recode" element={<SoloBodyRecode />} />
              <Route path="/blog/study-optimization-guide" element={<StudyOptimizationGuide />} />
              <Route path="/blog/gemini-visual-prompts-study-guide" element={<GeminiStudyGuide />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<LoginPage />} />

              {/* Order Routes */}
              <Route path="/order/voice-tag" element={<VoiceTagOrderPage />} />
              <Route path="/order/web-development" element={<WebDevelopmentOrderPage />} />
              <Route path="/order/videography" element={<VideographyOrderPage />} />
              <Route path="/order/:orderId" element={<OrderDetailPage />} />
              <Route path="/order/success" element={<OrderSuccess />} />
              <Route path="/order/cancel" element={<OrderCancel />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Admin Routes */}
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/dashboard/admin/blog" element={<AdminBlogEditor />} />
              <Route path="/dashboard/admin/projects" element={<AdminProjectsPage />} />
              <Route path="/dashboard/admin/orders" element={<AdminOrdersPage />} />
              <Route path="/dashboard/admin/users" element={<AdminUserManagement />} />
              <Route path="/dashboard/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/dashboard/admin/settings" element={<AdminSettings />} />

              {/* User Settings */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/dashboard/messages" element={<MessagesPage />} />

              {/* Legal Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </Suspense>
          </main>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default AppRouter;

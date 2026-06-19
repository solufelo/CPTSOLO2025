import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import ReadingProgress from './components/ReadingProgress';
import App from './App';
import VoiceTagsPage from './pages/VoiceTagsPage';

// Blog pages
import BlogIndex from './pages/blog/BlogIndex';
import BlogPost from './pages/blog/BlogPost';
import WhatIsVoiceTag from './pages/blog/WhatIsVoiceTag';
import MetroBooninTag from './pages/blog/MetroBooninTag';
import BestVoiceTagsTrap from './pages/blog/BestVoiceTagsTrap';
import VideographyBrampton from './pages/blog/VideographyBrampton';
import WebDeveloperBrampton from './pages/blog/WebDeveloperBrampton';
import SmallBusinessWebsiteBrampton from './pages/blog/SmallBusinessWebsiteBrampton';
import WebsiteSEOOptimization from './pages/blog/WebsiteSEOOptimization';
import AIToolsCreativeWorkflow from './pages/blog/AIToolsCreativeWorkflow';
import AIToolsVideography from './pages/blog/AIToolsVideography';
import AIToolsStudents from './pages/blog/AIToolsStudents';
import SoloBodyRecode from './pages/blog/SoloBodyRecode';
import StudyOptimizationGuide from './pages/blog/StudyOptimizationGuide';
import GeminiStudyGuide from './pages/blog/GeminiStudyGuide';
import ContactPage from './pages/ContactPage';

// Auth & Order pages
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import VoiceTagOrderPage from './pages/VoiceTagOrderPage';
import OrderSuccess from './pages/OrderSuccess';
import OrderCancel from './pages/OrderCancel';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdminBlogEditor from './pages/admin/AdminBlogEditor';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminUserManagement from './pages/admin/AdminUserManagement';
import AdminSettings from './pages/admin/AdminSettings';
import WebDevelopmentOrderPage from './pages/WebDevelopmentOrderPage';
import VideographyOrderPage from './pages/VideographyOrderPage';
import OrderDetailPage from './pages/OrderDetailPage';
import Settings from './pages/Settings';
import MessagesPage from './pages/MessagesPage';

/**
 * Main Application Router
 * Handles routing between main portfolio, voice tags landing page, and blog
 */
const AppRouter = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          {/* Site-wide Reading Progress Bar */}
          <ReadingProgress />
          <Routes>
            {/* Main Portfolio Page */}
            <Route path="/" element={<App />} />
            
            {/* Contact Page */}
            <Route path="/contact" element={<ContactPage />} />
            
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
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default AppRouter;


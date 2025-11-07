import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import VoiceTagsPage from './pages/VoiceTagsPage';

// Blog pages
import BlogIndex from './pages/blog/BlogIndex';
import WhatIsVoiceTag from './pages/blog/WhatIsVoiceTag';
import MetroBooninTag from './pages/blog/MetroBooninTag';
import BestVoiceTagsTrap from './pages/blog/BestVoiceTagsTrap';
import VideographyBrampton from './pages/blog/VideographyBrampton';
import WebDeveloperBrampton from './pages/blog/WebDeveloperBrampton';
import SmallBusinessWebsiteBrampton from './pages/blog/SmallBusinessWebsiteBrampton';

/**
 * Main Application Router
 * Handles routing between main portfolio, voice tags landing page, and blog
 */
const AppRouter = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Main Portfolio Page */}
          <Route path="/" element={<App />} />
          
          {/* Voice Tags Landing Page - SEO Optimized */}
          <Route path="/voice-tags" element={<VoiceTagsPage />} />
          
          {/* Blog Routes - SEO Content Hub */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/what-is-a-voice-tag" element={<WhatIsVoiceTag />} />
          <Route path="/blog/metro-boomin-producer-tag" element={<MetroBooninTag />} />
          <Route path="/blog/best-voice-tags-trap" element={<BestVoiceTagsTrap />} />
          <Route path="/blog/videography-brampton" element={<VideographyBrampton />} />
          <Route path="/blog/web-developer-brampton" element={<WebDeveloperBrampton />} />
          <Route path="/blog/small-business-website-brampton" element={<SmallBusinessWebsiteBrampton />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default AppRouter;


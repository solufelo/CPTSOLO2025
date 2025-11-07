import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import VoiceTagsPage from './pages/VoiceTagsPage';

// Blog pages
import BlogIndex from './pages/blog/BlogIndex';
import WhatIsVoiceTag from './pages/blog/WhatIsVoiceTag';
import MetroBooninTag from './pages/blog/MetroBooninTag';
import BestVoiceTagsTrap from './pages/blog/BestVoiceTagsTrap';

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
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default AppRouter;


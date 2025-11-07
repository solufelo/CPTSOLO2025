import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import VoiceTagsPage from './pages/VoiceTagsPage';

/**
 * Main Application Router
 * Handles routing between main portfolio and voice tags landing page
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
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default AppRouter;


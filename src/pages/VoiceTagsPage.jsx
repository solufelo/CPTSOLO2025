import Navbar from '../sections/Navbar';
import VoiceTags from '../sections/VoiceTags';
import Contact from '../sections/Contact';
import VoiceTagsSEO from '../components/VoiceTagsSEO';

/**
 * Voice Tags Landing Page
 * Dedicated SEO-optimized page for voice tag services
 * Includes navbar for navigation back to main portfolio
 */
const VoiceTagsPage = () => {
  return (
    <>
      {/* SEO Head Management */}
      <VoiceTagsSEO />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Voice Tags Content */}
      <VoiceTags />
      
      {/* Contact Section */}
      <Contact />
    </>
  );
};

export default VoiceTagsPage;


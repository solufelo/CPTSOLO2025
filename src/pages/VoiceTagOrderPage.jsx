/**
 * Voice Tag Order Page
 * Dedicated page for voice tag orders
 */

import AuthGuard from '../components/auth/AuthGuard';
import VoiceTagOrderForm from '../components/orders/VoiceTagOrderForm';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../sections/Navbar';

const VoiceTagOrderPage = () => {
  return (
    <AuthGuard>
      <LogoHeader />
      <Navbar />
      <div className="min-h-screen bg-DarkLava py-10">
        <VoiceTagOrderForm />
      </div>
    </AuthGuard>
  );
};

export default VoiceTagOrderPage;


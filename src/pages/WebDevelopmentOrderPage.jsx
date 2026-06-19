/**
 * Web Development Order Page
 * Dedicated page for web development orders
 */

import AuthGuard from '../components/auth/AuthGuard';
import WebDevelopmentOrderForm from '../components/orders/WebDevelopmentOrderForm';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../sections/Navbar';

const WebDevelopmentOrderPage = () => {
  return (
    <AuthGuard>
      <LogoHeader />
      <Navbar />
      <div className="min-h-screen bg-DarkLava py-10">
        <WebDevelopmentOrderForm />
      </div>
    </AuthGuard>
  );
};

export default WebDevelopmentOrderPage;


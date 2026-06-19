/**
 * Videography Order Page
 * Dedicated page for videography orders
 */

import AuthGuard from '../components/auth/AuthGuard';
import VideographyOrderForm from '../components/orders/VideographyOrderForm';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../sections/Navbar';

const VideographyOrderPage = () => {
  return (
    <AuthGuard>
      <LogoHeader />
      <Navbar />
      <div className="min-h-screen bg-DarkLava py-10">
        <VideographyOrderForm />
      </div>
    </AuthGuard>
  );
};

export default VideographyOrderPage;


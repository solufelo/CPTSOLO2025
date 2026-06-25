/**
 * Admin Dashboard
 * Dedicated admin dashboard with admin-specific features
 */

import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthGuard from '../../components/auth/AuthGuard';
import LogoHeader from '../../components/LogoHeader';
import Navbar from '../../sections/Navbar';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is admin
  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  useEffect(() => {
    if (user && !isAdmin) {
      // Redirect non-admin users to regular dashboard
      navigate('/dashboard');
    }
  }, [user, isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <AuthGuard>
      <LogoHeader />
      <Navbar />
      
      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-amiamie-round text-4xl font-black text-gold mb-2">
                Admin Dashboard
              </h1>
              <p className="text-SageGray">
                Welcome back, {user?.email}
              </p>
              <p className="text-sm text-gold/80 mt-1">
                Administrator Access
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                         hover:bg-primary/20 transition-colors"
              >
                User Dashboard
              </button>
              <button
                onClick={signOut}
                className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                         hover:bg-primary/20 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Admin Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Projects / Showcase Management */}
            <button
              onClick={() => navigate('/dashboard/admin/projects')}
              className="bg-gold/10 border-2 border-gold/30 rounded-lg p-6 hover:border-gold transition-all text-left group"
            >
              <div className="text-4xl mb-3">🗂️</div>
              <h3 className="font-amiamie-round text-xl font-black text-gold mb-2 group-hover:text-gold/90">
                Projects / Showcase
              </h3>
              <p className="text-sm text-SageGray">
                Add and edit portfolio work shown on the homepage
              </p>
            </button>

            {/* Blog Management */}
            <button
              onClick={() => navigate('/dashboard/admin/blog')}
              className="bg-gold/10 border-2 border-gold/30 rounded-lg p-6 hover:border-gold transition-all text-left group"
            >
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-amiamie-round text-xl font-black text-gold mb-2 group-hover:text-gold/90">
                Blog Management
              </h3>
              <p className="text-sm text-SageGray">
                Create, edit, and manage blog posts
              </p>
            </button>

            {/* Order Management */}
            <button
              onClick={() => navigate('/dashboard/admin/orders')}
              className="bg-gold/10 border-2 border-gold/30 rounded-lg p-6 hover:border-gold transition-all text-left group"
            >
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-amiamie-round text-xl font-black text-gold mb-2 group-hover:text-gold/90">
                Order Management
              </h3>
              <p className="text-sm text-SageGray">
                View and manage all customer orders
              </p>
            </button>

            {/* User Management */}
            <button
              onClick={() => navigate('/dashboard/admin/users')}
              className="bg-gold/10 border-2 border-gold/30 rounded-lg p-6 hover:border-gold transition-all text-left group"
            >
              <div className="text-4xl mb-3">👥</div>
              <h3 className="font-amiamie-round text-xl font-black text-gold mb-2 group-hover:text-gold/90">
                User Management
              </h3>
              <p className="text-sm text-SageGray">
                View and manage all users
              </p>
            </button>

            {/* Analytics */}
            <button
              onClick={() => navigate('/dashboard/admin/analytics')}
              className="bg-gold/10 border-2 border-gold/30 rounded-lg p-6 hover:border-gold transition-all text-left group"
            >
              <div className="text-4xl mb-3">📈</div>
              <h3 className="font-amiamie-round text-xl font-black text-gold mb-2 group-hover:text-gold/90">
                Analytics
              </h3>
              <p className="text-sm text-SageGray">
                View business metrics and insights
              </p>
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate('/dashboard/admin/settings')}
              className="bg-gold/10 border-2 border-gold/30 rounded-lg p-6 hover:border-gold transition-all text-left group"
            >
              <div className="text-4xl mb-3">⚙️</div>
              <h3 className="font-amiamie-round text-xl font-black text-gold mb-2 group-hover:text-gold/90">
                Settings
              </h3>
              <p className="text-sm text-SageGray">
                Configure admin preferences
              </p>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
            <h2 className="font-amiamie-round text-2xl font-black text-primary mb-4">
              Quick Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/5 border border-SageGray/30 rounded-lg p-4">
                <p className="text-sm text-SageGray mb-1">Total Orders</p>
                <p className="text-2xl font-black text-primary">-</p>
                <p className="text-xs text-SageGray mt-1">View in Order Management</p>
              </div>
              <div className="bg-primary/5 border border-SageGray/30 rounded-lg p-4">
                <p className="text-sm text-SageGray mb-1">Blog Posts</p>
                <p className="text-2xl font-black text-primary">-</p>
                <p className="text-xs text-SageGray mt-1">View in Blog Management</p>
              </div>
              <div className="bg-primary/5 border border-SageGray/30 rounded-lg p-4">
                <p className="text-sm text-SageGray mb-1">Published Posts</p>
                <p className="text-2xl font-black text-primary">-</p>
                <p className="text-xs text-SageGray mt-1">Public blog posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminDashboard;


/**
 * Admin Analytics Dashboard
 * Shows key metrics and analytics for the business
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import AuthGuard from '../../components/auth/AuthGuard';
import LogoHeader from '../../components/LogoHeader';
import Navbar from '../../sections/Navbar';

const AdminAnalytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalUsers: 0,
    totalMessages: 0,
    totalRevisions: 0,
    recentOrders: [],
  });

  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchAnalytics();
  }, [user, isAdmin, navigate]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch all orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch all users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all messages
      const { data: messages, error: messagesError } = await supabase
        .from('order_messages')
        .select('id');

      if (messagesError) throw messagesError;

      // Fetch all revisions
      const { data: revisions, error: revisionsError } = await supabase
        .from('order_revisions')
        .select('id');

      if (revisionsError) throw revisionsError;

      // Calculate statistics
      const totalRevenue = orders?.reduce((sum, order) => sum + (parseFloat(order.price) || 0), 0) || 0;
      const pendingOrders = orders?.filter(o => o.status === 'pending' || o.status === 'paid').length || 0;
      const completedOrders = orders?.filter(o => o.status === 'completed').length || 0;

      setStats({
        totalOrders: orders?.length || 0,
        totalRevenue,
        pendingOrders,
        completedOrders,
        totalUsers: profiles?.length || 0,
        totalMessages: messages?.length || 0,
        totalRevisions: revisions?.length || 0,
        recentOrders: orders?.slice(0, 10) || [],
      });
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <AuthGuard>
      <LogoHeader />
      <Navbar />
      
      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-amiamie-round text-4xl font-black text-primary mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-SageGray">
                Key metrics and insights for your business
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard/admin')}
              className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                       hover:bg-primary/20 transition-colors"
            >
              ← Back to Admin Dashboard
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-SageGray">Loading analytics...</p>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Revenue */}
                <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-amiamie-round font-bold text-primary text-sm">
                      Total Revenue
                    </h3>
                    <span className="text-2xl">💰</span>
                  </div>
                  <p className="text-3xl font-black text-gold">
                    ${stats.totalRevenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-SageGray mt-2">
                    From {stats.totalOrders} orders
                  </p>
                </div>

                {/* Total Orders */}
                <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-amiamie-round font-bold text-primary text-sm">
                      Total Orders
                    </h3>
                    <span className="text-2xl">📦</span>
                  </div>
                  <p className="text-3xl font-black text-gold">
                    {stats.totalOrders}
                  </p>
                  <p className="text-xs text-SageGray mt-2">
                    {stats.completedOrders} completed
                  </p>
                </div>

                {/* Pending Orders */}
                <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-amiamie-round font-bold text-primary text-sm">
                      Pending Orders
                    </h3>
                    <span className="text-2xl">⏳</span>
                  </div>
                  <p className="text-3xl font-black text-yellow-400">
                    {stats.pendingOrders}
                  </p>
                  <p className="text-xs text-SageGray mt-2">
                    Needs attention
                  </p>
                </div>

                {/* Total Users */}
                <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-amiamie-round font-bold text-primary text-sm">
                      Total Users
                    </h3>
                    <span className="text-2xl">👥</span>
                  </div>
                  <p className="text-3xl font-black text-gold">
                    {stats.totalUsers}
                  </p>
                  <p className="text-xs text-SageGray mt-2">
                    Registered users
                  </p>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Messages */}
                <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-amiamie-round font-bold text-primary text-sm">
                      Total Messages
                    </h3>
                    <span className="text-2xl">💬</span>
                  </div>
                  <p className="text-3xl font-black text-gold">
                    {stats.totalMessages}
                  </p>
                  <p className="text-xs text-SageGray mt-2">
                    Chat messages
                  </p>
                </div>

                {/* Revisions */}
                <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-amiamie-round font-bold text-primary text-sm">
                      Revision Requests
                    </h3>
                    <span className="text-2xl">🔄</span>
                  </div>
                  <p className="text-3xl font-black text-gold">
                    {stats.totalRevisions}
                  </p>
                  <p className="text-xs text-SageGray mt-2">
                    Total revisions
                  </p>
                </div>

                {/* Completion Rate */}
                <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-amiamie-round font-bold text-primary text-sm">
                      Completion Rate
                    </h3>
                    <span className="text-2xl">✅</span>
                  </div>
                  <p className="text-3xl font-black text-gold">
                    {stats.totalOrders > 0 
                      ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)
                      : 0}%
                  </p>
                  <p className="text-xs text-SageGray mt-2">
                    Orders completed
                  </p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
                <h2 className="font-amiamie-round text-2xl font-black text-primary mb-4">
                  Recent Orders
                </h2>
                {stats.recentOrders.length === 0 ? (
                  <p className="text-SageGray">No orders yet.</p>
                ) : (
                  <div className="space-y-2">
                    {stats.recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-primary/5 border border-SageGray/30 rounded-lg p-4 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-bold text-primary">
                            {order.service_type} - {order.package_type}
                          </p>
                          <p className="text-sm text-SageGray">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded text-xs font-bold border ${
                            order.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' :
                            'bg-blue-500/20 text-blue-400 border-blue-500/50'
                          }`}>
                            {order.status}
                          </span>
                          <span className="text-lg font-bold text-gold">
                            ${order.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminAnalytics;


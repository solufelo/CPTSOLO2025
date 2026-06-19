/**
 * User Dashboard
 * View orders, track status, and manage account
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import AuthGuard from '../components/auth/AuthGuard';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../sections/Navbar';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is admin
  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  useEffect(() => {
    if (user) {
      // Redirect admin users to admin dashboard
      if (isAdmin) {
        navigate('/dashboard/admin');
        return;
      }
      fetchOrders();
    }
  }, [user, isAdmin, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First, check if orders table exists
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        // If table doesn't exist, show helpful error
        if (fetchError.code === 'PGRST116' || fetchError.message.includes('schema cache')) {
          setError('Orders table not found. Please run the database schema in Supabase Dashboard → SQL Editor. See supabase-schema.sql file.');
        } else {
          throw fetchError;
        }
        setOrders([]);
      } else {
        setOrders(data || []);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      paid: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      'in-progress': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      completed: 'bg-green-500/20 text-green-400 border-green-500/50',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/50',
    };
    return colors[status] || colors.pending;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <AuthGuard>
      <LogoHeader />
      <Navbar />
      
      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-amiamie-round text-4xl font-black text-primary mb-2">
                Dashboard
              </h1>
              <p className="text-SageGray">
                Welcome back, {user?.email}
              </p>
            </div>
            <button
              onClick={signOut}
              className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                       hover:bg-primary/20 transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Orders Section */}
          <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8">
            <h2 className="font-amiamie-round text-2xl font-black text-primary mb-6">
              Your Orders
            </h2>

            {loading && (
              <div className="text-center py-12">
                <p className="text-SageGray">Loading orders...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded p-3 mb-6">
                {error}
              </div>
            )}

            {!loading && !error && orders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-SageGray mb-4">No orders yet.</p>
                <Link
                  to="/order/voice-tag"
                  className="inline-block bg-gold text-DarkLava font-amiamie-round font-bold py-3 px-6 rounded-lg
                           hover:bg-gold/90 transition-colors"
                >
                  Place Your First Order
                </Link>
              </div>
            )}

            {!loading && orders.length > 0 && (
              <div className="space-y-4">
                {orders.map((order) => {
                  const requirements = typeof order.requirements === 'string'
                    ? JSON.parse(order.requirements)
                    : order.requirements;

                  return (
                    <div
                      key={order.id}
                      className="bg-primary/5 border border-SageGray/30 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-amiamie-round text-xl font-bold text-primary mb-2">
                            {order.service_type === 'voice-tag' && 'Voice Tag'}
                            {order.service_type === 'web-development' && 'Web Development'}
                            {order.service_type === 'videography' && 'Videography'}
                            {' '}
                            {order.package_type && `- ${order.package_type.charAt(0).toUpperCase() + order.package_type.slice(1)}`}
                          </h3>
                          <p className="text-sm text-SageGray">
                            Order #{order.id.slice(0, 8)} • {formatDate(order.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded text-xs font-bold border ${getStatusColor(order.status)}`}>
                            {order.status.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className="text-lg font-bold text-gold">
                            ${order.price}
                          </span>
                        </div>
                      </div>

                      {requirements && (
                        <div className="mt-4 pt-4 border-t border-SageGray/30">
                          <h4 className="font-amiamie-round font-bold text-primary mb-2">
                            Order Details:
                          </h4>
                          <div className="text-sm text-SageGray space-y-1">
                            {requirements.voiceTagText && (
                              <p><strong>Voice Tag:</strong> {requirements.voiceTagText}</p>
                            )}
                            {requirements.toneOfVoice && (
                              <p><strong>Tone:</strong> {requirements.toneOfVoice}</p>
                            )}
                            {requirements.effects && requirements.effects.length > 0 && (
                              <p><strong>Effects:</strong> {requirements.effects.join(', ')}</p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-SageGray/30 flex gap-4">
                        <Link
                          to={`/order/${order.id}`}
                          className="text-gold hover:underline text-sm font-amiamie-round font-bold"
                        >
                          View Details & Chat →
                        </Link>
                        {order.status === 'completed' && (
                          <a
                            href="#"
                            className="text-green-400 hover:underline text-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              alert('Download link will be available when files are uploaded');
                            }}
                          >
                            Download Deliverables →
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>


                  {/* Quick Actions */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Link
                      to="/order/voice-tag"
                      className="bg-primary/10 border border-SageGray/30 rounded-lg p-6 hover:border-gold transition text-center"
                    >
                      <div className="text-3xl mb-2">🎤</div>
                      <h3 className="font-amiamie-round font-bold text-primary mb-2">
                        Order Voice Tag
                      </h3>
                      <p className="text-sm text-SageGray">Get a custom producer tag</p>
                    </Link>
                    <Link
                      to="/order/web-development"
                      className="bg-primary/10 border border-SageGray/30 rounded-lg p-6 hover:border-gold transition text-center"
                    >
                      <div className="text-3xl mb-2">💻</div>
                      <h3 className="font-amiamie-round font-bold text-primary mb-2">
                        Order Website
                      </h3>
                      <p className="text-sm text-SageGray">Get a professional website</p>
                    </Link>
                    <Link
                      to="/dashboard/messages"
                      className="bg-primary/10 border border-SageGray/30 rounded-lg p-6 hover:border-gold transition text-center"
                    >
                      <div className="text-3xl mb-2">🎥</div>
                      <h3 className="font-amiamie-round font-bold text-primary mb-2">
                        Video Services
                      </h3>
                      <p className="text-sm text-SageGray">Message me about video projects</p>
                    </Link>
                  </div>

                  {/* Messages Link */}
                  <div className="mt-8">
                    <Link
                      to="/dashboard/messages"
                      className="inline-flex items-center gap-2 bg-primary/10 border border-SageGray/30 rounded-lg p-4 hover:border-gold transition text-primary mb-4"
                    >
                      <span className="text-2xl">💬</span>
                      <div className="text-left">
                        <h3 className="font-amiamie-round font-bold text-primary">
                          Messages
                        </h3>
                        <p className="text-sm text-SageGray">Send me a message or ask questions</p>
                      </div>
                    </Link>
                  </div>

                  {/* Settings Link */}
                  <div className="mt-4">
                    <Link
                      to="/settings"
                      className="inline-flex items-center gap-2 bg-primary/10 border border-SageGray/30 rounded-lg p-4 hover:border-gold transition text-primary"
                    >
                      <span className="text-2xl">⚙️</span>
                      <div className="text-left">
                        <h3 className="font-amiamie-round font-bold text-primary">
                          Settings
                        </h3>
                        <p className="text-sm text-SageGray">Manage your account settings</p>
                      </div>
                    </Link>
                  </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;


/**
 * Admin Orders Page
 * View and manage all customer orders
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import AuthGuard from '../../components/auth/AuthGuard';
import LogoHeader from '../../components/LogoHeader';
import Navbar from '../../sections/Navbar';

const AdminOrdersPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, paid, in-progress, completed, cancelled

  // Check if user is admin
  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    if (user) {
      fetchAllOrders();
    }
  }, [user, isAdmin, navigate, filter]);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (
            email,
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      fetchAllOrders(); // Refresh the list
    } catch (err) {
      console.error('Error updating order:', err);
      alert('Error updating order: ' + err.message);
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
      hour: '2-digit',
      minute: '2-digit',
    });
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
                All Orders
              </h1>
              <p className="text-SageGray">
                Manage all customer orders
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                         hover:bg-primary/20 transition-colors"
              >
                ← Back to Dashboard
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

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'pending', 'paid', 'in-progress', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-amiamie-round font-bold transition-colors ${
                  filter === status
                    ? 'bg-gold text-DarkLava'
                    : 'bg-primary/10 border border-SageGray/30 text-primary hover:bg-primary/20'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8">
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
                <p className="text-SageGray">No orders found.</p>
              </div>
            )}

            {!loading && orders.length > 0 && (
              <div className="space-y-4">
                {orders.map((order) => {
                  const requirements = typeof order.requirements === 'string'
                    ? JSON.parse(order.requirements)
                    : order.requirements;

                  const customerEmail = order.profiles?.email || 'Unknown';
                  const customerName = order.profiles?.full_name || 'Unknown';

                  return (
                    <div
                      key={order.id}
                      className="bg-primary/5 border border-SageGray/30 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-amiamie-round text-xl font-bold text-primary mb-2">
                            {order.service_type === 'voice-tag' && '🎤 Voice Tag'}
                            {order.service_type === 'web-development' && '💻 Web Development'}
                            {order.service_type === 'videography' && '🎥 Videography'}
                            {' '}
                            {order.package_type && `- ${order.package_type.charAt(0).toUpperCase() + order.package_type.slice(1)}`}
                          </h3>
                          <p className="text-sm text-SageGray mb-1">
                            Order #{order.id.slice(0, 8)} • {formatDate(order.created_at)}
                          </p>
                          <p className="text-sm text-SageGray">
                            Customer: {customerName} ({customerEmail})
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
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
                            {requirements.projectDescription && (
                              <p><strong>Project Description:</strong> {requirements.projectDescription}</p>
                            )}
                            {requirements.videoType && (
                              <p><strong>Video Type:</strong> {requirements.videoType}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-4 pt-4 border-t border-SageGray/30">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Link
                            to={`/order/${order.id}`}
                            className="bg-gold/20 border border-gold/50 text-gold px-4 py-2 rounded text-sm
                                     hover:bg-gold/30 transition-colors font-amiamie-round font-bold"
                          >
                            💬 View Chat & Details
                          </Link>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {order.status !== 'pending' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'pending')}
                              className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 px-3 py-1 rounded text-sm
                                       hover:bg-yellow-500/30 transition-colors"
                            >
                              Mark as Pending
                            </button>
                          )}
                          {order.status !== 'paid' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'paid')}
                              className="bg-blue-500/20 border border-blue-500/50 text-blue-400 px-3 py-1 rounded text-sm
                                       hover:bg-blue-500/30 transition-colors"
                            >
                              Mark as Paid
                            </button>
                          )}
                          {order.status !== 'in-progress' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'in-progress')}
                              className="bg-purple-500/20 border border-purple-500/50 text-purple-400 px-3 py-1 rounded text-sm
                                       hover:bg-purple-500/30 transition-colors"
                            >
                              Mark as In Progress
                            </button>
                          )}
                          {order.status !== 'completed' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="bg-green-500/20 border border-green-500/50 text-green-400 px-3 py-1 rounded text-sm
                                       hover:bg-green-500/30 transition-colors"
                            >
                              Mark as Completed
                            </button>
                          )}
                          {order.status !== 'cancelled' && (
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to cancel this order?')) {
                                  updateOrderStatus(order.id, 'cancelled');
                                }
                              }}
                              className="bg-red-500/20 border border-red-500/50 text-red-400 px-3 py-1 rounded text-sm
                                       hover:bg-red-500/30 transition-colors"
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminOrdersPage;


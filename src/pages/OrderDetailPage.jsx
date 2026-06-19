/**
 * Order Detail Page
 * Shows order details with live chat and revision system
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import AuthGuard from '../components/auth/AuthGuard';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../sections/Navbar';
import OrderChat from '../components/orders/OrderChat';
import RevisionRequest from '../components/orders/RevisionRequest';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  useEffect(() => {
    if (orderId && user) {
      fetchOrder();
    }
  }, [orderId, user]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id(email, full_name)
        `)
        .eq('id', orderId)
        .single();

      // If not admin, only fetch own orders
      if (!isAdmin) {
        query = query.eq('user_id', user.id);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          setError('Order not found');
        } else {
          throw fetchError;
        }
      } else {
        setOrder(data);
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setError(err.message || 'Failed to load order');
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <AuthGuard>
        <LogoHeader />
        <Navbar />
        <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-SageGray">Loading order...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (error || !order) {
    return (
      <AuthGuard>
        <LogoHeader />
        <Navbar />
        <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded p-6">
              {error || 'Order not found'}
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-4 bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                       hover:bg-primary/20 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const requirements = typeof order.requirements === 'string'
    ? JSON.parse(order.requirements)
    : order.requirements;

  const customerEmail = order.profiles?.email || 'Unknown';
  const customerName = order.profiles?.full_name || 'Unknown';

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
                Order Details
              </h1>
              {isAdmin && (
                <p className="text-SageGray">
                  Customer: {customerName} ({customerEmail})
                </p>
              )}
            </div>
            <button
              onClick={() => navigate(isAdmin ? '/dashboard/admin/orders' : '/dashboard')}
              className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                       hover:bg-primary/20 transition-colors"
            >
              ← Back
            </button>
          </div>

          {/* Order Info */}
          <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-amiamie-round text-2xl font-black text-primary mb-2">
                  {order.service_type === 'voice-tag' && '🎤 Voice Tag'}
                  {order.service_type === 'web-development' && '💻 Web Development'}
                  {order.service_type === 'videography' && '🎥 Videography'}
                  {' '}
                  {order.package_type && `- ${order.package_type.charAt(0).toUpperCase() + order.package_type.slice(1)}`}
                </h2>
                <p className="text-sm text-SageGray">
                  Order #{order.id.slice(0, 8)} • {formatDate(order.created_at)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded text-xs font-bold border ${getStatusColor(order.status)}`}>
                  {order.status.replace('-', ' ').toUpperCase()}
                </span>
                <span className="text-2xl font-black text-gold">
                  ${order.price}
                </span>
              </div>
            </div>

            {/* Order Details */}
            {requirements && (
              <div className="mt-6 pt-6 border-t border-SageGray/30">
                <h3 className="font-amiamie-round font-bold text-primary mb-4">
                  Order Requirements:
                </h3>
                <div className="text-sm text-SageGray space-y-2">
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
                    <p><strong>Description:</strong> {requirements.projectDescription}</p>
                  )}
                  {requirements.websiteType && (
                    <p><strong>Website Type:</strong> {requirements.websiteType}</p>
                  )}
                  {requirements.videoType && (
                    <p><strong>Video Type:</strong> {requirements.videoType}</p>
                  )}
                  {requirements.instructions && (
                    <div>
                      <p className="font-medium mb-1">Instructions:</p>
                      <p className="whitespace-pre-wrap">{requirements.instructions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Chat and Revisions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Chat */}
            <div>
              <OrderChat orderId={orderId} />
            </div>

            {/* Revision Requests */}
            <div>
              <RevisionRequest 
                orderId={orderId}
                onRevisionCreated={() => {
                  // Refresh order if needed
                  fetchOrder();
                }}
              />
            </div>
          </div>

          {/* Deliverables (if completed) */}
          {order.status === 'completed' && (
            <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="font-amiamie-round font-bold text-green-400 mb-4">
                ✅ Order Completed
              </h3>
              <p className="text-SageGray mb-4">
                Your order has been completed! Download your deliverables below.
              </p>
              <button
                onClick={() => {
                  alert('Download link will be available when files are uploaded');
                }}
                className="bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-3 rounded-lg
                         hover:bg-green-500/30 transition-colors font-amiamie-round font-bold"
              >
                Download Deliverables
              </button>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default OrderDetailPage;


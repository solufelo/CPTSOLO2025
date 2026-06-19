/**
 * Revision Request Component
 * Allows users to request revisions on their orders
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { ensureProfileExists } from '../../lib/profileUtils';
import FileUpload from './FileUpload';

const RevisionRequest = ({ orderId, onRevisionCreated }) => {
  const { user } = useAuth();
  const [revisions, setRevisions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [requestDescription, setRequestDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  // Fetch revisions
  const fetchRevisions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('order_revisions')
        .select('*, profiles:user_id(email, full_name)')
        .eq('order_id', orderId)
        .order('revision_number', { ascending: false });

      if (error) throw error;
      setRevisions(data || []);
    } catch (err) {
      console.error('Error fetching revisions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchRevisions();
    }
  }, [orderId]);

  // Submit revision request
  const handleSubmitRevision = async (e) => {
    e.preventDefault();
    if (!requestDescription.trim() || submitting) return;

    try {
      setSubmitting(true);

      // Ensure profile exists before creating revision
      await ensureProfileExists(user);

      // Get next revision number
      const { data: revisionNumberData, error: numberError } = await supabase
        .rpc('get_next_revision_number', { p_order_id: orderId });

      if (numberError) throw numberError;

      const revisionNumber = revisionNumberData || 1;

      // Create revision request
      const { error } = await supabase
        .from('order_revisions')
        .insert([
          {
            order_id: orderId,
            user_id: user.id,
            revision_number: revisionNumber,
            request_description: requestDescription.trim(),
            status: 'pending',
          },
        ]);

      if (error) throw error;

      // Reset form
      setRequestDescription('');
      setShowForm(false);

      // Refresh revisions
      fetchRevisions();

      // Send email notification to admin
      try {
        await sendRevisionNotification({
          orderId,
          revisionNumber,
          requestDescription: requestDescription.trim(),
        });
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Don't block revision creation if email fails
      }

      // Notify parent
      if (onRevisionCreated) {
        onRevisionCreated();
      }

      alert('Revision request submitted successfully!');
    } catch (err) {
      console.error('Error submitting revision:', err);
      alert('Failed to submit revision: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Update revision status (admin only)
  const handleUpdateStatus = async (revisionId, newStatus, adminNotes = null) => {
    try {
      const updateData = { status: newStatus };
      if (adminNotes !== null) {
        updateData.admin_notes = adminNotes;
      }

      const { error } = await supabase
        .from('order_revisions')
        .update(updateData)
        .eq('id', revisionId);

      if (error) throw error;
      
      // Get revision number for email notification
      const { data: revisionData } = await supabase
        .from('order_revisions')
        .select('revision_number')
        .eq('id', revisionId)
        .single();
      
      // Send email notification to customer when admin updates revision
      try {
        const { data: orderData } = await supabase
          .from('orders')
          .select('user_id, profiles:user_id(email, full_name)')
          .eq('id', orderId)
          .single();

        if (orderData && orderData.user_id) {
          await sendRevisionUpdateNotification({
            orderId,
            revisionId,
            revisionNumber: revisionData?.revision_number || 1,
            newStatus,
            recipientEmail: orderData.profiles?.email,
            recipientName: orderData.profiles?.full_name || 'Customer',
          });
        }
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Don't block status update if email fails
      }
      
      fetchRevisions();
    } catch (err) {
      console.error('Error updating revision status:', err);
      alert('Failed to update revision: ' + err.message);
    }
  };

  // Add admin notes (admin only)
  const handleAddAdminNotes = async (revisionId) => {
    const notes = prompt('Add admin notes for this revision:');
    if (notes !== null && notes.trim()) {
      try {
        const { error } = await supabase
          .from('order_revisions')
          .update({ admin_notes: notes.trim() })
          .eq('id', revisionId);

        if (error) throw error;
        fetchRevisions();
      } catch (err) {
        console.error('Error adding admin notes:', err);
        alert('Failed to add notes: ' + err.message);
      }
    }
  };

  // Send revision notification email to admin
  const sendRevisionNotification = async ({ orderId, revisionNumber, requestDescription }) => {
    try {
      // Get order details to include customer info
      const { data: orderData } = await supabase
        .from('orders')
        .select('user_id, profiles:user_id(email, full_name)')
        .eq('id', orderId)
        .single();

      const response = await fetch('/.netlify/functions/send-revision-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          revisionNumber,
          requestDescription: requestDescription.substring(0, 200),
          recipientEmail: 'solomonolufelo@outlook.com', // Admin email
          recipientName: 'Admin',
          customerName: orderData?.profiles?.full_name || orderData?.profiles?.email || 'Customer',
          orderUrl: `${window.location.origin}/order/${orderId}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send email notification');
      }
    } catch (err) {
      console.error('Error sending revision notification:', err);
      throw err;
    }
  };

  // Send revision update notification email
  const sendRevisionUpdateNotification = async ({ orderId, revisionId, revisionNumber, newStatus, recipientEmail, recipientName }) => {
    try {
      const response = await fetch('/.netlify/functions/send-revision-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          revisionId,
          revisionNumber,
          status: newStatus,
          recipientEmail,
          recipientName,
          isUpdate: true,
          orderUrl: `${window.location.origin}/order/${orderId}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send email notification');
      }
    } catch (err) {
      console.error('Error sending revision update notification:', err);
      throw err;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      completed: 'bg-green-500/20 text-green-400 border-green-500/50',
      rejected: 'bg-red-500/20 text-red-400 border-red-500/50',
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-amiamie-round text-xl font-black text-primary">
          🔄 Revision Requests ({revisions.length})
        </h3>
        {!isAdmin && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gold text-DarkLava font-amiamie-round font-bold px-4 py-2 rounded-lg
                     hover:bg-gold/90 transition-colors text-sm"
          >
            {showForm ? 'Cancel' : '+ Request Revision'}
          </button>
        )}
      </div>

      {/* Revision Request Form */}
      {showForm && !isAdmin && (
        <form onSubmit={handleSubmitRevision} className="mb-6 p-4 bg-primary/5 rounded-lg">
          <label className="block text-sm font-medium text-primary/80 mb-2">
            What would you like to change? *
          </label>
          <textarea
            value={requestDescription}
            onChange={(e) => setRequestDescription(e.target.value)}
            className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary mb-4"
            rows="4"
            placeholder="Describe the changes you'd like to see..."
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!requestDescription.trim() || submitting}
              className="bg-gold text-DarkLava font-amiamie-round font-bold px-6 py-2 rounded-lg
                       hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setRequestDescription('');
              }}
              className="bg-primary/10 border border-SageGray/30 text-primary px-6 py-2 rounded-lg
                       hover:bg-primary/20 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Revisions List */}
      {loading ? (
        <p className="text-SageGray text-center py-4">Loading revisions...</p>
      ) : revisions.length === 0 ? (
        <p className="text-SageGray text-center py-4">
          No revision requests yet.
        </p>
      ) : (
        <div className="space-y-4">
          {revisions.map((revision) => (
            <div
              key={revision.id}
              className="bg-primary/5 border border-SageGray/30 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-primary">
                    Revision #{revision.revision_number}
                  </h4>
                  <p className="text-xs text-SageGray">
                    {new Date(revision.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-xs font-bold border ${getStatusColor(
                    revision.status
                  )}`}
                >
                  {revision.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              <div className="mb-3">
                <p className="text-sm text-primary/80 font-medium mb-1">Request:</p>
                <p className="text-sm text-SageGray whitespace-pre-wrap">
                  {revision.request_description}
                </p>
              </div>

              {revision.admin_notes && (
                <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                  <p className="text-sm text-blue-300 font-medium mb-1">Admin Notes:</p>
                  <p className="text-sm text-blue-200 whitespace-pre-wrap">
                    {revision.admin_notes}
                  </p>
                </div>
              )}

              {/* Admin Actions */}
              {isAdmin && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {revision.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(revision.id, 'in-progress')}
                        className="bg-blue-500/20 border border-blue-500/50 text-blue-400 px-3 py-1 rounded text-sm
                                 hover:bg-blue-500/30 transition-colors"
                      >
                        Start Working
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(revision.id, 'completed')}
                        className="bg-green-500/20 border border-green-500/50 text-green-400 px-3 py-1 rounded text-sm
                                 hover:bg-green-500/30 transition-colors"
                      >
                        Mark Complete
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to reject this revision?')) {
                            handleUpdateStatus(revision.id, 'rejected');
                          }
                        }}
                        className="bg-red-500/20 border border-red-500/50 text-red-400 px-3 py-1 rounded text-sm
                                 hover:bg-red-500/30 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {revision.status === 'in-progress' && (
                    <button
                      onClick={() => handleUpdateStatus(revision.id, 'completed')}
                      className="bg-green-500/20 border border-green-500/50 text-green-400 px-3 py-1 rounded text-sm
                               hover:bg-green-500/30 transition-colors"
                    >
                      Mark Complete
                    </button>
                  )}
                  <button
                    onClick={() => handleAddAdminNotes(revision.id)}
                    className="bg-primary/20 border border-SageGray/30 text-primary px-3 py-1 rounded text-sm
                             hover:bg-primary/30 transition-colors"
                  >
                    {revision.admin_notes ? 'Edit Notes' : 'Add Notes'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RevisionRequest;


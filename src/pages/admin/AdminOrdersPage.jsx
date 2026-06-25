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
import { PROJECT_STAGES, stageLabel, stageColor, normalizeStage } from '../../lib/projectStatus';

const API_BASE = import.meta.env.VITE_API_URL || '';

const AdminOrdersPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showNew, setShowNew] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newProject, setNewProject] = useState({
    clientEmail: '',
    clientName: '',
    title: '',
    description: '',
    stage: 'intake',
  });

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
  }, [user, isAdmin, navigate]);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const query = supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (
            email,
            full_name
          )
        `)
        .order('created_at', { ascending: false });

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

  const updateOrderStatus = async (order, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', order.id);
      if (error) throw error;

      // Notify the client of the stage change (non-blocking)
      if (order.profiles?.email) {
        const token = localStorage.getItem('portfolio_session_token') || '';
        fetch(`${API_BASE}/api/project/notify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            recipientEmail: order.profiles.email,
            recipientName: order.profiles.full_name || 'there',
            type: 'status',
            projectTitle: order.package_type || 'your project',
            stage: newStatus,
            orderUrl: `${window.location.origin}/order/${order.id}`,
          }),
        }).catch(() => {});
      }
      fetchAllOrders();
    } catch (err) {
      console.error('Error updating order:', err);
      alert('Error updating order: ' + err.message);
    }
  };

  const createProject = async () => {
    if (!newProject.clientEmail || !newProject.title) {
      alert('Client email and project title are required.');
      return;
    }
    try {
      setCreating(true);
      const token = localStorage.getItem('portfolio_session_token') || '';
      const resp = await fetch(`${API_BASE}/api/admin/create-client-project`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newProject),
      });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || 'Failed to create project');

      if (json.tempPassword) {
        alert(
          `Project created and a new client account was made.\n\nLogin: ${newProject.clientEmail}\nTemp password: ${json.tempPassword}\n\nShare these with the client (they can change the password later).`
        );
      } else {
        alert('Project created for existing client account.');
      }
      setNewProject({ clientEmail: '', clientName: '', title: '', description: '', stage: 'intake' });
      setShowNew(false);
      fetchAllOrders();
    } catch (err) {
      alert('Error creating project: ' + err.message);
    } finally {
      setCreating(false);
    }
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

  const visibleOrders =
    filter === 'all' ? orders : orders.filter((o) => normalizeStage(o.status) === filter);

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
                Projects
              </h1>
              <p className="text-SageGray">
                Track client projects, stages, and deliverables
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowNew((v) => !v)}
                className="bg-gold text-DarkLava font-bold px-4 py-2 rounded-lg hover:bg-gold/90 transition-colors"
              >
                {showNew ? 'Close' : '+ New project'}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                         hover:bg-primary/20 transition-colors"
              >
                ← Dashboard
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

          {/* New project form */}
          {showNew && (
            <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6 mb-6">
              <h2 className="font-amiamie-round text-xl font-black text-primary mb-4">New client project</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  value={newProject.clientEmail}
                  onChange={(e) => setNewProject({ ...newProject, clientEmail: e.target.value })}
                  placeholder="Client email *"
                  className="bg-primary/5 border border-SageGray/30 rounded px-3 py-2 text-primary text-sm"
                />
                <input
                  type="text"
                  value={newProject.clientName}
                  onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                  placeholder="Client name"
                  className="bg-primary/5 border border-SageGray/30 rounded px-3 py-2 text-primary text-sm"
                />
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Project title *"
                  className="bg-primary/5 border border-SageGray/30 rounded px-3 py-2 text-primary text-sm sm:col-span-2"
                />
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Scope / description"
                  rows="3"
                  className="bg-primary/5 border border-SageGray/30 rounded px-3 py-2 text-primary text-sm sm:col-span-2"
                />
                <select
                  value={newProject.stage}
                  onChange={(e) => setNewProject({ ...newProject, stage: e.target.value })}
                  className="bg-primary/5 border border-SageGray/30 rounded px-3 py-2 text-primary text-sm"
                >
                  {PROJECT_STAGES.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={createProject}
                disabled={creating}
                className="mt-4 bg-gold text-DarkLava font-bold px-6 py-2 rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50"
              >
                {creating ? 'Creating…' : 'Create project'}
              </button>
              <p className="text-xs text-SageGray mt-2">
                If the client has no account, one is created and a temp password is shown for you to share.
              </p>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', ...PROJECT_STAGES.map((s) => s.id)].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-amiamie-round font-bold transition-colors ${
                  filter === status
                    ? 'bg-gold text-DarkLava'
                    : 'bg-primary/10 border border-SageGray/30 text-primary hover:bg-primary/20'
                }`}
              >
                {status === 'all' ? 'All' : stageLabel(status)}
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

            {!loading && !error && visibleOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-SageGray">No projects found.</p>
              </div>
            )}

            {!loading && visibleOrders.length > 0 && (
              <div className="space-y-4">
                {visibleOrders.map((order) => {
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
                            {order.service_type === 'project' && (order.package_type || 'Project')}
                            {order.service_type === 'voice-tag' && '🎤 Voice Tag'}
                            {order.service_type === 'web-development' && '💻 Web Development'}
                            {order.service_type === 'videography' && '🎥 Videography'}
                            {order.service_type !== 'project' && order.package_type &&
                              ` - ${order.package_type.charAt(0).toUpperCase() + order.package_type.slice(1)}`}
                          </h3>
                          <p className="text-sm text-SageGray mb-1">
                            {order.service_type === 'project' ? 'Project' : 'Order'} #{order.id.slice(0, 8)} • {formatDate(order.created_at)}
                          </p>
                          <p className="text-sm text-SageGray">
                            Customer: {customerName} ({customerEmail})
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 rounded text-xs font-bold border ${stageColor(order.status)}`}>
                            {stageLabel(order.status).toUpperCase()}
                          </span>
                          {order.service_type !== 'project' && Number(order.price) > 0 && (
                            <span className="text-lg font-bold text-gold">
                              ${order.price}
                            </span>
                          )}
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
                            Open project · chat · deliverables
                          </Link>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-xs text-SageGray mr-1">Set stage:</span>
                          {PROJECT_STAGES.map((s) => {
                            const current = normalizeStage(order.status) === s.id;
                            return (
                              <button
                                key={s.id}
                                onClick={() => !current && updateOrderStatus(order, s.id)}
                                disabled={current}
                                className={`px-3 py-1 rounded text-sm border transition-colors ${
                                  current
                                    ? 'bg-gold/30 border-gold/60 text-gold cursor-default'
                                    : 'bg-primary/10 border-SageGray/30 text-primary hover:bg-primary/20'
                                }`}
                              >
                                {s.label}
                              </button>
                            );
                          })}
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


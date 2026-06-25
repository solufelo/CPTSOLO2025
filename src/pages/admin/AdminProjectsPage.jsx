/**
 * Admin Projects Editor — manage the Works/portfolio showcase without code.
 * Published projects appear on the homepage (#work) via loadShowcaseProjects().
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { ensureProfileExists } from '../../lib/profileUtils';
import { showcaseProjects } from '../../data/showcaseProjects';
import AuthGuard from '../../components/auth/AuthGuard';
import LogoHeader from '../../components/LogoHeader';
import Navbar from '../../sections/Navbar';

const API_BASE = import.meta.env.VITE_API_URL || '';

const EMPTY_FORM = {
  name: '',
  category: 'development',
  status: 'wip',
  blurb: '',
  stack: '',
  image_url: '',
  video_url: '',
  demo_url: '',
  github_url: '',
  case_study_url: '',
  internal_demo: false,
  sort_order: 0,
  published: true,
};

const AdminProjectsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    if (user) fetchProjects();
  }, [user, isAdmin, navigate]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      alert('Error fetching projects: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    try {
      setUploading(true);
      const dataUrl = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });
      const token = localStorage.getItem('portfolio_session_token') || '';
      const resp = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ filename: file.name, dataUrl }),
      });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || 'Upload failed');
      setFormData((prev) => ({ ...prev, image_url: json.url }));
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const buildRow = () => {
    const stackArr = formData.stack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const now = new Date().toISOString();
    return {
      user_id: user.id,
      name: formData.name,
      category: formData.category,
      status: formData.status,
      blurb: formData.blurb,
      stack: JSON.stringify(stackArr),
      image_url: formData.image_url,
      video_url: formData.video_url || null,
      demo_url: formData.demo_url || null,
      github_url: formData.github_url || null,
      case_study_url: formData.case_study_url || null,
      internal_demo: formData.internal_demo ? 1 : 0,
      sort_order: Number(formData.sort_order) || 0,
      published: formData.published ? 1 : 0,
      updated_at: now,
    };
  };

  const handleSave = async () => {
    if (!formData.name) {
      alert('Project name is required');
      return;
    }
    try {
      setLoading(true);
      await ensureProfileExists(user);
      const row = buildRow();
      if (editing) {
        const { error } = await supabase.from('projects').update(row).eq('id', editing.id);
        if (error) throw error;
      } else {
        row.id = `proj-${Date.now()}`;
        row.created_at = new Date().toISOString();
        const { error } = await supabase.from('projects').insert([row]);
        if (error) throw error;
      }
      alert(`Project ${editing ? 'updated' : 'created'}!`);
      setFormData(EMPTY_FORM);
      setEditing(null);
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Error saving project: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      setLoading(true);
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setFormData(EMPTY_FORM);
      setEditing(null);
      fetchProjects();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    if (!confirm('Seed the table with the current built-in projects? Run this once.')) return;
    try {
      setLoading(true);
      await ensureProfileExists(user);
      const now = new Date().toISOString();
      for (let i = 0; i < showcaseProjects.length; i++) {
        const p = showcaseProjects[i];
        const row = {
          id: p.id,
          user_id: user.id,
          name: p.name,
          category: p.category,
          status: p.status,
          blurb: p.blurb || '',
          stack: JSON.stringify(p.stack || []),
          image_url: p.image || '',
          video_url: p.video || null,
          demo_url: p.demoUrl || null,
          github_url: p.githubUrl || null,
          case_study_url: p.caseStudyUrl || null,
          internal_demo: p.internalDemo ? 1 : 0,
          sort_order: i,
          published: 1,
          created_at: now,
          updated_at: now,
        };
        await supabase.from('projects').insert([row]);
      }
      alert('Seeded built-in projects.');
      fetchProjects();
    } catch (err) {
      alert('Seed error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (p) => {
    setEditing(p);
    let stackStr = '';
    try {
      const arr = typeof p.stack === 'string' ? JSON.parse(p.stack) : p.stack || [];
      stackStr = Array.isArray(arr) ? arr.join(', ') : '';
    } catch {
      stackStr = p.stack || '';
    }
    setFormData({
      name: p.name || '',
      category: p.category || 'development',
      status: p.status || 'wip',
      blurb: p.blurb || '',
      stack: stackStr,
      image_url: p.image_url || '',
      video_url: p.video_url || '',
      demo_url: p.demo_url || '',
      github_url: p.github_url || '',
      case_study_url: p.case_study_url || '',
      internal_demo: p.internal_demo === 1 || p.internal_demo === true,
      sort_order: p.sort_order || 0,
      published: p.published === 1 || p.published === true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAdmin) return null;

  const inputCls =
    'w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary';
  const labelCls = 'block text-sm font-medium text-primary/80 mb-2';

  return (
    <AuthGuard>
      <LogoHeader />
      <Navbar />
      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-3xl font-black text-primary">Projects Editor</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setFormData(EMPTY_FORM);
                    setEditing(null);
                  }}
                  className="text-gold hover:underline text-sm"
                >
                  New Project
                </button>
                <button onClick={() => navigate('/dashboard/admin')} className="text-gold hover:underline text-sm">
                  ← Dashboard
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className={labelCls}>Name *</label>
                <input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className={inputCls} placeholder="Project name" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Category</label>
                  <select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} className={inputCls}>
                    <option value="development">Code / Development</option>
                    <option value="video">Video</option>
                    <option value="motion">Motion</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select value={formData.status} onChange={(e) => handleInputChange('status', e.target.value)} className={inputCls}>
                    <option value="live">Live</option>
                    <option value="wip">WIP</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Sort order</label>
                  <input type="number" value={formData.sort_order} onChange={(e) => handleInputChange('sort_order', e.target.value)} className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Blurb</label>
                <textarea value={formData.blurb} onChange={(e) => handleInputChange('blurb', e.target.value)} className={inputCls} rows="2" placeholder="One-line description" />
              </div>

              <div>
                <label className={labelCls}>Stack (comma-separated)</label>
                <input type="text" value={formData.stack} onChange={(e) => handleInputChange('stack', e.target.value)} className={inputCls} placeholder="React, Node.js, MongoDB" />
              </div>

              <div>
                <label className={labelCls}>Image</label>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0])} className="text-primary text-sm" />
                  {uploading && <span className="text-gold text-sm">Uploading…</span>}
                </div>
                <input type="text" value={formData.image_url} onChange={(e) => handleInputChange('image_url', e.target.value)} className={`${inputCls} mt-2`} placeholder="/assets/projects/...  (or upload above)" />
                {formData.image_url && (
                  <img src={formData.image_url} alt="preview" className="mt-2 h-24 rounded border border-SageGray/30 object-cover" />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Demo URL</label>
                  <input type="text" value={formData.demo_url} onChange={(e) => handleInputChange('demo_url', e.target.value)} className={inputCls} placeholder="https://… or /demo" />
                </div>
                <div>
                  <label className={labelCls}>GitHub URL</label>
                  <input type="text" value={formData.github_url} onChange={(e) => handleInputChange('github_url', e.target.value)} className={inputCls} placeholder="https://github.com/…" />
                </div>
                <div>
                  <label className={labelCls}>Case study URL</label>
                  <input type="text" value={formData.case_study_url} onChange={(e) => handleInputChange('case_study_url', e.target.value)} className={inputCls} placeholder="optional" />
                </div>
                <div>
                  <label className={labelCls}>Video URL (reels)</label>
                  <input type="text" value={formData.video_url} onChange={(e) => handleInputChange('video_url', e.target.value)} className={inputCls} placeholder="/assets/videos/…" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center">
                  <input type="checkbox" checked={formData.published} onChange={(e) => handleInputChange('published', e.target.checked)} className="mr-2" />
                  <span className="text-primary">Published</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={formData.internal_demo} onChange={(e) => handleInputChange('internal_demo', e.target.checked)} className="mr-2" />
                  <span className="text-primary">Internal demo (/demo)</span>
                </label>
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={handleSave} disabled={loading || uploading} className="bg-gold text-DarkLava font-display font-bold py-3 px-6 rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50">
                  {loading ? 'Saving…' : editing ? 'Update Project' : 'Save Project'}
                </button>
                <button onClick={() => { setFormData(EMPTY_FORM); setEditing(null); }} disabled={loading} className="bg-primary/10 border border-SageGray/30 text-primary font-display font-bold py-3 px-6 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50">
                  {editing ? 'Cancel Edit' : 'Clear Form'}
                </button>
                {editing && (
                  <button onClick={() => handleDelete(editing.id)} disabled={loading} className="bg-red-500/20 border border-red-500/50 text-red-400 font-display font-bold py-3 px-6 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50">
                    Delete
                  </button>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-SageGray/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display text-xl font-black text-primary">Projects ({projects.length})</h3>
                  {projects.length === 0 && (
                    <button onClick={handleSeed} disabled={loading} className="bg-gold/20 border border-gold/50 text-gold px-4 py-2 rounded-lg hover:bg-gold/30 transition-colors text-sm disabled:opacity-50">
                      Seed built-in projects
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {projects.map((p) => (
                    <div key={p.id} className="bg-primary/5 border border-SageGray/30 rounded-lg p-4 flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        {p.image_url && <img src={p.image_url} alt="" className="h-10 w-10 rounded object-cover shrink-0" />}
                        <div className="min-w-0">
                          <h4 className="font-bold text-primary truncate">{p.name}</h4>
                          <p className="text-sm text-SageGray">
                            {p.category} • {p.status} • {p.published ? 'Published' : 'Draft'} • #{p.sort_order}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => startEdit(p)} className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors text-sm shrink-0">
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminProjectsPage;

/**
 * Deliverables panel for a client project.
 * - Client view: list + download files hosted on your own side (Drive/cPanel).
 * - Admin view: add a deliverable via a Drive/URL link or a self-hosted upload,
 *   then notify the client by email.
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const API_BASE = import.meta.env.VITE_API_URL || '';

const DeliverablesPanel = ({ order, isAdmin }) => {
  const orderId = order?.id;
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    if (orderId) fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('order_files')
        .select('*')
        .eq('order_id', orderId)
        .order('uploaded_at', { ascending: false });
      if (error) throw error;
      setFiles(data || []);
    } catch (err) {
      console.error('Error loading deliverables:', err);
    } finally {
      setLoading(false);
    }
  };

  const notifyClient = async (fileName) => {
    try {
      const token = localStorage.getItem('portfolio_session_token') || '';
      await fetch(`${API_BASE}/api/project/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          recipientEmail: order?.profiles?.email,
          recipientName: order?.profiles?.full_name || 'there',
          type: 'deliverable',
          projectTitle: order?.package_type || 'your project',
          fileName,
          orderUrl: `${window.location.origin}/order/${orderId}`,
        }),
      });
    } catch (err) {
      console.warn('Notify failed (non-blocking):', err);
    }
  };

  const addFileRow = async (fileName, fileUrl, fileType) => {
    const row = {
      id: `file-${Date.now()}`,
      order_id: orderId,
      file_name: fileName,
      file_url: fileUrl,
      file_type: fileType || 'link',
      uploaded_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('order_files').insert([row]);
    if (error) throw error;
    await notifyClient(fileName);
    await fetchFiles();
  };

  const handleAddLink = async () => {
    if (!linkUrl.trim()) {
      alert('Paste a link (Google Drive share link or any URL).');
      return;
    }
    try {
      setBusy(true);
      await addFileRow(linkName.trim() || linkUrl.trim(), linkUrl.trim(), 'link');
      setLinkName('');
      setLinkUrl('');
    } catch (err) {
      alert('Error adding link: ' + err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;
    try {
      setBusy(true);
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
      await addFileRow(file.name, json.url, file.type || 'file');
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this deliverable?')) return;
    try {
      setBusy(true);
      const { error } = await supabase.from('order_files').delete().eq('id', id);
      if (error) throw error;
      await fetchFiles();
    } catch (err) {
      alert('Error removing: ' + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-6 bg-primary/10 border border-SageGray/30 rounded-lg p-6">
      <h3 className="font-amiamie-round text-xl font-black text-primary mb-4">Deliverables</h3>

      {loading ? (
        <p className="text-SageGray text-sm">Loading…</p>
      ) : files.length === 0 ? (
        <p className="text-SageGray text-sm">
          {isAdmin ? 'No deliverables yet. Add one below.' : 'No deliverables yet. You will be emailed when files are ready.'}
        </p>
      ) : (
        <div className="space-y-2">
          {files.map((f) => (
            <div key={f.id} className="bg-primary/5 border border-SageGray/30 rounded-lg p-3 flex justify-between items-center gap-4">
              <div className="min-w-0">
                <p className="font-bold text-primary truncate">{f.file_name}</p>
                <p className="text-xs text-SageGray">
                  {f.file_type} • {f.uploaded_at ? new Date(f.uploaded_at).toLocaleDateString() : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={f.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded text-sm hover:bg-green-500/30 transition-colors font-bold"
                >
                  Download
                </a>
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(f.id)}
                    disabled={busy}
                    className="bg-red-500/20 border border-red-500/50 text-red-400 px-3 py-2 rounded text-sm hover:bg-red-500/30 transition-colors disabled:opacity-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="mt-6 pt-6 border-t border-SageGray/30 space-y-4">
          <div>
            <p className="text-sm font-medium text-primary/80 mb-2">Add a link (Google Drive / any URL)</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={linkName}
                onChange={(e) => setLinkName(e.target.value)}
                placeholder="Label (optional)"
                className="bg-primary/5 border border-SageGray/30 rounded px-3 py-2 text-primary text-sm sm:w-1/3"
              />
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://drive.google.com/…"
                className="bg-primary/5 border border-SageGray/30 rounded px-3 py-2 text-primary text-sm flex-1"
              />
              <button
                onClick={handleAddLink}
                disabled={busy}
                className="bg-gold text-DarkLava font-bold px-4 py-2 rounded hover:bg-gold/90 transition-colors disabled:opacity-50 text-sm"
              >
                Add link
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-primary/80 mb-2">Or upload to your own server (cPanel)</p>
            <input type="file" onChange={(e) => handleUpload(e.target.files?.[0])} disabled={busy} className="text-primary text-sm" />
            {busy && <span className="text-gold text-sm ml-2">Working…</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliverablesPanel;

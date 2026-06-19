/**
 * User Settings Page
 * User account settings and preferences
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import AuthGuard from '../components/auth/AuthGuard';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../sections/Navbar';

const Settings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    notifications: true,
    emailUpdates: true,
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          email: data.email || user.email || '',
          phone: data.phone || '',
          notifications: data.notifications ?? true,
          emailUpdates: data.email_updates ?? true,
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaved(false);

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          notifications: profile.notifications,
          email_updates: profile.emailUpdates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Failed to save settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete user account
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw error;

      alert('Account deleted successfully');
      signOut();
      navigate('/');
    } catch (err) {
      console.error('Error deleting account:', err);
      alert('Failed to delete account: ' + err.message);
    }
  };

  return (
    <AuthGuard>
      <LogoHeader />
      <Navbar />
      
      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-amiamie-round text-4xl font-black text-primary mb-2">
                Settings
              </h1>
              <p className="text-SageGray">
                Manage your account settings and preferences
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                       hover:bg-primary/20 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-SageGray">Loading settings...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Profile Settings */}
              <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8">
                <h2 className="font-amiamie-round text-2xl font-black text-primary mb-4">
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-primary font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.full_name}
                      onChange={(e) => handleChange('full_name', e.target.value)}
                      className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary
                               focus:outline-none focus:border-gold"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-primary font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary/50
                               cursor-not-allowed"
                    />
                    <p className="text-xs text-SageGray mt-1">
                      Email cannot be changed. Contact support if you need to update your email.
                    </p>
                  </div>
                  <div>
                    <label className="block text-primary font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary
                               focus:outline-none focus:border-gold"
                      placeholder="(289) 233-8317"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8">
                <h2 className="font-amiamie-round text-2xl font-black text-primary mb-4">
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-primary/5 border border-SageGray/30 rounded-lg">
                    <div>
                      <span className="text-primary font-medium block">Push Notifications</span>
                      <span className="text-sm text-SageGray">Receive notifications about your orders</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.notifications}
                      onChange={(e) => handleChange('notifications', e.target.checked)}
                      className="w-5 h-5 text-gold rounded focus:ring-gold"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-primary/5 border border-SageGray/30 rounded-lg">
                    <div>
                      <span className="text-primary font-medium block">Email Updates</span>
                      <span className="text-sm text-SageGray">Receive email updates about your orders and account</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.emailUpdates}
                      onChange={(e) => handleChange('emailUpdates', e.target.checked)}
                      className="w-5 h-5 text-gold rounded focus:ring-gold"
                    />
                  </label>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-4">
                {saved && (
                  <span className="text-green-400 font-amiamie-round font-bold self-center">
                    Settings saved!
                  </span>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gold text-DarkLava font-amiamie-round font-bold px-6 py-3 rounded-lg
                           hover:bg-gold/90 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8">
                <h2 className="font-amiamie-round text-2xl font-black text-red-400 mb-4">
                  Danger Zone
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-primary font-bold mb-2">Delete Account</h3>
                    <p className="text-SageGray text-sm mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg
                               hover:bg-red-500/30 transition-colors font-amiamie-round font-bold"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default Settings;


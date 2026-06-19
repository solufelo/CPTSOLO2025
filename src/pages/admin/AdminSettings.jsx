/**
 * Admin Settings Page
 * Configure admin settings and preferences
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import AuthGuard from '../../components/auth/AuthGuard';
import LogoHeader from '../../components/LogoHeader';
import Navbar from '../../sections/Navbar';

const AdminSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    newOrderNotifications: true,
    revisionNotifications: true,
    messageNotifications: true,
    defaultOrderStatus: 'pending',
    autoMarkComplete: false,
    businessName: 'CaptainSolo',
    businessEmail: 'work@captainsolo.ca',
    businessPhone: '',
    timezone: 'America/Toronto',
  });

  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    // Load settings from local storage or database
    loadSettings();
  }, [user, isAdmin, navigate]);

  const loadSettings = async () => {
    try {
      // For now, load from local storage
      // In the future, you can store in database
      const savedSettings = localStorage.getItem('adminSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setSaved(false);

      // Save to local storage
      localStorage.setItem('adminSettings', JSON.stringify(settings));

      // In the future, save to database
      // const { error } = await supabase
      //   .from('admin_settings')
      //   .upsert({ user_id: user.id, settings });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  if (!isAdmin) {
    return null;
  }

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
                Admin Settings
              </h1>
              <p className="text-SageGray">
                Configure your admin preferences and business settings
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

          {/* Settings Form */}
          <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8 space-y-8">
            {/* Notification Settings */}
            <div>
              <h2 className="font-amiamie-round text-2xl font-black text-primary mb-4">
                Notification Settings
              </h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-primary/5 border border-SageGray/30 rounded-lg">
                  <span className="text-primary font-medium">Email Notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                    className="w-5 h-5 text-gold rounded focus:ring-gold"
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-primary/5 border border-SageGray/30 rounded-lg">
                  <span className="text-primary font-medium">New Order Notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.newOrderNotifications}
                    onChange={(e) => handleChange('newOrderNotifications', e.target.checked)}
                    className="w-5 h-5 text-gold rounded focus:ring-gold"
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-primary/5 border border-SageGray/30 rounded-lg">
                  <span className="text-primary font-medium">Revision Notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.revisionNotifications}
                    onChange={(e) => handleChange('revisionNotifications', e.target.checked)}
                    className="w-5 h-5 text-gold rounded focus:ring-gold"
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-primary/5 border border-SageGray/30 rounded-lg">
                  <span className="text-primary font-medium">Message Notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.messageNotifications}
                    onChange={(e) => handleChange('messageNotifications', e.target.checked)}
                    className="w-5 h-5 text-gold rounded focus:ring-gold"
                  />
                </label>
              </div>
            </div>

            {/* Order Settings */}
            <div>
              <h2 className="font-amiamie-round text-2xl font-black text-primary mb-4">
                Order Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-primary font-medium mb-2">
                    Default Order Status
                  </label>
                  <select
                    value={settings.defaultOrderStatus}
                    onChange={(e) => handleChange('defaultOrderStatus', e.target.value)}
                    className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary
                             focus:outline-none focus:border-gold"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <label className="flex items-center justify-between p-4 bg-primary/5 border border-SageGray/30 rounded-lg">
                  <span className="text-primary font-medium">Auto-Mark Complete After Delivery</span>
                  <input
                    type="checkbox"
                    checked={settings.autoMarkComplete}
                    onChange={(e) => handleChange('autoMarkComplete', e.target.checked)}
                    className="w-5 h-5 text-gold rounded focus:ring-gold"
                  />
                </label>
              </div>
            </div>

            {/* Business Settings */}
            <div>
              <h2 className="font-amiamie-round text-2xl font-black text-primary mb-4">
                Business Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-primary font-medium mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary
                             focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-primary font-medium mb-2">
                    Business Email
                  </label>
                  <input
                    type="email"
                    value={settings.businessEmail}
                    onChange={(e) => handleChange('businessEmail', e.target.value)}
                    className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary
                             focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-primary font-medium mb-2">
                    Business Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.businessPhone}
                    onChange={(e) => handleChange('businessPhone', e.target.value)}
                    className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary
                             focus:outline-none focus:border-gold"
                    placeholder="(289) 233-8317"
                  />
                </div>
                <div>
                  <label className="block text-primary font-medium mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary
                             focus:outline-none focus:border-gold"
                  >
                    <option value="America/Toronto">Eastern Time (Toronto)</option>
                    <option value="America/Vancouver">Pacific Time (Vancouver)</option>
                    <option value="America/New_York">Eastern Time (New York)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-4 pt-4 border-t border-SageGray/30">
              {saved && (
                <span className="text-green-400 font-amiamie-round font-bold self-center">
                  Settings saved!
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-gold text-DarkLava font-amiamie-round font-bold px-6 py-3 rounded-lg
                         hover:bg-gold/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminSettings;


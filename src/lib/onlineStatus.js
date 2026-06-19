/**
 * Online Status Utilities
 * Tracks and updates user online status
 */

import { supabase } from './supabase';

/**
 * Update user's online status
 * Call this periodically (every 30 seconds) when user is active
 */
export const updateOnlineStatus = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Update last_seen and set is_online
    const { error } = await supabase
      .from('profiles')
      .update({
        last_seen: new Date().toISOString(),
        is_online: true,
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating online status:', error);
    }
  } catch (err) {
    console.error('Error updating online status:', err);
  }
};

/**
 * Mark user as offline
 * Call this when user logs out or closes the app
 */
export const markOffline = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        is_online: false,
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error marking offline:', error);
    }
  } catch (err) {
    console.error('Error marking offline:', err);
  }
};

/**
 * Check if user is online
 * Returns true if user was seen within the last 5 minutes
 */
export const isUserOnline = (lastSeen) => {
  if (!lastSeen) return false;
  const now = new Date();
  const lastSeenDate = new Date(lastSeen);
  const diffMinutes = (now - lastSeenDate) / (1000 * 60);
  return diffMinutes < 5; // Consider online if seen within last 5 minutes
};

/**
 * Setup online status tracking
 * Call this in your main app component
 */
export const setupOnlineStatusTracking = () => {
  // Update status immediately
  updateOnlineStatus();

  // Update status every 30 seconds
  const interval = setInterval(() => {
    updateOnlineStatus();
  }, 30000); // 30 seconds

  // Mark offline when page is about to unload
  const handleBeforeUnload = () => {
    markOffline();
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  // Cleanup function
  return () => {
    clearInterval(interval);
    window.removeEventListener('beforeunload', handleBeforeUnload);
    markOffline();
  };
};


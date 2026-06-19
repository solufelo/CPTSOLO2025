/**
 * Authentication Context
 * Manages user authentication state across the app
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { setupOnlineStatusTracking, markOffline } from '../lib/onlineStatus';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Set up online status tracking if user is logged in
      if (session?.user) {
        setupOnlineStatusTracking();
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Set up online status tracking when user logs in
      if (session?.user) {
        setupOnlineStatusTracking();
      } else {
        // Mark offline when user logs out
        markOffline();
      }
    });

    // Cleanup: mark offline when component unmounts
    return () => {
      subscription.unsubscribe();
      markOffline();
    };
  }, []);

  // Sign up with email and password
  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;

    // Create profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            full_name: fullName,
          },
        ]);

      if (profileError) console.error('Profile creation error:', profileError);
    }

    return { data, error };
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error };
  };

  // Sign out
  const signOut = async () => {
    // Mark offline before signing out
    await markOffline();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Reset password
  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
    return { data, error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


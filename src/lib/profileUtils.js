/**
 * Profile Utilities
 * Helper functions for managing user profiles
 */

import { supabase } from './supabase';

/**
 * Ensures a user profile exists in the database
 * Creates the profile if it doesn't exist
 * @param {Object} user - The authenticated user object from Supabase
 * @returns {Promise<void>}
 */
export const ensureProfileExists = async (user) => {
  if (!user || !user.id) {
    throw new Error('User is required');
  }

  try {
    // Check if profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    // If profile doesn't exist, create it
    if (!existingProfile) {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.full_name || '',
          },
        ]);

      if (insertError) {
        // If it's a unique constraint violation, profile was created by another process
        if (insertError.code === '23505') {
          console.log('Profile already exists (created concurrently)');
          return;
        }
        console.error('Error creating profile:', insertError);
        throw insertError;
      }
    }
  } catch (error) {
    // If the error is "not found" (PGRST116), the profile doesn't exist
    if (error.code === 'PGRST116' || error.message?.includes('No rows')) {
      // Profile doesn't exist, create it
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || '',
          },
        ]);

      if (insertError) {
        // If it's a unique constraint violation, profile was created by another process
        if (insertError.code === '23505') {
          console.log('Profile already exists (created concurrently)');
          return;
        }
        console.error('Error creating profile:', insertError);
        throw insertError;
      }
    } else {
      throw error;
    }
  }
};


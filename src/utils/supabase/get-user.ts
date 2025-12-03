'use server';

import { createClient } from '@/utils/supabase/server';

/**
 * Fetch the currently authenticated user's data
 * and their profile from the database (if available).
 */
export async function getUser() {
  const supabase = await createClient();

  // ✅ 1. Get the currently signed-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { user: null, profile: null, error: userError || 'No user found' };
  }

  // ✅ 2. Fetch the user's profile from the `profiles` table
  const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  if (profileError) {
    // You can return null profile if it doesn’t exist yet
    return { user, profile: null, error: profileError.message };
  }

  // ✅ 3. Return combined user + profile
  return { user, profile, error: null };
}

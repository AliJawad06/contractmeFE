'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

interface UpdateUserData {
  email?: string;
  industries?: string[];
  skills?: string[];
  locations?: string[];
}

export async function updateUser(data: UpdateUserData) {
  const supabase = await createClient();

  // 1️⃣ Get the currently logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('No authenticated user:', userError);
    return { error: 'User not authenticated' };
  }

  // 2️⃣ Update the user's profile information
  const updates = {
    ...(data.email && { email: data.email }),
    ...(data.industries && { industries: data.industries }),
    ...(data.skills && { skills: data.skills }),
    ...(data.locations && { locations: data.locations }),
    updated_at: new Date().toISOString(),
  };

  const { error: profileError } = await supabase.from('profiles').update(updates).eq('id', user.id);

  if (profileError) {
    console.error('Profile update error:', profileError);
    return { error: 'Failed to update profile' };
  }

  // 3️⃣ Revalidate pages using the profile data
  revalidatePath('/', 'layout');

  return { success: true };
}

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

interface FormData {
  email: string;
  password: string;
  industries: string[];
  skills: string[];
  locations: string[];
}

export async function signup(data: FormData) {
  const supabase = await createClient();

  // 1️⃣ Create the user
  const { data: signUpData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error || !signUpData.user) {
    return { error: true };
  }

  const user = signUpData.user;

  // 2️⃣ Store additional user metadata in the profiles table
  const { error: profileError } = await supabase.from('profiles').upsert(
    {
      id: user.id, // assuming id matches auth.users
      industries: data.industries,
      skills: data.skills,
      locations: data.locations,
      email: data.email,
      created_at: new Date().toISOString(),
    },
    { onConflict: 'id' },
  );

  if (profileError) {
    console.error('Profile insert error:', profileError);
    return { error: true };
  }

  // 3️⃣ Redirect and revalidate
  revalidatePath('/', 'layout');
  redirect('/');
}

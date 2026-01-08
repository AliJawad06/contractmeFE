import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          },
        },
      },
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Fetch profile using user id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('industries')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      console.error('Profile error:', profileError);
      return new Response('Profile not found', { status: 404 });
    }

    const categories = profile.industries;

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return Response.json([]);
    }

    // Build query string with multiple category parameters
    const queryParams = categories.map((cat) => `category=${encodeURIComponent(cat)}`).join('&');
    const workerUrl = `https://my-worker.03jawad-ali.workers.dev/api/get_jobs?${queryParams}`;

    // Fetch jobs from Worker API
    const workerResponse = await fetch(workerUrl);

    if (!workerResponse.ok) {
      console.error('Worker API error:', await workerResponse.text());
      return new Response('Failed to fetch jobs', { status: 500 });
    }

    const jobs = await workerResponse.json();

    return Response.json(jobs || []);
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

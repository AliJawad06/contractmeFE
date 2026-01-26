// utils/subscriptions/get-current-user-sub.ts
import { createClient } from '@/utils/supabase/server';
import { getPaddleInstance } from '@/utils/paddle/get-paddle-instance';

export type SubscriptionTier = 'free' | 'pro';

export async function getCurrentUserSubscription() {
  try {
    /* -------------------- 1. Auth -------------------- */
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) return null;

    const userId = authData.user.id;
    const email = authData.user.email!;
    const paddle = getPaddleInstance();

    /* -------------------- 2. Get cached customer_id -------------------- */
    const { data: profile } = await supabase.from('profiles').select('paddle_customer_id').eq('id', userId).single();

    let customerId = profile?.paddle_customer_id;

    /* -------------------- 3. Resolve customer by email (ONCE) -------------------- */
    if (!customerId) {
      const customerCollection = paddle.customers.list({
        email: [email],
        perPage: 1,
      });

      const customers = await customerCollection.next();
      const customer = customers[0];

      if (!customer) {
        return null;
      }

      customerId = customer.id;

      // Cache it
      await supabase.from('profiles').update({ paddle_customer_id: customerId }).eq('id', userId);
    }

    /* -------------------- 4. Get subscriptions -------------------- */
    const subscriptionCollection = paddle.subscriptions.list({
      customerId: [customerId],
      perPage: 10,
    });

    const subscriptions = await subscriptionCollection.next();

    const activeSubscription = subscriptions.find((sub) => ['active', 'trialing'].includes(sub.status));

    /* -------------------- 5. Tier -------------------- */
    const tier: SubscriptionTier = activeSubscription ? 'pro' : 'free';

    return customerId;
  } catch (error) {
    console.error('Error getting user subscription:', error);
    return null;
  }
}

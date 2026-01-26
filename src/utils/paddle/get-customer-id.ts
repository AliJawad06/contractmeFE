import { createClient } from '@/utils/supabase/server';

export async function getCustomerId() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (user.data.user?.email) {
    console.log('email reached');
    const customersData = await supabase
      .from('customers')
      .select('customer_id,email')
      .eq('email', user.data.user?.email)
      .single();
    if (customersData?.data?.customer_id) {
      return customersData?.data?.customer_id as string;
    } else {
      console.log('error');
    }
  }
  return '';
}

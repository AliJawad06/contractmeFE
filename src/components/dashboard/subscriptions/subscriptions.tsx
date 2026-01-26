import { SubscriptionDetail } from '@/components/dashboard/subscriptions/components/subscription-detail';
import { NoSubscriptionView } from '@/components/dashboard/subscriptions/views/no-subscription-view';
import { MultipleSubscriptionsView } from '@/components/dashboard/subscriptions/views/multiple-subscriptions-view';
import { SubscriptionErrorView } from '@/components/dashboard/subscriptions/views/subscription-error-view';
import { getCustomerId } from '@/utils/paddle/get-customer-id';
export async function Subscriptions() {
  const subscriptionId = await getCustomerId();
  console.log(subscriptionId + 'this is subscriptionId');
  if (!subscriptionId) {
    return <NoSubscriptionView />;
  } else if (subscriptionId) {
    return <SubscriptionDetail subscriptionId={subscriptionId} />;
  } else {
    return <SubscriptionErrorView />;
  }
}

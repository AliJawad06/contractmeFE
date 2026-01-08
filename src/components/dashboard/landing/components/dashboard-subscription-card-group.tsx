import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SubscriptionCards } from '@/components/dashboard/subscriptions/components/subscription-cards';
import { getSubscriptions } from '@/utils/paddle/get-subscriptions';
import { ErrorContent } from '@/components/dashboard/layout/error-content';
import { ArrowRight } from 'lucide-react';

export async function DashboardSubscriptionCardGroup() {
  const subscriptions = await getSubscriptions();
  return (
    <div className={'dashboard-card p-8'}>
      <div className="flex justify-between items-center pb-6 mb-6 border-b border-white/10">
        <h2 className={'section-header'}>Active Subscriptions</h2>
        <Button
          asChild={true}
          size={'sm'}
          variant={'outline'}
          className={
            'text-sm rounded-xl border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all'
          }
        >
          <Link href={'/dashboard/subscriptions'} className="flex items-center gap-2">
            View all
            <ArrowRight size={14} />
          </Link>
        </Button>
      </div>
      <div className={'@container'}>
        {subscriptions?.data ? (
          <SubscriptionCards
            className={'grid-cols-1 gap-6 @[600px]:grid-cols-2'}
            subscriptions={subscriptions.data.slice(0, 2) ?? []}
          />
        ) : (
          <ErrorContent />
        )}
      </div>
    </div>
  );
}

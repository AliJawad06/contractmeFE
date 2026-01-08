import { Subscription } from '@paddle/paddle-node-sdk';
import Image from 'next/image';
import { Status } from '@/components/shared/status/status';
import { parseMoney } from '@/utils/paddle/parse-money';
import dayjs from 'dayjs';
import { SubscriptionHeaderActionButton } from '@/components/dashboard/subscriptions/components/subscription-header-action-button';
import { SubscriptionAlerts } from '@/components/dashboard/subscriptions/components/subscription-alerts';
import { MobileSidebar } from '@/components/dashboard/layout/mobile-sidebar';
import { Calendar } from 'lucide-react';

interface Props {
  subscription: Subscription;
}

export function SubscriptionHeader({ subscription }: Props) {
  const subscriptionItem = subscription.items[0];

  const price = subscriptionItem.quantity * parseFloat(subscription?.recurringTransactionDetails?.totals.total ?? '0');
  const formattedPrice = parseMoney(price.toString(), subscription.currencyCode);
  const frequency =
    subscription.billingCycle.frequency === 1
      ? `/${subscription.billingCycle.interval}`
      : `every ${subscription.billingCycle.frequency} ${subscription.billingCycle.interval}s`;

  const formattedStartedDate = dayjs(subscription.startedAt).format('MMM DD, YYYY');

  return (
    <div className={'flex justify-between items-start sm:items-center flex-col sm:flex-row mb-6 sm:mb-0'}>
      <div className={'flex flex-col w-full'}>
        <SubscriptionAlerts subscription={subscription} />
        <div className={'flex items-center gap-4'}>
          <MobileSidebar />
          {subscriptionItem.product.imageUrl ? (
            <div className="p-2 rounded-xl bg-purple-500/10">
              <Image
                src={subscriptionItem.product.imageUrl}
                alt={subscriptionItem.product.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
          )}
          <h1
            className={
              'text-2xl md:text-3xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent'
            }
          >
            {subscriptionItem.product.name}
          </h1>
        </div>
        <div className={'flex items-center gap-4 py-6 flex-wrap'}>
          <div className={'flex gap-2 items-baseline'}>
            <span className={'text-3xl font-semibold text-purple-400'}>{formattedPrice}</span>
            <span className={'text-muted-foreground text-sm'}>{frequency}</span>
          </div>
          <Status status={subscription.status} />
        </div>
        <div className={'flex items-center gap-2 text-muted-foreground text-sm pb-6'}>
          <Calendar size={14} />
          <span>Started on {formattedStartedDate}</span>
        </div>
      </div>
      <div>
        {!(subscription.scheduledChange || subscription.status === 'canceled') && (
          <SubscriptionHeaderActionButton subscriptionId={subscription.id} />
        )}
      </div>
    </div>
  );
}

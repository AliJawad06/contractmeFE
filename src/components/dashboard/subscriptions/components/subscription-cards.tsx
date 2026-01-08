import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Status } from '@/components/shared/status/status';
import { Subscription } from '@paddle/paddle-node-sdk';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { parseMoney } from '@/utils/paddle/parse-money';

interface Props {
  subscriptions: Subscription[];
  className: string;
}

export function SubscriptionCards({ subscriptions, className }: Props) {
  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-muted-foreground">No active subscriptions</div>
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block">
          View available plans
        </Link>
      </div>
    );
  } else {
    return (
      <div className={cn('grid flex-1 items-start', className)}>
        {subscriptions.map((subscription) => {
          const subscriptionItem = subscription.items[0];
          const price = subscriptionItem.quantity * parseFloat(subscriptionItem.price.unitPrice.amount);
          const formattedPrice = parseMoney(price.toString(), subscription.currencyCode);
          const frequency =
            subscription.billingCycle.frequency === 1
              ? `/${subscription.billingCycle.interval}`
              : `every ${subscription.billingCycle.frequency} ${subscription.billingCycle.interval}s`;
          return (
            <div
              key={subscription.id}
              className="group relative p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-500/5 hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="flex flex-col">
                <div
                  className={cn('flex mb-4 w-full items-start', {
                    'justify-between': subscriptionItem.product.imageUrl,
                    'justify-end': !subscriptionItem.product.imageUrl,
                  })}
                >
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">C</span>
                    </div>
                  )}
                  <Link
                    href={`/dashboard/subscriptions/${subscription.id}`}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <ArrowRight
                      size={18}
                      className="text-muted-foreground group-hover:text-purple-400 transition-colors"
                    />
                  </Link>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{subscriptionItem.product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{subscriptionItem.product.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-lg font-semibold text-purple-400">
                    {formattedPrice}
                    <span className="text-sm font-normal text-muted-foreground">{frequency}</span>
                  </div>
                  <Status status={subscription.status} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

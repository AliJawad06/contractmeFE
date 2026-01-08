import { Subscription, Transaction } from '@paddle/paddle-node-sdk';
import dayjs from 'dayjs';
import { parseMoney } from '@/utils/paddle/parse-money';
import { PaymentMethodSection } from '@/components/dashboard/subscriptions/components/payment-method-section';
import { Calendar } from 'lucide-react';

interface Props {
  transactions?: Transaction[];
  subscription?: Subscription;
}

export function SubscriptionNextPaymentCard({ subscription, transactions }: Props) {
  if (!subscription?.nextBilledAt) {
    return null;
  }
  return (
    <div className={'dashboard-card p-6 @container'}>
      <div className={'flex gap-4 flex-col border-b border-white/10 pb-6'}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Calendar size={18} className="text-purple-400" />
          </div>
          <h3 className={'section-header text-lg'}>Next Payment</h3>
        </div>
        <div className={'flex gap-2 items-baseline flex-wrap'}>
          <span className={'text-2xl font-semibold text-purple-400'}>
            {parseMoney(subscription?.nextTransaction?.details.totals.total, subscription?.currencyCode)}
          </span>
          <span className={'text-sm text-muted-foreground'}>due</span>
          <span className={'text-sm font-medium text-white'}>
            {dayjs(subscription?.nextBilledAt).format('MMM DD, YYYY')}
          </span>
        </div>
      </div>
      <PaymentMethodSection
        transactions={transactions}
        updatePaymentMethodUrl={subscription?.managementUrls?.updatePaymentMethod}
      />
    </div>
  );
}

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Transaction } from '@paddle/paddle-node-sdk';
import dayjs from 'dayjs';
import { parseMoney } from '@/utils/paddle/parse-money';
import { Status } from '@/components/shared/status/status';
import { getPaymentReason } from '@/utils/paddle/data-helpers';
import { Receipt, ArrowRight } from 'lucide-react';

interface Props {
  subscriptionId: string;
  transactions?: Transaction[];
}

export function SubscriptionPastPaymentsCard({ subscriptionId, transactions }: Props) {
  return (
    <div className={'dashboard-card p-6 @container'}>
      <div className="flex justify-between items-center pb-6 border-b border-white/10 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Receipt size={18} className="text-purple-400" />
          </div>
          <h3 className={'section-header text-lg'}>Payment History</h3>
        </div>
        <Button
          asChild={true}
          size={'sm'}
          variant={'outline'}
          className={
            'text-sm rounded-xl border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all'
          }
        >
          <Link href={`/dashboard/payments/${subscriptionId}`} className="flex items-center gap-2">
            View all
            <ArrowRight size={14} />
          </Link>
        </Button>
      </div>
      <div>
        {transactions?.slice(0, 3).map((transaction, index) => {
          const formattedPrice = parseMoney(transaction.details?.totals?.total, transaction.currencyCode);
          return (
            <div
              key={transaction.id}
              className={`flex flex-col gap-3 py-5 ${index < 2 ? 'border-b border-white/5' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className={'text-xs text-muted-foreground'}>
                  {dayjs(transaction.billedAt ?? transaction.createdAt).format('MMM DD, YYYY')}
                </span>
                <Status status={transaction.status} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className={'font-medium text-sm text-white'}>{getPaymentReason(transaction.origin)}</span>
                  <span className={'text-xs text-muted-foreground'}>
                    {transaction.details?.lineItems[0].product?.name}
                  </span>
                </div>
                <div className={'text-sm font-semibold text-purple-400'}>{formattedPrice}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

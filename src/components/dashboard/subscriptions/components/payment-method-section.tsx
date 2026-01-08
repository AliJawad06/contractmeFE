import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PaymentMethodDetails } from '@/components/dashboard/subscriptions/components/payment-method-details';
import { PaymentType, Transaction } from '@paddle/paddle-node-sdk';
import { CreditCard } from 'lucide-react';

function findPaymentMethodDetails(transactions?: Transaction[]) {
  const transactionWithPaymentDetails = transactions?.find((transaction) => transaction.payments[0]?.methodDetails);
  const firstValidPaymentMethod = transactionWithPaymentDetails?.payments[0].methodDetails;
  return firstValidPaymentMethod ? firstValidPaymentMethod : { type: 'unknown' as PaymentType, card: null };
}

interface Props {
  updatePaymentMethodUrl?: string | null;
  transactions?: Transaction[];
}

export function PaymentMethodSection({ transactions, updatePaymentMethodUrl }: Props) {
  const { type, card } = findPaymentMethodDetails(transactions);
  if (type === 'unknown') {
    return null;
  }
  return (
    <div className={'flex gap-4 pt-6 items-center justify-between flex-wrap'}>
      <div className={'flex items-center gap-3'}>
        <div className="p-2 rounded-lg bg-white/5">
          <CreditCard size={16} className="text-muted-foreground" />
        </div>
        <div className={'flex flex-col gap-1'}>
          <div className={'text-xs text-muted-foreground'}>Payment method</div>
          <div className={'text-sm font-medium text-white'}>
            <PaymentMethodDetails type={type} card={card} />
          </div>
        </div>
      </div>
      {updatePaymentMethodUrl && (
        <Button
          asChild={true}
          size={'sm'}
          className={
            'text-xs rounded-xl border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all'
          }
          variant={'outline'}
        >
          <Link target={'_blank'} href={updatePaymentMethodUrl}>
            Update
          </Link>
        </Button>
      )}
    </div>
  );
}

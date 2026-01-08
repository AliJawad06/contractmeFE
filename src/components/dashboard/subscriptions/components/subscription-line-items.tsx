import { Subscription } from '@paddle/paddle-node-sdk';
import { Fragment } from 'react';
import { parseMoney } from '@/utils/paddle/parse-money';
import Image from 'next/image';
import { Package } from 'lucide-react';

interface Props {
  subscription?: Subscription;
}

export function SubscriptionLineItems({ subscription }: Props) {
  return (
    <div className={'dashboard-card p-6'}>
      <div className="flex items-center gap-3 pb-6 border-b border-white/10">
        <div className="p-2 rounded-lg bg-purple-500/10">
          <Package size={18} className="text-purple-400" />
        </div>
        <h3 className={'section-header text-lg'}>Subscription Items</h3>
      </div>
      <div className={'pt-6'}>
        {/* Header */}
        <div className={'hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/5'}>
          <div className={'col-span-6 text-sm font-medium text-muted-foreground'}>Product</div>
          <div className={'col-span-2 text-sm font-medium text-muted-foreground text-center'}>Qty</div>
          <div className={'col-span-2 text-sm font-medium text-muted-foreground text-center'}>Tax</div>
          <div className={'col-span-2 text-sm font-medium text-muted-foreground text-right'}>Amount</div>
        </div>

        {subscription?.recurringTransactionDetails?.lineItems.map((lineItem) => {
          return (
            <Fragment key={lineItem.priceId}>
              <div className={'grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-white/5 items-center'}>
                <div className={'col-span-6'}>
                  <div className={'flex gap-4 items-center'}>
                    {lineItem.product.imageUrl ? (
                      <div className="p-2 rounded-xl bg-purple-500/10">
                        <Image
                          src={lineItem.product.imageUrl}
                          width={40}
                          height={40}
                          alt={lineItem.product.name}
                          className="rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-white font-bold">C</span>
                      </div>
                    )}
                    <div className={'flex flex-col gap-1'}>
                      <div className={'text-sm font-semibold text-white'}>{lineItem.product.name}</div>
                      <div className={'text-xs text-muted-foreground'}>{lineItem.product.description}</div>
                    </div>
                  </div>
                </div>
                <div className={'col-span-2 text-sm text-muted-foreground text-center'}>
                  <span className="md:hidden text-xs">Qty: </span>
                  {lineItem.quantity}
                </div>
                <div className={'col-span-2 text-sm text-muted-foreground text-center'}>
                  <span className="md:hidden text-xs">Tax: </span>
                  {parseFloat(lineItem.taxRate) * 100}%
                </div>
                <div className={'col-span-2 text-sm font-medium text-white text-right'}>
                  {parseMoney(lineItem.totals.subtotal, subscription?.currencyCode)}
                </div>
              </div>
            </Fragment>
          );
        })}

        {/* Totals */}
        <div className={'flex flex-col gap-3 pt-6 max-w-xs ml-auto'}>
          <div className={'flex justify-between py-2'}>
            <span className={'text-sm text-muted-foreground'}>Subtotal</span>
            <span className={'text-sm text-muted-foreground'}>
              {parseMoney(subscription?.recurringTransactionDetails?.totals.subtotal, subscription?.currencyCode)}
            </span>
          </div>
          <div className={'flex justify-between py-2'}>
            <span className={'text-sm text-muted-foreground'}>Tax</span>
            <span className={'text-sm text-muted-foreground'}>
              {parseMoney(subscription?.recurringTransactionDetails?.totals.tax, subscription?.currencyCode)}
            </span>
          </div>
          <div className={'flex justify-between py-3 border-t border-white/10'}>
            <span className={'text-sm font-medium text-white'}>Total</span>
            <span className={'text-lg font-semibold text-purple-400'}>
              {parseMoney(subscription?.recurringTransactionDetails?.totals.total, subscription?.currencyCode)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

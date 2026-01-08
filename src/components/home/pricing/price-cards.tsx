import { PricingTier } from '@/constants/pricing-tier';
import { IBillingFrequency } from '@/constants/billing-frequency';
import { FeaturesList } from '@/components/home/pricing/features-list';
import { PriceAmount } from '@/components/home/pricing/price-amount';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PriceTitle } from '@/components/home/pricing/price-title';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  loading: boolean;
  frequency: IBillingFrequency;
  priceMap: Record<string, string>;
}

export function PriceCards({ loading, frequency, priceMap }: Props) {
  return (
    <div className="isolate mx-auto grid grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      {PricingTier.map((tier) => (
        <div
          key={tier.id}
          className={cn(
            'relative group',
            'bg-gradient-to-b from-white/[0.08] to-white/[0.02]',
            'backdrop-blur-xl',
            'border border-white/10',
            'rounded-3xl',
            'p-8',
            'transition-all duration-500',
            'hover:-translate-y-2',
            'shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]',
            'hover:shadow-[0_20px_60px_rgba(139,92,246,0.2),0_8px_24px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]',
            tier.featured && [
              'ring-2 ring-purple-500/40',
              'bg-gradient-to-b from-purple-500/10 to-indigo-600/5',
              'border-purple-500/30',
              'shadow-[0_0_40px_rgba(139,92,246,0.25),0_8px_32px_rgba(0,0,0,0.12)]',
            ],
          )}
        >
          {/* Glow effect on hover */}
          <div
            className={cn(
              'absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
              'bg-gradient-to-b from-purple-500/5 to-transparent',
              'pointer-events-none',
            )}
          />

          <div className="relative z-10">
            <PriceTitle tier={tier} />

            <PriceAmount
              loading={loading}
              tier={tier}
              priceMap={priceMap}
              value={frequency.value}
              priceSuffix={frequency.priceSuffix}
            />

            <div className="mt-6 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <p className="text-muted-foreground text-base leading-relaxed mb-8">{tier.description}</p>

            <Button
              className={cn(
                'w-full rounded-xl py-6 text-base font-semibold transition-all duration-300',
                tier.featured
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-500/30',
              )}
              asChild={true}
            >
              <Link
                href={`/checkout/${tier.priceId[frequency.value]}`}
                className="flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight size={18} className={tier.featured ? 'animate-pulse' : ''} />
              </Link>
            </Button>

            <FeaturesList tier={tier} />
          </div>
        </div>
      ))}
    </div>
  );
}

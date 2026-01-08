import { Tier } from '@/constants/pricing-tier';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  loading: boolean;
  tier: Tier;
  priceMap: Record<string, string>;
  value: string;
  priceSuffix: string;
}

export function PriceAmount({ loading, priceMap, priceSuffix, tier, value }: Props) {
  return (
    <div className="mt-4 flex items-baseline gap-2">
      {loading ? (
        <Skeleton className="h-20 w-full bg-white/5 rounded-xl" />
      ) : (
        <>
          <div
            className={cn(
              'text-6xl font-bold tracking-tight',
              tier.featured
                ? 'bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent'
                : 'text-white',
            )}
          >
            {priceMap[tier.priceId[value]].replace(/\.00$/, '')}
          </div>
          <div className="text-sm font-medium text-muted-foreground pb-2">{priceSuffix}</div>
        </>
      )}
    </div>
  );
}

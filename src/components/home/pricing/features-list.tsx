import { Tier } from '@/constants/pricing-tier';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  tier: Tier;
}

export function FeaturesList({ tier }: Props) {
  return (
    <ul className="mt-8 space-y-4">
      {tier.features.map((feature: string) => (
        <li key={feature} className="flex items-start gap-3">
          <div
            className={cn(
              'mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center',
              tier.featured ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-muted-foreground',
            )}
          >
            <Check size={14} strokeWidth={3} />
          </div>
          <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

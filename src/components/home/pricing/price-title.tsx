import { Tier } from '@/constants/pricing-tier';
import { cn } from '@/lib/utils';
import { Sparkles, Crown } from 'lucide-react';

interface Props {
  tier: Tier;
}

export function PriceTitle({ tier }: Props) {
  const { name, featured } = tier;
  return (
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'p-2.5 rounded-xl',
            featured ? 'bg-gradient-to-br from-purple-500/20 to-indigo-600/20' : 'bg-white/5',
          )}
        >
          {featured ? (
            <Crown size={24} className="text-purple-400" />
          ) : (
            <Sparkles size={24} className="text-muted-foreground" />
          )}
        </div>
        <h3 className="text-2xl font-semibold text-white">{name}</h3>
      </div>
      {featured && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-600/20 border border-purple-500/30">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs font-medium text-purple-300">Most Popular</span>
        </div>
      )}
    </div>
  );
}

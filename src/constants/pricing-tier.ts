export interface Tier {
  name: string;
  id: 'starter' | 'pro' | 'advanced';
  icon: string;
  description: string;
  features: string[];
  featured: boolean;
  priceId: Record<string, string>;
}

export const PricingTier: Tier[] = [
  {
    name: 'Free',
    id: 'starter',
    icon: '/assets/icons/price-tiers/free-icon.svg',
    description: 'Get started with basic job search features and limited alerts.',
    features: ['5 job alerts per week', 'Basic job search', 'Email notifications'],
    featured: false,
    priceId: { month: 'pri_01k7mneg0eyb816sw0sezgy9y4', year: 'pri_01k7mneg0eyb816sw0sezgy9y4' },
  },
  {
    name: 'Early Access',
    id: 'pro',
    icon: '/assets/icons/price-tiers/basic-icon.svg',
    description: 'Unlock the full power of Contractly with premium features.',
    features: [
      'Unlimited job alerts',
      '5 automated applications per day',
      'Access to recruiter information',
      'Early access to new features',
      'Priority support',
    ],
    featured: true,
    priceId: { month: 'pri_01k7mneg0eyb816sw0sezgy9y4', year: 'pri_01k7mneg0eyb816sw0sezgy9y4' },
  },
];

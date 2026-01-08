import { FREE_FEATURES, PRO_FEATURES, Feature } from '@/config/features';

/**
 * Server-side utility functions for feature access
 * Use these in API routes and server components
 */

export function hasFeatureAccess(userTier: 'free' | 'pro' | null, feature: Feature): boolean {
  if (userTier === 'pro') {
    return [...FREE_FEATURES, ...PRO_FEATURES].includes(feature);
  }
  if (userTier === 'free') {
    return FREE_FEATURES.includes(feature);
  }
  return false;
}

export function getAvailableFeatures(userTier: 'free' | 'pro' | null): Feature[] {
  if (userTier === 'pro') {
    return [...FREE_FEATURES, ...PRO_FEATURES];
  }
  if (userTier === 'free') {
    return FREE_FEATURES;
  }
  return [];
}

export function isProFeature(feature: Feature): boolean {
  return PRO_FEATURES.includes(feature);
}

export function isFreeFeature(feature: Feature): boolean {
  return FREE_FEATURES.includes(feature);
}

/**
 * Get user tier from subscription status
 * Adapt this to your subscription data structure
 */
export function getUserTierFromSubscription(subscription?: { status: string } | null): 'free' | 'pro' | null {
  if (!subscription) return null;

  const activeStatuses = ['active', 'trialing'];
  if (activeStatuses.includes(subscription.status)) {
    return 'pro';
  }

  return 'free';
}

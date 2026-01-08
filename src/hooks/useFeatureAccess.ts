import { useMemo } from 'react';
import { FREE_FEATURES, PRO_FEATURES, Feature, FREE_TIER_LIMITS, PRO_TIER_LIMITS } from '@/config/features';

/**
 * Hook to check feature access based on user's subscription tier
 *
 * @param userTier - 'free' | 'pro' | null (null = not authenticated)
 * @returns Object with feature checking utilities
 */
export function useFeatureAccess(userTier: 'free' | 'pro' | null) {
  const isPro = userTier === 'pro';
  const isFree = userTier === 'free';
  const isAuthenticated = userTier !== null;

  // Get all available features for current tier
  const availableFeatures = useMemo(() => {
    if (isPro) {
      // Pro users get all features
      return [...FREE_FEATURES, ...PRO_FEATURES];
    }
    if (isFree) {
      // Free users only get free features
      return FREE_FEATURES;
    }
    // Unauthenticated users get nothing
    return [];
  }, [isPro, isFree]);

  // Check if a specific feature is available
  const hasFeature = (feature: Feature): boolean => {
    return availableFeatures.includes(feature);
  };

  // Check if user needs to upgrade for a feature
  const needsUpgrade = (feature: Feature): boolean => {
    if (isPro) return false;
    return PRO_FEATURES.includes(feature);
  };

  // Get limits based on tier
  const limits = useMemo(() => {
    return isPro ? PRO_TIER_LIMITS : FREE_TIER_LIMITS;
  }, [isPro]);

  // Check if a feature requires authentication
  const requiresAuth = (feature: Feature): boolean => {
    return FREE_FEATURES.includes(feature) || PRO_FEATURES.includes(feature);
  };

  return {
    // Tier info
    isPro,
    isFree,
    isAuthenticated,
    tier: userTier,

    // Feature checking
    hasFeature,
    needsUpgrade,
    requiresAuth,
    availableFeatures,

    // Limits
    limits,

    // Convenience checks
    canAccessFeature: (feature: Feature) => hasFeature(feature),
    shouldShowUpgradePrompt: (feature: Feature) => needsUpgrade(feature) && isFree,
    shouldShowLoginPrompt: (feature: Feature) => !isAuthenticated && requiresAuth(feature),
  };
}

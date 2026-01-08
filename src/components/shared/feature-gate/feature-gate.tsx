'use client';

import { ReactNode } from 'react';
import { Feature } from '@/config/features';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles, LogIn } from 'lucide-react';

interface FeatureGateProps {
  feature: Feature;
  userTier: 'free' | 'pro' | null;
  children: ReactNode;
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
}

/**
 * Component to conditionally render content based on feature access
 *
 * Usage:
 * <FeatureGate feature={FEATURES.AUTO_APPLY} userTier={user?.tier}>
 *   <AutoApplyButton />
 * </FeatureGate>
 */
export function FeatureGate({ feature, userTier, children, fallback, showUpgradePrompt = true }: FeatureGateProps) {
  const { hasFeature, needsUpgrade, shouldShowLoginPrompt } = useFeatureAccess(userTier);

  // User has access - show the feature
  if (hasFeature(feature)) {
    return <>{children}</>;
  }

  // User needs to log in
  if (shouldShowLoginPrompt(feature) && showUpgradePrompt) {
    return fallback || <LoginPrompt />;
  }

  // User needs to upgrade
  if (needsUpgrade(feature) && showUpgradePrompt) {
    return fallback || <UpgradePrompt />;
  }

  // No access and no prompt - show nothing or fallback
  return fallback ? <>{fallback}</> : null;
}

function UpgradePrompt() {
  return (
    <div className="flex items-center justify-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-600/5 border border-purple-500/20">
      <div className="text-center max-w-sm">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 flex items-center justify-center mx-auto mb-4">
          <Sparkles size={24} className="text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Early Access Feature</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upgrade to unlock this feature and access all premium tools.
        </p>
        <Button
          asChild
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0"
        >
          <Link href="/#pricing">Upgrade Now</Link>
        </Button>
      </div>
    </div>
  );
}

function LoginPrompt() {
  return (
    <div className="flex items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10">
      <div className="text-center max-w-sm">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
          <LogIn size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Sign In Required</h3>
        <p className="text-sm text-muted-foreground mb-4">Create a free account to access this feature.</p>
        <Button asChild variant="secondary">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}

/**
 * Component to show a lock icon overlay on disabled features
 */
export function FeatureLock({ userTier, feature }: { userTier: 'free' | 'pro' | null; feature: Feature }) {
  const { needsUpgrade, shouldShowLoginPrompt } = useFeatureAccess(userTier);

  if (!needsUpgrade(feature) && !shouldShowLoginPrompt(feature)) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl z-10">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
          <Lock size={20} className="text-white" />
        </div>
        <p className="text-xs text-white font-medium">
          {shouldShowLoginPrompt(feature) ? 'Sign in to access' : 'Upgrade to unlock'}
        </p>
      </div>
    </div>
  );
}

/**
 * Example Component: Feature Gating Demo
 *
 * This file demonstrates all the ways to use the feature gating system.
 * Copy patterns from here to use in your actual components.
 */

'use client';

import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { FeatureGate, FeatureLock } from '@/components/shared/feature-gate/feature-gate';
import { FEATURES } from '@/config/features';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles } from 'lucide-react';

// Example 1: Basic conditional rendering
export function Example1_ConditionalRendering({ userTier }: { userTier: 'free' | 'pro' | null }) {
  const { hasFeature } = useFeatureAccess(userTier);

  return (
    <div className="space-y-4">
      <h2>Example 1: Conditional Rendering</h2>

      {/* Only show for users with access */}
      {hasFeature(FEATURES.AUTO_APPLY) && <Button>Enable Auto-Apply</Button>}

      {/* Show for all users, but disable for free users */}
      <Button disabled={!hasFeature(FEATURES.UNLIMITED_ALERTS)}>
        {hasFeature(FEATURES.UNLIMITED_ALERTS) ? 'Create Alert' : '🔒 Create Alert (Pro)'}
      </Button>
    </div>
  );
}

// Example 2: Using FeatureGate component
export function Example2_FeatureGate({ userTier }: { userTier: 'free' | 'pro' | null }) {
  return (
    <div className="space-y-4">
      <h2>Example 2: FeatureGate Component</h2>

      {/* Simple gate - shows upgrade prompt automatically */}
      <FeatureGate feature={FEATURES.AUTO_APPLY} userTier={userTier}>
        <Button>Enable Auto-Apply</Button>
      </FeatureGate>

      {/* Gate with custom fallback */}
      <FeatureGate
        feature={FEATURES.RECRUITER_CONTACT_INFO}
        userTier={userTier}
        fallback={<div className="text-muted-foreground text-sm">Upgrade to see recruiter info</div>}
      >
        <div>recruiter@example.com</div>
      </FeatureGate>
    </div>
  );
}

// Example 3: Feature lock overlay
export function Example3_FeatureLock({ userTier }: { userTier: 'free' | 'pro' | null }) {
  const { hasFeature } = useFeatureAccess(userTier);

  return (
    <div className="space-y-4">
      <h2>Example 3: Feature Lock Overlay</h2>

      {/* Show content with lock overlay */}
      <div className="relative">
        <div className={`p-4 rounded-xl border ${!hasFeature(FEATURES.ANALYTICS_DASHBOARD) ? 'opacity-50' : ''}`}>
          <h3>Analytics Dashboard</h3>
          <p>View detailed analytics...</p>
        </div>
        <FeatureLock userTier={userTier} feature={FEATURES.ANALYTICS_DASHBOARD} />
      </div>
    </div>
  );
}

// Example 4: Checking multiple features
export function Example4_MultipleFeatures({ userTier }: { userTier: 'free' | 'pro' | null }) {
  const { hasFeature, isPro, availableFeatures } = useFeatureAccess(userTier);

  const requiredFeatures = [FEATURES.AUTO_APPLY, FEATURES.UNLIMITED_ALERTS, FEATURES.RECRUITER_CONTACT_INFO];

  const hasAllRequiredFeatures = requiredFeatures.every((f) => hasFeature(f));

  return (
    <div className="space-y-4">
      <h2>Example 4: Multiple Features</h2>

      <div className="dashboard-card p-6">
        <p>You have access to {availableFeatures.length} features</p>
        <p>Tier: {isPro ? 'Pro' : 'Free'}</p>

        {hasAllRequiredFeatures ? (
          <Button>Start Premium Job Hunt</Button>
        ) : (
          <Button disabled>🔒 Premium Job Hunt (Requires {requiredFeatures.length} Pro features)</Button>
        )}
      </div>
    </div>
  );
}

// Example 5: Usage limits
export function Example5_Limits({ userTier }: { userTier: 'free' | 'pro' | null }) {
  const { limits, isPro, shouldShowUpgradePrompt } = useFeatureAccess(userTier);

  // Simulated current usage
  const currentAlerts = 4;
  const currentApplications = 3;

  const alertsRemaining = limits.MAX_ALERTS === Infinity ? 'Unlimited' : limits.MAX_ALERTS - currentAlerts;
  const applicationsRemaining =
    limits.MAX_APPLICATIONS_PER_DAY === Infinity ? 'Unlimited' : limits.MAX_APPLICATIONS_PER_DAY - currentApplications;

  return (
    <div className="space-y-4">
      <h2>Example 5: Feature Limits</h2>

      <div className="stats-card p-6 space-y-4">
        <div>
          <div className="text-sm text-muted-foreground">Job Alerts</div>
          <div className="text-2xl font-bold">
            {currentAlerts} / {limits.MAX_ALERTS === Infinity ? '∞' : limits.MAX_ALERTS}
          </div>
          {typeof alertsRemaining === 'number' && alertsRemaining <= 0 && !isPro && (
            <div className="text-xs text-amber-400 mt-1">Upgrade for unlimited alerts</div>
          )}
        </div>

        <div>
          <div className="text-sm text-muted-foreground">Auto-Applications Today</div>
          <div className="text-2xl font-bold">
            {currentApplications} /{' '}
            {limits.MAX_APPLICATIONS_PER_DAY === Infinity ? '∞' : limits.MAX_APPLICATIONS_PER_DAY}
          </div>
          {shouldShowUpgradePrompt(FEATURES.AUTO_APPLY) && (
            <div className="text-xs text-amber-400 mt-1">Upgrade to enable auto-apply</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Example 6: Conditional navigation
export function Example6_Navigation({ userTier }: { userTier: 'free' | 'pro' | null }) {
  const { hasFeature } = useFeatureAccess(userTier);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', feature: FEATURES.BASIC_DASHBOARD },
    { name: 'Job Search', href: '/jobs', feature: FEATURES.BASIC_JOB_SEARCH },
    { name: 'Auto-Apply', href: '/auto-apply', feature: FEATURES.AUTO_APPLY },
    { name: 'Analytics', href: '/analytics', feature: FEATURES.ANALYTICS_DASHBOARD },
    { name: 'Recruiters', href: '/recruiters', feature: FEATURES.RECRUITER_CONTACT_INFO },
  ];

  return (
    <div className="space-y-4">
      <h2>Example 6: Conditional Navigation</h2>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const hasAccess = hasFeature(item.feature);
          return (
            <a
              key={item.name}
              href={hasAccess ? item.href : '#'}
              className={`block p-3 rounded-xl ${hasAccess ? 'bg-white/5 hover:bg-white/10' : 'bg-white/5 opacity-50 cursor-not-allowed'}`}
            >
              <div className="flex items-center justify-between">
                <span>{item.name}</span>
                {!hasAccess && <Lock size={16} className="text-muted-foreground" />}
              </div>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

// Example 7: Progressive disclosure
export function Example7_ProgressiveDisclosure({ userTier }: { userTier: 'free' | 'pro' | null }) {
  const { isPro, availableFeatures } = useFeatureAccess(userTier);
  const { PRO_FEATURES, FEATURE_METADATA } = require('@/config/features');

  return (
    <div className="space-y-4">
      <h2>Example 7: Progressive Feature Disclosure</h2>

      <div className="grid grid-cols-2 gap-4">
        {availableFeatures.map((feature) => (
          <div key={feature} className="dashboard-card p-4">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles size={16} className="text-purple-400" />
              <span>{FEATURE_METADATA[feature]?.name}</span>
            </div>
          </div>
        ))}
      </div>

      {!isPro && (
        <div className="dashboard-card p-6 text-center">
          <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-2" />
          <h3 className="font-semibold mb-2">Unlock {PRO_FEATURES.length - availableFeatures.length} More Features</h3>
          <Button className="bg-gradient-to-r from-purple-500 to-indigo-600">Upgrade to Pro</Button>
        </div>
      )}
    </div>
  );
}

// Complete demo component
export function FeatureGatingDemo({ userTier }: { userTier: 'free' | 'pro' | null }) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Feature Gating System Demo</h1>
        <p className="text-muted-foreground">
          Current Tier: <span className="font-semibold text-purple-400">{userTier || 'Not logged in'}</span>
        </p>
      </div>

      <Example1_ConditionalRendering userTier={userTier} />
      <Example2_FeatureGate userTier={userTier} />
      <Example3_FeatureLock userTier={userTier} />
      <Example4_MultipleFeatures userTier={userTier} />
      <Example5_Limits userTier={userTier} />
      <Example6_Navigation userTier={userTier} />
      <Example7_ProgressiveDisclosure userTier={userTier} />
    </div>
  );
}

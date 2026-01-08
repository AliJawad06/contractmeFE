# Feature Gating System

This system allows you to easily control which features are available in Free vs Early Access (Pro) tiers.

## Quick Start

### 1. Configure Features (`src/config/features.ts`)

To change which features are available in each tier, simply move feature names between the `FREE_FEATURES` and `PRO_FEATURES` arrays:

```typescript
// Move features between these arrays to change availability
export const FREE_FEATURES: Feature[] = [
  FEATURES.BASIC_JOB_SEARCH,
  FEATURES.SAVED_SEARCHES,
  // ... more free features
];

export const PRO_FEATURES: Feature[] = [
  FEATURES.AUTO_APPLY,
  FEATURES.UNLIMITED_ALERTS,
  // ... more pro features
];
```

### 2. Use in Components

#### Client Components (React Hooks)

```tsx
'use client';

import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { FEATURES } from '@/config/features';

export function JobSearchPage({ user }) {
  const { hasFeature, needsUpgrade } = useFeatureAccess(user?.tier);

  return (
    <div>
      {/* Conditionally show feature */}
      {hasFeature(FEATURES.ADVANCED_FILTERS) && <AdvancedFilters />}

      {/* Show upgrade prompt */}
      {needsUpgrade(FEATURES.AUTO_APPLY) && <UpgradePrompt />}
    </div>
  );
}
```

#### Using FeatureGate Component

```tsx
import { FeatureGate } from '@/components/shared/feature-gate/feature-gate';
import { FEATURES } from '@/config/features';

export function Dashboard({ user }) {
  return (
    <FeatureGate feature={FEATURES.AUTO_APPLY} userTier={user?.tier}>
      <AutoApplyButton />
    </FeatureGate>
  );
}
```

#### With Custom Fallback

```tsx
<FeatureGate
  feature={FEATURES.RECRUITER_CONTACT_INFO}
  userTier={user?.tier}
  fallback={<div>Upgrade to see recruiter contacts</div>}
>
  <RecruiterContacts />
</FeatureGate>
```

#### Show Lock Overlay on Disabled Features

```tsx
<div className="relative">
  <JobCard job={job} disabled={!hasFeature(FEATURES.AUTO_APPLY)} />
  <FeatureLock userTier={user?.tier} feature={FEATURES.AUTO_APPLY} />
</div>
```

### 3. Server-Side Usage

For API routes and server components:

```typescript
import { hasFeatureAccess, getUserTierFromSubscription } from '@/utils/features/feature-utils';
import { FEATURES } from '@/config/features';

export async function POST(request: Request) {
  const user = await getUser();
  const userTier = getUserTierFromSubscription(user.subscription);

  if (!hasFeatureAccess(userTier, FEATURES.AUTO_APPLY)) {
    return Response.json({ error: 'This feature requires Early Access subscription' }, { status: 403 });
  }

  // Process auto-apply...
}
```

### 4. Check Limits

```tsx
const { limits, isPro } = useFeatureAccess(user?.tier);

if (alertCount >= limits.MAX_ALERTS) {
  return <div>Alert limit reached. {!isPro && 'Upgrade for unlimited alerts!'}</div>;
}
```

## Adding New Features

1. **Define the feature** in `src/config/features.ts`:

   ```typescript
   export const FEATURES = {
     // ... existing features
     MY_NEW_FEATURE: 'my_new_feature',
   } as const;
   ```

2. **Add metadata**:

   ```typescript
   export const FEATURE_METADATA: Record<Feature, {...}> = {
     // ... existing metadata
     [FEATURES.MY_NEW_FEATURE]: {
       name: 'My New Feature',
       description: 'Description of what it does',
       category: 'Category',
     },
   };
   ```

3. **Assign to a tier** (FREE_FEATURES or PRO_FEATURES):

   ```typescript
   export const PRO_FEATURES: Feature[] = [
     // ... existing features
     FEATURES.MY_NEW_FEATURE,
   ];
   ```

4. **Use in your components**:
   ```tsx
   <FeatureGate feature={FEATURES.MY_NEW_FEATURE} userTier={user?.tier}>
     <MyNewFeatureComponent />
   </FeatureGate>
   ```

## Best Practices

1. **Always use the FEATURES constant** - Don't hardcode feature strings
2. **Check access on both client and server** - Client for UI, server for security
3. **Provide good fallback UIs** - Show upgrade prompts or alternatives
4. **Update feature metadata** - Keep descriptions current
5. **Test tier changes** - Verify features work correctly after moving between tiers

## Examples

### Disable Button for Pro Features

```tsx
const { hasFeature, shouldShowUpgradePrompt } = useFeatureAccess(user?.tier);

<Button disabled={!hasFeature(FEATURES.AUTO_APPLY)} onClick={handleAutoApply}>
  {shouldShowUpgradePrompt(FEATURES.AUTO_APPLY) ? '🔒 Auto-Apply (Pro)' : 'Auto-Apply'}
</Button>;
```

### Conditional Navigation Items

```tsx
const { hasFeature } = useFeatureAccess(user?.tier);

const navItems = [
  { name: 'Dashboard', href: '/dashboard', always: true },
  { name: 'Auto-Apply', href: '/auto-apply', feature: FEATURES.AUTO_APPLY },
  { name: 'Analytics', href: '/analytics', feature: FEATURES.ANALYTICS_DASHBOARD },
].filter((item) => item.always || hasFeature(item.feature));
```

### Progressive Feature Disclosure

```tsx
const { availableFeatures, isPro } = useFeatureAccess(user?.tier);

return (
  <div>
    <h2>Your Features ({availableFeatures.length})</h2>
    {availableFeatures.map((feature) => (
      <FeatureCard key={feature} feature={feature} />
    ))}

    {!isPro && <UpgradeCard message={`Unlock ${PRO_FEATURES.length} more features!`} />}
  </div>
);
```

## Moving Features Between Tiers

To change a feature from Pro to Free (or vice versa):

1. Open `src/config/features.ts`
2. Find the feature in one array
3. Cut it from that array
4. Paste it into the other array
5. Save the file

That's it! The change applies everywhere automatically.

**Example:**

```typescript
// Before: Auto-apply is Pro only
export const PRO_FEATURES: Feature[] = [
  FEATURES.AUTO_APPLY, // ← Cut this
  // ...
];

// After: Auto-apply is now free
export const FREE_FEATURES: Feature[] = [
  FEATURES.AUTO_APPLY, // ← Paste here
  // ...
];
```

/**
 * Feature Configuration
 *
 * Move features between FREE_FEATURES and PRO_FEATURES to change availability.
 * The system will automatically handle visibility and functionality based on user's subscription.
 */

// Define all possible features in your app
export const FEATURES = {
  // Job Search Features
  BASIC_JOB_SEARCH: 'basic_job_search',
  ADVANCED_FILTERS: 'advanced_filters',
  SAVED_SEARCHES: 'saved_searches',
  JOB_RECOMMENDATIONS: 'job_recommendations',

  // Alert Features
  JOB_ALERTS: 'job_alerts',
  UNLIMITED_ALERTS: 'unlimited_alerts',
  CUSTOM_ALERT_CRITERIA: 'custom_alert_criteria',
  INSTANT_NOTIFICATIONS: 'instant_notifications',

  // Application Features
  MANUAL_APPLICATIONS: 'manual_applications',
  AUTO_APPLY: 'auto_apply',
  APPLICATION_TRACKING: 'application_tracking',
  COVER_LETTER_GENERATOR: 'cover_letter_generator',

  // Recruiter Features
  RECRUITER_CONTACT_INFO: 'recruiter_contact_info',
  DIRECT_MESSAGING: 'direct_messaging',
  RECRUITER_INSIGHTS: 'recruiter_insights',

  // Dashboard Features
  BASIC_DASHBOARD: 'basic_dashboard',
  ANALYTICS_DASHBOARD: 'analytics_dashboard',
  EXPORT_DATA: 'export_data',

  // Profile Features
  PROFILE_CREATION: 'profile_creation',
  RESUME_UPLOAD: 'resume_upload',
  SKILL_MATCHING: 'skill_matching',

  // Support Features
  EMAIL_SUPPORT: 'email_support',
  PRIORITY_SUPPORT: 'priority_support',
  DEDICATED_ACCOUNT_MANAGER: 'dedicated_account_manager',
} as const;

// Type for feature keys
export type Feature = (typeof FEATURES)[keyof typeof FEATURES];

// FREE TIER FEATURES
// Move features here to make them available in the free tier
export const FREE_FEATURES: Feature[] = [
  FEATURES.BASIC_JOB_SEARCH,
  FEATURES.SAVED_SEARCHES,
  FEATURES.MANUAL_APPLICATIONS,
  FEATURES.BASIC_DASHBOARD,
  FEATURES.PROFILE_CREATION,
  FEATURES.RESUME_UPLOAD,
  FEATURES.EMAIL_SUPPORT,
];

// PRO/EARLY ACCESS FEATURES
// Move features here to make them available only in paid tier
export const PRO_FEATURES: Feature[] = [
  FEATURES.ADVANCED_FILTERS,
  FEATURES.JOB_RECOMMENDATIONS,
  FEATURES.UNLIMITED_ALERTS,
  FEATURES.CUSTOM_ALERT_CRITERIA,
  FEATURES.INSTANT_NOTIFICATIONS,
  FEATURES.AUTO_APPLY,
  FEATURES.APPLICATION_TRACKING,
  FEATURES.COVER_LETTER_GENERATOR,
  FEATURES.RECRUITER_CONTACT_INFO,
  FEATURES.DIRECT_MESSAGING,
  FEATURES.RECRUITER_INSIGHTS,
  FEATURES.ANALYTICS_DASHBOARD,
  FEATURES.EXPORT_DATA,
  FEATURES.SKILL_MATCHING,
  FEATURES.PRIORITY_SUPPORT,
  FEATURES.DEDICATED_ACCOUNT_MANAGER,
];

// Feature metadata for display purposes
export const FEATURE_METADATA: Record<
  Feature,
  {
    name: string;
    description: string;
    category: string;
  }
> = {
  [FEATURES.BASIC_JOB_SEARCH]: {
    name: 'Basic Job Search',
    description: 'Search through contract jobs',
    category: 'Search',
  },
  [FEATURES.ADVANCED_FILTERS]: {
    name: 'Advanced Filters',
    description: 'Filter by salary, remote status, industry, and more',
    category: 'Search',
  },
  [FEATURES.SAVED_SEARCHES]: {
    name: 'Saved Searches',
    description: 'Save and reuse your favorite searches',
    category: 'Search',
  },
  [FEATURES.JOB_RECOMMENDATIONS]: {
    name: 'Job Recommendations',
    description: 'AI-powered job recommendations based on your profile',
    category: 'Search',
  },
  [FEATURES.JOB_ALERTS]: {
    name: 'Job Alerts',
    description: 'Get notified about new job postings',
    category: 'Alerts',
  },
  [FEATURES.UNLIMITED_ALERTS]: {
    name: 'Unlimited Alerts',
    description: 'Create unlimited job alerts',
    category: 'Alerts',
  },
  [FEATURES.CUSTOM_ALERT_CRITERIA]: {
    name: 'Custom Alert Criteria',
    description: 'Set specific criteria for your alerts',
    category: 'Alerts',
  },
  [FEATURES.INSTANT_NOTIFICATIONS]: {
    name: 'Instant Notifications',
    description: 'Receive instant notifications for new matches',
    category: 'Alerts',
  },
  [FEATURES.MANUAL_APPLICATIONS]: {
    name: 'Manual Applications',
    description: 'Apply to jobs manually',
    category: 'Applications',
  },
  [FEATURES.AUTO_APPLY]: {
    name: 'Auto-Apply',
    description: '5 automated job applications per day',
    category: 'Applications',
  },
  [FEATURES.APPLICATION_TRACKING]: {
    name: 'Application Tracking',
    description: 'Track all your applications in one place',
    category: 'Applications',
  },
  [FEATURES.COVER_LETTER_GENERATOR]: {
    name: 'Cover Letter Generator',
    description: 'AI-generated cover letters for each application',
    category: 'Applications',
  },
  [FEATURES.RECRUITER_CONTACT_INFO]: {
    name: 'Recruiter Contact Info',
    description: 'Access to recruiter contact information',
    category: 'Recruiters',
  },
  [FEATURES.DIRECT_MESSAGING]: {
    name: 'Direct Messaging',
    description: 'Message recruiters directly',
    category: 'Recruiters',
  },
  [FEATURES.RECRUITER_INSIGHTS]: {
    name: 'Recruiter Insights',
    description: 'View recruiter hiring patterns and preferences',
    category: 'Recruiters',
  },
  [FEATURES.BASIC_DASHBOARD]: {
    name: 'Basic Dashboard',
    description: 'View your job search activity',
    category: 'Dashboard',
  },
  [FEATURES.ANALYTICS_DASHBOARD]: {
    name: 'Analytics Dashboard',
    description: 'Detailed analytics and insights',
    category: 'Dashboard',
  },
  [FEATURES.EXPORT_DATA]: {
    name: 'Export Data',
    description: 'Export your data to CSV/Excel',
    category: 'Dashboard',
  },
  [FEATURES.PROFILE_CREATION]: {
    name: 'Profile Creation',
    description: 'Create your professional profile',
    category: 'Profile',
  },
  [FEATURES.RESUME_UPLOAD]: {
    name: 'Resume Upload',
    description: 'Upload and store your resume',
    category: 'Profile',
  },
  [FEATURES.SKILL_MATCHING]: {
    name: 'Skill Matching',
    description: 'Advanced skill-based job matching',
    category: 'Profile',
  },
  [FEATURES.EMAIL_SUPPORT]: {
    name: 'Email Support',
    description: 'Email support within 48 hours',
    category: 'Support',
  },
  [FEATURES.PRIORITY_SUPPORT]: {
    name: 'Priority Support',
    description: 'Priority email support within 24 hours',
    category: 'Support',
  },
  [FEATURES.DEDICATED_ACCOUNT_MANAGER]: {
    name: 'Dedicated Account Manager',
    description: 'Personal account manager',
    category: 'Support',
  },
};

// Limits for free tier
export const FREE_TIER_LIMITS = {
  MAX_ALERTS: 5,
  MAX_SAVED_SEARCHES: 10,
  MAX_APPLICATIONS_PER_DAY: 0, // manual only
  MAX_EXPORT_ROWS: 0,
};

// Limits for pro tier
export const PRO_TIER_LIMITS = {
  MAX_ALERTS: Infinity,
  MAX_SAVED_SEARCHES: Infinity,
  MAX_APPLICATIONS_PER_DAY: 5,
  MAX_EXPORT_ROWS: Infinity,
};

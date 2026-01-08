import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export function NoSubscriptionView() {
  return (
    <>
      <DashboardPageHeader pageTitle={'Subscriptions'} />
      <div className={'max-w-md'}>
        <div className={'dashboard-card p-8 text-center'}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 flex items-center justify-center mx-auto mb-6">
            <Sparkles size={28} className="text-purple-400" />
          </div>
          <h2 className={'section-header text-xl mb-3'}>No Active Subscriptions</h2>
          <p className="text-muted-foreground mb-6">
            Unlock unlimited job alerts, auto-applications, and recruiter access with Early Access.
          </p>
          <Button
            asChild={true}
            className={
              'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 rounded-xl'
            }
          >
            <Link href={'/'} className="flex items-center gap-2">
              View Plans
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

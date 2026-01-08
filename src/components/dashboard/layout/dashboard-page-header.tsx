import { Separator } from '@/components/ui/separator';
import { MobileSidebar } from '@/components/dashboard/layout/mobile-sidebar';

interface Props {
  pageTitle: string;
}

export function DashboardPageHeader({ pageTitle }: Props) {
  return (
    <div>
      <div className={'flex items-center gap-6'}>
        <MobileSidebar />
        <h1 className="text-xl font-semibold md:text-3xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          {pageTitle}
        </h1>
      </div>
      <Separator className={'relative bg-white/10 my-8 dashboard-header-highlight'} />
    </div>
  );
}

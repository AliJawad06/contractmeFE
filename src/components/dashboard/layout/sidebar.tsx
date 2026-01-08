'use client';

import { LayoutDashboard, Sparkles, CreditCard, Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: '/dashboard',
  },
  {
    title: 'Job Search',
    icon: <Search className="h-5 w-5" />,
    href: '/dashboard/jobs',
  },
  {
    title: 'Alerts',
    icon: <Bell className="h-5 w-5" />,
    href: '/dashboard/alerts',
  },
  {
    title: 'Subscription',
    icon: <Sparkles className="h-5 w-5" />,
    href: '/dashboard/subscriptions',
  },
  {
    title: 'Payments',
    icon: <CreditCard className="h-5 w-5" />,
    href: '/dashboard/payments',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col grow justify-between items-start px-2 text-sm font-medium lg:px-4">
      <div className={'w-full flex flex-col gap-1'}>
        {sidebarItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn('flex items-center text-sm gap-3 px-4 py-3 dashboard-sidebar-items', {
              'dashboard-sidebar-items-active':
                item.href === '/dashboard' ? pathname === item.href : pathname.includes(item.href),
            })}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

import { Button } from '@/components/ui/button';
import { ArrowUpRight, Zap, BookOpen, Settings } from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
  {
    title: 'Set Up Alerts',
    description: 'Configure job alerts for your skills',
    icon: <Zap size={18} className="text-purple-400" />,
    href: '/dashboard/alerts',
  },
  {
    title: 'Manage Profile',
    description: 'Update your skills and preferences',
    icon: <Settings size={18} className="text-purple-400" />,
    href: '/dashboard/settings',
  },
  {
    title: 'Getting Started',
    description: 'Learn how to use Contractly',
    icon: <BookOpen size={18} className="text-purple-400" />,
    href: '#',
  },
];

export function DashboardTutorialCard() {
  return (
    <div className={'dashboard-card p-8'}>
      <h2 className={'section-header mb-6'}>Quick Actions</h2>
      <div className="flex flex-col gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-purple-500/10 hover:border-purple-500/20 transition-all"
          >
            <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
              {link.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">{link.title}</div>
              <div className="text-xs text-muted-foreground">{link.description}</div>
            </div>
            <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-purple-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}

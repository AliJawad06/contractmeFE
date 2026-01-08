import { Bell, Send, Users, Sparkles } from 'lucide-react';

const cards = [
  {
    title: 'Active Alerts',
    icon: <Bell className={'text-purple-400'} size={20} />,
    value: '12',
    change: 'Unlimited with Early Access',
    accent: true,
  },
  {
    title: 'Auto-Applications Today',
    icon: <Send className={'text-purple-400'} size={20} />,
    value: '3/5',
    change: '2 remaining today',
    accent: false,
  },
  {
    title: 'Jobs Matched',
    icon: <Sparkles className={'text-purple-400'} size={20} />,
    value: '847',
    change: '+124 this week',
    accent: false,
  },
  {
    title: 'Recruiters Contacted',
    icon: <Users className={'text-purple-400'} size={20} />,
    value: '23',
    change: '+8 this month',
    accent: false,
  },
];

export function DashboardUsageCardGroup() {
  return (
    <div className={'grid gap-6 sm:grid-cols-2 lg:grid-cols-4'}>
      {cards.map((card) => (
        <div key={card.title} className={card.accent ? 'stats-card p-6' : 'dashboard-card p-6'}>
          <div className="flex justify-between items-start mb-4">
            <span className={'text-sm font-medium text-muted-foreground'}>{card.title}</span>
            <div className="p-2 rounded-lg bg-purple-500/10">{card.icon}</div>
          </div>
          <div className={'text-3xl font-semibold text-white mb-2'}>{card.value}</div>
          <div className="text-sm text-muted-foreground">{card.change}</div>
        </div>
      ))}
    </div>
  );
}

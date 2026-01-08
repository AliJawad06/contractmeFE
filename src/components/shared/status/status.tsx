import { Check, CircleMinus, Clock4, Pause, SquarePen } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
  status: string;
}

interface StatusInfo {
  [key: string]: { bgColor: string; textColor: string; icon: ReactNode; text: string };
}

const StatusInfo: StatusInfo = {
  active: { bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-400', icon: <Check size={14} />, text: 'Active' },
  paid: { bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-400', icon: <Check size={14} />, text: 'Paid' },
  completed: {
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
    icon: <Check size={14} />,
    text: 'Completed',
  },
  trialing: { bgColor: 'bg-purple-500/10', textColor: 'text-purple-400', icon: <Clock4 size={14} />, text: 'Trialing' },
  draft: { bgColor: 'bg-white/5', textColor: 'text-muted-foreground', icon: <SquarePen size={14} />, text: 'Draft' },
  ready: { bgColor: 'bg-white/5', textColor: 'text-muted-foreground', icon: <SquarePen size={14} />, text: 'Ready' },
  canceled: {
    bgColor: 'bg-white/5',
    textColor: 'text-muted-foreground',
    icon: <CircleMinus size={14} />,
    text: 'Canceled',
  },
  inactive: { bgColor: 'bg-red-500/10', textColor: 'text-red-400', icon: <CircleMinus size={14} />, text: 'Inactive' },
  past_due: { bgColor: 'bg-red-500/10', textColor: 'text-red-400', icon: <Clock4 size={14} />, text: 'Past due' },
  paused: { bgColor: 'bg-amber-500/10', textColor: 'text-amber-400', icon: <Pause size={14} />, text: 'Paused' },
  billed: {
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
    icon: <Clock4 size={14} />,
    text: 'Unpaid invoice',
  },
};

export function Status({ status }: Props) {
  const { bgColor, textColor, icon, text } = StatusInfo[status] ?? {
    bgColor: 'bg-white/5',
    textColor: 'text-muted-foreground',
    text: status,
  };
  return (
    <div
      className={`inline-flex items-center gap-1.5 ${bgColor} ${textColor} rounded-full py-1 px-3 text-xs font-medium whitespace-nowrap`}
    >
      {icon}
      {text}
    </div>
  );
}

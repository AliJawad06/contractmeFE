import { AlertCircle } from 'lucide-react';

export function ErrorContent() {
  return (
    <div className={'dashboard-card p-8 text-center max-w-md mx-auto'}>
      <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
        <AlertCircle size={24} className="text-red-400" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">Something went wrong</h3>
      <p className="text-muted-foreground text-sm">Please try again later or contact support if the issue persists.</p>
    </div>
  );
}

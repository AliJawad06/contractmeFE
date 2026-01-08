import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center flex-col w-full py-20">
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 flex items-center justify-center">
          <Loader2 className="animate-spin text-purple-400" size={24} />
        </div>
      </div>
      <p className="text-muted-foreground text-sm mt-4">Loading...</p>
    </div>
  );
}

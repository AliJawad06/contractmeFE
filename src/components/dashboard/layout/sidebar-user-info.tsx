'use client';

import { Separator } from '@/components/ui/separator';
import { LogOut, User } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { MouseEvent } from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';

export function SidebarUserInfo() {
  const supabase = createClient();
  const { user } = useUserInfo(supabase);

  async function handleLogout(e: MouseEvent) {
    e.preventDefault();
    await supabase.auth.signOut();
    location.reload();
  }

  return (
    <div className={'flex flex-col items-start pb-8 px-2 text-sm font-medium lg:px-4'}>
      <Separator className={'relative mt-6 dashboard-sidebar-highlight bg-white/10'} />
      <div className={'flex w-full flex-row mt-6 items-center gap-3'}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 flex items-center justify-center flex-shrink-0">
          <User size={18} className="text-purple-400" />
        </div>
        <div className={'flex flex-col items-start justify-center overflow-hidden flex-1 min-w-0'}>
          <div
            className={
              'text-sm leading-5 font-medium text-white w-full overflow-hidden text-ellipsis whitespace-nowrap'
            }
          >
            {user?.user_metadata?.full_name || 'User'}
          </div>
          <div
            className={'text-xs leading-4 text-muted-foreground w-full overflow-hidden text-ellipsis whitespace-nowrap'}
          >
            {user?.email}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors flex-shrink-0"
          title="Sign out"
        >
          <LogOut size={18} className={'text-muted-foreground hover:text-purple-400 transition-colors'} />
        </button>
      </div>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function CheckoutHeader() {
  return (
    <div className={'flex gap-4 items-center'}>
      <Link href={'/'}>
        <Button variant={'secondary'} className={'h-[32px] bg-[#182222] border-border w-[32px] p-0 rounded-[4px]'}>
          <ChevronLeft />
        </Button>
      </Link>
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <span className="text-xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Contractly
        </span>
      </Link>
    </div>
  );
}

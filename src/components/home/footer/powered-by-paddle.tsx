import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function PoweredByPaddle() {
  return (
    <>
      <Separator className={'footer-border'} />
      <div
        className={
          'flex flex-col justify-center items-center gap-4 text-muted-foreground text-sm leading-[14px] py-[32px]'
        }
      >
        <div className={'flex justify-center items-center gap-2'}>
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">C</span>
          </div>
          <span className={'text-sm font-medium'}>Contractly</span>
        </div>
        <div className={'flex justify-center items-center gap-6 flex-wrap md:flex-nowrap'}>
          <Link className={'text-sm leading-[14px] hover:text-white transition-colors'} href={'/privacy'}>
            Privacy Policy
          </Link>
          <Link className={'text-sm leading-[14px] hover:text-white transition-colors'} href={'/terms'}>
            Terms of Service
          </Link>
          <Link
            className={'text-sm leading-[14px] hover:text-white transition-colors'}
            href={'mailto:support@contractly.io'}
          >
            Contact
          </Link>
        </div>
        <div className={'text-xs text-muted-foreground/60 mt-2'}>© 2025 Contractly. All rights reserved.</div>
      </div>
    </>
  );
}

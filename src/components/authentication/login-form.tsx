'use client';

import { Button } from '@/components/ui/button';
import { login, loginAnonymously } from '@/app/login/actions';
import { useState } from 'react';
import { AuthenticationForm } from '@/components/authentication/authentication-form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

export function LoginForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    login({ email, password }).then((data) => {
      if (data?.error) {
        toast({ description: 'Invalid email or password', variant: 'destructive' });
      }
    });
  }

  function handleAnonymousLogin() {
    loginAnonymously().then((data) => {
      if (data?.error) {
        toast({ description: 'Something went wrong. Please try again', variant: 'destructive' });
      }
    });
  }

  return (
    <form action={'#'} className={'px-6 md:px-16 pb-6 py-8 gap-6 flex flex-col items-center justify-center'}>
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-2xl">C</span>
      </div>
      <div className={'text-[30px] leading-[36px] font-medium tracking-[-0.6px] text-center'}>Log in to Contractly</div>
      <Button onClick={() => handleAnonymousLogin()} type={'button'} variant={'secondary'} className={'w-full mt-6'}>
        Log in as Guest
      </Button>
      <div className={'flex w-full items-center justify-center'}>
        <Separator className={'w-5/12 bg-border'} />
        <div className={'text-border text-xs font-medium px-4'}>or</div>
        <Separator className={'w-5/12 bg-border'} />
      </div>
      <AuthenticationForm
        email={email}
        onEmailChange={(email) => setEmail(email)}
        password={password}
        onPasswordChange={(password) => setPassword(password)}
      />
      <Button formAction={() => handleLogin()} type={'submit'} variant={'secondary'} className={'w-full'}>
        Log in
      </Button>
    </form>
  );
}

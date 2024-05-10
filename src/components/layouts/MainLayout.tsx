import { SignInPage } from '@/routes/auth/sign-in.lazy';
import { memberAtom } from '@/states';
import { AppShell, Center } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';

export const MainLayout = ({ children }: PropsWithChildren) => {
  const member = useAtomValue(memberAtom);

  return !member || !member.id ? (
    <Center h={'100vh'}>
      <SignInPage />
    </Center>
  ) : (
    <AppShell navbar={{ width: 300, breakpoint: 'sm' }}>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

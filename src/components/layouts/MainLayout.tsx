import { currentMemberAtom } from '@/app';
import { SignInPage } from '@/routes/auth/sign-in.lazy';
import { AppShell, Center } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { PropsWithChildren } from 'react';
import { AppNavbar } from './Navbar';

export const MainLayout = ({ children }: PropsWithChildren) => {
  const member = useAtomValue(currentMemberAtom);

  return !member || !member.id ? (
    <Center h={'100vh'}>
      <SignInPage />
    </Center>
  ) : (
    <AppShell navbar={{ width: 300, breakpoint: 'sm' }}>
      <AppShell.Navbar>
        <AppNavbar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

import { currentMemberAtom, notificationCountAtom } from '@/app';
import { SignInPage } from '@/routes/auth/sign-in.lazy';
import { AppShell, Center } from '@mantine/core';
import { useAtomValue, useSetAtom } from 'jotai';
import { PropsWithChildren, useEffect } from 'react';
import { AppNavbar } from './Navbar';
import { useList } from '@/api';
import { INotificationResDto } from '@/libs';

export const MainLayout = ({ children }: PropsWithChildren) => {
  const member = useAtomValue(currentMemberAtom);
  const setNotificationCount = useSetAtom(notificationCountAtom);
  const { data } = useList<INotificationResDto>({ resource: 'notifications' });

  useEffect(() => {
    if (data?.data) {
      setNotificationCount(data.data.filter((item) => !item.isRead).length);
    }
    return () => {};
  }, [data]);

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

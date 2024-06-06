import { axiosInstance } from '@/api/utils';
import { currentMemberAtom } from '@/app';
import { IMemberResDto, memberRoleRecord } from '@/libs';
import {
  Avatar,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Button } from '@nextui-org/react';
import { Link } from '@tanstack/react-router';
import {
  Building02Icon,
  Contact02Icon,
  DashboardSpeed02Icon,
  Invoice01Icon,
  Invoice04Icon,
  Logout05Icon,
  Mailbox01Icon,
} from 'hugeicons-react';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import OneSignal from 'react-onesignal';
import { LinksGroup } from './LinksGroup';
import classes from './MainLayout.module.css';

const navItems = [
  { label: 'Overview', icon: DashboardSpeed02Icon, link: '/' },
  {
    label: 'Properties',
    icon: Building02Icon,
    initiallyOpened: true,
    links: [
      { label: 'Properties', link: '/properties' },
      { label: 'Units', link: '/units' },
      { label: 'Equipments', link: '/equipments' },
    ],
  },
  {
    label: 'Contracts & Invoices',
    icon: Invoice01Icon,
    initiallyOpened: true,
    links: [
      { label: 'Contracts', link: '/contracts' },
      { label: 'Invoices', link: '/invoices' },
    ],
  },
  {
    label: 'Contacts',
    icon: Contact02Icon,
    initiallyOpened: true,
    links: [
      { label: 'Tenants', link: '/members/tenants' },
      { label: 'Service workers', link: '/members/service-workers' },
    ],
  },
  {
    label: 'Requests',
    icon: Invoice04Icon,
    link: '/requests',
  },
];

export function AppNavbar() {
  const theme = useMantineTheme();

  const [member, setMember] = useAtom(currentMemberAtom);

  const links = useMemo(
    () =>
      [
        ...navItems,
        {
          label: 'Chat & Notifications',
          icon: Mailbox01Icon,
          links: [
            { label: 'Chat', link: '/chat' },
            {
              label: 'Notifications',
              link: '/notifications',
            },
          ],
        },
      ].map((item) => <LinksGroup {...item} key={item.label} />),
    [],
  );

  return (
    <nav className={classes.navbar}>
      <Group justify="space-between" mb="md">
        <Text ff={'mono'} fw={900} fz={'lg'} c={theme.primaryColor}>
          {import.meta.env.VITE_APP_NAME}
        </Text>
      </Group>
      <Divider mx={-16} />
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
      <Divider />
      <Stack my={'sm'}>
        <Link to="/members/me">
          <Group>
            <Avatar size={'md'} src={member.imgUrl} />
            <Stack gap={0}>
              <Text>{member.name}</Text>
              <Text fz={'sm'} fw={'bold'}>
                {memberRoleRecord[member.role]}
              </Text>
            </Stack>
          </Group>
        </Link>
        <Button
          variant="bordered"
          color="danger"
          startContent={<Logout05Icon strokeWidth={1.5} />}
          onClick={async () => {
            setMember({} as IMemberResDto);
            OneSignal.User.removeTag('memberId');
            await axiosInstance.delete('/auth/sign-out');
          }}
        >
          <span>Logout</span>
        </Button>
      </Stack>
    </nav>
  );
}

import { axiosInstance } from '@/api/utils';
import { currentMemberAtom } from '@/app';
import { IMemberResDto, INotificationResDto, memberRoleRecord } from '@/libs';
import {
  Avatar,
  Badge,
  Divider,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Button } from '@nextui-org/react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  Building02Icon,
  Contact02Icon,
  DashboardSpeed02Icon,
  Invoice01Icon,
  Invoice04Icon,
  Logout05Icon,
  Mailbox01Icon,
  Message01Icon,
} from 'hugeicons-react';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import OneSignal from 'react-onesignal';
import { LinksGroup } from './LinksGroup';
import classes from './MainLayout.module.css';
import { useList } from '@/api';

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
    links: [{ label: 'Tenants', link: '/members/tenants' }],
  },
  {
    label: 'Requests',
    icon: Invoice04Icon,
    link: '/requests',
  },
  {
    label: 'Chat',
    icon: Message01Icon,
    link: '/chat',
  },
];

export function AppNavbar() {
  const theme = useMantineTheme();

  const [member, setMember] = useAtom(currentMemberAtom);

  const { data: notifications, refetch } = useList<INotificationResDto>({
    resource: 'notifications',
  });

  const unreadNotifications = useMemo(() => {
    return notifications?.data.filter((noti) => !noti.isRead).length;
  }, [notifications]);

  const [readLater, setReadLater] = useState(false);

  const navigate = useNavigate();

  const links = useMemo(
    () =>
      [
        ...navItems,
        {
          label: (
            <span>
              Notifications
              {!!unreadNotifications && (
                <Badge color="red" className="ml-2">
                  {unreadNotifications}
                </Badge>
              )}
            </span>
          ),
          icon: Mailbox01Icon,
          link: '/notifications',
        },
      ].map((item) => <LinksGroup {...item} key={item.label} />),
    [unreadNotifications],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className={classes.navbar}>
      <Modal
        onClose={() => setReadLater(true)}
        opened={!!(!readLater && unreadNotifications)}
        title="Notifications"
        centered
      >
        <div className="flex flex-col items-center gap-4">
          <p>You have {unreadNotifications} unread notifications</p>
          <Button
            fullWidth
            color="primary"
            onPress={() => {
              setReadLater(true);
              navigate({ to: '/notifications' });
            }}
          >
            Go to notifications
          </Button>
          <Button fullWidth onPress={() => setReadLater(true)}>
            Read later
          </Button>
        </div>
        {/* Modal content */}
      </Modal>
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

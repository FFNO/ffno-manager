import { axiosInstance } from '@/api/utils';
import { MemberResDto, memberRoleRecord } from '@/shared';
import { memberAtom } from '@/states';
import {
  Avatar,
  Button,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import {
  BuildingIcon,
  CircleGaugeIcon,
  ClipboardListIcon,
  ContactIcon,
  LogOutIcon,
  MessageCircleIcon,
  ReceiptIcon,
} from 'lucide-react';
import OneSignal from 'react-onesignal';
import { LinksGroup } from './LinksGroup';
import classes from './MainLayout.module.css';

const navItems = [
  { label: 'Tổng quan', icon: CircleGaugeIcon, link: '/managers' },
  {
    label: 'Bất động sản',
    icon: BuildingIcon,
    initiallyOpened: true,
    links: [
      { label: 'Tòa nhà', link: '/managers/properties' },
      { label: 'Căn hộ', link: '/managers/properties?view=units' },
      { label: 'Thiết bị & nội thất', link: '/managers/' },
    ],
  },
  {
    label: 'Giao dịch',
    icon: ReceiptIcon,
    initiallyOpened: true,
    links: [{ label: 'Hóa đơn', link: '/managers/invoices' }],
  },
  {
    label: 'Liên lạc',
    icon: ContactIcon,
    initiallyOpened: true,
    links: [
      { label: 'Người thuê nhà', link: '/managers/contacts?type=0' },
      { label: 'Dịch vụ chuyên nghiệp', link: '/managers/contacts?type=1' },
    ],
  },
  {
    label: 'Yêu cầu',
    icon: ClipboardListIcon,
    link: '/requests',
  },
  {
    label: 'Chat',
    icon: MessageCircleIcon,
    link: '/chat',
  },
];

export function Navbar() {
  const theme = useMantineTheme();

  const [member, setMember] = useAtom(memberAtom);

  const links = navItems.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

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
          radius={0}
          mx={-16}
          px={'md'}
          variant="subtle"
          justify="start"
          leftSection={<LogOutIcon strokeWidth={1.5} />}
          onClick={async () => {
            setMember({} as MemberResDto);
            OneSignal.User.removeTag('memberId');
            await axiosInstance.delete('/auth/sign-out');
          }}
        >
          <span>Đăng xuất</span>
        </Button>
      </Stack>
    </nav>
  );
}

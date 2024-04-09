import { axiosInstance } from "@/api/utils";
import { MemberResDto, MemberRole } from "@/libs";
import { SignInPage } from "@/routes/auth/sign-in.lazy";
import {
  AppShell,
  Box,
  Burger,
  Button,
  Center,
  Code,
  Group,
  Modal,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import {
  BuildingIcon,
  CircleGaugeIcon,
  ClipboardListIcon,
  ContactIcon,
  ReceiptIcon,
} from "lucide-react";
import { PropsWithChildren } from "react";
import OneSignal from "react-onesignal";
import { LinksGroup } from "./LinksGroup";
import classes from "./MainLayout.module.css";

const managerNavLinks = [
  { label: "Tổng quan", icon: CircleGaugeIcon, link: "/managers" },
  {
    label: "Bất động sản",
    icon: BuildingIcon,
    initiallyOpened: true,
    links: [
      { label: "Tòa nhà", link: "/managers/properties" },
      { label: "Căn hộ", link: "/managers/properties?view=units" },
      { label: "Thiết bị & nội thất", link: "/managers/" },
    ],
  },
  {
    label: "Giao dịch",
    icon: ReceiptIcon,
    initiallyOpened: true,
    links: [{ label: "Hóa đơn", link: "/managers/invoices" }],
  },
  {
    label: "Liên lạc",
    icon: ContactIcon,
    initiallyOpened: true,
    links: [
      { label: "Người thuê nhà", link: "/managers/contacts?type=0" },
      { label: "Dịch vụ chuyên nghiệp", link: "/managers/contacts?type=1" },
    ],
  },
  {
    label: "Yêu cầu",
    icon: ClipboardListIcon,
    link: "/managers/requests",
  },
];

const tenantNavLinks = [
  { label: "Tổng quan", icon: CircleGaugeIcon, link: "/" },
  { label: "Căn hộ", icon: CircleGaugeIcon, link: "/units" },
  {
    label: "Liên lạc",
    icon: ContactIcon,
    initiallyOpened: true,
    links: [
      { label: "Người thuê nhà", link: "/contacts?type=0" },
      { label: "Dịch vụ chuyên nghiệp", link: "/contacts?type=1" },
    ],
  },
];

export const MainLayout = ({ children }: PropsWithChildren) => {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const [member, setMember] = useLocalStorage<Nullable<MemberResDto>>({
    key: "member",
    defaultValue: JSON.parse(localStorage.getItem("member") || "{}"),
  });

  return (
    <>
      <Modal
        opened={!(member && member.id)}
        fullScreen
        withCloseButton={false}
        onClose={() => {}}
        padding={0}
      >
        <Center h={"100vh"} bg={"blue"}>
          <SignInPage setMember={setMember} />
        </Center>
      </Modal>

      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: "sm" }}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group justify="space-between">
              <Text ff={"mono"} fw={900} fz={"lg"} c={theme.primaryColor}>
                {import.meta.env.VITE_APP_NAME}
              </Text>
              <Code fw={700}>{member?.id}</Code>
            </Group>
            <Box flex={1} />
            <Button
              variant="light"
              onClick={async () => {
                setMember(null);
                OneSignal.User.removeTag("memberId");
                await axiosInstance.delete("/auth/sign-out");
              }}
            >
              Đăng xuất
            </Button>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <Navbar role={member?.role} />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
};

function Navbar({ role = MemberRole.ADMIN }: { role?: MemberRole }) {
  const links = (
    [MemberRole.ADMIN, MemberRole.LANDLORD].includes(role)
      ? managerNavLinks
      : tenantNavLinks
  ).map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
      <div className={classes.footer}></div>
    </nav>
  );
}

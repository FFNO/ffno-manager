import { SignInPage } from "@/routes/auth/sign-in.lazy";
import {
  AppShell,
  Burger,
  Center,
  Code,
  Group,
  Modal,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { BuildingIcon, CircleGaugeIcon, ContactIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import { LinksGroup } from "./LinksGroup";
import classes from "./MainLayout.module.css";
import { GetMemberResDto } from "@/contracts";

const navLinks = [
  { label: "Dashboard", icon: CircleGaugeIcon },
  {
    label: "Properties",
    icon: BuildingIcon,
    initiallyOpened: true,
    links: [
      { label: "Properties", link: "/properties" },
      { label: "Units", link: "/" },
      { label: "Equipments", link: "/" },
    ],
  },
  {
    label: "Contacts",
    icon: ContactIcon,
    initiallyOpened: true,
    links: [
      { label: "Tenants", link: "/contacts?type=0" },
      { label: "Service pros", link: "/contacts?type=1" },
    ],
  },
];

export const MainLayout = ({ children }: PropsWithChildren) => {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const [member] = useLocalStorage<GetMemberResDto>({ key: "member" });

  if (!(member && "id" in member)) {
    return (
      <Modal
        opened
        fullScreen
        withCloseButton={false}
        onClose={() => {}}
        padding={0}
      >
        <Center h={"100vh"} bg={"blue"}>
          <SignInPage />
        </Center>
      </Modal>
    );
  }

  return (
    <>
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
              <Code fw={700}>{member.id}</Code>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
};
function Navbar() {
  const links = navLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
      <div className={classes.footer}>{/* <UserButton /> */}</div>
    </nav>
  );
}

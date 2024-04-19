import { SignInPage } from "@/routes/auth/sign-in.lazy";
import { memberAtom } from "@/states";
import { AppShell, BackgroundImage, Center } from "@mantine/core";
import { useRouterState } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

const isPublicRoute = (path: string) => path.startsWith("/preview");

export const MainLayout = ({ children }: PropsWithChildren) => {
  const router = useRouterState();
  const member = useAtomValue(memberAtom);

  if (isPublicRoute(router.location.pathname)) {
    return children;
  }

  return !member || !member.id ? (
    <BackgroundImage src="//auth-bg.jpg">
      <Center h={"100vh"}>
        <SignInPage />
      </Center>
    </BackgroundImage>
  ) : (
    <AppShell navbar={{ width: 300, breakpoint: "sm" }}>
      <AppShell.Navbar>
        <Navbar role={member?.role} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

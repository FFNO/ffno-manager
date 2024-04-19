import { Page404 } from "@/components/errors";
import { MainLayout } from "@/components/layouts";
import { MemberRole } from "@/libs";
import { memberAtom } from "@/states";
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { useAtomValue } from "jotai";

export const Route = createRootRoute({
  component: () => <RootRoute />,
  notFoundComponent: () => <Page404 />,
});

function RootRoute() {
  const router = useRouterState();
  const member = useAtomValue(memberAtom);

  const isForbidden =
    ![MemberRole.ADMIN, MemberRole.LANDLORD].includes(member.role) &&
    router.location.pathname.startsWith("/managers");

  return (
    <MainLayout>
      {isForbidden ? <>Forbidden resources</> : <Outlet />}
    </MainLayout>
  );
}

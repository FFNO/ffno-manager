import { Page404 } from '@/components/errors';
import { MainLayout } from '@/components/layouts';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => <RootRoute />,
  notFoundComponent: () => <Page404 />,
});

function RootRoute() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat/')({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});

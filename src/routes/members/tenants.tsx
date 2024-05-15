import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/members/tenants')({
  component: () => <div>Hello /members/tenants!</div>,
});

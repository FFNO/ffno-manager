import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/invoices/$id/merge')({
  component: () => <div>Hello /invoices/$id/merge!</div>,
});

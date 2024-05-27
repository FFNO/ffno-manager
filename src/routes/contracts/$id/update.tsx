import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contracts/$id/update')({
  component: () => <div>Hello /contracts/$id/update!</div>,
});

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contracts/')({
  component: () => <div>Hello /contracts/!</div>,
});

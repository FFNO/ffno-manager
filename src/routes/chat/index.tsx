import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat/')({
  component: () => <div>Hello /chat/!</div>,
});

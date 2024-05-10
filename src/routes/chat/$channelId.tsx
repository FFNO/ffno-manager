import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat/$channelId')({
  component: () => <div>Hello /chat/$channelId!</div>,
});

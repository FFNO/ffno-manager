import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/members/service-workers')({
  component: () => <div>Hello /members/service-workers!</div>,
});

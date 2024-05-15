import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipments/')({
  component: () => <div>Hello /equipments/!</div>,
});

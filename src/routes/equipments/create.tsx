import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipments/create')({
  component: () => <div>Hello /equipments/create!</div>,
});

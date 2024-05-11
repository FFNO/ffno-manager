import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/members/$id')({
  component: () => <div>Hello /members/$id!</div>,
});

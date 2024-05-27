import { dataProvider } from '@/api';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/members/me')({
  component: Page,
  loader: () => dataProvider.getOne({ resource: 'members', id: 'me' }),
});

function Page() {
  return <></>;
}

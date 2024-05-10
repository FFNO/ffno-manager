import { dataProvider } from '@/api';
import { IRequestResDto } from '@/libs';
import { RequestPage } from '@/modules/requests/RequestDetailPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/requests/$requestId')({
  component: () => <RequestPage />,
  loader: ({ params: { requestId } }) =>
    dataProvider.getOne<IRequestResDto>({
      resource: 'requests',
      id: requestId,
    }),
});

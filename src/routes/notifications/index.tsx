import NotificationListPage from '@/pages/notifications/NotificationListPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/notifications/')({
  component: NotificationListPage,
});

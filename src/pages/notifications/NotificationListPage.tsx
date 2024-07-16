import { useList } from '@/api';
import { axiosInstance } from '@/api/utils';
import { INotificationResDto } from '@/libs';
import { formatDatetime } from '@/libs/helpers';
import {
  Box,
  Button,
  Card,
  Group,
  Indicator,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';

function NotificationListPage() {
  const navigate = useNavigate();

  const { data, refetch } = useList<INotificationResDto>({
    resource: 'notifications',
  });

  const handleNavigate = async (data: INotificationResDto) => {
    await markAsRead(data.id);

    if (data.requestId) {
      navigate({ to: '/requests/$id', params: { id: data.requestId } });
    }
    if (data.contractId) {
      navigate({ to: '/contracts/$id', params: { id: data.contractId } });
    }
  };

  async function markAsRead(id: string) {
    await axiosInstance.put(`notifications/mark-as-read/${id}`);
    refetch();
  }

  async function markAsUnread(id: string) {
    await axiosInstance.put(`notifications/mark-as-unread/${id}`);
    refetch();
  }

  const handleReadAll = async () => {
    await axiosInstance.put('notifications/mark-as-read');
    refetch();
  };

  return (
    <Stack p={'lg'} px={32}>
      <Group justify="space-between">
        <Title>Notifications</Title>
        <Box flex={1} />
        <Button onClick={() => handleReadAll()}>Mark all as read</Button>
      </Group>

      <SimpleGrid cols={1} pb={24}>
        {data?.data.map((notification) => (
          <Indicator
            color="red"
            size={notification.isRead ? 0 : 16}
            key={notification.id}
          >
            <Card withBorder>
              <div className="inline-flex items-center gap-4">
                <div className="flex flex-1 flex-col">
                  <p className="text-lg font-semibold">{notification.title}</p>
                  <p>{notification.content}</p>
                </div>
                <p>{formatDatetime(notification.createdAt)}</p>
                <Button onClick={() => handleNavigate(notification)}>
                  View detail
                </Button>
                {notification.isRead ? (
                  <Button
                    variant="outline"
                    onClick={() => markAsUnread(notification.id)}
                  >
                    Mark as unread
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            </Card>
          </Indicator>
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default NotificationListPage;

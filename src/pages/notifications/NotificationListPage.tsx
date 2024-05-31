import { useList } from '@/api';
import { INotificationResDto } from '@/libs';
import { formatDate } from '@/libs/helpers';
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

  const { data } = useList<INotificationResDto>({ resource: 'notifications' });

  const handleNavigate = (data: INotificationResDto) => {
    if (data.requestId) {
      navigate({ to: '/requests/$id', params: { id: data.requestId } });
    }
  };
  return (
    <Stack p={'lg'} px={32}>
      <Group justify="space-between">
        <Title>Notifications</Title>
        <Box flex={1} />
      </Group>

      <SimpleGrid cols={1} pb={24}>
        {data?.data.map((notification) => (
          <Indicator size={16} key={notification.id}>
            <Card>
              <div className="inline-flex items-center">
                <div className="flex flex-1 flex-col">
                  <p className="text-lg font-semibold">{notification.title}</p>
                  <p>{notification.content}</p>
                </div>
                <p>{formatDate(notification.createdAt)}</p>
                <Button onClick={() => handleNavigate()}>View detail</Button>
              </div>
            </Card>
          </Indicator>
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default NotificationListPage;

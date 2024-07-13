import { useOne } from '@/api';
import {
  Button,
  Card,
  Divider,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { Link, createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Calendar01Icon } from 'hugeicons-react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const theme = useMantineTheme();
  const { data } = useOne({ resource: 'members', id: 'stats' });
  return (
    <div>
      <Stack p={'lg'}>
        <div className="max-w-96">
          <Card shadow="sm">
            <Group>
              <Calendar01Icon size={32} />
              <Stack gap={0}>
                <Title order={5} tt="capitalize" fw={'bold'}>
                  {dayjs().format('dddd, DD/MM/YYYY')}
                </Title>
                <Group gap={4}>
                  <Text c={'gray'}>Không có thông báo mới. </Text>
                  <Link to="/notifications">
                    <Text c={theme.primaryColor} fw={'500'}>
                      Xem tất cả
                    </Text>
                  </Link>
                </Group>
              </Stack>
            </Group>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                  Total property
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-primary">
                  {data?.propertyCount}
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                  Total unit
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-primary">
                  {data?.unitCount}
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                  Total tenants
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-primary">
                  {data?.tenantCount}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
}

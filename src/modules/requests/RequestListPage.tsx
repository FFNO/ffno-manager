import { RequestCard } from '@/components/requests';
import { calculatePage } from '@/shared';
import {
  Button,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Tabs,
} from '@mantine/core';
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import { PlusIcon, UploadIcon } from 'lucide-react';

export function RequestListPage() {
  const data = useLoaderData({ from: '/requests/' });
  const search = useSearch({ from: '/requests/' });
  const navigate = useNavigate();

  return (
    <div>
      <Stack p={'lg'}>
        <Group justify="end">
          <Button variant="outline" leftSection={<UploadIcon size={16} />}>
            Tải lên
          </Button>
          {/* <InvoiceFilter /> */}
          <Link to="/requests/create">
            <Button leftSection={<PlusIcon size={16} />}>Thêm yêu cầu</Button>
          </Link>
        </Group>
        <Tabs
          variant="pills"
          defaultValue={'received'}
          onChange={(value) => navigate({ search: { type: value } })}
        >
          <Tabs.List>
            <Tabs.Tab value="received">Yêu cầu</Tabs.Tab>
            <Tabs.Tab value="sent">Đã gửi</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <SimpleGrid cols={1} px={32} py={24}>
          {data?.data.map((request) => (
            <RequestCard key={request.id} {...request} type={search.type} />
          ))}
        </SimpleGrid>
        <Pagination
          withEdges
          total={calculatePage(data?.total)}
          value={search.page}
          onChange={(page) =>
            navigate({ search: (prev) => ({ ...prev, page }) })
          }
        />
      </Stack>
    </div>
  );
}

import { dataProvider } from '@/api';
import { RequestCard } from '@/components/requests';
import { IRequestResDto } from '@/libs';
import { calculatePage } from '@/libs/helpers';
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
  createFileRoute,
  useLoaderData,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import { PlusSignIcon } from 'hugeicons-react';
import { z } from 'zod';

const searchSchema = z.object({
  type: z.string().default('received'),
  page: z.coerce.number().default(1),
});

export const Route = createFileRoute('/requests/')({
  component: Page,
  validateSearch: searchSchema.parse,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) =>
    dataProvider.getList<IRequestResDto>({
      resource: 'requests',
      params: deps,
    }),
});

function Page() {
  const data = useLoaderData({ from: '/requests/' });
  const search = useSearch({ from: '/requests/' });
  const navigate = useNavigate();

  return (
    <div>
      <Stack p={'lg'}>
        <Group justify="end">
          {/* <InvoiceFilter /> */}
          <Link to="/requests/create">
            <Button leftSection={<PlusSignIcon size={16} />}>
              Add request
            </Button>
          </Link>
        </Group>
        <Tabs
          variant="pills"
          defaultValue={'received'}
          onChange={(value) => navigate({ search: { type: value } })}
        >
          <Tabs.List>
            <Tabs.Tab value="received">Received request</Tabs.Tab>
            <Tabs.Tab value="sent">Sent request</Tabs.Tab>
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

import { useList } from '@/api';
import { InvoiceResDto, calculatePage } from '@/shared';
import { Button, Group, Pagination, SimpleGrid, Stack } from '@mantine/core';
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { PlusIcon, UploadIcon } from 'lucide-react';
import { InvoiceCard, InvoiceFilter } from './-components';

export const Route = createLazyFileRoute('/managers/invoices/')({
  component: () => <InvoiceListPage />,
});

function InvoiceListPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { data } = useList<InvoiceResDto>({
    resource: 'invoices',
    params: search,
  });

  return (
    <Stack p={'lg'}>
      <Group justify="end">
        <Button variant="outline" leftSection={<UploadIcon size={16} />}>
          Import
        </Button>
        <InvoiceFilter />
        <Link to="/managers/invoices/create">
          <Button leftSection={<PlusIcon size={16} />}>Thêm hóa đơn</Button>
        </Link>
      </Group>
      <SimpleGrid cols={2} px={32} py={24}>
        {data?.data.map((invoice) => (
          <InvoiceCard key={invoice.id} {...invoice} />
        ))}
      </SimpleGrid>
      <Pagination
        withEdges
        total={calculatePage(data?.total)}
        value={search.page}
        onChange={(page) => navigate({ search: (prev) => ({ ...prev, page }) })}
      />
    </Stack>
  );
}

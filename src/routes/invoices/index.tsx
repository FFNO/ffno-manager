import { useList } from '@/api';
import { invoiceSearchAtom } from '@/app';
import { InvoiceCard, InvoiceSearch } from '@/components/invoices';
import { IInvoiceResDto } from '@/libs';
import { calculatePage } from '@/libs/helpers';
import {
  Box,
  Button,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { Link, createFileRoute } from '@tanstack/react-router';
import { PlusSignIcon, Upload04Icon } from 'hugeicons-react';
import { useAtom } from 'jotai';

export const Route = createFileRoute('/invoices/')({
  component: Page,
});

function Page() {
  const [search, setSearch] = useAtom(invoiceSearchAtom);

  const { data } = useList<IInvoiceResDto>({
    resource: 'invoices',
    params: search,
  });

  return (
    <Stack p={'lg'}>
      <Group justify="space-between" px={32}>
        <Title>Invoices</Title>
        <Box flex={1} />
        <Button variant="outline" leftSection={<Upload04Icon size={16} />}>
          Import
        </Button>
        <InvoiceSearch />
        <Link to="/invoices/create">
          <Button leftSection={<PlusSignIcon size={16} />}>Add invoice</Button>
        </Link>
      </Group>
      <SimpleGrid cols={1} px={32} py={24}>
        {data?.data.map((invoice) => (
          <InvoiceCard key={invoice.id} {...invoice} />
        ))}
      </SimpleGrid>
      <Pagination
        withEdges
        total={calculatePage(data?.total)}
        value={search.page ?? 1}
        onChange={(page) => setSearch((prev) => ({ ...prev, page }))}
      />
    </Stack>
  );
}

import { useList } from '@/api';
import { invoiceSearchAtom, selectToMergeInvoices } from '@/app';
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
import { useMemo } from 'react';

export const Route = createFileRoute('/invoices/')({
  component: Page,
});

function Page() {
  const [search, setSearch] = useAtom(invoiceSearchAtom);
  const [selected] = useAtom(selectToMergeInvoices);

  const { data } = useList<IInvoiceResDto>({
    resource: 'invoices',
    params: search,
  });

  const selectedCount = useMemo(
    () => Object.values(selected).filter(Boolean).length,
    [selected],
  );

  return (
    <Stack p={'lg'} px={32}>
      <Group justify="space-between">
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
      <Group justify="space-between" mih={40}>
        {selectedCount && (
          <>
            <p className="text-lg font-medium">
              {selectedCount} invoices selected
            </p>
            <Button onClick={() => {}}>Merge invoices</Button>
          </>
        )}
      </Group>
      <SimpleGrid cols={1} pb={24}>
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

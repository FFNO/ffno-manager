import { useList } from '@/api';
import { invoiceSearchAtom, selectToMergeInvoices } from '@/app';
import { InvoiceSearch } from '@/components/invoices';
import {
  DATE_FORMAT,
  IInvoiceResDto,
  invoiceStatusColorRecord,
  invoiceStatusRecord,
} from '@/libs';
import { calculatePage, vndFormatter } from '@/libs/helpers';
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Table,
  Title,
} from '@mantine/core';
import { Link, createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import {
  CheckmarkCircle01Icon,
  GitMergeIcon,
  PlusSignIcon,
  Upload04Icon,
  ViewIcon,
} from 'hugeicons-react';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

export const Route = createFileRoute('/invoices/')({
  component: Page,
});

function Page() {
  const [search, setSearch] = useAtom(invoiceSearchAtom);
  const [selected, setSelected] = useAtom(selectToMergeInvoices);

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
            <Button color="grape" onClick={() => {}}>
              Merge invoices
            </Button>
          </>
        )}
      </Group>
      <SimpleGrid cols={1} pb={24}>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Tenant</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Property</Table.Th>
              <Table.Th ta={'center'}>Description</Table.Th>
              <Table.Th ta={'center'}>Due date</Table.Th>
              <Table.Th ta={'center'}>Total</Table.Th>
              <Table.Th ta={'center'}>Status</Table.Th>
              <Table.Th ta={'center'}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.total ? (
              data.data.map((invoice) => (
                <Table.Tr key={invoice.id}>
                  <Table.Td>#{invoice.id}</Table.Td>
                  <Table.Td>
                    <Group>
                      <Avatar size={'sm'} src={invoice.member.imgUrl} />
                      <p>{invoice.member.name}</p>
                    </Group>
                  </Table.Td>
                  <Table.Td>{invoice.unit.name}</Table.Td>
                  <Table.Td>{invoice.unit.property.name}</Table.Td>
                  <Table.Td>{invoice.description}</Table.Td>
                  <Table.Td>
                    {dayjs(invoice.dueDate).format(DATE_FORMAT)}
                  </Table.Td>
                  <Table.Td>{vndFormatter.format(invoice.total)}</Table.Td>
                  <Table.Td ta={'center'}>
                    <Badge color={invoiceStatusColorRecord[invoice.status]}>
                      {invoiceStatusRecord[invoice.status]}
                    </Badge>
                  </Table.Td>
                  <Table.Td ta={'center'}>
                    <Group justify="center">
                      <Link to="/invoices/$id" params={{ id: invoice.id }}>
                        <ActionIcon size={'lg'} variant="light">
                          <ViewIcon />
                        </ActionIcon>
                      </Link>

                      <ActionIcon
                        size={'lg'}
                        color="grape"
                        variant="light"
                        onClick={() => {
                          setSelected((prev) => ({
                            ...prev,
                            [invoice.id]: !prev[invoice.id],
                          }));
                        }}
                      >
                        {selected[invoice.id] ? (
                          <CheckmarkCircle01Icon />
                        ) : (
                          <GitMergeIcon />
                        )}
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Center h={425}>No data to display</Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
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

import { dataProvider } from '@/api';
import {
  IInvoiceResDto,
  invoiceStatusColorRecord,
  invoiceStatusRecord,
} from '@/libs';
import { vndFormatter } from '@/libs/helpers';
import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import dayjs from 'dayjs';

export const Route = createFileRoute('/invoices/$id/')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IInvoiceResDto>({ id, resource: 'invoices' }),
});

function Page() {
  const data = useLoaderData({ from: '/invoices/$id/' });

  return (
    <Paper px={48} py={32}>
      <Group mb="lg" justify="space-between">
        <Title order={2}>{`Invoice #${data.id}`}</Title>
        <Badge size="lg" color={invoiceStatusColorRecord[data.status]}>
          {invoiceStatusRecord[data.status]}
        </Badge>
        <Box flex={1}></Box>
        <Button>Edit invoice</Button>
        <Button>Print Invoice</Button>
      </Group>
      <Divider mb="lg" />
      <Grid>
        <Grid.Col span={12}>
          <SimpleGrid cols={2}>
            <Stack gap={0}>
              <p className="text-lg font-bold uppercase">Billing to:</p>
              <p>{data.member.name}</p>
              <p>{data.member.address}</p>
            </Stack>
            <SimpleGrid cols={2} spacing={0} className="">
              <p className="text-lg font-bold uppercase">Invoice #</p>
              <p>{data.id}</p>
              <p className="text-lg font-bold uppercase">Due date</p>
              <p>{dayjs(data.dueDate).format('DD/MM/YYYY')}</p>
            </SimpleGrid>
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={12}>
          <Table highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Description</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Unit Price</Table.Th>
                <Table.Th>Total</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.description}</Table.Td>
                  <Table.Td>{item.amount}</Table.Td>
                  <Table.Td>{vndFormatter.format(item.price)}</Table.Td>
                  <Table.Td>{vndFormatter.format(item.total)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group justify="end">
            <Text fw={500} size="lg">
              Total:
            </Text>
            <Text size="lg">{vndFormatter.format(data.total)}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

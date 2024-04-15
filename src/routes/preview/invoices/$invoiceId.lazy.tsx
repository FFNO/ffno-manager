import { useOne } from "@/api";
import { NumberFormatter, Paper, Table, Title } from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/preview/invoices/$invoiceId")({
  component: PublicInvoicePage,
});

function PublicInvoicePage() {
  const { invoiceId } = Route.useParams();

  const { data } = useOne({ id: invoiceId, resource: "invoices" });

  if (!data) {
    return "loading";
  }

  return (
    <Paper p={"lg"}>
      <Title tt={"uppercase"}>Hóa đơn</Title>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.items.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.description}</Table.Td>
              <Table.Td>{item.price}</Table.Td>
              <Table.Td>{item.amount}</Table.Td>
              <Table.Td align="right">
                <NumberFormatter
                  suffix=" ₫"
                  value={item.total}
                  thousandSeparator
                />
              </Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr>
            <Table.Td colSpan={4} align="right">
              <NumberFormatter
                suffix=" ₫"
                value={data.total}
                thousandSeparator
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      {/* <Code block>{JSON.stringify(data, null, 2)}</Code> */}
    </Paper>
  );
}

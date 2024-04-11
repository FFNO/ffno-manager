import { useOne } from "@/api";
import { Code, Paper, Title } from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/public/invoices/$invoiceId")({
  component: PublicInvoicePage,
});

function PublicInvoicePage() {
  const { invoiceId } = Route.useParams();

  const { data } = useOne({ id: invoiceId, resource: "invoices" });
  return (
    <Paper p={"lg"}>
      <Title tt={"uppercase"}>Hóa đơn</Title>
      <Code block>{JSON.stringify(data, null, 2)}</Code>
    </Paper>
  );
}

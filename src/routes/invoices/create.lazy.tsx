import { InvoiceCreate } from "@/modules/invoices";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/invoices/create")({
  component: InvoiceCreate,
});

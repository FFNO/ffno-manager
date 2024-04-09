import { InvoiceCreate } from "@/modules/invoices";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/managers/invoices/create")({
  component: InvoiceCreate,
});

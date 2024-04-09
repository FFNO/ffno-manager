import { ContactListPage } from "@/modules/contacts";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/managers/contacts/")({
  component: ContactListPage,
});

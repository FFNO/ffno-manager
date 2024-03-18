import { ContactPage } from "@/modules/contacts";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/contacts/$contactId")({
  component: ContactPage,
});

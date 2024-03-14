import { useOne } from "@/api";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/contacts/$contactId")({
  component: ContactPage,
});

function ContactPage() {
  const { contactId } = Route.useParams();

  const { data } = useOne({ resource: "members", id: contactId });
  return <>{JSON.stringify(data)}</>;
}

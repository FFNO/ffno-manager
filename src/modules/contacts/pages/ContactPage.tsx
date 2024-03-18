import { useOne } from "@/api";
import { Route } from "@/routes/contacts/$contactId.lazy";

export function ContactPage() {
  const { contactId } = Route.useParams();

  const { data } = useOne({ resource: "members", id: contactId });
  return <>{JSON.stringify(data)}</>;
}

import { RequestListPage } from "@/modules/requests";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/requests/")({
  component: () => <RequestListPage />,
});

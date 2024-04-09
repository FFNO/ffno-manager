import { RequestCreatePage } from "@/modules/requests";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/requests/create")({
  component: RequestCreatePage,
});

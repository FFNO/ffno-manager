import { RequestCreatePage } from "@/modules/requests";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/managers/requests/create")({
  component: RequestCreatePage,
});

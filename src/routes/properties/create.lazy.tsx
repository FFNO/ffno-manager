import { PropertyCreatePage } from "@/modules/properties";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/properties/create")({
  component: PropertyCreatePage,
});

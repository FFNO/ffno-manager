import { PropertyPage } from "@/modules/properties";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/managers/properties/$propertyId")({
  component: PropertyPage,
});

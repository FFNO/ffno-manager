import { PropertyPage } from "@/modules/properties";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/properties/$propertyId")({
  component: PropertyPage,
});

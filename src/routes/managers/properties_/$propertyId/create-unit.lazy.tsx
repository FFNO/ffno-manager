import { CreateUnitPage } from "@/modules/units/pages/create";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/managers/properties/$propertyId/create-unit")(
  {
    component: CreateUnitPage,
  }
);

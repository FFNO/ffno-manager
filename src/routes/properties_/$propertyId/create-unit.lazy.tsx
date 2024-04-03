import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/properties/$propertyId/create-unit")(
  {
    component: () => <div>Hello /ies/$propertyId/create-unit!</div>,
  }
);

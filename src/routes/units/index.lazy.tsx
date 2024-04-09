import { createLazyFileRoute } from "@tanstack/react-router";
import { UnitListPage } from "./-pages/list";

export const Route = createLazyFileRoute("/units/")({
  component: () => <UnitListPage />,
});

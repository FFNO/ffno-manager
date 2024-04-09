import { UnitPage } from "@/modules/units";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/managers/units/$unitId")({
  component: UnitPage,
});

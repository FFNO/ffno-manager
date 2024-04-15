import { dataProvider } from "@/api";
import { PropertyResDto } from "@/libs";
import { TenantUnitListPage } from "@/modules/units/TenantUnitListPage";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({});

export const Route = createFileRoute("/tenants/units/")({
  component: TenantUnitListPage,
  validateSearch: searchSchema.parse,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) =>
    dataProvider.getList<PropertyResDto>({ resource: "units", params: deps }),
});

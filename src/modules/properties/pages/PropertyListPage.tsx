import { useList } from "@/api";
import { PropertyResDto } from "@/libs";
import { Route } from "@/routes/properties/index";
import { PropertyListView, UnitListView } from "../components";

export function PropertyListPage() {
  const search = Route.useSearch();
  const { data } = useList<PropertyResDto>({ resource: "properties" });

  return search.view === "properties" ? (
    <PropertyListView properties={data?.data || []} />
  ) : (
    <UnitListView properties={data?.data || []} />
  );
}

import { PropertyResDto } from "@/libs";

export function UnitListView({ properties }: { properties: PropertyResDto[] }) {
  return <>{JSON.stringify(properties)}</>;
}

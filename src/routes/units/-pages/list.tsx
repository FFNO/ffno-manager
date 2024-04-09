import { useList } from "@/api";
import { UnitResDto } from "@/libs";
import { UnitCard } from "@/modules/units/components";
import { SimpleGrid } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../index";

export function UnitListPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const { data } = useList<UnitResDto>({
    resource: "units",
    params: search,
  });
  return (
    <>
      <SimpleGrid>
        {data?.data.map((item) => <UnitCard {...item} key={item.id} />)}
      </SimpleGrid>
    </>
  );
}

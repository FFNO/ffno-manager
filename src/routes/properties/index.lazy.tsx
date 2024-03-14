import { useList } from "@/api";
import { GetListPropertyResDto } from "@/contracts";
import { PropertyCard } from "@/modules/properties";
import { SimpleGrid } from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/properties/")({
  component: PropertiesPage,
});

function PropertiesPage() {
  const { data } = useList<GetListPropertyResDto>({ resource: "properties" });
  return (
    <SimpleGrid cols={2} px={32} py={24}>
      {data?.data.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </SimpleGrid>
  );
}

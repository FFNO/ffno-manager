import { useList } from "@/api";
import { PropertyResDto } from "@/contracts";
import { PropertyCard } from "@/modules/properties";
import { Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { FilterIcon, PlusIcon, UploadIcon } from "lucide-react";

export const Route = createLazyFileRoute("/properties/")({
  component: PropertiesPage,
});

function PropertiesPage() {
  const { data } = useList<PropertyResDto>({ resource: "properties" });
  return (
    <Stack p={"lg"}>
      <Group justify="end">
        <Button variant="outline" leftSection={<UploadIcon size={16} />}>
          Import
        </Button>
        <Button variant="outline" leftSection={<FilterIcon size={16} />}>
          Filter
          <Text px={8}>|</Text>
          {5}
        </Button>
        <Link to="/properties/create">
          <Button leftSection={<PlusIcon size={16} />}>Add property</Button>
        </Link>
      </Group>
      <SimpleGrid cols={2} px={32} py={24}>
        {data?.data.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

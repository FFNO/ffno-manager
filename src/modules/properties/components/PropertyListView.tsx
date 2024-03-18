import { PropertyResDto } from "@/libs";
import { Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { FilterIcon, PlusIcon, UploadIcon } from "lucide-react";
import { PropertyCard } from "./PropertyCard";

export function PropertyListView({
  properties,
}: {
  properties: PropertyResDto[];
}) {
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
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

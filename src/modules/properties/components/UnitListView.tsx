import { PropertyResDto } from "@/libs";
import { Code, SimpleGrid } from "@mantine/core";

export function UnitListView({ properties }: { properties: PropertyResDto[] }) {
  return (
    <>
      <SimpleGrid cols={2} px={32} py={24}>
        {properties.map((property) => (
          <Code block key={property.id}>
            {JSON.stringify(property, null, 2)}
          </Code>
        ))}
      </SimpleGrid>
    </>
  );
}

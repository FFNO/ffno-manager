import { UnitResDto } from "@/libs";
import { UnitCard } from "@/modules/units/components";
import { Paper, SimpleGrid } from "@mantine/core";

export const UnitTab = ({ items }: { items: UnitResDto[] }) => {
  return (
    <SimpleGrid cols={1} py={"lg"}>
      {items.map((item) => (
        <Paper key={item.id} shadow="lg" withBorder>
          <UnitCard key={item.id} {...item} />
        </Paper>
      ))}
    </SimpleGrid>
  );
};

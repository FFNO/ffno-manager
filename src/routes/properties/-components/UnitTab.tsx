import { UnitCard } from '@/components/units';
import { IUnitResDto } from '@/libs';
import { Paper, SimpleGrid } from '@mantine/core';

export const UnitTab = ({ items }: { items: IUnitResDto[] }) => {
  return (
    <SimpleGrid cols={1} py={'lg'}>
      {items.map((item) => (
        <Paper key={item.id} shadow="lg" withBorder>
          <UnitCard key={item.id} {...item} />
        </Paper>
      ))}
    </SimpleGrid>
  );
};

import { UnitCard } from '@/components/units';
import { IUnitResDto } from '@/libs';
import {
  Fieldset,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { Blockchain01Icon, PermanentJobIcon } from 'hugeicons-react';
import { useMemo } from 'react';

interface Props {
  items: IUnitResDto[];
}

export const UnitsTab = ({ items }: Props) => {
  const vacantUnits = useMemo(
    () => items.filter((item) => !item.tenants.length),
    [items],
  );

  const occupiedUnits = useMemo(
    () => items.filter((item) => item.tenants.length),
    [items],
  );

  return (
    <Stack py={'lg'}>
      <Fieldset
        legend={
          <Group gap={'xs'} px={'sm'}>
            <Blockchain01Icon size={20} />
            <Title order={4}>Vacant units</Title>
          </Group>
        }
      >
        <SimpleGrid cols={1} py={'lg'}>
          {vacantUnits.map((item) => (
            <Paper key={item.id} shadow="lg" withBorder>
              <UnitCard key={item.id} {...item} />
            </Paper>
          ))}
        </SimpleGrid>
      </Fieldset>
      <Fieldset
        legend={
          <Group gap={'xs'} px={'sm'}>
            <PermanentJobIcon size={20} />
            <Title order={4}>Occupied units</Title>
          </Group>
        }
      >
        <SimpleGrid cols={1} py={'lg'}>
          {occupiedUnits.map((item) => (
            <Paper key={item.id} shadow="lg" withBorder>
              <UnitCard key={item.id} {...item} />
            </Paper>
          ))}
        </SimpleGrid>
      </Fieldset>
    </Stack>
  );
};

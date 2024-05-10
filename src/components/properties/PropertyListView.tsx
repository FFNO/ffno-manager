import { IPropertyResDto } from '@/libs';
import { SimpleGrid } from '@mantine/core';
import { PropertyCard } from './PropertyCard';

export function PropertyListView({ items }: { items: IPropertyResDto[] }) {
  return (
    <SimpleGrid cols={2} px={32} py={24}>
      {items.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </SimpleGrid>
  );
}

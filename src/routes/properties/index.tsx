import { useList } from '@/api';
import { propertySearchAtom } from '@/app';
import { PropertyCard, PropertySearch } from '@/components/properties';
import { IPropertyResDto } from '@/libs';
import { calculatePage } from '@/libs/helpers';
import { Button, Group, Pagination, SimpleGrid, Stack } from '@mantine/core';
import { Link, createFileRoute } from '@tanstack/react-router';
import { PlusSignIcon, Upload04Icon } from 'hugeicons-react';
import { useAtom } from 'jotai';

export const Route = createFileRoute('/properties/')({
  component: Page,
});

function Page() {
  const [search, setSearch] = useAtom(propertySearchAtom);

  const { data } = useList<IPropertyResDto>({
    resource: 'properties',
    params: search,
  });

  return (
    <Stack p={'lg'}>
      {/* Header */}
      <Group justify="end">
        {/* TODO: Bulk upload propert */}
        <div className="hidden">
          <Button variant="outline" leftSection={<Upload04Icon size={20} />}>
            Bulk upload
          </Button>
        </div>
        <PropertySearch />
        <Link to="/properties/create">
          <Button leftSection={<PlusSignIcon size={20} />}>Add property</Button>
        </Link>
      </Group>
      {/* Properties Grid */}
      <SimpleGrid cols={2} px={32} py={24}>
        {data?.data.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </SimpleGrid>
      {/* Pagination */}
      <Pagination
        withEdges
        total={calculatePage(data?.total)}
        value={search.page ?? 1}
        onChange={(page) => setSearch((prev) => ({ ...prev, page }))}
      />
    </Stack>
  );
}

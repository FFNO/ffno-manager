import { dataProvider } from '@/api';
import {
  OverviewTab,
  PropertyAction,
  TenantsTab,
  UnitsTab,
} from '@/components/properties';
import { IPropertyResDto } from '@/libs';
import { Box, Group, Tabs, Title } from '@mantine/core';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/properties/$id/')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IPropertyResDto>({ id, resource: 'properties' }),
});

function Page() {
  const data = useLoaderData({ from: '/properties/$id/' });

  return (
    <>
      {/* Actions */}
      <Group p={'lg'}>
        <Title order={4}>{data.name}</Title>
        <Box flex={1} />
        <PropertyAction />
      </Group>
      {/* Tabs */}
      <Tabs variant="pills" defaultValue={'info'} px={'lg'}>
        <Tabs.List>
          <Tabs.Tab value="info">Overview</Tabs.Tab>
          <Tabs.Tab value="units">Units</Tabs.Tab>
          <Tabs.Tab value="tenants">Tenants</Tabs.Tab>
        </Tabs.List>
        {/* Overview */}
        <Tabs.Panel value="info">
          <OverviewTab {...data} />
        </Tabs.Panel>
        {/* Units */}
        <Tabs.Panel value="units">
          <UnitsTab items={data.units} />
        </Tabs.Panel>
        {/* Tenants */}
        <Tabs.Panel value="tenants">
          <TenantsTab />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

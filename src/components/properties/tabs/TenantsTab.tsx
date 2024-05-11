import { useList } from '@/api';
import { ContactCard } from '@/components/contacts';
import { IMemberResDto } from '@/libs';
import { Fieldset, Group, SimpleGrid, Stack, Title } from '@mantine/core';
import { useParams } from '@tanstack/react-router';
import { UserGroupIcon } from 'hugeicons-react';

export const TenantsTab = () => {
  const { id } = useParams({ from: '/properties/$id/' });
  const { data } = useList<IMemberResDto>({
    resource: `properties/${id}/tenants`,
  });

  return (
    <Stack py={'lg'}>
      <Fieldset
        legend={
          <Group gap={'xs'} px={'sm'}>
            <UserGroupIcon size={20} />
            <Title order={4}>Tenants</Title>
          </Group>
        }
      >
        <SimpleGrid cols={4} py={'lg'}>
          {data?.data.map((tenant) => (
            <ContactCard key={tenant.id} {...tenant} />
          ))}
        </SimpleGrid>
      </Fieldset>
    </Stack>
  );
};

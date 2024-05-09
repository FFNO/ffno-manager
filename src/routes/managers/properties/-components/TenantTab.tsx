import { useList } from '@/api';
import { ContactCard } from '@/components/contacts';
import { IMemberResDto } from '@/libs';
import { SimpleGrid } from '@mantine/core';

export const TenantTab = ({ propertyId }: { propertyId: string }) => {
  const { data } = useList<IMemberResDto>({
    resource: `properties/${propertyId}/tenants`,
    enabled: false,
  });

  return (
    <SimpleGrid cols={4} py={'lg'}>
      {data?.data.map((tenant) => <ContactCard key={tenant.id} {...tenant} />)}
    </SimpleGrid>
  );
};

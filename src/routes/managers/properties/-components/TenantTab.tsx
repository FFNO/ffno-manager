import { useList } from "@/api";
import { ContactCard } from "@/components/contacts";
import { MemberResDto } from "@/libs";
import { SimpleGrid } from "@mantine/core";

export const TenantTab = ({ propertyId }: { propertyId: string }) => {
  const { data } = useList<MemberResDto>({
    resource: `properties/${propertyId}/tenants`,
    enabled: false,
  });

  return (
    <SimpleGrid cols={4} py={"lg"}>
      {data?.data.map((tenant) => <ContactCard key={tenant.id} {...tenant} />)}
    </SimpleGrid>
  );
};

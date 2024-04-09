import { useList } from "@/api";
import { MemberResDto } from "@/libs";
import { ContactCard } from "@/modules/contacts";
import { Route } from "@/routes/managers/properties/$propertyId.lazy";
import { SimpleGrid } from "@mantine/core";

export const TenantTab = () => {
  const { propertyId } = Route.useParams();

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

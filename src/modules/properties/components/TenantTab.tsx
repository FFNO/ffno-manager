import { useList } from "@/api";
import { MemberResDto } from "@/libs";
import { ContactCard } from "@/modules/contacts";
import { Route } from "@/routes/properties/$propertyId.lazy";
import { SimpleGrid } from "@mantine/core";

export const TenantTab = () => {
  const { propertyId } = Route.useParams();

  const { data, refetch } = useList<MemberResDto>({
    resource: `properties/${propertyId}/tenants`,
    enabled: false,
  });
  return (
    <div>
      <SimpleGrid cols={4}>
        {data?.data.map((tenant) => (
          <ContactCard key={tenant.id} {...tenant} />
        ))}
      </SimpleGrid>
    </div>
  );
};

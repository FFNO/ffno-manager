import { useList, useOne } from "@/api";
import { GetMemberResDto, PropertyResDto } from "@/libs";
import { Route } from "@/routes/properties/$propertyId.lazy";
import { Tabs } from "@mantine/core";
import { TenantTab } from "../components";

export function PropertyPage() {
  const { propertyId } = Route.useParams();

  const { data: propertyInfo } = useOne<PropertyResDto>({
    resource: "properties",
    id: propertyId,
  });

  const { refetch } = useList<GetMemberResDto>({
    resource: `properties/${propertyId}/tenants`,
    enabled: false,
  });

  return (
    <>
      <Tabs variant="outline" defaultValue={"info"}>
        <Tabs.List>
          <Tabs.Tab value="info">Profile</Tabs.Tab>
          <Tabs.Tab value="units">Units</Tabs.Tab>
          <Tabs.Tab value="tenants" onClick={() => refetch()}>
            Tenants
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">{JSON.stringify(propertyInfo)}</Tabs.Panel>
        <Tabs.Panel value="units">{JSON.stringify(propertyInfo)}</Tabs.Panel>
        <Tabs.Panel value="tenants">
          <TenantTab />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

import { useOne } from "@/api";
import { PropertyResDto } from "@/contracts";
import { Tabs } from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/properties/$propertyId")({
  component: PropertyPage,
});

function PropertyPage() {
  const { propertyId } = Route.useParams();

  const { data: propertyInfo } = useOne<PropertyResDto>({
    resource: "properties",
    id: propertyId,
  });

  const { data: tenants, refetch } = useOne({
    resource: "properties",
    id: propertyId + "/tenants",
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
        <Tabs.Panel value="tenants">{JSON.stringify(tenants)}</Tabs.Panel>
      </Tabs>
    </>
  );
}

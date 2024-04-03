import { useList, useOne } from "@/api";
import { MemberResDto, PropertyResDto } from "@/libs";
import { Route } from "@/routes/properties/$propertyId.lazy";
import { Box, Button, Group, Menu, Tabs, Title } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { EllipsisIcon, PlusIcon } from "lucide-react";
import { TenantTab } from "../components";

export function PropertyPage() {
  const navigate = useNavigate();
  const { propertyId } = Route.useParams();

  const { data: propertyInfo } = useOne<PropertyResDto>({
    resource: "properties",
    id: propertyId,
  });

  const { refetch } = useList<MemberResDto>({
    resource: `properties/${propertyId}/tenants`,
    enabled: false,
  });

  return (
    <>
      <Group p={"lg"}>
        <Title order={4}>{propertyInfo?.name}</Title>
        <Box flex={1} />
        <Button>Chuyển vào</Button>
        <Menu>
          <Menu.Target>
            <Button variant="light" rightSection={<EllipsisIcon />}>
              Hành động
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<PlusIcon size={16} />}
              onClick={() =>
                navigate({
                  to: "/properties/$propertyId/create-unit",
                  params: { propertyId },
                })
              }
            >
              Thêm phòng
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Tabs variant="outline" defaultValue={"info"}>
        <Tabs.List>
          <Tabs.Tab value="info">Tổng quan</Tabs.Tab>
          <Tabs.Tab value="units">Danh sách phòng</Tabs.Tab>
          <Tabs.Tab value="tenants" onClick={() => refetch()}>
            Danh sách người thuê
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

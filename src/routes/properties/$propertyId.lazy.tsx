import { useList, useOne } from '@/api';
import { IMemberResDto, IPropertyResDto } from '@/libs';
import {
  Box,
  Button,
  Fieldset,
  Grid,
  Group,
  Input,
  Menu,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { EllipsisIcon, HomeIcon, PlusIcon } from 'lucide-react';
import { TenantTab, UnitTab } from './-components';

export const Route = createLazyFileRoute('/properties/$propertyId')({
  component: PropertyPage,
});

function PropertyPage() {
  const navigate = useNavigate();
  const { propertyId } = Route.useParams();

  const { data: propertyInfo } = useOne<IPropertyResDto>({
    resource: 'properties',
    id: propertyId,
  });

  const { refetch } = useList<IMemberResDto>({
    resource: `properties/${propertyId}/tenants`,
    enabled: false,
  });

  return (
    <>
      <Group p={'lg'}>
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
                  to: '/properties/$propertyId/create-unit',
                  params: { propertyId },
                })
              }
            >
              Thêm phòng
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Tabs variant="pills" defaultValue={'info'} px={'lg'}>
        <Tabs.List>
          <Tabs.Tab value="info">Tổng quan</Tabs.Tab>
          <Tabs.Tab value="units">Danh sách phòng</Tabs.Tab>
          <Tabs.Tab value="tenants" onClick={() => refetch()}>
            Danh sách người thuê
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <Stack py={'lg'}>
            <Fieldset
              legend={
                <Group gap={'xs'} px={'sm'}>
                  <HomeIcon size={20} />
                  <Title order={4}>Thông tin cơ bản</Title>
                </Group>
              }
            >
              <Stack>
                <SimpleGrid cols={2}>
                  <Input.Wrapper label="Tên tòa nhà">
                    <Text>{propertyInfo?.name}</Text>
                  </Input.Wrapper>
                  <Input.Wrapper label="Chủ nhà">
                    <Text>
                      {propertyInfo?.owner.name} - {propertyInfo?.owner.phone}
                    </Text>
                  </Input.Wrapper>
                </SimpleGrid>
                <Grid columns={12}>
                  <Grid.Col span={6}>
                    <Input.Wrapper label="Địa chỉ">
                      <Text>{propertyInfo?.address}</Text>
                    </Input.Wrapper>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Input.Wrapper label="Tỉnh/Thành phố">
                      <Text>{propertyInfo?.province}</Text>
                    </Input.Wrapper>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Input.Wrapper label="Quận/Huyện">
                      <Text>{propertyInfo?.district}</Text>
                    </Input.Wrapper>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Input.Wrapper label="Phường/Xã">
                      <Text>{propertyInfo?.ward}</Text>
                    </Input.Wrapper>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Input.Wrapper label="Mô tả">
                      <Text>{propertyInfo?.details}</Text>
                    </Input.Wrapper>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Fieldset>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="units">
          <UnitTab items={propertyInfo?.units ?? []} />
        </Tabs.Panel>
        <Tabs.Panel value="tenants">
          <TenantTab propertyId={propertyId} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

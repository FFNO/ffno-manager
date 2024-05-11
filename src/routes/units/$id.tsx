import { dataProvider } from '@/api';
import { IUnitResDto, UnitStatus } from '@/libs';
import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  NumberFormatter,
  Paper,
  Table,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

export const Route = createFileRoute('/units/$id')({
  component: UnitPage,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IUnitResDto>({ resource: 'units', id }),
});

function UnitPage() {
  const data = useLoaderData({ from: '/units/$id' });

  return (
    <Paper p={'lg'}>
      <Group>
        <Title>{`Phong ${data.name} toa nha ${data.propertyId}`}</Title>
        <Box flex={1} />
        <Button>Yeu cau thue nha</Button>
      </Group>
      <Grid gutter="lg">
        <Grid.Col span={6}>
          <Card shadow="sm" padding="md">
            <Carousel
              loop
              withIndicators
              withControls
              slideGap="md"
              height={300}
              nextControlIcon={
                <ActionIcon radius={'xl'}>
                  <ArrowRightIcon />
                </ActionIcon>
              }
              previousControlIcon={
                <ActionIcon radius={'xl'}>
                  <ArrowLeftIcon />
                </ActionIcon>
              }
            >
              {data.imgUrls.map((url, index) => (
                <Carousel.Slide key={index}>
                  <AspectRatio h={300}>
                    <Image src={url} alt={`Unit ${index + 1}`} />
                  </AspectRatio>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="md">
            <Tabs variant="outline" defaultValue="basic-info">
              <Tabs.List>
                <Tabs.Tab value="basic-info">Thông tin cơ bản</Tabs.Tab>
                <Tabs.Tab value="tenants">Người thuê</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="basic-info">
                <div>
                  <Text>Khu vực: {data.area} m2</Text>
                  <Text>
                    Giá:
                    <NumberFormatter
                      prefix="₫ "
                      thousandSeparator
                      value={data.price}
                    />
                  </Text>
                  <Text>
                    Đặt cọc:
                    <NumberFormatter
                      prefix="₫ "
                      thousandSeparator
                      value={data.deposit}
                    />
                  </Text>
                  <Text>
                    Tình trạng:{' '}
                    <Badge
                      color={data.status === UnitStatus.GOOD ? 'green' : 'red'}
                    >
                      {data.status === UnitStatus.GOOD
                        ? 'Còn trống'
                        : 'Đã thuê'}
                    </Badge>
                  </Text>
                  <Divider m="md" />
                  <Text>{data.details}</Text>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="tenants">
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Người thuê</Table.Th>
                      <Table.Th>Email</Table.Th>
                      <Table.Th>Số điện thoại</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {data.tenants.map((tenant) => (
                      <Table.Tr key={tenant.id}>
                        <Table.Td>
                          <Group>
                            <Avatar size={'sm'} src={tenant.imgUrl} />
                            {tenant.name}
                          </Group>
                        </Table.Td>
                        <Table.Td>{tenant.email}</Table.Td>
                        <Table.Td>{tenant.phone}</Table.Td>
                        <Table.Td>{tenant.unit}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Tabs.Panel>
            </Tabs>
          </Card>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

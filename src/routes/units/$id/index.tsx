import { dataProvider } from '@/api';
import { IUnitResDto, UnitStatus } from '@/libs';
import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  NumberFormatter,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import {
  Link,
  createFileRoute,
  useLoaderData,
  useNavigate,
} from '@tanstack/react-router';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

export const Route = createFileRoute('/units/$id/')({
  component: UnitPage,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IUnitResDto>({ resource: 'units', id }),
});

function UnitPage() {
  const data = useLoaderData({ from: '/units/$id/' });

  const navigate = useNavigate();
  return (
    <Stack px={120} py={'md'}>
      <Breadcrumbs className="my-4 font-semibold text-primary cursor-pointer">
        <Link to="/">Home</Link>
        <Link to="/units">Units</Link>
        <Link to="/units/$id" params={{ id: data.id }}>
          {data.name} - {data.property.name}
        </Link>
      </Breadcrumbs>
      <Group>
        <Title>{`Unit ${data.name} - ${data.property.name}`}</Title>
        <Box flex={1} />
        <Button
          onClick={() =>
            navigate({ to: '/units/$id/update', params: { id: data.id } })
          }
        >
          Update
        </Button>
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
                <Tabs.Tab value="basic-info">Basic information</Tabs.Tab>
                <Tabs.Tab value="tenants">Tenants</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="basic-info">
                <div>
                  <Text>Area: {data.area} m2</Text>
                  <Text>
                    Price:
                    <NumberFormatter
                      prefix="₫ "
                      thousandSeparator
                      value={data.price}
                    />
                  </Text>
                  <Text>
                    Deposit:
                    <NumberFormatter
                      prefix="₫ "
                      thousandSeparator
                      value={data.deposit}
                    />
                  </Text>
                  <Text>
                    Status:{' '}
                    <Badge
                      color={data.status === UnitStatus.GOOD ? 'green' : 'red'}
                    >
                      {data.status === UnitStatus.GOOD ? 'Vacant' : 'Occupied'}
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
                      <Table.Th>Tenant</Table.Th>
                      <Table.Th>Email</Table.Th>
                      <Table.Th>Phone number</Table.Th>
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
    </Stack>
  );
}

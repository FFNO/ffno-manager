import { dataProvider } from '@/api';
import EquipmentTab from '@/components/units/EquipmentTab';
import { DATE_FORMAT, IUnitResDto, UnitStatus } from '@/libs';
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
  Chip,
  Divider,
  Fieldset,
  Group,
  NumberFormatter,
  Progress,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { Image } from '@nextui-org/react';
import {
  Link,
  createFileRoute,
  useLoaderData,
  useNavigate,
} from '@tanstack/react-router';
import dayjs from 'dayjs';
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  PenTool02Icon,
  Settings05Icon,
  StarIcon,
} from 'hugeicons-react';

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
        <Title>{`${data.name} - ${data.property.name}`}</Title>
        <Box flex={1} />
        <Button
          onClick={() =>
            navigate({ to: '/units/$id/update', params: { id: data.id } })
          }
        >
          Update
        </Button>
      </Group>

      <Fieldset legend={'Information'} className="min-h-[720px]">
        <Tabs variant="outline" defaultValue="basic-info">
          <Tabs.List>
            <Tabs.Tab value="basic-info">Basic information</Tabs.Tab>
            <Tabs.Tab value="tenants">
              Tenants ({data.curSlot}/{data.maxSlot})
            </Tabs.Tab>
            <Tabs.Tab value="equipments">Equipments</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="basic-info">
            <div className="flex flex-col h-full">
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
              <Text>{data.description}</Text>
              <Divider m="md" />
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
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Tabs.Panel>
          <Tabs.Panel value="equipments">
            <EquipmentTab unitId={data.id} />
          </Tabs.Panel>
        </Tabs>
      </Fieldset>
      <Fieldset
        legend={
          <Group gap={'xs'} px={'sm'}>
            <Settings05Icon size={20} />
            <Title order={4}>Features</Title>
          </Group>
        }
      >
        <Group wrap="wrap">
          {data.unitFeatures.map((item) => (
            <Chip checked key={item}>
              {item}
            </Chip>
          ))}
        </Group>
      </Fieldset>
      <Fieldset
        legend={
          <Group gap={'xs'} px={'sm'}>
            <PenTool02Icon size={20} />
            <Title order={4}>Comments</Title>
          </Group>
        }
      >
        <div className="inline-flex gap-4 w-full">
          <Card withBorder p={'lg'}>
            <div className="inline-flex items-center gap-2">
              <StarIcon color="yellow" fill="yellow" />
              <p>{`${data.rating.rating ?? 0}/5 (Based on ${data.reviews.length} reviews)`}</p>
            </div>
            <Card.Section p={'lg'}>
              <Stack w={400} gap={'xs'}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Stack key={i}>
                    <Group justify="space-between">
                      <p>{i} stars</p>
                      <p>{data.rating.ratingMap[i]}%</p>
                    </Group>
                    <Progress value={data.rating.ratingMap[i]} />
                  </Stack>
                ))}
              </Stack>
            </Card.Section>
          </Card>
          <div className="flex-1 flex flex-col gap-2 border rounded-md p-4">
            {data.reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-2 pb-2 border-b"
              >
                <div className="inline-flex justify-between items-center">
                  {/* Author */}
                  <div className="inline-flex items-center gap-2">
                    <Avatar src={review.author.imgUrl} />
                    <div className="flex flex-col">
                      <p className="font-semibold">{review.author.name}</p>
                      <p className="text-xs">
                        {dayjs(review.createdAt).format(DATE_FORMAT)}
                      </p>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="inline-flex">
                    {Array.from({
                      length: Math.round(review.rating),
                    }).map((_, index) => (
                      <StarIcon key={index} color="yellow" fill="yellow" />
                    ))}
                  </div>
                </div>
                <div>{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </Fieldset>
      <Fieldset legend={'Images'}>
        <Carousel
          loop
          withIndicators
          withControls
          slideGap="md"
          height={500}
          nextControlIcon={
            <ActionIcon radius={'xl'}>
              <ArrowRight02Icon />
            </ActionIcon>
          }
          previousControlIcon={
            <ActionIcon radius={'xl'}>
              <ArrowLeft02Icon />
            </ActionIcon>
          }
        >
          {data.imgUrls.map((url, index) => (
            <Carousel.Slide key={index} className="basis-auto">
              <Image
                radius="none"
                src={url}
                className="cursor-pointer h-[500px] mb-2"
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Fieldset>
    </Stack>
  );
}

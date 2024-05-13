import { useList } from '@/api';
import { unitSearchAtom } from '@/app';
import { UnitCard, UnitSearch } from '@/components/units';
import { IPropertyResDto } from '@/libs';
import { calculatePage } from '@/libs/helpers';
import {
  Accordion,
  AspectRatio,
  Button,
  Divider,
  Group,
  Image,
  Pagination,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Link, createFileRoute } from '@tanstack/react-router';
import {
  MapsLocation01Icon,
  PlusSignIcon,
  Upload04Icon,
} from 'hugeicons-react';
import { useAtom } from 'jotai';
import { Fragment } from 'react/jsx-runtime';

export const Route = createFileRoute('/units/')({ component: Page });

function Page() {
  const theme = useMantineTheme();

  const [search, setSearch] = useAtom(unitSearchAtom);

  const { data } = useList<IPropertyResDto>({
    resource: 'units',
    params: search,
  });

  return (
    <Stack p={'lg'}>
      {/* Header */}
      <Group justify="end">
        <Button variant="outline" leftSection={<Upload04Icon size={20} />}>
          Bulk upload
        </Button>
        <UnitSearch />
        <Link to="/units/create">
          <Button leftSection={<PlusSignIcon size={20} />}>Add unit</Button>
        </Link>
      </Group>
      {/* Units Grid */}
      <Accordion multiple variant="separated" px={32} py={24}>
        {data?.data.map((property) => (
          <Accordion.Item key={property.id} value={property.id}>
            <Accordion.Control>
              <Group>
                <AspectRatio ratio={1} w={100}>
                  <Image
                    radius={'md'}
                    src={property.imgUrls[0]}
                    alt={property.name}
                    fallbackSrc="/fallback.png"
                  />
                </AspectRatio>
                <Stack h={100} justify="start" gap={'xs'}>
                  <Title order={5}>{property.name}</Title>
                  <Group gap={'xs'}>
                    <MapsLocation01Icon
                      size={20}
                      strokeWidth={1.5}
                      color={theme.colors.gray[7]}
                    />
                    <Text fz={'sm'} c={theme.colors.gray[7]}>
                      {property.address}
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              {property.units.map((unit, index) => (
                <Fragment key={unit.id}>
                  {index !== 0 && <Divider />}
                  <UnitCard {...unit} />
                </Fragment>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      {/* Pagination */}
      <Pagination
        withEdges
        total={calculatePage(data?.total)}
        value={search.page ?? 1}
        onChange={(page) => setSearch((prev) => ({ ...prev, page }))}
      />
    </Stack>
  );
}

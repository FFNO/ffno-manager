import { dataProvider } from '@/api';
import { UnitCard } from '@/components/units';
import { PropertyResDto } from '@/shared';
import { memberAtom } from '@/states';
import {
  AspectRatio,
  Card,
  Divider,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Link, createFileRoute, useLoaderData } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { MapPinnedIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { z } from 'zod';

const searchSchema = z.object({});

export const Route = createFileRoute('/units/')({
  component: TenantUnitListPage,
  validateSearch: searchSchema.parse,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) =>
    dataProvider.getList<PropertyResDto>({ resource: 'units', params: deps }),
});

function TenantUnitListPage() {
  const theme = useMantineTheme();
  const member = useAtomValue(memberAtom);
  const data = useLoaderData({ from: '/units/' });

  return (
    <>
      <SimpleGrid cols={1} px={32} py={24}>
        {data?.data.map((property) => (
          <Card key={property.id} withBorder shadow="lg" mb={'lg'}>
            <Card.Section>
              <Group bg={theme.colors.gray[0]} p={'lg'}>
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
                    <MapPinnedIcon
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
            </Card.Section>
            <Card.Section>
              <Divider />
              {property.units.map((unit, index) => (
                <Fragment key={unit.id}>
                  {index !== 0 && <Divider ml={60} />}
                  <Link to="/units/$unitId" params={{ unitId: unit.id }}>
                    <UnitCard ml={60} {...unit} memberRole={member!.role} />
                  </Link>
                </Fragment>
              ))}
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

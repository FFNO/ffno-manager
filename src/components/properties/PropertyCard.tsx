import { IPropertyResDto, PropertyType } from '@/libs';
import {
  AspectRatio,
  Badge,
  Box,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { MapPinnedIcon } from 'lucide-react';

interface Props extends IPropertyResDto {}

export const PropertyCard = ({
  id,
  name,
  type,
  address,
  ward,
  district,
  province,
  units,
  imgUrls,
  occupiedCount,
  vacantCount,
}: Props) => {
  const theme = useMantineTheme();

  return (
    <Link to={`/properties/$id`} params={{ id }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group>
          <AspectRatio ratio={1} style={{ flex: `0 0 ${rem(160)}` }}>
            <Image
              radius={'md'}
              src={imgUrls[0]}
              alt={name}
              fallbackSrc="/fallback.png"
            />
          </AspectRatio>
          <Stack flex={1} h={'100%'} justify="start" gap={'sm'}>
            <Title order={5}>{name}</Title>
            <Group gap={'xs'}>
              <MapPinnedIcon size={24} color={theme.colors.gray[6]} />
              <Box>
                <Text fz={'sm'} c={theme.colors.gray[6]}>
                  {`${address}`}
                </Text>
                <Text fz={'sm'} c={theme.colors.gray[6]}>
                  {`${ward}, ${district}, ${province}`}
                </Text>
              </Box>
            </Group>
            <Box flex={1} />
            <Title order={4}>{propertyType(type, units.length)}</Title>
            <Group>
              {type === PropertyType.SINGLE_UNIT ? (
                <>
                  {occupiedCount ? (
                    <Badge color="green">occupied</Badge>
                  ) : (
                    <Badge color="yellow">vacant</Badge>
                  )}
                </>
              ) : (
                <>
                  <Badge color="green">{occupiedCount} occupied</Badge>
                  <Box flex={1} />
                  <Badge color="yellow">{vacantCount} vacant</Badge>
                </>
              )}
            </Group>
          </Stack>
        </Group>
      </Card>
    </Link>
  );
};

function propertyType(type: PropertyType, unitCount: number) {
  return type === PropertyType.SINGLE_UNIT
    ? 'Single unit'
    : `${unitCount} unit(s)`;
}

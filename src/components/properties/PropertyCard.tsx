import { PropertyResDto, PropertyType } from '@/shared';
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

interface Props extends PropertyResDto {}

export const PropertyCard = (props: Props) => {
  const { id, imgUrls } = props;
  const theme = useMantineTheme();
  return (
    <Link to={`/managers/properties/$propertyId`} params={{ propertyId: id }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group>
          <AspectRatio ratio={1} style={{ flex: `0 0 ${rem(160)}` }}>
            <Image
              radius={'md'}
              src={imgUrls[0]}
              alt="Norway"
              fallbackSrc="/fallback.png"
            />
          </AspectRatio>
          <Stack flex={1} h={'100%'} justify="start" gap={'sm'}>
            <Title order={5}>{props.name}</Title>
            <Group gap={'xs'}>
              <MapPinnedIcon size={24} color={theme.colors.gray[6]} />
              <Box>
                <Text fz={'sm'} c={theme.colors.gray[6]}>
                  {`${props.address}`}
                </Text>
                <Text fz={'sm'} c={theme.colors.gray[6]}>
                  {`${props.ward}, ${props.district}, ${props.province}`}
                </Text>
              </Box>
            </Group>
            <Box flex={1} />
            <Title order={4}>
              {propertyType(+props.type, props.units.length)}
            </Title>
            <Group>
              {props.type === PropertyType.SINGLE_UNIT ? (
                <>
                  {props.occupiedCount ? (
                    <Badge color="green">Đã cho thuê</Badge>
                  ) : (
                    <Badge color="yellow">Còn trống</Badge>
                  )}
                </>
              ) : (
                <>
                  <Badge color="green">{props.occupiedCount} đã cho thuê</Badge>
                  <Box flex={1} />
                  <Badge color="yellow">{props.vacantCount} phòng trống</Badge>
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
  return (type === 0 ? 'Nguyên căn' : `${unitCount} phòng`).toUpperCase();
}

import { DATE_FORMAT, unitStatusColorRecord, unitStatusRecord } from '@/libs';
import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  AspectRatio,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Input,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Link, useLoaderData } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { ArrowLeft02Icon, ArrowRight02Icon } from 'hugeicons-react';

function EquipmentDetailPage() {
  const data = useLoaderData({ from: '/equipments/$id/' });

  return (
    <Stack px={120} py={'md'}>
      <Breadcrumbs className="my-4 font-semibold text-primary cursor-pointer">
        <Link to="/">Home</Link>
        <Link to="/equipments">Equipment</Link>
        <Link to="/equipments/$id" params={{ id: data.id }}>
          {data.name}
        </Link>
      </Breadcrumbs>
      <Group>
        <Title>{`Unit ${data.name} - ${data.property.name}`}</Title>
        <Box flex={1} />
        <Link to="/equipments/$id/update" params={{ id: data.id }}>
          <Button>Update</Button>
        </Link>
      </Group>
      <Grid gutter="lg">
        <Grid.Col span={12}>
          <Input.Wrapper label="Name">
            <Text>{data.name}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Brand">
            <Text>{data.brand}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Model">
            <Text>{data.model}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Serial">
            <Text>{data.serial}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Install at">
            <Text>
              {data.dateOfInstallation
                ? dayjs(data.dateOfInstallation).format(DATE_FORMAT)
                : '-'}
            </Text>
          </Input.Wrapper>
          <Input.Wrapper label="Category">
            <Text>{data.category}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Status">
            <Badge color={unitStatusColorRecord[data.maintainStatus]}>
              {unitStatusRecord[data.maintainStatus]}
            </Badge>
          </Input.Wrapper>
          <Input.Wrapper label="Property">
            <Text>{data.property.name}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Unit">
            <Text>{data.unit.name}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Description">
            <Text>{data.description}</Text>
          </Input.Wrapper>
          {data.enableWarranty && (
            <Input.Wrapper label="Warranty expiration date">
              <Text>
                {data.warrantyExpirationDate
                  ? dayjs(data.warrantyExpirationDate).format(DATE_FORMAT)
                  : '-'}
              </Text>
            </Input.Wrapper>
          )}
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="md">
            <Carousel
              loop
              withIndicators
              withControls
              slideGap="md"
              height={300}
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
                <Carousel.Slide key={index}>
                  <AspectRatio h={300}>
                    <Image src={url} alt={`Unit ${index + 1}`} />
                  </AspectRatio>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default EquipmentDetailPage;

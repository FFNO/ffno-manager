import { unitStatusColorRecord, unitStatusRecord } from '@/libs';
import { displayDate, displayText } from '@/libs/helpers';
import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  AspectRatio,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Fieldset,
  Group,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Link, useLoaderData } from '@tanstack/react-router';
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
        <Title>{data.name}</Title>
        <Box flex={1} />
        <Link to="/equipments/$id/update" params={{ id: data.id }}>
          <Button>Update</Button>
        </Link>
      </Group>
      <Stack>
        <SimpleGrid cols={2}>
          <Input.Wrapper label="Name">
            <Text>{data.name}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Brand">
            <Text>{displayText(data.brand)}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Model">
            <Text>{displayText(data.model)}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Serial">
            <Text>{displayText(data.serial)}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Install at">
            <Text>{displayDate(data.dateOfInstallation)}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Category">
            <Text>{data.category}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Status">
            <p>
              <Badge color={unitStatusColorRecord[data.maintainStatus]}>
                {unitStatusRecord[data.maintainStatus]}
              </Badge>
            </p>
          </Input.Wrapper>
          <Input.Wrapper label="Property">
            <Text>{displayText(data.property?.name)}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Unit">
            <Text>{displayText(data.unit?.name)}</Text>
          </Input.Wrapper>
          <Input.Wrapper label="Description">
            <Text>{data.description}</Text>
          </Input.Wrapper>
          {data.enableWarranty && (
            <Input.Wrapper label="Warranty expiration date">
              <Text>{displayDate(data.warrantyExpirationDate)}</Text>
            </Input.Wrapper>
          )}
        </SimpleGrid>
        <Fieldset legend="Images">
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
        </Fieldset>
      </Stack>
    </Stack>
  );
}

export default EquipmentDetailPage;

import { useUpdate } from '@/api';
import { IUnitResDto, unitStatusColorRecord, unitStatusRecord } from '@/libs';
import { showSuccessNotification } from '@/shared';
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  NumberFormatter,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

interface Props extends IUnitResDto {}

export function UnitCard({
  id,
  name,
  area,
  price,
  isListing,
  status,
  imgUrls,
  tenants,
}: Props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(isListing);

  const openMutation = useUpdate({
    resource: 'units/open',
    onSuccess: () => {
      showSuccessNotification({
        message: `Successfully allowed to receive lease requests for unit ${name}`,
      });
      setIsOpen(true);
    },
  });

  const closeMutation = useUpdate({
    resource: 'units/close',
    onSuccess: () => {
      showSuccessNotification({
        message: `Successfully stopped receiving lease requests for unit ${name}`,
      });
      setIsOpen(false);
    },
  });

  function handleOpenUnit() {
    openMutation.mutate({ unitIds: [id] });
  }

  function handleCloseUnit() {
    closeMutation.mutate({ unitIds: [id] });
  }

  return (
    <Card
      shadow="none"
      onClick={() => navigate({ to: '/units/$id', params: { id } })}
    >
      <Group>
        <AspectRatio ratio={1} w={120}>
          <Image
            radius={'md'}
            src={imgUrls[0]}
            alt="Norway"
            fallbackSrc="/fallback.png"
          />
        </AspectRatio>
        <Stack h={120} justify="space-between">
          <Group>
            <Title order={4}>{name}</Title>
            {tenants?.length ? (
              <Badge color={'green'}>Occupied</Badge>
            ) : (
              <Badge color={'yellow'}>Vacant</Badge>
            )}
          </Group>
          <Group>
            <Text fz={'lg'}>{area} m²</Text>
            <Badge color={unitStatusColorRecord[status]}>
              {unitStatusRecord[status]}
            </Badge>
          </Group>
          <Group>
            {isOpen ? (
              <Button color={'red'} onClick={() => handleCloseUnit()}>
                Stop allow rental requests
              </Button>
            ) : (
              <Button color={'green'} onClick={() => handleOpenUnit()}>
                Allow rental requests
              </Button>
            )}
            <NumberFormatter suffix=" ₫" value={price} thousandSeparator />
          </Group>
        </Stack>
        <Box flex={1} />

        <Link to="/units/$id" params={{ id: id }}>
          <Button variant="outline">View details</Button>
        </Link>
      </Group>
    </Card>
  );
}

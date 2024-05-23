import { useDeleteOne, useUpdate } from '@/api';
import { unitSearchAtom } from '@/app';
import { IUnitResDto, unitStatusColorRecord, unitStatusRecord } from '@/libs';
import { showSuccessNotification } from '@/shared';
import {
  ActionIcon,
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
import { modals } from '@mantine/modals';
import { useNavigate } from '@tanstack/react-router';
import { Delete02Icon, PencilEdit01Icon, ViewIcon } from 'hugeicons-react';
import { useSetAtom } from 'jotai';
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
  const setSearch = useSetAtom(unitSearchAtom);
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

  const deleteUnitMutation = useDeleteOne({
    id,
    resource: 'units',
    onSuccess: () => {
      showSuccessNotification({
        message: `Successfully deleted unit ${name}`,
      });
      setSearch((prev) => ({ ...prev, reload: !prev.reload }));
    },
  });

  function handleOpenUnit() {
    openMutation.mutate({ unitIds: [id] });
  }

  function handleCloseUnit() {
    closeMutation.mutate({ unitIds: [id] });
  }

  function handleDeleteUnit() {
    modals.openConfirmModal({
      children: 'Are you sure you want to delete this unit?',
      onConfirm: () => deleteUnitMutation.mutate({}),
    });
  }

  return (
    <Card shadow="none">
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

        <Group gap={'xs'}>
          <ActionIcon
            size={40}
            onClick={() => navigate({ to: '/units/$id', params: { id } })}
          >
            <ViewIcon />
          </ActionIcon>
          <ActionIcon
            size={40}
            color="green"
            onClick={() =>
              navigate({ to: '/units/$id/update', params: { id } })
            }
          >
            <PencilEdit01Icon />
          </ActionIcon>
          {/* TODO: Handle delete */}
          <div className="hidden">
            <ActionIcon
              size={40}
              color="red"
              onClick={() => handleDeleteUnit()}
            >
              <Delete02Icon />
            </ActionIcon>
          </div>
        </Group>
      </Group>
    </Card>
  );
}

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
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useNavigate } from '@tanstack/react-router';
import {
  Delete02Icon,
  PencilEdit01Icon,
  UserGroupIcon,
  ViewIcon,
} from 'hugeicons-react';
import { useSetAtom } from 'jotai';

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
  curSlot,
  maxSlot,
}: Props) {
  const setSearch = useSetAtom(unitSearchAtom);
  const navigate = useNavigate();
  const form = useForm();

  const openMutation = useUpdate({
    resource: 'units/open',
    onSuccess: () => {
      showSuccessNotification({
        message: `Successfully allowed to receive lease requests for unit ${name}`,
      });
      modals.closeAll();
      setSearch((prev) => ({ ...prev, reload: !prev.reload }));
    },
  });

  const closeMutation = useUpdate({
    resource: 'units/close',
    onSuccess: () => {
      showSuccessNotification({
        message: `Successfully stopped receiving lease requests for unit ${name}`,
      });
      modals.closeAll();
      setSearch((prev) => ({ ...prev, reload: !prev.reload }));
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
    modals.open({
      title: 'Listing unit',
      children: (
        <>
          <form
            onSubmit={form.onSubmit((values) => {
              openMutation.mutate({
                unitIds: [id],
                startListingAt: values.startListingAt,
                endListingAt: values.endListingAt,
              });
            })}
          >
            <DateInput
              label="Start listing at"
              minDate={new Date()}
              {...form.getInputProps('startListingAt')}
            />
            <DateInput
              label="Stop listing at"
              {...form.getInputProps('endListingAt')}
            />
            <Button type="submit" fullWidth mt="md">
              Schedule
            </Button>
          </form>
          <Button
            fullWidth
            variant="subtle"
            onClick={() => openMutation.mutate({ unitIds: [id] })}
            mt="md"
          >
            Open now
          </Button>
        </>
      ),
    });
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
            <span className="flex-1" />
            <span className="inline-flex items-center gap-2">
              <UserGroupIcon />
              <span>
                {curSlot}/{maxSlot}
              </span>
            </span>
          </Group>
          <Group>
            <Text fz={'lg'}>{area} m²</Text>
            <Badge color={unitStatusColorRecord[status]}>
              {unitStatusRecord[status]}
            </Badge>
          </Group>
          <Group>
            {isListing ? (
              <Button color={'red'} onClick={() => handleCloseUnit()}>
                Stop allow rental requests
              </Button>
            ) : (
              <Button
                disabled={curSlot === maxSlot}
                color={'green'}
                onClick={() => handleOpenUnit()}
              >
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

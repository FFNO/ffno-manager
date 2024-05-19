import { dataProvider, useUpdate } from '@/api';
import { currentMemberAtom } from '@/app';
import {
  DATE_FORMAT,
  IContractResDto,
  IMemberResDto,
  RequestStatus,
  contractStatusColorRecord,
  contractStatusRecord,
  requestStatusColorRecord,
  requestStatusRecord,
} from '@/libs';
import { vndFormatter } from '@/libs/helpers';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Fieldset,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  createFileRoute,
  useLoaderData,
  useRouter,
} from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Cancel01Icon, Tick01Icon } from 'hugeicons-react';
import { useAtomValue } from 'jotai';

export const Route = createFileRoute('/contracts/$id/')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IContractResDto>({ id, resource: 'contracts' }),
});

function Page() {
  const router = useRouter();

  const currentMember = useAtomValue(currentMemberAtom);
  const {
    id,
    status,
    startDate,
    endDate,
    imgUrls,
    terminationDate,
    landlord,
    landlordStatus,
    tenant,
    tenantStatus,
    unit,
  } = useLoaderData({ from: '/contracts/$id/' });
  const mutate = useUpdate({
    resource: `contracts/${id}`,
    onSuccess: () => router.invalidate(),
  });

  const confirmApprove = () =>
    modals.openConfirmModal({
      children: 'Are you sure you want to approve this contract?',
      onConfirm: () => mutate.mutate({ status: RequestStatus.ACCEPTED }),
    });

  const rejectApprove = () =>
    modals.openConfirmModal({
      children: 'Are you sure you want to reject this contract?',
      onConfirm: () => mutate.mutate({ status: RequestStatus.REJECTED }),
    });

  return (
    <Paper px={120} py={'lg'}>
      <Stack gap={'md'}>
        <Title order={3}>Unit lease contract</Title>
        <Group gap={4}>
          <Badge color={contractStatusColorRecord[status]}>
            {contractStatusRecord[status]}
          </Badge>
        </Group>
        <Fieldset legend={'Information'}>
          <Stack>
            <Group justify="space-between">
              <Group>
                <p className="font-semibold">Start date:</p>
                <p>{dayjs(startDate).format(DATE_FORMAT)}</p>
              </Group>
              <Group>
                <p className="font-semibold">End date:</p>
                <p>{dayjs(endDate).format(DATE_FORMAT)}</p>
              </Group>
              <Group>
                <p className="font-semibold">Termination date:</p>
                <p>
                  {terminationDate
                    ? dayjs(terminationDate).format(DATE_FORMAT)
                    : '-'}
                </p>
              </Group>
            </Group>
            <Group justify="space-between">
              <Group>
                <p>Price:</p>
                <p>{vndFormatter.format(unit.price)}/month</p>
              </Group>
              <Group>
                <p>Deposit:</p>
                <p>{vndFormatter.format(unit.deposit)}/month</p>
              </Group>
            </Group>
          </Stack>
        </Fieldset>
        {/* <Text>{description}</Text> */}
        <SimpleGrid cols={2}>
          <Fieldset legend={'Landlord'}>
            <MemberCard {...landlord} status={landlordStatus} />
          </Fieldset>
          <Fieldset legend={'Tenant'}>
            <MemberCard {...tenant} status={tenantStatus} />
          </Fieldset>
        </SimpleGrid>
      </Stack>
    </Paper>
  );

  function MemberCard(props: IMemberResDto & { status: RequestStatus }) {
    return (
      <Stack>
        <Card withBorder>
          <Group>
            <Avatar src={props.imgUrl} />
            <Text>{props.name}</Text>
            <Box flex={1} />
            {props.id === currentMember.id &&
            props.status === RequestStatus.PENDING ? (
              <>
                <Button
                  color={'green'}
                  leftSection={<Tick01Icon size={20} />}
                  onClick={() => confirmApprove()}
                >
                  Approve
                </Button>
                <Button
                  color={'red'}
                  leftSection={<Cancel01Icon size={20} />}
                  onClick={() => rejectApprove()}
                >
                  Reject
                </Button>
              </>
            ) : (
              <>
                <Badge color={requestStatusColorRecord[props.status]}>
                  {requestStatusRecord[props.status]}
                </Badge>
              </>
            )}
          </Group>
        </Card>
      </Stack>
    );
  }
}

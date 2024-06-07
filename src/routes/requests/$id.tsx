import { dataProvider, useUpdate } from '@/api';
import { contractFormAtom, currentMemberAtom } from '@/app';
import {
  IRequestResDto,
  RequestCategory,
  RequestStatus,
  requestCategoryRecord,
  requestStatusColorRecord,
  requestStatusRecord,
} from '@/libs';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Fieldset,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  Link,
  createFileRoute,
  useLoaderData,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Cancel01Icon, Tick01Icon } from 'hugeicons-react';
import { useAtomValue, useSetAtom } from 'jotai';

export const Route = createFileRoute('/requests/$id')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IRequestResDto>({ id, resource: 'requests' }),
});

function Page() {
  const router = useRouter();
  const navigate = useNavigate();

  const currentMember = useAtomValue(currentMemberAtom);
  const setContractForm = useSetAtom(contractFormAtom);
  const data = useLoaderData({ from: '/requests/$id' });
  const mutate = useUpdate({
    resource: `requests/${data.id}`,
    onSuccess: () => router.invalidate(),
  });

  const confirmApprove = () =>
    modals.openConfirmModal({
      title: 'Confirm',
      children: 'Are you sure you want to accept this request?',
      onConfirm: () => mutate.mutate({ status: RequestStatus.ACCEPTED }),
    });

  const rejectApprove = () =>
    modals.openConfirmModal({
      title: 'Confirm',
      children: (
        <Text size="sm">Are you sure you want to reject this request?</Text>
      ),
      onConfirm: () => mutate.mutate({ status: RequestStatus.REJECTED }),
    });

  const showCreateContract =
    data.status === RequestStatus.ACCEPTED &&
    data.category === RequestCategory.UNIT_LEASE;

  const handleCreateContract = () => {
    setContractForm((prev) => ({
      ...prev,
      landlordId: currentMember.id,
      tenantId: data.sender.id,
      unitId: data.unit.id,
      propertyId: data.unit.propertyId,
    }));
    navigate({ to: '/contracts/create' });
  };

  return (
    <Paper p={'lg'}>
      <Stack gap={'md'}>
        <Title order={3}>{data.name}</Title>
        <Group gap={4}>
          <Badge color={requestStatusColorRecord[data.status]}>
            {requestStatusRecord[data.status]}
          </Badge>
          <Avatar size={'sm'} src={data.sender.imgUrl} />
          <Text fw={'bold'}>{data.sender.name}</Text>
          <Text>requested</Text>
          <Text fw={'bold'}>{requestCategoryRecord[data.category]}</Text>
          {data.status === RequestStatus.HANDLING && (
            <Button
              onClick={() => mutate.mutate({ status: RequestStatus.DONE })}
            >
              Mark as done
            </Button>
          )}
        </Group>
        <Text>{data.description}</Text>

        <Fieldset legend={'Receivers'}>
          <Stack>
            {data.receivers.map(({ member, status, updatedAt }) => (
              <Card withBorder key={member.id}>
                <Group>
                  <Avatar src={member.imgUrl} />
                  <Text>{member.name}</Text>
                  <Box flex={1} />
                  {member.id === currentMember.id &&
                  status === RequestStatus.PENDING ? (
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
                      <Badge color={requestStatusColorRecord[status]}>
                        {requestStatusRecord[status]}
                      </Badge>
                      {dayjs(updatedAt).format('HH:mm:ss DD/MM/YYYY')}
                    </>
                  )}
                </Group>
              </Card>
            ))}
          </Stack>
        </Fieldset>
        <Group justify="end">
          {showCreateContract && (
            <Link to="/contracts/create">
              <Button onClick={() => handleCreateContract()}>
                Create contract
              </Button>
            </Link>
          )}
        </Group>
      </Stack>
    </Paper>
  );
}

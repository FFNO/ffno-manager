import { dataProvider, useUpdate } from '@/api';
import { currentMemberAtom } from '@/app';
import {
  IRequestResDto,
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
  createFileRoute,
  useLoaderData,
  useRouter,
} from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Cancel01Icon, Tick01Icon } from 'hugeicons-react';
import { useAtomValue } from 'jotai';

export const Route = createFileRoute('/requests/$id')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IRequestResDto>({ id, resource: 'requests' }),
});

function Page() {
  const router = useRouter();

  const currentMember = useAtomValue(currentMemberAtom);
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
      </Stack>
    </Paper>
  );
}

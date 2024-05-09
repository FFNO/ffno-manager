import { useUpdate } from '@/api';
import { RequestResDto, RequestStatus, requestCategoryRecord } from '@/shared';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Kbd,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { Link, useRouter } from '@tanstack/react-router';

interface Props extends RequestResDto {
  type?: string;
}

export function RequestCard(props: Props) {
  const router = useRouter();
  const mutate = useUpdate({
    resource: `requests/${props.id}`,
    onSuccess() {
      router.invalidate();
    },
  });

  const confirmApprove = () =>
    modals.openConfirmModal({
      title: 'Đồng ý duyệt yêu cầu',
      children: (
        <Text size="sm">Bạn có chắc chắn đồng ý với yêu cầu này không</Text>
      ),
      onConfirm: () => handleRequest(RequestStatus.ACCEPTED),
    });

  const confirmReject = () =>
    modals.openConfirmModal({
      title: 'Đồng ý từ chối yêu cầu',
      children: (
        <Text size="sm">Bạn có chắc chắn từ chối yêu cầu này không</Text>
      ),
      onConfirm: () => handleRequest(RequestStatus.REJECTED),
    });

  const confirmCancelRequest = () => {
    modals.openConfirmModal({
      title: 'Đồng ý hủy yêu cầu',
      children: <Text size="sm">Bạn có chắc chắn hủy yêu cầu này không</Text>,
      onConfirm: () => handleRequest(RequestStatus.PENDING),
    });
  };

  function handleRequest(status: RequestStatus) {
    mutate.mutate({ status });
  }

  return (
    <>
      <Card withBorder>
        <Group>
          <Title order={6}>{requestCategoryRecord[props.category]}</Title>
          <Tooltip label={props.sender.name}>
            <Avatar src={props.sender.imgUrl} />
          </Tooltip>
          {props.unit?.propertyId && <Kbd>{props.unit.propertyId}</Kbd>}
          {props.unit && <Kbd>{props.unit.name}</Kbd>}
          {renderStatus(props.status)}
          <Box flex={1} />
          <Link to="/requests/$requestId" params={{ requestId: props.id }}>
            <Button variant="subtle">Xem chi tiết</Button>
          </Link>
        </Group>
      </Card>
    </>
  );
}

function renderStatus(status: RequestStatus) {
  return status === RequestStatus.PENDING ? (
    <Badge color="orange">Chờ xử lý</Badge>
  ) : status == RequestStatus.ACCEPTED ? (
    <Badge color="green">Chấp thuận</Badge>
  ) : (
    <Badge color="red">Từ chối</Badge>
  );
}

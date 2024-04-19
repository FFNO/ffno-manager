import { useUpdate } from "@/api";
import { RequestStatus, requestCategoryRecord } from "@/libs";
import { memberAtom } from "@/states";
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
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useLoaderData, useRouter } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { CheckIcon, XIcon } from "lucide-react";

export function RequestPage() {
  const router = useRouter();

  const currentMember = useAtomValue(memberAtom);
  const data = useLoaderData({ from: "/requests/$requestId" });
  const mutate = useUpdate({
    resource: `requests/${data.id}`,
    onSuccess: () => router.invalidate(),
  });

  const confirmApprove = () =>
    modals.openConfirmModal({
      title: "Đồng ý duyệt yêu cầu",
      children: (
        <Text size="sm">Bạn có chắc chắn đồng ý với yêu cầu này không</Text>
      ),
      onConfirm: () => mutate.mutate({ status: RequestStatus.ACCEPTED }),
    });

  const rejectApprove = () =>
    modals.openConfirmModal({
      title: " duyệt yêu cầu",
      children: (
        <Text size="sm">Bạn có chắc chắn từ chối với yêu cầu này không</Text>
      ),
      onConfirm: () => mutate.mutate({ status: RequestStatus.REJECTED }),
    });

  return (
    <Paper p={"lg"}>
      <Stack gap={"md"}>
        <Title order={3}>{data.name}</Title>
        <Group gap={4}>
          {renderStatus(data.status)}
          <Avatar size={"sm"} src={data.sender.imgUrl} />
          <Text fw={"bold"}>{data.sender.name}</Text>
          <Text>đã yêu cầu</Text>
          <Text fw={"bold"}>{requestCategoryRecord[data.category]}</Text>
        </Group>
        <Text>{data.details}</Text>

        <Fieldset legend={"Người nhận"}>
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
                        color="green"
                        leftSection={<CheckIcon size={20} />}
                        onClick={() => confirmApprove()}
                      >
                        Đồng ý
                      </Button>
                      <Button
                        color="red"
                        leftSection={<XIcon size={20} />}
                        onClick={() => rejectApprove()}
                      >
                        Từ chối
                      </Button>
                    </>
                  ) : (
                    <>
                      {renderStatus(status)}
                      {dayjs(updatedAt).format("HH:mm:ss DD/MM/YYYY")}
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

function renderStatus(status: RequestStatus) {
  return status === RequestStatus.PENDING ? (
    <Badge color="orange">Chờ xử lý</Badge>
  ) : status == RequestStatus.ACCEPTED ? (
    <Badge color="green">Chấp thuận</Badge>
  ) : (
    <Badge color="red">Từ chối</Badge>
  );
}

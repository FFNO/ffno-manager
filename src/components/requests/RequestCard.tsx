import { useUpdate } from "@/api";
import { RequestResDto, RequestStatus, requestCategoryRecord } from "@/libs";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Kbd,
  Menu,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { Link, useNavigate } from "@tanstack/react-router";
import { CheckIcon, EllipsisIcon, XIcon } from "lucide-react";

export function RequestCard(props: RequestResDto) {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const mutate = useUpdate("request");

  const confirmApprove = () =>
    modals.openConfirmModal({
      title: "Đồng ý duyệt yêu cầu",
      children: (
        <Text size="sm">Bạn có chắc chắn đồng ý với yêu cầu này không</Text>
      ),
      onConfirm: () => {
        mutate.mutate({ status: RequestStatus.ACCEPTED });
      },
    });

  const confirmReject = () =>
    modals.openConfirmModal({
      title: "Đồng ý từ chối yêu cầu",
      children: (
        <Text size="sm">Bạn có chắc chắn từ chối yêu cầu này không</Text>
      ),
      onConfirm: () => {
        mutate.mutate({ status: RequestStatus.REJECTED });
      },
    });

  return (
    <>
      <Card withBorder>
        <Group>
          <Title order={6}>{requestCategoryRecord[props.category]}</Title>
          <Tooltip label={props.sender.name}>
            <Avatar src={props.sender.imgUrl} />
          </Tooltip>
          {props.unit && <Kbd>{props.unit.name}</Kbd>}
          {renderStatus(props.status)}
          <Link to="/managers/requests" search>
            <Button variant="subtle">Xem chi tiết</Button>
          </Link>
          <Menu>
            <Menu.Target>
              <ActionIcon variant="subtle">
                <EllipsisIcon size={20} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <CheckIcon color={theme.colors.green[5]} size={16} />
                }
                onClick={confirmApprove}
              >
                Chấp thuận
              </Menu.Item>
              <Menu.Item
                leftSection={<XIcon color={theme.colors.red[5]} size={16} />}
                onClick={confirmReject}
              >
                Từ chối
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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

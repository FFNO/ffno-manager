import { useUpdate } from "@/api";
import {
  MemberRole,
  UnitResDto,
  UnitStatus,
  showSuccessNotification,
} from "@/libs";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  MantineSpacing,
  NumberFormatter,
  Stack,
  StyleProp,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface Props extends UnitResDto {
  memberRole: MemberRole;
  ml?: StyleProp<MantineSpacing> | undefined;
}

export function UnitCard(props: Props) {
  const [isOpen, setIsOpen] = useState(props.isListing);
  const openMutation = useUpdate("units/open");
  const closeMutation = useUpdate("units/close");

  function handleOpenUnit() {
    openMutation.mutate({ unitIds: [props.id] });
  }

  function handleCloseUnit() {
    closeMutation.mutate({ unitIds: [props.id] });
  }

  if (openMutation.isSuccess) {
    showSuccessNotification({
      id: `open-unit-${props.id}`,
      message: `Tiếp nhận yêu cầu thuê phòng ${props.name} thành công`,
    });
    if (!isOpen) {
      setIsOpen(true);
    }
  }

  if (closeMutation.isSuccess) {
    showSuccessNotification({
      id: `close-unit-${props.id}`,
      message: `Dừng nhận yêu cầu thuê phòng ${props.name} thành công`,
    });
    if (isOpen) {
      setIsOpen(false);
    }
  }

  return (
    <Card ml={props.ml} shadow="none">
      <Group>
        <AspectRatio ratio={1} w={120}>
          <Image
            radius={"md"}
            src={props.imgUrls[0]}
            alt="Norway"
            fallbackSrc="/fallback.png"
          />
        </AspectRatio>
        <Stack h={120} justify="space-between">
          <Group>
            <Title order={4}>{props.name}</Title>
            {props.tenants?.length ? (
              <Badge color={"green"}>Đã cho thuê</Badge>
            ) : (
              <Badge color={"yellow"}>Phòng trống</Badge>
            )}
          </Group>
          <Group>
            <Text fz={"lg"}>{props.area} m²</Text>
            {renderStatus(props.status)}
          </Group>
          <Group>
            {props.memberRole === MemberRole.TENANT ? (
              <Button>Yêu cầu thuê</Button>
            ) : (
              <>
                {isOpen ? (
                  <Button onClick={() => handleCloseUnit()}>
                    Dừng nhận yêu cầu cho thuê
                  </Button>
                ) : (
                  <Button onClick={() => handleOpenUnit()}>
                    Tiếp nhận yêu cầu cho thuê
                  </Button>
                )}
              </>
            )}
            <NumberFormatter
              suffix=" ₫"
              value={props.price}
              thousandSeparator
            />
          </Group>
        </Stack>
        <Box flex={1} />
        <Link to="/managers/units/$unitId" params={{ unitId: props.id }}>
          <Button variant="outline">Xem chi tiết</Button>
        </Link>
      </Group>
    </Card>
  );
}

function renderStatus(status: UnitStatus) {
  return status === UnitStatus.MAINTAINING ? (
    <Badge color="orange">Đang bảo trì</Badge>
  ) : status == UnitStatus.GOOD ? (
    <Badge color="green">Tốt</Badge>
  ) : (
    <Badge color="red">Có vấn đề</Badge>
  );
}

import { useUpdate } from "@/api";
import {
  MemberRole,
  RequestCategory,
  UnitResDto,
  UnitStatus,
  showSuccessNotification,
} from "@/libs";
import { requestFormAtom } from "@/states";
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
import { Link, useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useState } from "react";

interface Props extends UnitResDto {
  memberRole: MemberRole;
  ml?: StyleProp<MantineSpacing> | undefined;
}

export function UnitCard(props: Props) {
  const setRequestForm = useSetAtom(requestFormAtom);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(props.isListing);

  const openMutation = useUpdate({
    resource: "units/open",
    onSuccess: () => {
      showSuccessNotification({
        message: `Tiếp nhận yêu cầu thuê phòng ${props.name} thành công`,
      });
      setIsOpen(true);
    },
  });

  const closeMutation = useUpdate({
    resource: "units/close",
    onSuccess: () => {
      showSuccessNotification({
        message: `Dừng nhận yêu cầu thuê phòng ${props.name} thành công`,
      });
      setIsOpen(false);
    },
  });

  function handleOpenUnit() {
    openMutation.mutate({ unitIds: [props.id] });
  }

  function handleCloseUnit() {
    closeMutation.mutate({ unitIds: [props.id] });
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
              <Button
                onClick={() => {
                  setRequestForm({
                    name: `Yêu cầu thuê phòng ${props.name}`,
                    details: "",
                    category: RequestCategory.UNIT_LEASE,
                    unitId: props.id,
                    propertyId: props.propertyId,
                  });
                  navigate({ to: "/requests/create" });
                }}
              >
                Yêu cầu thuê
              </Button>
            ) : (
              <>
                {isOpen ? (
                  <Button color={"red"} onClick={() => handleCloseUnit()}>
                    Dừng nhận yêu cầu cho thuê
                  </Button>
                ) : (
                  <Button color={"green"} onClick={() => handleOpenUnit()}>
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

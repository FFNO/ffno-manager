import { UnitResDto, UnitStatus } from "@/libs";
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

interface Props extends UnitResDto {
  ml?: StyleProp<MantineSpacing> | undefined;
}

export function UnitCard(props: Props) {
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
            <Button>Cho thuê</Button>
            <NumberFormatter
              suffix=" ₫"
              value={props.price}
              thousandSeparator
            />
          </Group>
        </Stack>
        <Box flex={1} />
        <Link to="/units/$unitId" params={{ unitId: props.id }}>
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

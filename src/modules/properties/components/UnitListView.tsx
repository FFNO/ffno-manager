import { PropertyResDto, UnitStatus } from "@/libs";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Image,
  NumberFormatter,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { MapPinnedIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export function UnitListView({ properties }: { properties: PropertyResDto[] }) {
  const theme = useMantineTheme();
  return (
    <>
      <SimpleGrid cols={1} px={32} py={24}>
        {properties.map((property) => (
          <Card key={property.id} withBorder shadow="lg" mb={"lg"}>
            <Card.Section>
              <Group bg={theme.colors.gray[0]} p={"lg"}>
                <AspectRatio ratio={1} w={100}>
                  <Image
                    radius={"md"}
                    src={property.imgUrls[0]}
                    alt="Norway"
                    fallbackSrc="/fallback.png"
                  />
                </AspectRatio>
                <Stack h={100} justify="start" gap={"xs"}>
                  <Title order={5}>{property.name}</Title>
                  <Group gap={"xs"}>
                    <MapPinnedIcon
                      size={20}
                      strokeWidth={1.5}
                      color={theme.colors.gray[7]}
                    />
                    <Text fz={"sm"} c={theme.colors.gray[7]}>
                      {property.address}
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </Card.Section>
            <Card.Section>
              <Divider />
              {property.units.map((unit, index) => (
                <Fragment key={unit.id}>
                  {index !== 0 && <Divider ml={60} />}
                  <Card ml={60} shadow="none">
                    <Group>
                      <AspectRatio ratio={1} w={120}>
                        <Image
                          radius={"md"}
                          src={unit.imgUrls[0]}
                          alt="Norway"
                          fallbackSrc="/fallback.png"
                        />
                      </AspectRatio>
                      <Stack h={120} justify="space-between">
                        <Group>
                          <Title order={4}>{unit.name}</Title>
                          {unit.tenants?.length ? (
                            <Badge color={"green"}>Đã cho thuê</Badge>
                          ) : (
                            <Badge color={"yellow"}>Phòng trống</Badge>
                          )}
                        </Group>
                        <Group>
                          <Text fz={"lg"}>{unit.area} m²</Text>
                          {renderStatus(unit.status)}
                        </Group>
                        <Group>
                          <Button>Cho thuê</Button>
                          <NumberFormatter
                            suffix=" ₫"
                            value={unit.price}
                            thousandSeparator
                          />
                        </Group>
                      </Stack>
                      <Box flex={1} />
                      <Link to="/units/$unitId" params={{ unitId: unit.id }}>
                        <Button variant="outline">Xem chi tiết</Button>
                      </Link>
                    </Group>
                  </Card>
                </Fragment>
              ))}
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
    </>
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

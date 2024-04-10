import { useList } from "@/api";
import { PropertyResDto } from "@/libs";
import { UnitCard } from "@/modules/units/components";
import {
  AspectRatio,
  Card,
  Divider,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { MapPinnedIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { Route } from "../index";

export function UnitListPage() {
  const theme = useMantineTheme();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const { data: properties } = useList<PropertyResDto>({
    resource: "units",
    params: search,
  });
  return (
    <>
      <SimpleGrid cols={1} px={32} py={24}>
        {properties?.data.map((property) => (
          <Card key={property.id} withBorder shadow="lg" mb={"lg"}>
            <Card.Section>
              <Group bg={theme.colors.gray[0]} p={"lg"}>
                <AspectRatio ratio={1} w={100}>
                  <Image
                    radius={"md"}
                    src={property.imgUrls[0]}
                    alt={property.name}
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
                  <UnitCard ml={60} {...unit} />
                </Fragment>
              ))}
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

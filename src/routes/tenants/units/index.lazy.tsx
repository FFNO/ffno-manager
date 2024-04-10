import { useList } from "@/api";
import { UnitCard } from "@/components/units";
import { PropertyResDto } from "@/libs";
import { memberAtom } from "@/states";
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
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useAtom, useAtomValue } from "jotai";
import { MapPinnedIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export const Route = createLazyFileRoute("/tenants/units/")({
  component: () => <UnitListPage />,
});

function UnitListPage() {
  const member = useAtomValue(memberAtom);
  const theme = useMantineTheme();
  const search = Route.useSearch();
  const navigate = useNavigate();

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
                  <UnitCard ml={60} {...unit} memberRole={member!.role} />
                </Fragment>
              ))}
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

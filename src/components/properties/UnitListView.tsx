import { UnitCard } from "@/components/units";
import { PropertyResDto } from "@/libs";
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
import { MapPinnedIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export function UnitListView({ properties }: { properties: PropertyResDto[] }) {
  const theme = useMantineTheme();

  return (
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
                <UnitCard ml={60} {...unit} />
              </Fragment>
            ))}
          </Card.Section>
        </Card>
      ))}
    </SimpleGrid>
  );
}

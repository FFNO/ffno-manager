import { PropertyResDto } from "@/libs";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Group,
  Image,
  NumberFormatter,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";

export function UnitListView({ properties }: { properties: PropertyResDto[] }) {
  const theme = useMantineTheme();
  return (
    <>
      <SimpleGrid cols={1} px={32} py={24}>
        {properties.map((property) => (
          <Card key={property.id} withBorder>
            <Card.Section>
              <Group bg={theme.colors.gray[0]}>
                <AspectRatio ratio={1} w={100}>
                  <Image
                    radius={"md"}
                    src={property.imgUrls[0]}
                    alt="Norway"
                    fallbackSrc="/fallback.png"
                  />
                </AspectRatio>
                <Stack>
                  <Text>{property.name}</Text>
                  <Text>{property.address}</Text>
                </Stack>
              </Group>
            </Card.Section>
            <Card.Section>
              {property.units.map((unit) => (
                <Card key={unit.id}>
                  <Group>
                    <AspectRatio ratio={1} w={120}>
                      <Image
                        radius={"md"}
                        src={unit.imgUrls[0]}
                        alt="Norway"
                        fallbackSrc="/fallback.png"
                      />
                    </AspectRatio>
                    <Stack>
                      <Text>{unit.name}</Text>
                      {/* <Text>{unit.name}</Text> */}
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
              ))}
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

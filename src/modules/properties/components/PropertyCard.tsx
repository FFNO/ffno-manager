import { PropertyResDto } from "@/libs";
import {
  AspectRatio,
  Box,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { MapPinnedIcon } from "lucide-react";

interface Props extends PropertyResDto {}

export const PropertyCard = (props: Props) => {
  const { id, imgUrls } = props;
  const theme = useMantineTheme();
  return (
    <Card
      component={Link}
      to={`/properties/${id}`}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Group grow>
        <AspectRatio ratio={1} style={{ flex: `0 0 ${rem(160)}` }}>
          <Image
            radius={"md"}
            src={imgUrls[0]}
            alt="Norway"
            fallbackSrc="/fallback.png"
          />
        </AspectRatio>
        <Stack h={"100%"} justify="start" gap={"sm"}>
          <Title order={5}>{props.name}</Title>
          <Group gap={"xs"}>
            <MapPinnedIcon size={24} color={theme.colors.gray[6]} />
            <Box>
              <Text fz={"sm"} c={theme.colors.gray[6]}>
                {`${props.address}`}
              </Text>
              <Text fz={"sm"} c={theme.colors.gray[6]}>
                {`${props.ward}, ${props.district}, ${props.province}`}
              </Text>
            </Box>
          </Group>
          <Box flex={1} />
          <Title order={4}>{propertyType(+props.type)}</Title>
        </Stack>
      </Group>
    </Card>
  );
};

function propertyType(type: number) {
  return (type === 0 ? "Single unit" : "Multiple unit").toUpperCase();
}

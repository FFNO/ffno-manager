import { GetMemberResDto } from "@/libs";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { CableIcon, EllipsisIcon } from "lucide-react";

interface Props extends GetMemberResDto {}

export const ContactCard = (props: Props) => {
  const theme = useMantineTheme();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group mb={"md"}>
        <CableIcon color={theme.colors.green[6]} />
        <Box flex={1}></Box>
        <EllipsisIcon />
      </Group>
      <Stack align="center">
        <Avatar src={props.imgUrl} size={"lg"} />
        <Title>{props.name}</Title>
        <Text>{props.phone}</Text>
        <Text>{props.unit}</Text>
      </Stack>
      <Card.Section>
        <Divider mt={"lg"} />
        <Link to={"/contacts/$contactId"} params={{ contactId: props.id }}>
          <Button variant="subtle" fullWidth size="lg">
            View profile
          </Button>
        </Link>
      </Card.Section>
    </Card>
  );
};

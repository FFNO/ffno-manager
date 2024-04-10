import {
  Button,
  Card,
  Divider,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { Link, createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";

export const Route = createFileRoute("/managers/")({
  component: Index,
});

function Index() {
  const theme = useMantineTheme();
  return (
    <div>
      <Group>
        <Paper>
          <Stack>
            Tổng quan
            <Card shadow="sm">
              <Group>
                <CalendarIcon size={32} />
                <Stack gap={0}>
                  <Title order={5} tt="capitalize" fw={"bold"}>
                    {dayjs().format("dddd, DD/MM/YYYY")}
                  </Title>
                  <Group gap={4}>
                    <Text c={"gray"}>
                      Không có thông báo cho ngày hôm nay.{" "}
                    </Text>
                    <Link to="/">
                      <Text c={theme.primaryColor} fw={"500"}>
                        Xem tất cả
                      </Text>
                    </Link>
                  </Group>
                </Stack>
              </Group>
            </Card>
            <Card shadow="sm">
              <Title order={5} mb={"md"}>
                Tòa nhà và phòng
              </Title>
              <Progress.Root size={40}>
                <Tooltip label={`Đã cho thuê - ${5} phòng`}>
                  <Progress.Section value={70}></Progress.Section>
                </Tooltip>
                <Tooltip label={`Phòng trống - ${5} phòng`}>
                  <Progress.Section value={30} color="gray"></Progress.Section>
                </Tooltip>
              </Progress.Root>
              <Card.Section>
                <Divider mt={"lg"} />
                <Group justify="end">
                  <Button variant="white">Xem tất cả</Button>
                </Group>
              </Card.Section>
            </Card>
          </Stack>
        </Paper>
      </Group>
    </div>
  );
}

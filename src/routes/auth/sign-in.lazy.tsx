import { axiosInstance } from "@/api/utils";
import { MemberResDto } from "@/libs";
import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { IconBrandDiscord, IconBrandGoogle } from "@tabler/icons-react";
import { createLazyFileRoute } from "@tanstack/react-router";
import OneSignal from "react-onesignal";

export const Route = createLazyFileRoute("/auth/sign-in")({
  component: SignInPage,
});

export function SignInPage(props: {
  setMember: (value: MemberResDto) => void;
}) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <Button
          leftSection={<IconBrandGoogle strokeWidth={1} />}
          variant="default"
        >
          Sign in with Google
        </Button>
        <Button
          leftSection={<IconBrandDiscord strokeWidth={1} />}
          variant="default"
        >
          Sign in with Discord
        </Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(async () => {
          const { data } = await axiosInstance.post(
            "auth/sign-in",
            form.values
          );
          OneSignal.User.addTag("memberId", data.id);
          props.setMember(data);
        })}
      >
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

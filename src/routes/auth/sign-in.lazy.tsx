import { axiosInstance } from "@/api/utils";
import {
  Gender,
  MemberResDto,
  SignInSchema,
  SignUpSchema,
  genders,
  signInSchema,
  signUpSchema,
} from "@/libs";
import {
  Anchor,
  Button,
  Divider,
  Grid,
  Group,
  NativeSelect,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { IconBrandDiscord, IconBrandGoogle } from "@tabler/icons-react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { HttpStatusCode } from "axios";
import OneSignal from "react-onesignal";

export const Route = createLazyFileRoute("/auth/sign-in")({
  component: SignInPage,
});

export function SignInPage({
  setMember,
}: {
  setMember: (value: MemberResDto) => void;
}) {
  const [type, toggle] = useToggle(["login", "register"]);
  const signInForm = useForm<SignInSchema>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(signInSchema),
  });

  const signUpForm = useForm<DeepNullable<SignUpSchema>>({
    transformValues(values) {
      values.gender = values.gender ? +values.gender : null;
      return values;
    },
    initialValues: {
      email: "",
      password: "",
      name: "",
      address: "",
      identityNumber: "",
      dateOfBirth: null,
      gender: Gender.MALE,
    },
    validate: zodResolver(signUpSchema),
  });

  return (
    <Paper
      p="xl"
      withBorder
      miw={{ base: "100%", md: 512 }}
      maw={{ base: "100%", md: 512 }}
    >
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <Button
          leftSection={<IconBrandGoogle strokeWidth={1} />}
          variant="default"
        >
          Google
        </Button>
        <Button
          leftSection={<IconBrandDiscord strokeWidth={1} />}
          variant="default"
        >
          Discord
        </Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      {type === "login" ? (
        <form
          onSubmit={signInForm.onSubmit(async () => {
            const { data, status } = await axiosInstance.post(
              "auth/sign-in",
              signInForm.values
            );
            if (status === HttpStatusCode.Created) {
              OneSignal.User.addTag("memberId", data.id);
              setMember(data);
              localStorage.setItem("member", JSON.stringify(data));
            }
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={signInForm.values.email}
              onChange={(event) =>
                signInForm.setFieldValue("email", event.currentTarget.value)
              }
              error={signInForm.errors.email && "Invalid email"}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={signInForm.values.password}
              onChange={(event) =>
                signInForm.setFieldValue("password", event.currentTarget.value)
              }
              error={
                signInForm.errors.password &&
                "Password should include at least 6 characters"
              }
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
              Don't have an account? Register
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      ) : (
        <form
          onSubmit={signUpForm.onSubmit(async () => {
            const { data, status } = await axiosInstance.post(
              "auth/sign-up",
              signUpForm.values
            );
            if (status === HttpStatusCode.Created) {
              OneSignal.User.addTag("memberId", data.id);
              setMember(data);
              localStorage.setItem("member", JSON.stringify(data));
            }
          })}
        >
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                {...signUpForm.getInputProps("email")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                required
                label="Họ và tên"
                {...signUpForm.getInputProps("name")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                label="Địa chỉ"
                {...signUpForm.getInputProps("address")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                label="CMND/CCCD"
                {...signUpForm.getInputProps("identityNumber")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <NativeSelect
                label="Giới tính"
                data={genders}
                {...signUpForm.getInputProps("gender")}
                onChange={(e) =>
                  signUpForm.setFieldValue(
                    "gender",
                    e.currentTarget.value ? +e.currentTarget.value : null
                  )
                }
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <DatePickerInput
                label="Ngày sinh"
                maxDate={new Date()}
                {...signUpForm.getInputProps("dateOfBirth")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                {...signUpForm.getInputProps("password")}
              />
            </Grid.Col>
          </Grid>
          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              Đã có tài khoản? Đăng nhập ngay
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      )}
    </Paper>
  );
}

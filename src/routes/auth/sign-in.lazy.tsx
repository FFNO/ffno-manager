import { axiosInstance } from '@/api/utils';
import { MemberRole } from '@/libs';
import { SignInSchema, showErrorNotification, signInSchema } from '@/shared';
import { memberAtom } from '@/states';
import {
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { createLazyFileRoute } from '@tanstack/react-router';
import { HttpStatusCode } from 'axios';
import { useSetAtom } from 'jotai';
import OneSignal from 'react-onesignal';

export const Route = createLazyFileRoute('/auth/sign-in')({
  component: SignInPage,
});

export function SignInPage() {
  const signInForm = useForm<SignInSchema>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(signInSchema),
  });
  const setMember = useSetAtom(memberAtom);

  const handleSignIn = async (values: SignInSchema) => {
    const { data, status } = await axiosInstance.post('auth/sign-in', values);
    if (status === HttpStatusCode.Created) {
      if (![MemberRole.ADMIN, MemberRole.LANDLORD].includes(data.role)) {
        showErrorNotification({ message: 'Invalid credentials' });
        return;
      }
      OneSignal.User.addTag('memberId', data.id);
      setMember(data);
    }
  };

  return (
    <Paper
      p="xl"
      withBorder
      miw={{ base: '100%', md: 512 }}
      maw={{ base: '100%', md: 512 }}
    >
      <Text size="lg" fw={500}>
        Welcome to {import.meta.env.VITE_APP_NAME}
      </Text>

      <Divider labelPosition="center" my="lg" />

      <form onSubmit={signInForm.onSubmit(handleSignIn)}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={signInForm.values.email}
            onChange={(event) =>
              signInForm.setFieldValue('email', event.currentTarget.value)
            }
            error={signInForm.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={signInForm.values.password}
            onChange={(event) =>
              signInForm.setFieldValue('password', event.currentTarget.value)
            }
            error={
              signInForm.errors.password &&
              'Password should include at least 6 characters'
            }
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Button type="submit" fullWidth>
            {'Sign In'}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

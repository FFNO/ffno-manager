import { axiosInstance } from '@/api/utils';
import { currentMemberAtom } from '@/app';
import { ISignInDto, MemberRole } from '@/libs';
import { showErrorNotification } from '@/shared';
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
import { z } from 'zod';

export const Route = createLazyFileRoute('/auth/sign-in')({
  component: SignInPage,
});

const signInSchema: z.ZodSchema<ISignInDto> = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must contain more than 6 characters'),
});

export function SignInPage() {
  const signInForm = useForm<ISignInDto>({
    validate: zodResolver(signInSchema),
  });

  const setMember = useSetAtom(currentMemberAtom);

  const handleSignIn = async (values: ISignInDto) => {
    const { data, status } = await axiosInstance.post('auth/sign-in', values);
    if (status !== HttpStatusCode.Created) return;

    if (![MemberRole.ADMIN, MemberRole.LANDLORD].includes(data.role)) {
      showErrorNotification({
        message: 'You do not have permission to access this page',
      });
      return;
    }

    OneSignal.User.addTag('memberId', data.id);
    setMember(data);
  };

  return (
    <Paper p="xl" withBorder miw={512}>
      <Text size="lg" fw={500}>
        Welcome to {import.meta.env.VITE_APP_NAME}
      </Text>

      <Divider labelPosition="center" my="lg" />

      <form onSubmit={signInForm.onSubmit(handleSignIn)}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="hello@world.dev"
            {...signInForm.getInputProps('email')}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...signInForm.getInputProps('password')}
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

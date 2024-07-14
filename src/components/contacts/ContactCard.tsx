import { IMemberResDto } from '@/libs';
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
} from '@mantine/core';
import { Link } from '@tanstack/react-router';
import {
  Building02Icon,
  ConnectIcon,
  Contact02Icon,
  More01Icon,
} from 'hugeicons-react';

interface Props extends IMemberResDto {}

export const ContactCard = (props: Props) => {
  const theme = useMantineTheme();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h={400}>
      <Group mb={'md'}>
        <ConnectIcon color={theme.colors.green[6]} />
        <Box flex={1}></Box>
        <More01Icon />
      </Group>
      <Stack align="center" flex={1}>
        <Avatar src={props.imgUrl} size={'xl'} />
        <Title>{props.name}</Title>
        <Group gap={4}>
          <Contact02Icon />
          <Text>{props.phone}</Text>
        </Group>
        {props.unit && (
          <Group gap={4}>
            <Building02Icon />
            <Text fz={'lg'} fw={'bold'}>
              Unit &nbsp;
              {props.unit}
            </Text>
          </Group>
        )}
      </Stack>
      <Card.Section>
        <Divider mt={'lg'} />
        <Link to={'/members/$id'} params={{ id: props.id }}>
          <Button variant="subtle" fullWidth size="lg">
            View profile
          </Button>
        </Link>
      </Card.Section>
    </Card>
  );
};

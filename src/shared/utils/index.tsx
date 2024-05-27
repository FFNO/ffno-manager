import { NotificationData, notifications } from '@mantine/notifications';
import { Cancel01Icon, Tick01Icon } from 'hugeicons-react';

export const showSuccessNotification = (data: Partial<NotificationData>) =>
  notifications.show({
    icon: <Tick01Icon />,
    color: 'green',
    title: 'Success',
    message: 'Success',
    ...data,
  });

export const showErrorNotification = (data: Partial<NotificationData>) =>
  notifications.show({
    icon: <Cancel01Icon />,
    color: 'red',
    title: 'Error',
    message: 'Error',
    ...data,
  });

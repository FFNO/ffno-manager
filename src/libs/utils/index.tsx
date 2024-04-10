import { NotificationData, notifications } from "@mantine/notifications";
import { CheckIcon } from "lucide-react";

export function calculatePage(total?: number) {
  return Math.ceil((total ?? 10) / 10);
}

export function getOptionListFromRecord(record: Record<number, string>) {
  return Object.entries(record).map(([value, label]) => ({ value, label }));
}

export const showSuccessNotification = (data: Partial<NotificationData>) =>
  notifications.show({
    icon: <CheckIcon />,
    color: "green",
    title: "Thành công",
    message: "Thành công",
    ...data,
  });

import {
  IInvoiceResDto,
  invoiceCategoryRecord,
  invoiceStatusColorRecord,
} from '@/libs';
import { vndFormatter } from '@/libs/helpers';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';

interface Props extends IInvoiceResDto {}

export const InvoiceCard = ({
  id,
  unit,
  category,
  details,
  dueDate,
  member,
  status,
  total,
}: Props) => {
  return (
    <Card withBorder>
      <Group justify="space-between">
        <Title order={6}>#{id}</Title>
        <Tooltip label={member.name}>
          <Avatar src={member.imgUrl} />
        </Tooltip>
        <Badge size="lg">{invoiceCategoryRecord[category]}</Badge>
        <Text w={240}>
          {unit.name} - {unit.property.name}
        </Text>
        <Text>{details}</Text>
        <Text>{dayjs(dueDate).format('DD/MM/YY')}</Text>
        <Text>{vndFormatter.format(total)}</Text>
        <Badge size="lg" color={invoiceStatusColorRecord[status]}>
          {status}
        </Badge>
        <Link to="/invoices/$id" params={{ id }}>
          <Button variant="subtle">View details</Button>
        </Link>
      </Group>
    </Card>
  );
};

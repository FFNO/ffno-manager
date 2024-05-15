import { selectToMergeInvoices } from '@/app';
import {
  IInvoiceResDto,
  invoiceCategoryRecord,
  invoiceStatusColorRecord,
} from '@/libs';
import { vndFormatter } from '@/libs/helpers';
import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { cn } from '@nextui-org/react';
import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { CheckmarkCircle01Icon, GitMergeIcon, ViewIcon } from 'hugeicons-react';
import { useAtom } from 'jotai';

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
  const [selected, setSelected] = useAtom(selectToMergeInvoices);

  return (
    <div className={cn(selected[id] && 'outline-dashed')}>
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

          <Group>
            <Link to="/invoices/$id" params={{ id }}>
              <ActionIcon size={'lg'} variant="light">
                <ViewIcon />
              </ActionIcon>
            </Link>

            <ActionIcon
              size={'lg'}
              color="grape"
              variant="light"
              onClick={() => {
                console.log(selected);

                setSelected((prev) => ({
                  ...prev,
                  [id]: !prev[id],
                }));
              }}
            >
              {selected[id] ? <CheckmarkCircle01Icon /> : <GitMergeIcon />}
            </ActionIcon>
          </Group>
        </Group>
      </Card>
    </div>
  );
};

import { IContractResDto, contractStatusColorRecord } from '@/libs';
import { formatDate } from '@/libs/helpers';
import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { PencilEdit02Icon, ViewIcon } from 'hugeicons-react';

interface Props extends IContractResDto {}

export const ContractCard = ({
  id,
  status,
  startDate,
  endDate,
  terminationDate,
  tenant,
  unit,
}: Props) => {
  return (
    <div>
      <Card withBorder>
        <Group justify="space-between">
          <Title w={48} order={6}>
            #{id}
          </Title>
          <Group w={200}>
            <Avatar src={tenant.imgUrl} />
            <p>{tenant.name}</p>
          </Group>
          <Text w={240}>
            {unit.name} - {unit.property.name}
          </Text>
          <p className="w-24 text-center">{formatDate(startDate)}</p>
          <p className="w-24 text-center">{formatDate(endDate)}</p>
          <p className="w-24 text-center">
            {terminationDate ? formatDate(terminationDate) : '-'}
          </p>
          <span className="w-24 flex justify-center">
            <Badge size="lg" color={contractStatusColorRecord[status]}>
              {status}
            </Badge>
          </span>
          <Group w={96}>
            <Link to="/contracts/$id" params={{ id }}>
              <ActionIcon variant="light" size={'lg'}>
                <ViewIcon />
              </ActionIcon>
            </Link>
            <Link to="/contracts/$id/update" params={{ id }}>
              <ActionIcon color="grape" variant="light" size={'lg'}>
                <PencilEdit02Icon />
              </ActionIcon>
            </Link>
          </Group>
        </Group>
      </Card>
    </div>
  );
};

import { useList } from '@/api';
import {
  IEquipmentResDto,
  unitStatusColorRecord,
  unitStatusRecord,
} from '@/libs';
import { displayDate, vndFormatter } from '@/libs/helpers';
import { ActionIcon, Badge, Group, Table, Tooltip } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { ViewIcon } from 'hugeicons-react';

interface Props {
  unitId?: string;
}

function EquipmentTab({ unitId }: Props) {
  const { data } = useList<IEquipmentResDto>({
    resource: 'equipments',
    params: { unitId },
  });
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Brand</Table.Th>
          <Table.Th>Model</Table.Th>
          <Table.Th>Serial</Table.Th>
          <Table.Th>Install at</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Unit</Table.Th>
          <Table.Th>Property</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th ta={'center'}>Status</Table.Th>
          <Table.Th ta={'center'}>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.data.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>{item.brand}</Table.Td>
            <Table.Td>{item.model}</Table.Td>
            <Table.Td>{item.serial}</Table.Td>
            <Table.Td>{displayDate(item.dateOfInstallation)}</Table.Td>
            <Table.Td>{item.description}</Table.Td>
            <Table.Td>{item.unit.name}</Table.Td>
            <Table.Td>{item.property.name}</Table.Td>
            <Table.Td>{vndFormatter.format(item.price)}</Table.Td>
            <Table.Td ta={'center'}>
              <Badge color={unitStatusColorRecord[item.maintainStatus]}>
                {unitStatusRecord[item.maintainStatus]}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Group justify="center">
                <Link to="/equipments/$id" params={{ id: item.id }}>
                  <Tooltip label={'View equipment detail'}>
                    <ActionIcon variant="light">
                      <ViewIcon size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Link>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default EquipmentTab;

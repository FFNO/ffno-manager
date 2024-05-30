import { useList } from '@/api';
import { SearchButton } from '@/components/common';
import { RequestSearchForm } from '@/components/requests';
import {
  DATE_FORMAT,
  IEquipmentResDto,
  IGetListEquipmentDto,
  unitStatusColorRecord,
  unitStatusRecord,
} from '@/libs';
import { calculatePage, vndFormatter } from '@/libs/helpers';
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Table,
  Tooltip,
} from '@mantine/core';
import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Invoice01Icon, PlusSignIcon } from 'hugeicons-react';
import { atom, useAtom } from 'jotai';

const equipmentSearchAtom = atom<NullableObject<IGetListEquipmentDto>>({});

function EquipmentListPage() {
  const [search, setSearch] = useAtom(equipmentSearchAtom);
  const { data } = useList<IEquipmentResDto>({
    resource: 'equipments',
    params: search,
  });

  return (
    <Stack p={'lg'} px={32}>
      <Group justify="end">
        <SearchButton>
          <RequestSearchForm />
        </SearchButton>
        <Link to="/equipments/create">
          <Button leftSection={<PlusSignIcon size={16} />}>
            Add equipment
          </Button>
        </Link>
      </Group>
      <SimpleGrid cols={1} py={24}>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Brand</Table.Th>
              <Table.Th>Model</Table.Th>
              <Table.Th>Serial</Table.Th>
              <Table.Th>Install at</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Property</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th ta={'center'}>Status</Table.Th>
              <Table.Th ta={'center'}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.total ? (
              data?.data.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.brand}</Table.Td>
                  <Table.Td>{item.model}</Table.Td>
                  <Table.Td>{item.serial}</Table.Td>
                  <Table.Td>
                    {item.dateOfInstallation
                      ? dayjs(item.dateOfInstallation).format(DATE_FORMAT)
                      : '-'}
                  </Table.Td>
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
                      <Link to="/equipments" params={{ id: item.id }}>
                        <Tooltip label={'View equipment detail'}>
                          <ActionIcon variant="light">
                            <Invoice01Icon size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Link>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={11}>
                  <Center h={425}>No data to display</Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </SimpleGrid>
      <Pagination
        withEdges
        total={calculatePage(data?.total)}
        value={search.page ?? 1}
        onChange={(page) => setSearch((prev) => ({ ...prev, page }))}
      />
    </Stack>
  );
}

export default EquipmentListPage;

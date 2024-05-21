import { useList } from '@/api';
import { contractSearchAtom } from '@/app';
import { ContractSearch } from '@/components/contracts';
import {
  IContractResDto,
  contractStatusColorRecord,
  contractStatusRecord,
} from '@/libs';
import { calculatePage, formatDate } from '@/libs/helpers';
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Table,
  Title,
  Tooltip,
} from '@mantine/core';
import { Link, createFileRoute } from '@tanstack/react-router';
import { PencilEdit02Icon, PlusSignIcon, ViewIcon } from 'hugeicons-react';
import { useAtom } from 'jotai';

export const Route = createFileRoute('/contracts/')({
  component: Page,
});

function Page() {
  const [search, setSearch] = useAtom(contractSearchAtom);

  const { data } = useList<IContractResDto>({
    resource: 'contracts',
    params: search,
  });

  return (
    <Stack p={'lg'} px={32}>
      <Group justify="space-between">
        <Title>Contracts</Title>
        <Box flex={1} />
        <ContractSearch />
        <Link to="/contracts/create">
          <Button leftSection={<PlusSignIcon size={16} />}>Add contract</Button>
        </Link>
      </Group>
      <SimpleGrid cols={1} py={24}>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Tenant</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Property</Table.Th>
              <Table.Th ta={'center'}>Start date</Table.Th>
              <Table.Th ta={'center'}>End date</Table.Th>
              <Table.Th ta={'center'}>Termination date</Table.Th>
              <Table.Th ta={'center'}>Status</Table.Th>
              <Table.Th ta={'center'}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.total ? (
              data.data.map((contract) => (
                <Table.Tr key={contract.id}>
                  <Table.Td>#{contract.id}</Table.Td>
                  <Table.Td>
                    <Group>
                      <Avatar size={'sm'} src={contract.tenant.imgUrl} />
                      <p>{contract.tenant.name}</p>
                    </Group>
                  </Table.Td>
                  <Table.Td>{contract.unit.name}</Table.Td>
                  <Table.Td>{contract.unit.property.name}</Table.Td>
                  <Table.Td ta={'center'}>
                    {formatDate(contract.startDate)}
                  </Table.Td>
                  <Table.Td ta={'center'}>
                    {formatDate(contract.endDate)}
                  </Table.Td>
                  <Table.Td ta={'center'}>
                    {contract.terminationDate
                      ? formatDate(contract.terminationDate)
                      : '-'}
                  </Table.Td>
                  <Table.Td ta={'center'}>
                    <Badge color={contractStatusColorRecord[contract.status]}>
                      {contractStatusRecord[contract.status]}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group justify="center">
                      <Link
                        to="/contracts/$id"
                        params={{ id: contract.id.toString() }}
                      >
                        <Tooltip label={'View contract detail'}>
                          <ActionIcon variant="light">
                            <ViewIcon size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Link>
                      <Link
                        to="/properties/$id"
                        params={{ id: contract.unit.propertyId }}
                      >
                        <Tooltip label={'View property detail'}>
                          <ActionIcon variant="light" color="grape">
                            <PencilEdit02Icon size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Link>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={6}>
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

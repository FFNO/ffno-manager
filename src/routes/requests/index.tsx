import { useList } from '@/api';
import { requestSearchAtom } from '@/app';
import { SearchButton } from '@/components/common';
import { RequestSearchForm } from '@/components/requests';
import {
  IRequestResDto,
  requestCategoryRecord,
  requestStatusColorRecord,
  requestStatusRecord,
} from '@/libs';
import { calculatePage } from '@/libs/helpers';
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Center,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Table,
  Tabs,
  Tooltip,
} from '@mantine/core';
import { Link, createFileRoute } from '@tanstack/react-router';
import {
  Building02Icon,
  Invoice01Icon,
  PlusSignIcon,
  SearchSquareIcon,
} from 'hugeicons-react';
import { useAtom } from 'jotai';

export const Route = createFileRoute('/requests/')({
  component: Page,
});

function Page() {
  const [search, setSearch] = useAtom(requestSearchAtom);
  const { data } = useList<IRequestResDto>({
    resource: 'requests',
    params: search,
  });

  return (
    <div>
      <Stack p={'lg'} px={32}>
        <Group justify="end">
          <SearchButton>
            <RequestSearchForm />
          </SearchButton>
          <Link to="/requests/create">
            <Button leftSection={<PlusSignIcon size={16} />}>
              Add request
            </Button>
          </Link>
        </Group>
        <Tabs
          variant="pills"
          defaultValue={'received'}
          value={search.type}
          onChange={(value) => setSearch({ type: value })}
        >
          <Tabs.List>
            <Tabs.Tab value="received">Received request</Tabs.Tab>
            <Tabs.Tab value="sent">Sent request</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <SimpleGrid cols={1} py={24}>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Category</Table.Th>
                <Table.Th>Sender</Table.Th>
                <Table.Th>Unit</Table.Th>
                <Table.Th>Property</Table.Th>
                <Table.Th>Equipment</Table.Th>
                <Table.Th>Contract</Table.Th>
                <Table.Th ta={'center'}>Status</Table.Th>
                <Table.Th ta={'center'}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.total ? (
                data?.data.map((request) => (
                  <Table.Tr key={request.id}>
                    <Table.Td>
                      {requestCategoryRecord[request.category]}
                    </Table.Td>
                    <Table.Td>
                      <Group>
                        <Avatar size={'sm'} src={request.sender.imgUrl} />
                        <p>{request.sender.name}</p>
                      </Group>
                    </Table.Td>
                    <Table.Td>{request.unit?.name ?? '-'}</Table.Td>
                    <Table.Td>{request.unit?.property?.name ?? '-'}</Table.Td>
                    <Table.Td>
                      {request.equipment ? (
                        <Link
                          to="/equipments/$id"
                          params={{ id: request.equipment.id }}
                          className="text-primary hover:underline"
                        >
                          {request.equipment.name}
                        </Link>
                      ) : (
                        '-'
                      )}
                    </Table.Td>
                    <Table.Td>
                      {request.contract ? (
                        <Link
                          to="/contracts/$id"
                          params={{ id: request.contract.id.toString() }}
                          className="text-primary hover:underline"
                        >
                          #{request.contract.id}
                        </Link>
                      ) : (
                        '-'
                      )}
                    </Table.Td>
                    <Table.Td ta={'center'}>
                      <Badge color={requestStatusColorRecord[request.status]}>
                        {requestStatusRecord[request.status]}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group justify="center">
                        <Link to="/requests/$id" params={{ id: request.id }}>
                          <Tooltip label={'View request detail'}>
                            <ActionIcon variant="light">
                              <Invoice01Icon size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Link>
                        {request.unit && (
                          <>
                            <Link
                              to="/units/$id"
                              params={{ id: request.unit.id }}
                            >
                              <Tooltip label={'View unit detail'}>
                                <ActionIcon variant="light" color="cyan">
                                  <SearchSquareIcon size={16} />
                                </ActionIcon>
                              </Tooltip>
                            </Link>
                            <Link
                              to="/properties/$id"
                              params={{ id: request.unit.propertyId }}
                            >
                              <Tooltip label={'View property detail'}>
                                <ActionIcon variant="light" color="grape">
                                  <Building02Icon size={16} />
                                </ActionIcon>
                              </Tooltip>
                            </Link>
                          </>
                        )}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={7}>
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
    </div>
  );
}

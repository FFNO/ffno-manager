import { dataProvider } from '@/api';
import {
  DATE_FORMAT,
  IMemberResDto,
  contractStatusColorRecord,
  contractStatusRecord,
  genderRecord,
} from '@/libs';
import {
  ActionIcon,
  Avatar,
  Badge,
  Breadcrumbs,
  Fieldset,
  Grid,
  Group,
  Stack,
  Table,
  Title,
  Tooltip,
} from '@mantine/core';
import { Link, createFileRoute, useLoaderData } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Building02Icon, Invoice01Icon } from 'hugeicons-react';

export const Route = createFileRoute('/members/$id')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IMemberResDto>({ resource: 'members', id }),
});

function Page() {
  const data = useLoaderData({ from: '/members/$id' });

  return (
    <Stack px={120} py={'md'}>
      <Breadcrumbs className="my-4 font-semibold text-primary cursor-pointer">
        <Link to="/">Home</Link>
        <Link to="/members/tenants">Tenants</Link>
        <Link to="/members/$id" params={{ id: data.id }}>
          {data.name}
        </Link>
      </Breadcrumbs>
      <Grid gutter="lg">
        <Grid.Col span={4}>
          <Stack align="center">
            <Title>{data.name}</Title>
            <Avatar size={'xl'} src={data.imgUrl} />
          </Stack>
          <Fieldset legend="Information" mt={'lg'}>
            <Group>
              <p className="font-semibold">Email:</p>
              <p>{data.email}</p>
            </Group>
            <Group>
              <p className="font-semibold">Phone:</p>
              <p>{data.phone}</p>
            </Group>
            <Group>
              <p className="font-semibold">Gender:</p>
              <p>{genderRecord[data.gender]}</p>
            </Group>
            <Group>
              <p className="font-semibold">Address:</p>
              <p>{data.address}</p>
            </Group>
            <Group>
              <p className="font-semibold">Date of birth:</p>
              <p>{dayjs(data.dateOfBirth).format(DATE_FORMAT)}</p>
            </Group>
          </Fieldset>
        </Grid.Col>
        <Grid.Col span={8}>
          <Stack>
            <Group>
              <p className="font-semibold">Unit: </p>
              <p>{data.unit ? data.unit : 'None'}</p>
            </Group>
            <Group>
              <p className="font-semibold">Contracts:</p>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
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
                  {data.tenantContracts.map((contract) => (
                    <Table.Tr key={contract.id}>
                      <Table.Td>{contract.unit.name}</Table.Td>
                      <Table.Td>{contract.unit.property.name}</Table.Td>
                      <Table.Td>
                        {dayjs(contract.startDate).format(DATE_FORMAT)}
                      </Table.Td>
                      <Table.Td>
                        {dayjs(contract.endDate).format(DATE_FORMAT)}
                      </Table.Td>
                      <Table.Td>
                        {contract.terminationDate
                          ? dayjs(contract.terminationDate).format(DATE_FORMAT)
                          : '-'}
                      </Table.Td>
                      <Table.Td ta={'center'}>
                        <Badge
                          color={contractStatusColorRecord[contract.status]}
                        >
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
                                <Invoice01Icon size={16} />
                              </ActionIcon>
                            </Tooltip>
                          </Link>
                          <Link
                            to="/properties/$id"
                            params={{ id: contract.unit.propertyId }}
                          >
                            <Tooltip label={'View property detail'}>
                              <ActionIcon variant="light" color="grape">
                                <Building02Icon size={16} />
                              </ActionIcon>
                            </Tooltip>
                          </Link>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

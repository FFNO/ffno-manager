import { useList } from '@/api';
import { contractSearchAtom } from '@/app';
import { ContractCard, ContractSearch } from '@/components/contracts';
import { IContractResDto } from '@/libs';
import { calculatePage } from '@/libs/helpers';
import {
  Box,
  Button,
  Card,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { Link, createFileRoute } from '@tanstack/react-router';
import { PlusSignIcon } from 'hugeicons-react';
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
        <Card withBorder className="text-base font-semibold">
          <Group justify="space-between">
            <p className="w-12">ID</p>
            <p className="w-[200px]">Tenant</p>
            <p className="w-60">Unit</p>
            <p className="w-24">Start date</p>
            <p className="w-24">End date</p>
            <p className="w-24">Term. date</p>
            <p className="w-24">Status</p>
            <p className="w-24">Actions</p>
          </Group>
        </Card>
        {data?.data.map((item) => <ContractCard {...item} key={item.id} />)}
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

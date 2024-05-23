import { useList, useSimpleList } from '@/api';
import { contractSearchAtom } from '@/app';
import {
  IGetListContractDto,
  IMemberResDto,
  MemberRole,
  contractStatuses,
} from '@/libs';
import { replaceNullsWithUndefined } from '@/libs/helpers';
import { Button, Group, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAtom } from 'jotai';
import { SearchButton } from '../common/SearchButton';

export const ContractSearch = () => {
  const [search, setSearch] = useAtom(contractSearchAtom);

  const form = useForm<NullableObject<IGetListContractDto>>({
    initialValues: search,
  });

  const { data: units } = useSimpleList({ resource: 'units' });

  const { data: tenants } = useList<IMemberResDto>({
    resource: `members/contacts`,
    params: { type: MemberRole.TENANT, pageSize: 10000 },
  });

  return (
    <SearchButton>
      <form
        onSubmit={form.onSubmit((values) => {
          setSearch((prev) =>
            replaceNullsWithUndefined({
              ...prev,
              ...values,
              page: undefined,
            }),
          );
        })}
      >
        <Stack>
          <Select
            clearable
            label="Contract status"
            placeholder="Select status"
            data={contractStatuses}
            {...form.getInputProps('status')}
          />
          <Select
            clearable
            searchable
            label="Unit"
            placeholder="Select unit"
            data={units ?? []}
            {...form.getInputProps('unitId')}
          />
          <Select
            clearable
            searchable
            label="Tenant"
            placeholder="Select tenant"
            data={
              tenants?.data.map((tenant) => ({
                value: tenant.id,
                label: tenant.name,
              })) ?? []
            }
            {...form.getInputProps('tenantId')}
          />
        </Stack>
        <Group justify="end" grow gap={'xs'} mt={12}>
          <Button type="submit" size="sm">
            Search
          </Button>
          <Button
            type="button"
            size="sm"
            variant="light"
            color="red"
            onClick={() => {
              form.reset();
              setSearch({});
            }}
          >
            Clear
          </Button>
        </Group>
      </form>
    </SearchButton>
  );
};

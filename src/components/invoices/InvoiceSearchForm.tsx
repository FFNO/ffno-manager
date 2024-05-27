import { useSimpleList } from '@/api';
import { initialInvoiceSearchValues, invoiceSearchAtom } from '@/app';
import { IGetListInvoiceDto, invoiceCategories, invoiceStatuses } from '@/libs';
import { replaceNullsWithUndefined } from '@/libs/helpers';
import { Button, Group, MultiSelect, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const InvoiceSearchForm = () => {
  const [search, setSearch] = useAtom(invoiceSearchAtom);

  const form = useForm<NullableObject<IGetListInvoiceDto>>({
    initialValues: search,
  });

  const { data: properties } = useSimpleList({ resource: 'properties' });
  const { data: units } = useSimpleList({ resource: 'units' });

  useEffect(() => {
    form.setValues({
      unitId: undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.propertyId]);

  return (
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
          label="Invoice status"
          placeholder="Select status"
          data={invoiceStatuses}
          {...form.getInputProps('status')}
        />
        <Select
          clearable
          searchable
          label="Property"
          placeholder="Select property"
          data={properties ?? []}
          {...form.getInputProps('propertyId')}
        />
        <Select
          clearable
          searchable
          label="Unit"
          placeholder="Select unit"
          data={units ?? []}
          {...form.getInputProps('unitId')}
        />
        <MultiSelect
          searchable
          label="Categories"
          placeholder="Select categories"
          data={invoiceCategories}
          {...form.getInputProps('categories')}
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
            setSearch(initialInvoiceSearchValues);
          }}
        >
          Clear
        </Button>
      </Group>
    </form>
  );
};

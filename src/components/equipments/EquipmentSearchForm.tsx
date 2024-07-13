import { useSimpleList } from '@/api';
import { equipmentSearchAtom } from '@/app';
import { IGetListEquipmentDto, requestStatuses } from '@/libs';
import { replaceNullsWithUndefined } from '@/libs/helpers';
import { Button, Group, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAtom } from 'jotai';

function EquipmentSearchForm() {
  const [search, setSearch] = useAtom(equipmentSearchAtom);

  const form = useForm<NullableObject<IGetListEquipmentDto>>({
    initialValues: search,
  });

  const { data: properties } = useSimpleList({
    resource: 'properties',
  });
  const { data: units } = useSimpleList({
    resource: 'units',
    params: { propertyId: form.values.propertyId },
  });
  const { data: equipmentCategories } = useSimpleList({
    resource: 'equipment-categories',
  });

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
      <Stack>
        <Select
          clearable
          label="Equipment status"
          placeholder="Select status"
          data={requestStatuses}
          {...form.getInputProps('status')}
        />
        <Select
          clearable
          label="Equipment category"
          placeholder="Select category"
          data={equipmentCategories}
          {...form.getInputProps('category')}
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
  );
}

export default EquipmentSearchForm;

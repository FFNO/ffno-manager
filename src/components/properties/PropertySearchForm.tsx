import { useSimpleList } from '@/api';
import { IGetListPropertyDto, propertyTypes } from '@/libs';
import { replaceNullsWithUndefined } from '@/libs/helpers';
import { initialPropertySearchValues, propertySearchAtom } from '@/app';
import {
  Button,
  Group,
  MultiSelect,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const PropertySearchForm = () => {
  const [search, setSearch] = useAtom(propertySearchAtom);

  const form = useForm<NullableObject<IGetListPropertyDto>>({
    initialValues: search,
  });

  const { data: amenities } = useSimpleList({ resource: 'amenities' });
  const { data: provinces } = useSimpleList({ resource: 'provinces' });
  const { data: districts } = useSimpleList({
    resource: 'districts',
    params: { province: form.values.province },
  });
  const { data: wards } = useSimpleList({
    resource: 'wards',
    params: { district: form.values.district },
  });

  useEffect(() => {
    form.setValues({
      district: undefined,
      ward: undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.province]);

  useEffect(() => {
    form.setValues({
      ward: undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.district]);
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
        <TextInput
          label="Property name"
          placeholder="Enter property name"
          {...form.getInputProps('name')}
        />
        <Select
          clearable
          label="Property type"
          placeholder="Select property type"
          data={propertyTypes}
          {...form.getInputProps('type')}
        />
        <Select
          searchable
          clearable
          label="Province"
          placeholder="Select province"
          data={provinces ?? []}
          {...form.getInputProps('province')}
        />
        <Select
          searchable
          clearable
          disabled={!form.values.province}
          label="District"
          placeholder="Select district"
          data={districts ?? []}
          {...form.getInputProps('district')}
        />
        <Select
          clearable
          searchable
          disabled={!form.values.province || !form.values.district}
          label="Ward"
          placeholder="Select ward"
          data={wards ?? []}
          {...form.getInputProps('ward')}
        />
        <MultiSelect
          searchable
          label="Amenities"
          placeholder="Select amenities"
          data={amenities ?? []}
          {...form.getInputProps('amenities')}
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
            setSearch(initialPropertySearchValues);
          }}
        >
          Clear
        </Button>
      </Group>
    </form>
  );
};

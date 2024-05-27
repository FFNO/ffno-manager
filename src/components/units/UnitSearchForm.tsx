import { useSimpleList } from '@/api';
import { initialPropertySearchValues, unitSearchAtom } from '@/app';
import { IGetListUnitDto, propertyTypes } from '@/libs';
import { replaceNullsWithUndefined } from '@/libs/helpers';
import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const UnitSearchForm = () => {
  const [search, setSearch] = useAtom(unitSearchAtom);

  const form = useForm<NullableObject<IGetListUnitDto>>({
    initialValues: {
      ...search,
      maxArea: '',
      maxPrice: '',
      minArea: '',
      minPrice: '',
    },
  });

  const { data: amenities } = useSimpleList({ resource: 'amenities' });
  const { data: features } = useSimpleList({ resource: 'unit-features' });
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
            maxArea: values.maxArea || undefined,
            maxPrice: values.maxPrice || undefined,
            minArea: values.minArea || undefined,
            minPrice: values.minPrice || undefined,
          }),
        );
      })}
    >
      <Stack>
        <TextInput
          label="Property/unit name"
          placeholder="Enter property/unit name"
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
        <SimpleGrid cols={2}>
          <NumberInput
            label="Min price"
            placeholder="Enter min price"
            suffix={' ₫'}
            thousandSeparator=","
            step={1000}
            allowDecimal
            decimalScale={2}
            allowNegative={false}
            max={form.values.maxPrice || undefined}
            {...form.getInputProps('minPrice')}
          />
          <NumberInput
            label="Max price"
            placeholder="Enter max price"
            suffix={' ₫'}
            thousandSeparator=","
            step={1000}
            allowDecimal
            decimalScale={2}
            allowNegative={false}
            min={form.values.minPrice || undefined}
            {...form.getInputProps('maxPrice')}
          />
        </SimpleGrid>
        <SimpleGrid cols={2}>
          <NumberInput
            label="Min area"
            placeholder="Enter min area"
            suffix={' ₫'}
            thousandSeparator=","
            step={1000}
            allowDecimal
            decimalScale={2}
            allowNegative={false}
            max={form.values.maxPrice || undefined}
            {...form.getInputProps('minArea')}
          />
          <NumberInput
            label="Max area"
            placeholder="Enter max area"
            suffix={' ₫'}
            thousandSeparator=","
            step={1000}
            allowDecimal
            decimalScale={2}
            allowNegative={false}
            min={form.values.minPrice || undefined}
            {...form.getInputProps('maxArea')}
          />
        </SimpleGrid>
        <MultiSelect
          searchable
          label="Property Amenities"
          placeholder="Select amenities"
          data={amenities ?? []}
          {...form.getInputProps('amenities')}
        />
        <MultiSelect
          searchable
          label="Unit features"
          placeholder="Select features"
          data={features ?? []}
          {...form.getInputProps('features')}
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

import { dataProvider, useList, useSimpleList, useUpdate } from '@/api';
import { ImageUpload } from '@/components/common';
import { IPropertyResDto, IUnitResDto, UnitStatus, unitStatuses } from '@/libs';
import { showSuccessNotification } from '@/shared';
import {
  Breadcrumbs,
  Button,
  Divider,
  Fieldset,
  Grid,
  Group,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Link, createFileRoute, useLoaderData } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/units/$id/update')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IUnitResDto>({ id, resource: 'units' }),
});

const updateSchema = z.object({
  name: z.string().optional(),
  area: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
  deposit: z.coerce.number().optional(),
  status: z.nativeEnum(UnitStatus).optional(),
  imgUrls: z.array(z.string()).optional(),
  description: z.string().optional(),
  unitFeatures: z.array(z.string()).optional(),
});

function Page() {
  const data = useLoaderData({ from: '/units/$id/update' });
  const mutate = useUpdate({
    resource: `units/${data.id}`,
    onSuccess: onUpdateSuccess,
  });

  const form = useForm({
    initialValues: data,
    validate: zodResolver(updateSchema),
  });

  const { data: unitFeatures } = useSimpleList({ resource: 'unit-features' });
  const { data: propertyList } = useList<IPropertyResDto>({
    resource: 'properties/simple-list',
  });

  const handleSubmit = form.onSubmit(async (values) => {
    mutate.mutate(values);
  });

  function onUpdateSuccess() {
    showSuccessNotification({
      id: 'update-unit-successfully',
      message: 'Successfully updated unit',
    });
  }

  return (
    <Stack px={120} p={'md'} pos={'relative'}>
      <LoadingOverlay
        visible={mutate.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Breadcrumbs className="my-4 font-semibold text-primary cursor-pointer">
        <Link to="/">Home</Link>
        <Link to="/units">Units</Link>
        <Link to="/units/$id" params={{ id: data.id }}>
          {data.name} - {data.property.name}
        </Link>
        <p>Update unit</p>
      </Breadcrumbs>
      <form onSubmit={handleSubmit}>
        <Fieldset legend="Unit information">
          <Grid>
            <Grid.Col span={4}>
              <TextInput
                label="Unit name"
                placeholder="Enter unit name"
                withAsterisk
                {...form.getInputProps(`name`)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Status"
                withAsterisk
                data={unitStatuses}
                {...form.getInputProps(`status`)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Property"
                placeholder="Select property"
                withAsterisk
                disabled
                data={propertyList?.data.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                {...form.getInputProps(`propertyId`)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Area"
                withAsterisk
                min={0}
                suffix=" m²"
                {...form.getInputProps(`area`)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Price"
                withAsterisk
                min={0}
                suffix=" ₫"
                thousandSeparator=","
                step={1000}
                {...form.getInputProps(`price`)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Deposit"
                withAsterisk
                min={0}
                suffix=" ₫"
                thousandSeparator=","
                step={1000}
                {...form.getInputProps(`deposit`)}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>

        <Divider mt={'lg'} pb={'lg'} />

        <Fieldset legend="Features">
          <MultiSelect
            placeholder="Select features"
            data={
              unitFeatures?.map((item) => ({ value: item, label: item })) ?? []
            }
            {...form.getInputProps('unitFeatures')}
          />
        </Fieldset>

        <Divider mt={'lg'} pb={'lg'} />

        <Fieldset legend="Images">
          <ImageUpload
            urls={form.values.imgUrls}
            setUrls={(urls) =>
              form.setFieldValue('imgUrls', [...urls, ...form.values.imgUrls])
            }
          />
        </Fieldset>

        <Divider mt={'lg'} pb={'lg'} />

        <Group justify="end">
          <Button type="submit">Update</Button>
          <Button
            variant="outline"
            color="red"
            type="button"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
        </Group>
      </form>
    </Stack>
  );
}

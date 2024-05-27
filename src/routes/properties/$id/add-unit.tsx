import { useCreate, useList, useSimpleList } from '@/api';
import { ImageUpload } from '@/components/common';
import { IPropertyResDto, unitStatuses } from '@/libs';
import {
  CreateUnitSchema,
  createUnitInitialValues,
  createUnitSchema,
  showSuccessNotification,
} from '@/shared';
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
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/properties/$id/add-unit')({
  component: Page,
});

function Page() {
  const { id: propertyId } = Route.useParams();
  const mutate = useCreate({ resource: 'units', onSuccess: onCreateSuccess });
  const navigate = useNavigate();

  const form = useForm<CreateUnitSchema>({
    initialValues: {
      ...createUnitInitialValues,
      propertyId,
    },
    validate: zodResolver(createUnitSchema),
  });

  const { data: unitFeatures } = useSimpleList({ resource: 'unit-features' });
  const { data: propertyList } = useList<IPropertyResDto>({
    resource: 'properties/simple-list',
  });

  const handleSubmit = form.onSubmit(async (values) => {
    mutate.mutate(values);
  });

  function onCreateSuccess(id: string) {
    showSuccessNotification({
      id: 'add-unit-successfully',
      message: 'Successfully added unit',
    });
    navigate({ to: '/units/$id', params: { id } });
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
        <Link to="/properties">Properties</Link>
        <Link to="/properties/$id" params={{ id: propertyId }}>
          {propertyList?.data.find(({ id }) => id === propertyId)?.name}
        </Link>
        <p>Add unit</p>
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
                disabled={!!propertyId}
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
            setUrls={(urls) => form.setFieldValue('imgUrls', urls)}
          />
        </Fieldset>

        <Divider mt={'lg'} pb={'lg'} />

        <Group justify="end">
          <Button type="submit">Create</Button>
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

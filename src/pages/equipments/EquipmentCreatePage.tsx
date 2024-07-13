import { useCreate, useSimpleList } from '@/api';
import { ImageUpload } from '@/components/common';
import { ICreateEquipmentDto, unitStatuses } from '@/libs';
import { showSuccessNotification } from '@/shared';
import {
  Breadcrumbs,
  Button,
  Checkbox,
  Divider,
  Fieldset,
  Grid,
  Group,
  LoadingOverlay,
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from '@tanstack/react-router';

function EquipmentCreatePage() {
  const navigate = useNavigate();

  const mutate = useCreate({
    resource: 'equipments',
    onSuccess: onCreateSuccess,
  });

  const form = useForm<ICreateEquipmentDto>({});

  const { data: equipmentCategories } = useSimpleList({
    resource: 'equipment-categories',
  });
  const { data: properties } = useSimpleList({
    resource: 'properties',
  });
  const { data: units } = useSimpleList({
    resource: 'units',
    params: { propertyId: form.values.propertyId },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    mutate.mutate(values);
  });

  function onCreateSuccess(id: string) {
    showSuccessNotification({ message: 'Successfully add equipment' });
    navigate({ to: '/equipments/$id', params: { id } });
  }

  return (
    <Stack px={120} py={'lg'} pos={'relative'}>
      <LoadingOverlay
        visible={mutate.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Breadcrumbs className="my-4 font-semibold text-primary cursor-pointer">
        <Link to="/">Home</Link>
        <Link to="/equipments" search={{ page: 1 }}>
          Requests
        </Link>
        <p>Add equipment</p>
      </Breadcrumbs>
      <form onSubmit={handleSubmit}>
        <Fieldset legend="Basic information">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Name"
                placeholder="Enter name"
                withAsterisk
                {...form.getInputProps('name')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Brand"
                placeholder="Enter brand"
                {...form.getInputProps('brand')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Model"
                placeholder="Enter model"
                {...form.getInputProps('model')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Serial"
                placeholder="Enter serial"
                {...form.getInputProps('serial')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <DatePickerInput
                label={'Install at'}
                placeholder="Enter date of installation"
                {...form.getInputProps('dateOfInstallation')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                searchable
                clearable
                withAsterisk
                label="Category"
                placeholder="Select category"
                data={equipmentCategories ?? []}
                {...form.getInputProps('category')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                searchable
                clearable
                withAsterisk
                label="Status"
                placeholder="Select status"
                data={unitStatuses ?? []}
                {...form.getInputProps('maintainStatus')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                clearable
                searchable
                label="Property"
                placeholder="Select property"
                data={properties}
                {...form.getInputProps('propertyId')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                disabled={!form.values.propertyId}
                clearable
                searchable
                label="Unit"
                placeholder="Select unit"
                data={units}
                {...form.getInputProps('unitId')}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Description"
                placeholder="Enter description"
                withAsterisk
                rows={4}
                {...form.getInputProps('description')}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>

        <Divider mt={'lg'} pb={'lg'} />

        <Fieldset legend="Warranty">
          <Stack>
            <Checkbox
              label="Enable warranty"
              {...form.getInputProps('enableWarranty')}
            />
            <DatePickerInput
              disabled={!form.values.enableWarranty}
              label={'Warranty expiration date'}
              placeholder="Enter warranty expiration date"
              {...form.getInputProps('warrantyExpirationDate')}
            />
          </Stack>
        </Fieldset>

        <Fieldset legend="Images">
          <ImageUpload
            setUrls={(urls) => form.setFieldValue('imgUrls', urls)}
          />
        </Fieldset>

        <Divider mt={'lg'} pb={'lg'} />

        <Group justify="end">
          <Button type="submit">Submit</Button>
          <Button
            variant="outline"
            color="red"
            type="button"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </Group>
      </form>
    </Stack>
  );
}

export default EquipmentCreatePage;

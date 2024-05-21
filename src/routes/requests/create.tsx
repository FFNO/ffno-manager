import { useCreate, useSimpleList } from '@/api';
import { requestFormAtom } from '@/app';
import { RequestCategory, requestCategories } from '@/libs';
import {
  CreateRequestSchema,
  createRequestInitialValues,
  createRequestSchema,
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
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const Route = createFileRoute('/requests/create')({
  component: RequestCreatePage,
});

function RequestCreatePage() {
  const [formValue, setFormValue] = useAtom(requestFormAtom);
  const navigate = useNavigate();
  const mutate = useCreate({
    resource: 'requests',
    onSuccess: onCreateSuccess,
  });
  const form = useForm<NullableObject<CreateRequestSchema>>({
    initialValues: formValue,
    validate: zodResolver(createRequestSchema),
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

  useEffect(() => {
    if (formValue.propertyId) {
      form.setValues(formValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  useEffect(() => {
    if (formValue.unitId) {
      setFormValue(createRequestInitialValues);
      return;
    }

    form.setValues({
      unitId: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.propertyId]);

  function onCreateSuccess() {
    showSuccessNotification({ message: 'Add request successfully' });
    navigate({
      to: '/requests',
      search: { page: 1, type: 'send' },
    });
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
        <Link to="/requests/" search={{ page: 1, type: 'received' }}>
          Requests
        </Link>
        <p>Add request</p>
      </Breadcrumbs>
      <form onSubmit={handleSubmit}>
        <Fieldset legend="Basic information">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Request"
                placeholder="Enter request name"
                withAsterisk
                {...form.getInputProps('name')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                withAsterisk
                label="Category"
                data={requestCategories.filter(
                  ({ value }) =>
                    ![RequestCategory.TERMINATE_CONTRACT].includes(value),
                )}
                {...form.getInputProps('category')}
              />
            </Grid.Col>

            {form.values.category === RequestCategory.UNIT_LEASE && (
              <>
                <Grid.Col span={6}>
                  <Select
                    withAsterisk
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
                    withAsterisk
                    clearable
                    searchable
                    label="Unit"
                    placeholder="Select unit"
                    data={units}
                    {...form.getInputProps('unitId')}
                  />
                </Grid.Col>
              </>
            )}

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

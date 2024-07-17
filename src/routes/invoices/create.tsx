import { useCreate, useList, useSimpleList } from '@/api';
import {
  DATE_FORMAT,
  IUnitResDto,
  InvoiceCategory,
  UnitPriceCategory,
  invoiceCategories,
} from '@/libs';
import {
  CreateInvoiceSchema,
  createInvoiceInitialValues,
  createInvoiceSchema,
  showSuccessNotification,
} from '@/shared';
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Group,
  LoadingOverlay,
  NumberInput,
  Select,
  Stack,
  Textarea,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/invoices/create')({
  component: InvoiceCreate,
});

function InvoiceCreate() {
  const [propertyId, setPropertyId] = useState<Nullable<string>>(null);

  const mutate = useCreate({
    resource: 'invoices',

    onSuccess() {
      showSuccessNotification({ message: 'Add invoice successfully' });
      navigate({ to: '/invoices', search: true, params: true });
    },
  });
  const navigate = useNavigate();

  const { data: units } = useList<IUnitResDto>({
    resource: 'units/simple-list',
    params: { propertyId },
  });

  const { data: properties } = useSimpleList({
    resource: 'properties',
  });

  const form = useForm<NullableObject<CreateInvoiceSchema>>({
    initialValues: createInvoiceInitialValues,
    // validate: zodResolver(createInvoiceSchema),
  });

  const handleSubmit = form.onSubmit((values) => {
    const { unitPriceCategory, ...data } = values;
    console.log({
      ...data,
      items: [
        {
          price: 4_000,
          amount: data.amount,
          description: `Hóa đơn ${unitPriceCategory}`,
        },
      ],
    });

    mutate.mutate({
      ...data,
      items: [
        {
          price: 4_000,
          amount: data.amount,
          description: `Hóa đơn ${unitPriceCategory}`,
        },
      ],
    });
  });

  useEffect(() => {
    form.setValues({
      memberId: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.unitId]);

  return (
    <Stack px={120} py={'lg'} pos={'relative'}>
      <LoadingOverlay
        visible={mutate.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Breadcrumbs className="my-4 font-semibold text-primary cursor-pointer">
        <Link to="/">Home</Link>
        <Link to="/invoices">Invoices</Link>
        <p>Add invoice</p>
      </Breadcrumbs>
      <form onSubmit={handleSubmit}>
        <Grid columns={12}>
          <Grid.Col span={4}>
            <Select
              searchable
              label="Category"
              data={invoiceCategories}
              placeholder="Select invoice category"
              {...form.getInputProps(`category`)}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <DatePickerInput
              label="Due date"
              placeholder="Select due date"
              valueFormat={DATE_FORMAT}
              minDate={new Date()}
              {...form.getInputProps(`dueDate`)}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              clearable
              searchable
              label="Property"
              placeholder="Select property"
              data={properties ?? []}
              value={propertyId}
              onChange={(e) => setPropertyId(e)}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              clearable
              searchable
              label="Unit"
              placeholder="Select unit"
              data={
                units?.data?.map((unit) => ({
                  value: unit.id,
                  label: unit.name,
                })) ?? []
              }
              {...form.getInputProps('unitId')}
            />
          </Grid.Col>

          {form.getValues().category === InvoiceCategory.UNIT_PRICE_LOG && (
            <>
              <Grid.Col span={4}>
                <Select
                  searchable
                  label="Unit price category"
                  data={[
                    { value: UnitPriceCategory.WATER, label: 'Water' },
                    {
                      value: UnitPriceCategory.ELECTRICITY,
                      label: 'Electricity',
                    },
                  ]}
                  placeholder="Select unit price category"
                  {...form.getInputProps(`unitPriceCategory`)}
                />
              </Grid.Col>
            </>
          )}

          <Grid.Col span={4}>
            <NumberInput
              label="Amount"
              placeholder="Input amount"
              thousandSeparator=","
              step={1000}
              allowDecimal
              decimalScale={2}
              allowNegative={false}
              {...form.getInputProps(`amount`)}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              searchable
              label="Payer"
              placeholder="Select payer"
              disabled={!form.values.unitId}
              data={units?.data
                .find((item) => item.id === form.values.unitId)
                ?.tenants?.map((tenant) => ({
                  value: tenant.id,
                  label: tenant.name,
                }))}
              {...form.getInputProps(`memberId`)}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              label="Description"
              placeholder="Enter description"
              rows={4}
              {...form.getInputProps('description')}
            />
          </Grid.Col>
        </Grid>

        <Divider mt={'lg'} pb={'lg'} />

        <Group justify="end">
          <Button type="submit">Submit</Button>
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

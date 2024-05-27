import { useCreate, useList, useSimpleList } from '@/api';
import { contractFormAtom } from '@/app';
import { ICreateContractDto, IMemberResDto, MemberRole } from '@/libs';
import { showSuccessNotification } from '@/shared';
import {
  Breadcrumbs,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Select,
  SimpleGrid,
  Stack,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/contracts/create')({
  component: Page,
});

function Page() {
  const contractForm = useAtomValue(contractFormAtom);
  const navigate = useNavigate();

  const [propertyId, setPropertyId] = useState<Nullable<string>>(
    contractForm.propertyId ?? null,
  );

  const mutate = useCreate({
    resource: 'contracts',
    onSuccess: onCreateSuccess,
  });

  const form = useForm<NullableObject<ICreateContractDto>>({
    initialValues: contractForm,
  });

  const { data: properties } = useSimpleList({
    resource: 'properties',
  });

  const { data: units } = useSimpleList({
    resource: 'units',
    params: { propertyId },
  });

  const { data: tenants } = useList<IMemberResDto>({
    resource: `members/contacts`,
    params: { type: MemberRole.TENANT, pageSize: 10000 },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    mutate.mutate(values);
  });

  function onCreateSuccess(id: string) {
    showSuccessNotification({ message: 'Successfully add contract' });
    navigate({ to: '/contracts/$id', params: { id } });
  }

  useEffect(() => {
    form.setValues({
      unitId: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  useEffect(() => {
    contractForm.propertyId && setPropertyId(contractForm.propertyId);
    form.setValues(contractForm);
  }, [contractForm]);

  return (
    <Stack px={120} py={'md'} pos={'relative'}>
      <LoadingOverlay
        visible={mutate.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Breadcrumbs className="my-4 font-semibold text-primary cursor-pointer">
        <Link to="/">Home</Link>
        <Link to="/contracts">Contracts</Link>
        <p>Add contract</p>
      </Breadcrumbs>
      <form onSubmit={handleSubmit}>
        <SimpleGrid cols={1}>
          <Select
            clearable
            searchable
            label="Property"
            placeholder="Select property"
            data={properties ?? []}
            value={propertyId}
            onChange={(e) => setPropertyId(e)}
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
          <DatePickerInput
            label={'Start date'}
            placeholder="Enter start date"
            {...form.getInputProps('startDate')}
          />
          <DatePickerInput
            label={'End date'}
            placeholder="Enter end date"
            {...form.getInputProps('endDate')}
          />
        </SimpleGrid>

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

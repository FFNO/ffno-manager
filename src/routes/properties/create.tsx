import { useCreate, useSimpleList } from '@/api';
import { PropertyType } from '@/libs';
import {
  CreatePropertySchema,
  createPropertyFormInitialValues,
  createPropertySchema,
  createUnitInitialValues,
  showSuccessNotification,
} from '@/shared';
import {
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  Fieldset,
  Grid,
  Group,
  LoadingOverlay,
  NumberInput,
  SegmentedControl,
  Select,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { CopyIcon, XIcon } from 'lucide-react';
import { useEffect } from 'react';

export const Route = createFileRoute('/properties/create')({
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const mutate = useCreate({
    resource: 'properties',
    onSuccess: onCreateSuccess,
  });

  const form = useForm<CreatePropertySchema>({
    initialValues: createPropertyFormInitialValues,
    validate: zodResolver(createPropertySchema),
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

  const handleSubmit = form.onSubmit(async (values) => {
    mutate.mutate(values);
  });

  function onCreateSuccess(id: string) {
    showSuccessNotification({ message: 'Successfully add property' });
    navigate({ to: '/properties/$id', params: { id } });
  }

  useEffect(() => {
    form.setValues({
      district: null,
      ward: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.province]);

  useEffect(() => {
    form.setValues({
      ward: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.district]);

  return (
    <Stack px={120} py={'md'} pos={'relative'}>
      <LoadingOverlay
        visible={mutate.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Breadcrumbs className="my-4 font-semibold text-primary cursor-pointer">
        <Link to="/">Home</Link>
        <Link to="/properties">Properties</Link>
        <p>Add property</p>
      </Breadcrumbs>
      <form onSubmit={handleSubmit}>
        <Fieldset legend="Basic information">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Property name"
                placeholder="Enter property name"
                withAsterisk
                {...form.getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Address"
                placeholder="Enter address"
                withAsterisk
                {...form.getInputProps('address')}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                searchable
                clearable
                withAsterisk
                label="Province"
                placeholder="Select province"
                data={provinces ?? []}
                {...form.getInputProps('province')}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                withAsterisk
                searchable
                clearable
                disabled={!form.values.province}
                label="District"
                placeholder="Select district"
                data={districts ?? []}
                {...form.getInputProps('district')}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                withAsterisk
                clearable
                searchable
                disabled={!form.values.province || !form.values.district}
                label="Ward"
                placeholder="Select ward"
                data={wards ?? []}
                {...form.getInputProps('ward')}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>

        <Divider mt={'lg'} pb={'lg'} />

        <Fieldset legend="Property type">
          <SegmentedControl
            fullWidth
            withItemsBorders={false}
            color={theme.primaryColor}
            data={[
              {
                value: PropertyType.SINGLE_UNIT,
                label: (
                  <Stack p={'lg'} h={'100%'}>
                    <Title order={5}>{'Single Unit'.toUpperCase()}</Title>
                    <span className="font-normal text-sm text-wrap min-h-24">
                      A standalone residential dwelling, such as a detached
                      house or condominium unit, designed to accommodate one
                      household.
                    </span>
                  </Stack>
                ),
              },
              {
                value: PropertyType.MULTIPLE_UNIT,
                label: (
                  <Stack p={'lg'}>
                    <Title order={5}>{'Multiple unit'.toUpperCase()}</Title>
                    <span className="font-normal text-sm text-wrap min-h-24">
                      A residential or commercial property containing more than
                      one individual living or working space, such as apartment
                      buildings, condominium complexes, or office buildings with
                      multiple tenants.
                    </span>
                  </Stack>
                ),
              },
            ]}
            {...form.getInputProps('type')}
          />
        </Fieldset>

        <Divider mt={'lg'} pb={'lg'} />

        <Fieldset legend="Unit information">
          {form.values.units?.map((unit, index) => (
            <Fieldset key={index} legend={unit.name} mb={'md'}>
              <Grid columns={10}>
                <Grid.Col span={10}>
                  <Group justify="end">
                    <Button
                      variant="subtle"
                      leftSection={<CopyIcon size={16} />}
                      onClick={() =>
                        form.insertListItem('units', {
                          ...unit,
                          name: `${1 + (form.values.units?.length ?? 0)}`,
                        })
                      }
                    >
                      Clone
                    </Button>
                    <Button
                      variant="subtle"
                      leftSection={<XIcon size={16} />}
                      onClick={() => form.removeListItem('units', index)}
                    >
                      Clear
                    </Button>
                  </Group>
                </Grid.Col>
                <Grid.Col span={2}>
                  <TextInput
                    label="Unit name"
                    placeholder="Enter unit name"
                    withAsterisk
                    {...form.getInputProps(`units.${index}.name`)}
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <NumberInput
                    label="Area"
                    placeholder="Enter area"
                    withAsterisk
                    suffix=" m²"
                    {...form.getInputProps(`units.${index}.area`)}
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <NumberInput
                    label="Price"
                    placeholder="Enter price"
                    withAsterisk
                    min={0}
                    prefix="₫ "
                    thousandSeparator=","
                    step={1000}
                    {...form.getInputProps(`units.${index}.price`)}
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <NumberInput
                    label="Deposit"
                    placeholder="Enter deposit"
                    withAsterisk
                    min={0}
                    prefix="₫ "
                    thousandSeparator=","
                    step={1000}
                    {...form.getInputProps(`units.${index}.deposit`)}
                  />
                </Grid.Col>
              </Grid>
            </Fieldset>
          ))}
          <Button
            onClick={() =>
              form.insertListItem('units', {
                ...createUnitInitialValues,
                name: `${1 + (form.values.units?.length ?? 0)}`,
              })
            }
          >
            Add unit
          </Button>
        </Fieldset>

        <Divider mt={'lg'} pb={'lg'} />

        <Fieldset legend="Amenities">
          <Chip.Group multiple {...form.getInputProps('amenities')}>
            <Group justify="start">
              {amenities?.map((amenity) => (
                <Chip key={amenity} value={amenity}>
                  {amenity}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
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

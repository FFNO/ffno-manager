import { dataProvider, useSimpleList, useUpdate } from '@/api';
import { IPropertyResDto, PropertyType } from '@/libs';
import { createUnitSchema, showSuccessNotification } from '@/shared';
import {
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  Fieldset,
  Grid,
  Group,
  LoadingOverlay,
  SegmentedControl,
  Select,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import {
  Link,
  createFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/properties/$id/update')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IPropertyResDto>({ id, resource: 'properties' }),
});

const updateSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  amenities: z.array(z.string()),
  units: z.array(createUnitSchema),
});

function Page() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const data = Route.useLoaderData();
  const router = useRouter();

  const mutate = useUpdate({
    resource: `properties/${data.id}`,
    onSuccess: onUpdateSuccess,
  });

  const form = useForm({
    initialValues: data,
    validate: zodResolver(updateSchema),
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

  const handleCancel = () => {
    navigate({ to: '/properties/$id', params: { id: data.id } });
  };

  function onUpdateSuccess() {
    showSuccessNotification({ message: 'Successfully update property' });
    router.invalidate();
  }

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
        <Link to="/properties/$id" params={{ id: data.id }}>
          {data.name}
        </Link>
        <p>Update property</p>
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
                disabled
                label="Province"
                data={provinces ?? []}
                {...form.getInputProps('province')}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                disabled
                label="District"
                data={districts ?? []}
                {...form.getInputProps('district')}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                disabled
                label="Ward"
                data={wards ?? []}
                {...form.getInputProps('ward')}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>

        <Divider mt={'lg'} pb={'lg'} />

        <Fieldset legend="Property type">
          <SegmentedControl
            disabled
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
          <Button type="submit">Update</Button>
          <Button
            variant="outline"
            color="red"
            type="button"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
        </Group>
      </form>
    </Stack>
  );
}

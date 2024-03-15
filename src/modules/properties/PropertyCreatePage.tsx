import { useSimpleList } from "@/api";
import {
  CreatePropertySchema,
  createPropertyFormInitialValues,
  createPropertySchema,
  createUnitInitialValues,
} from "@/contracts";
import {
  Button,
  Chip,
  Code,
  Divider,
  Fieldset,
  Grid,
  Group,
  SegmentedControl,
  Select,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CopyIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

export const PropertyCreatePage = () => {
  const theme = useMantineTheme();
  const form = useForm<CreatePropertySchema>({
    initialValues: createPropertyFormInitialValues,
    validate: zodResolver(createPropertySchema),
  });

  const { data: amenities } = useSimpleList({ resource: "amenities" });
  const { data: provinces } = useSimpleList({ resource: "provinces" });
  const { data: districts } = useSimpleList({
    resource: "districts",
    params: { province: form.values.province },
  });
  const { data: wards } = useSimpleList({
    resource: "wards",
    params: { district: form.values.district },
  });

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
    <Stack p={"lg"}>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <Fieldset legend="Basic information">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Property name"
                placeholder="Enter property name"
                withAsterisk
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Address"
                placeholder="Enter address"
                withAsterisk
                {...form.getInputProps("address")}
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
                {...form.getInputProps("province")}
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
                {...form.getInputProps("district")}
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
                {...form.getInputProps("ward")}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>
        <Code>{JSON.stringify(form.values, null, 2)}</Code>

        <Divider mt={"lg"} pb={"lg"} />

        <Fieldset legend="Property type">
          <SegmentedControl
            fullWidth
            withItemsBorders={false}
            color={theme.primaryColor}
            data={[
              {
                value: "0",
                label: (
                  <Stack p={"lg"}>
                    <Title order={5}>{"Single unit type".toUpperCase()}</Title>
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: theme.fontSizes.sm,
                      }}
                    >
                      SSS
                      <span style={{ fontWeight: "bold" }}>
                        You cannot add more units
                      </span>
                    </span>
                  </Stack>
                ),
              },
              {
                value: "1",
                label: (
                  <Stack p={"lg"}>
                    <Title order={5}>
                      {"Multiple unit type".toUpperCase()}
                    </Title>
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: theme.fontSizes.sm,
                      }}
                    >
                      SSS
                    </span>
                  </Stack>
                ),
              },
            ]}
            {...form.getInputProps("type")}
          />
        </Fieldset>

        <Divider mt={"lg"} pb={"lg"} />

        <Fieldset legend="Units information">
          {form.values.units?.map((unit, index) => (
            <Fieldset key={index} legend={unit.name} mb={"md"}>
              <Grid>
                <Grid.Col span={12}>
                  <Group justify="end">
                    <Button
                      variant="subtle"
                      leftSection={<CopyIcon size={16} />}
                      onClick={() =>
                        form.insertListItem("units", {
                          ...unit,
                          name: `Unit ${1 + (form.values.units?.length ?? 0)}`,
                        })
                      }
                    >
                      Clone
                    </Button>
                    <Button
                      variant="subtle"
                      leftSection={<XIcon size={16} />}
                      onClick={() => form.removeListItem("units", index)}
                    >
                      Delete
                    </Button>
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    label="Name"
                    placeholder="Enter unit name"
                    withAsterisk
                    {...form.getInputProps(`units.${index}.name`)}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    label="Type"
                    placeholder="Enter unit type"
                    withAsterisk
                    {...form.getInputProps(`units.${index}.type`)}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    label="Area"
                    placeholder="Enter unit area"
                    withAsterisk
                    {...form.getInputProps(`units.${index}.area`)}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    label="Price"
                    placeholder="Enter unit price"
                    withAsterisk
                    {...form.getInputProps(`units.${index}.price`)}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    label="Deposit"
                    placeholder="Enter unit deposit"
                    withAsterisk
                    {...form.getInputProps(`units.${index}.deposit`)}
                  />
                </Grid.Col>
              </Grid>
            </Fieldset>
          ))}
          <Button
            onClick={() =>
              form.insertListItem("units", {
                ...createUnitInitialValues,
                name: `Unit ${1 + (form.values.units?.length ?? 0)}`,
              })
            }
          >
            Add unit
          </Button>
        </Fieldset>

        <Divider mt={"lg"} pb={"lg"} />

        <Fieldset legend="Property amenities">
          <Chip.Group multiple {...form.getInputProps("amenities")}>
            <Group justify="start">
              {amenities?.map((amenity) => (
                <Chip key={amenity} value={amenity}>
                  {amenity}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        </Fieldset>

        <Divider mt={"lg"} pb={"lg"} />

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
};

import { useCreate, useSimpleList } from "@/api";
import {
  CreatePropertySchema,
  createPropertyFormInitialValues,
  createPropertySchema,
  createUnitInitialValues,
  showSuccessNotification,
} from "@/libs";
import {
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
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { CopyIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/managers/properties/create")({
  component: PropertyCreatePage,
});

function PropertyCreatePage() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const mutate = useCreate({
    resource: "properties",
    onSuccess: onCreateSuccess,
  });

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

  const handleSubmit = form.onSubmit(async (values) => {
    mutate.mutate(values);
  });

  function onCreateSuccess() {
    showSuccessNotification({
      message: "Thêm tòa nhà thành công",
    });
    navigate({
      to: "/managers/properties/$propertyId",
      params: { propertyId: mutate.data! },
    });
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
    <Stack p={"lg"} pos={"relative"}>
      <LoadingOverlay
        visible={mutate.isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={handleSubmit}>
        <Fieldset legend="Thông tin cơ bản">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Tên tòa nhà"
                placeholder="Nhập tên tòa nhà"
                withAsterisk
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                withAsterisk
                {...form.getInputProps("address")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                searchable
                clearable
                withAsterisk
                label="Tỉnh"
                placeholder="Chọn tỉnh"
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
                label="Huyện"
                placeholder="Chọn huyện"
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
                label="Xã"
                placeholder="Chọn xã"
                data={wards ?? []}
                {...form.getInputProps("ward")}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>

        <Divider mt={"lg"} pb={"lg"} />

        <Fieldset legend="Kiểu tòa nhà">
          <SegmentedControl
            fullWidth
            withItemsBorders={false}
            color={theme.primaryColor}
            data={[
              {
                value: "0",
                label: (
                  <Stack p={"lg"}>
                    <Title order={5}>
                      {"Nhà cho thuê nguyên căn".toUpperCase()}
                    </Title>
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: theme.fontSizes.sm,
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Không thể thêm nhiều phòng
                      </span>
                    </span>
                  </Stack>
                ),
              },
              {
                value: "1",
                label: (
                  <Stack p={"lg"}>
                    <Title order={5}>{"Nhiều phòng".toUpperCase()}</Title>
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: theme.fontSizes.sm,
                      }}
                    ></span>
                  </Stack>
                ),
              },
            ]}
            {...form.getInputProps("type")}
          />
        </Fieldset>

        <Divider mt={"lg"} pb={"lg"} />

        <Fieldset legend="Thông tin các phòng">
          {form.values.units?.map((unit, index) => (
            <Fieldset key={index} legend={unit.name} mb={"md"}>
              <Grid columns={10}>
                <Grid.Col span={10}>
                  <Group justify="end">
                    <Button
                      variant="subtle"
                      leftSection={<CopyIcon size={16} />}
                      onClick={() =>
                        form.insertListItem("units", {
                          ...unit,
                          name: `Phòng ${1 + (form.values.units?.length ?? 0)}`,
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
                      Xóa
                    </Button>
                  </Group>
                </Grid.Col>
                <Grid.Col span={2}>
                  <TextInput
                    label="Tên phòng"
                    placeholder="Nhập tên phòng"
                    withAsterisk
                    {...form.getInputProps(`units.${index}.name`)}
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <NumberInput
                    label="Diện tích"
                    placeholder="Nhập diện tích"
                    withAsterisk
                    suffix=" m²"
                    {...form.getInputProps(`units.${index}.area`)}
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <NumberInput
                    label="Giá thuê"
                    placeholder="Nhập giá thuê"
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
                    label="Giá cọc"
                    placeholder="Nhập giá cọc"
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
              form.insertListItem("units", {
                ...createUnitInitialValues,
                name: `Phòng ${1 + (form.values.units?.length ?? 0)}`,
              })
            }
          >
            Thêm phòng
          </Button>
        </Fieldset>

        <Divider mt={"lg"} pb={"lg"} />

        <Fieldset legend="Tiện nghi">
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
          <Button type="submit">Tạo</Button>
          <Button
            variant="outline"
            color="red"
            type="button"
            onClick={() => form.reset()}
          >
            Hủy
          </Button>
        </Group>
      </form>
    </Stack>
  );
}

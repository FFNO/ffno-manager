import { useCreate, useList, useSimpleList } from "@/api";
import { ImageUpload } from "@/components/common";
import {
  CreateUnitSchema,
  PropertyResDto,
  createUnitInitialValues,
  createUnitSchema,
  showSuccessNotification,
  unitStatuses,
} from "@/libs";
import {
  Button,
  Divider,
  Fieldset,
  Grid,
  Group,
  LoadingOverlay,
  MultiSelect,
  NativeSelect,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/managers/properties/$propertyId/create-unit"
)({
  component: CreateUnitPage,
});

function CreateUnitPage() {
  const { propertyId } = Route.useParams();
  const mutate = useCreate({ resource: "units", onSuccess: onCreateSuccess });
  const navigate = useNavigate();
  const form = useForm<CreateUnitSchema>({
    initialValues: {
      ...createUnitInitialValues,
      propertyId,
    },
    validate: zodResolver(createUnitSchema),
  });

  const { data: unitFeatures } = useSimpleList({ resource: "unit-features" });
  const { data: propertyList } = useList<PropertyResDto>({
    resource: "properties/simple-list",
  });

  const handleSubmit = form.onSubmit(async (values) => {
    mutate.mutate(values);
  });

  function onCreateSuccess() {
    showSuccessNotification({
      id: "create-unit-successfully",
      message: "Thêm phòng thành công",
    });
    navigate({
      to: "/managers/units/$unitId",
      params: { unitId: mutate.data! },
    });
  }

  return (
    <Stack p={"lg"} pos={"relative"}>
      <LoadingOverlay
        visible={mutate.isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={handleSubmit}>
        <Fieldset legend="Thông tin phòng">
          <Grid>
            <Grid.Col span={4}>
              <TextInput
                label="Tên phòng"
                placeholder="Nhập tên phòng"
                withAsterisk
                {...form.getInputProps(`name`)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NativeSelect
                label="Trạng thái"
                withAsterisk
                data={unitStatuses}
                {...form.getInputProps(`status`)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Tòa nhà"
                placeholder="Chọn tòa nhà"
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
                label="Diện tích"
                placeholder="Nhập diện tích"
                withAsterisk
                suffix=" m²"
                {...form.getInputProps(`area`)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Giá thuê"
                placeholder="Nhập giá thuê"
                withAsterisk
                min={0}
                prefix="₫ "
                thousandSeparator=","
                step={1000}
                {...form.getInputProps(`price`)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Giá cọc"
                placeholder="Nhập giá cọc"
                withAsterisk
                min={0}
                prefix="₫ "
                thousandSeparator=","
                step={1000}
                {...form.getInputProps(`deposit`)}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>

        <Divider mt={"lg"} pb={"lg"} />

        <Fieldset legend="Tiện nghi">
          <MultiSelect
            placeholder="Chọn tiện nghi"
            data={
              unitFeatures?.map((item) => ({ value: item, label: item })) ?? []
            }
            {...form.getInputProps("unitFeatures")}
          />
        </Fieldset>

        <ImageUpload setUrls={(urls) => form.setFieldValue("imgUrls", urls)} />

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

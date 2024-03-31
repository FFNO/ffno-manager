import { useCreate, useList } from "@/api";
import {
  CreateRequestSchema,
  MemberResDto,
  NullableObject,
  PropertyResDto,
  RequestCategory,
  UnitResDto,
  createRequestInitialValues,
  createRequestSchema,
  requestCategories,
} from "@/libs";
import {
  Button,
  CheckIcon,
  Divider,
  Fieldset,
  Grid,
  Group,
  LoadingOverlay,
  Select,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Navigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const RequestCreatePage = () => {
  const mutate = useCreate("requests");
  const form = useForm<NullableObject<CreateRequestSchema>>({
    initialValues: createRequestInitialValues,
    validate: zodResolver(createRequestSchema),
  });

  const { data: contacts } = useList<MemberResDto>({
    resource: "members/contacts",
  });

  const { data: properties } = useList<PropertyResDto>({
    resource: "properties/simple-list",
  });

  const { data: units } = useList<UnitResDto>({
    resource: "units/simple-list",
    params: { propertyId: form.values.propertyId },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    mutate.mutate(values);
  });

  useEffect(() => {
    form.setValues({
      unitId: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.propertyId]);

  if (mutate.isSuccess) {
    notifications.show({
      id: "create-request-successfully",
      icon: <CheckIcon />,
      color: "green",
      title: "Success",
      message: "Thêm yêu cầu thành công",
    });
    return (
      <Navigate
        to="/properties/$propertyId"
        params={{ propertyId: mutate.data }}
      />
    );
  }

  return (
    <Stack p={"lg"} pos={"relative"}>
      <LoadingOverlay
        visible={mutate.isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={handleSubmit}>
        <Fieldset legend="Basic information">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Yêu cầu"
                placeholder="Nhập tiêu đề cho yêu cầu"
                withAsterisk
                {...form.getInputProps("name")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                withAsterisk
                clearable
                searchable
                label="Loại yêu cầu"
                placeholder="Chọn loại yêu cầu"
                data={requestCategories}
                {...form.getInputProps("category")}
              />
            </Grid.Col>

            {form.values.category === String(RequestCategory.UNIT_LEASE) && (
              <>
                <Grid.Col span={6}>
                  <Select
                    withAsterisk
                    clearable
                    searchable
                    label="Tòa nhà"
                    placeholder="Chọn tòa nhà"
                    data={properties?.data.map((property) => ({
                      value: property.id,
                      label: property.name,
                    }))}
                    {...form.getInputProps("propertyId")}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Select
                    disabled={!form.values.propertyId}
                    withAsterisk
                    clearable
                    searchable
                    label="Phòng"
                    placeholder="Chọn phòng"
                    data={units?.data.map((property) => ({
                      value: property.id,
                      label: property.name,
                    }))}
                    {...form.getInputProps("unitId")}
                  />
                </Grid.Col>
              </>
            )}

            {/* <Grid.Col span={4}>
              <Select
                withAsterisk
                clearable
                searchable
                label="Người nhận yêu cầu"
                placeholder="Chọn người nhận yêu cầu"
                data={
                  contacts?.data.map((contact) => ({
                    value: contact.id,
                    label: contact.name,
                  })) ?? []
                }
                {...form.getInputProps("receiverIds")}
              />
            </Grid.Col> */}
            {JSON.stringify(form.errors)}
            {JSON.stringify(form.values)}

            <Grid.Col span={12}>
              <Textarea
                label="Chi tiết"
                placeholder="Nhập chi tiết yêu cầu"
                withAsterisk
                rows={4}
                {...form.getInputProps("details")}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>

        <Divider mt={"lg"} pb={"lg"} />

        <Group justify="end">
          <Button type="submit">Gửi</Button>
          <Button
            variant="outline"
            color="red"
            type="button"
            onClick={() => form.reset()}
          >
            Đặt lại
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

import { useCreate, useList } from "@/api";
import {
  CreateInvoiceSchema,
  UnitResDto,
  createInvoiceInitialValues,
  createInvoiceSchema,
  invoiceCategories,
} from "@/libs";
import {
  Button,
  Divider,
  Grid,
  Group,
  LoadingOverlay,
  NumberInput,
  Select,
  Stack,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Navigate } from "@tanstack/react-router";
import { CheckIcon } from "lucide-react";
import { useEffect } from "react";

export const InvoiceCreate = () => {
  const mutate = useCreate("invoices");

  const { data } = useList<UnitResDto>({ resource: "units/simple-list" });

  const form = useForm<NullableObject<CreateInvoiceSchema>>({
    initialValues: createInvoiceInitialValues,
    validate: zodResolver(createInvoiceSchema),
  });

  const handleSubmit = form.onSubmit((values) => mutate.mutate(values));

  useEffect(() => {
    form.setValues({
      memberId: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.unitId]);

  if (mutate.isSuccess) {
    notifications.show({
      id: "create-invoice-successfully",
      icon: <CheckIcon />,
      color: "green",
      title: "Thành công",
      message: "Thêm hóa đơn thành công",
    });
    return (
      <Navigate to="/invoices" params={{ propertyId: mutate.data }} search />
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
        <Grid columns={12}>
          <Grid.Col span={4}>
            <Select
              searchable
              label="Loại hóa đơn"
              data={invoiceCategories}
              placeholder="Chọn loại hóa đơn"
              {...form.getInputProps(`category`)}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <DatePickerInput
              label="Ngày đáo hạn"
              placeholder="Chọn ngày đáo hạn"
              valueFormat="DD/MM/YYYY"
              minDate={new Date()}
              {...form.getInputProps(`dueDate`)}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              leftSection={"₫"}
              label="Số tiền"
              placeholder="Nhập số tiền"
              thousandSeparator=","
              step={1000}
              allowDecimal
              decimalScale={2}
              allowNegative={false}
              {...form.getInputProps(`amount`)}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Select
              searchable
              label="Phòng"
              placeholder="Chọn phòng"
              data={data?.data.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              {...form.getInputProps(`unitId`)}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Select
              searchable
              label="Người nộp tiền"
              placeholder="Chọn người nộp tiền"
              disabled={!form.values.unitId}
              data={data?.data
                .find((item) => item.id === form.values.unitId)
                ?.tenants.map((tenant) => ({
                  value: tenant.id,
                  label: tenant.name,
                }))}
              {...form.getInputProps(`memberId`)}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              label="Nội dung hóa đơn"
              placeholder="Nhập nội dung"
              rows={4}
              {...form.getInputProps("details")}
            />
          </Grid.Col>
        </Grid>

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
};

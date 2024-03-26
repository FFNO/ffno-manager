import { useList } from "@/api";
import { PropertyResDto } from "@/libs";
import { Route } from "@/routes/invoices/index";
import {
  Button,
  Drawer,
  Group,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";

export function InvoiceFilter() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { data: propertyList } = useList<PropertyResDto>({
    resource: "properties/simple-list",
  });
  const { data: unitList } = useList<PropertyResDto>({
    resource: "units/simple-list",
  });

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      unitId: search.unitId || null,
      propertyId: search.propertyId || null,
    },
  });

  return (
    <>
      <Button variant="outline" onClick={open}>
        Tìm kiếm
        <Text px={8}>|</Text>
        {5}
      </Button>

      <Drawer opened={opened} onClose={close} title="Tìm kiếm">
        <form
          onSubmit={form.onSubmit((values) => {
            navigate({
              search: (prev) => ({
                ...prev,
                ...values,
              }),
            });
          })}
        >
          <Title order={5} pb={8}>
            Filters
          </Title>
          <Stack>
            <Select
              size="sm"
              label="Phòng"
              placeholder="Chọn phòng"
              data={unitList?.data.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              leftSection={<SearchIcon size={16} />}
              {...form.getInputProps("unitId")}
            />
            <Select
              size="sm"
              label="Tòa nhà"
              placeholder="Chọn tòa nhà"
              data={propertyList?.data.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              leftSection={<SearchIcon size={16} />}
              {...form.getInputProps("propertyId")}
            />
          </Stack>
          <Group justify="end" grow gap={"xs"} mt={12}>
            <Button type="submit" size="sm" onClick={close}>
              Apply
            </Button>
            <Button
              type="button"
              size="sm"
              variant="light"
              color="red"
              onClick={() => {
                form.setValues({ propertyId: null, unitId: null });
                navigate({
                  search: {
                    ...search,
                    propertyId: undefined,
                    unitId: undefined,
                  },
                });
              }}
            >
              Reset
            </Button>
          </Group>
        </form>
      </Drawer>
    </>
  );
}

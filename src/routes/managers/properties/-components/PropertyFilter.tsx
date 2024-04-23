import { useSimpleList } from "@/api";
import { propertyTypes } from "@/libs";
import {
  Button,
  Drawer,
  Group,
  MultiSelect,
  NativeSelect,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Route } from "../index";

export const PropertyFilter = () => {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: "",
      type: search.type || null,
      province: null,
      district: null,
      ward: null,
      amenities: [],
    },
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
                name: values.name || undefined,
                page: 1,
              }),
            });
          })}
        >
          <Stack>
            <TextInput
              label="Tên tòa nhà"
              placeholder="Nhập tên tòa nhà"
              {...form.getInputProps("name")}
            />
            <NativeSelect
              size="sm"
              label="Kiểu nhà"
              data={propertyTypes}
              {...form.getInputProps("type")}
            />
            <Select
              searchable
              clearable
              label="Tỉnh"
              placeholder="Chọn tỉnh"
              data={provinces ?? []}
              {...form.getInputProps("province")}
            />
            <Select
              searchable
              clearable
              disabled={!form.values.province}
              label="Huyện"
              placeholder="Chọn huyện"
              data={districts ?? []}
              {...form.getInputProps("district")}
            />
            <Select
              clearable
              searchable
              disabled={!form.values.province || !form.values.district}
              label="Xã"
              placeholder="Chọn xã"
              data={wards ?? []}
              {...form.getInputProps("ward")}
            />
            <MultiSelect
              searchable
              label="Tiện ích"
              placeholder="Chọn tiện ích"
              data={amenities ?? []}
              {...form.getInputProps("amenities")}
            />
          </Stack>
          <Group justify="end" grow gap={"xs"} mt={12}>
            <Button type="submit" size="sm" onClick={close}>
              Tìm kiếm
            </Button>
            <Button
              type="button"
              size="sm"
              variant="light"
              color="red"
              onClick={() => {
                form.reset();
                navigate({
                  search: {
                    page: 1,
                    propertyId: undefined,
                    unitId: undefined,
                    categories: [],
                  },
                });
              }}
            >
              Xóa
            </Button>
          </Group>
        </form>
      </Drawer>
    </>
  );
};

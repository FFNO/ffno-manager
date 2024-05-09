import { useList } from '@/api';
import { PropertyResDto, invoiceCategories } from '@/shared';
import { Route } from '@/routes/managers/invoices/index';
import {
  Button,
  Drawer,
  Group,
  MultiSelect,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';

export function InvoiceFilter() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { data: propertyList } = useList<PropertyResDto>({
    resource: 'properties/simple-list',
  });
  const { data: unitList } = useList<PropertyResDto>({
    resource: 'units/simple-list',
  });

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      categories: [],
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
                page: 1,
              }),
            });
          })}
        >
          <Stack>
            <MultiSelect
              searchable
              size="sm"
              label="Loại hóa đơn"
              placeholder="Chọn loại hóa đơn"
              data={invoiceCategories}
              leftSection={<SearchIcon size={16} />}
              {...form.getInputProps('categories')}
            />
            <Select
              searchable
              size="sm"
              label="Phòng"
              placeholder="Chọn phòng"
              data={unitList?.data.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              leftSection={<SearchIcon size={16} />}
              {...form.getInputProps('unitId')}
            />
            <Select
              searchable
              size="sm"
              label="Tòa nhà"
              placeholder="Chọn tòa nhà"
              data={propertyList?.data.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              leftSection={<SearchIcon size={16} />}
              {...form.getInputProps('propertyId')}
            />
          </Stack>
          <Group justify="end" grow gap={'xs'} mt={12}>
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
}

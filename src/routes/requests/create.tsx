import { useCreate, useList, useSimpleList } from '@/api';
import {
  CreateRequestSchema,
  MemberResDto,
  RequestCategory,
  createRequestInitialValues,
  createRequestSchema,
  requestCategories,
  showSuccessNotification,
} from '@/shared';
import { requestFormAtom } from '@/states';
import {
  Button,
  Divider,
  Fieldset,
  Grid,
  Group,
  LoadingOverlay,
  NativeSelect,
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const Route = createFileRoute('/requests/create')({
  component: RequestCreatePage,
});

function RequestCreatePage() {
  const [formValue, setFormValue] = useAtom(requestFormAtom);
  const navigate = useNavigate();
  const mutate = useCreate({
    resource: 'requests',
    onSuccess: onCreateSuccess,
  });
  const form = useForm<NullableObject<CreateRequestSchema>>({
    initialValues: formValue,
    validate: zodResolver(createRequestSchema),
  });

  const { data: contacts } = useList<MemberResDto>({
    resource: 'members/contacts',
  });

  const { data: properties } = useSimpleList({
    resource: 'properties',
  });

  const { data: units } = useSimpleList({
    resource: 'units',
    params: { propertyId: form.values.propertyId },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    mutate.mutate(values);
  });

  useEffect(() => {
    if (formValue.propertyId) {
      form.setValues(formValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  useEffect(() => {
    if (formValue.unitId) {
      setFormValue(createRequestInitialValues);
      return;
    }

    form.setValues({
      unitId: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.propertyId]);

  function onCreateSuccess() {
    showSuccessNotification({ message: 'Thêm yêu cầu thành công' });
    navigate({
      to: '/requests',
      search: true,
    });
  }

  return (
    <Stack p={'lg'} pos={'relative'}>
      <LoadingOverlay
        visible={mutate.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <form onSubmit={handleSubmit}>
        <Fieldset legend="Basic information">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Yêu cầu"
                placeholder="Nhập tiêu đề cho yêu cầu"
                withAsterisk
                {...form.getInputProps('name')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <NativeSelect
                withAsterisk
                label="Loại yêu cầu"
                data={requestCategories}
                {...form.getInputProps('category')}
              />
            </Grid.Col>

            {form.values.category === RequestCategory.UNIT_LEASE && (
              <>
                <Grid.Col span={6}>
                  <Select
                    withAsterisk
                    clearable
                    searchable
                    label="Tòa nhà"
                    placeholder="Chọn tòa nhà"
                    data={properties}
                    {...form.getInputProps('propertyId')}
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
                    data={units}
                    {...form.getInputProps('unitId')}
                  />
                </Grid.Col>
              </>
            )}

            <Grid.Col span={12}>
              <Textarea
                label="Chi tiết"
                placeholder="Nhập chi tiết yêu cầu"
                withAsterisk
                rows={4}
                {...form.getInputProps('details')}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>

        <Divider mt={'lg'} pb={'lg'} />

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
}

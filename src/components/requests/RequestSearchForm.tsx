import { requestSearchAtom } from '@/app';
import {
  IGetListContractDto,
  requestCategories,
  requestStatuses,
} from '@/libs';
import { replaceNullsWithUndefined } from '@/libs/helpers';
import { Button, Group, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAtom } from 'jotai';

export const RequestSearchForm = () => {
  const [search, setSearch] = useAtom(requestSearchAtom);

  const form = useForm<NullableObject<IGetListContractDto>>({
    initialValues: search,
  });
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        setSearch((prev) =>
          replaceNullsWithUndefined({
            ...prev,
            ...values,
            page: undefined,
          }),
        );
      })}
    >
      <Stack>
        <Select
          clearable
          label="Request status"
          placeholder="Select status"
          data={requestStatuses}
          {...form.getInputProps('status')}
        />
        <Select
          clearable
          label="Request category"
          placeholder="Select category"
          data={requestCategories}
          {...form.getInputProps('category')}
        />
      </Stack>
      <Group justify="end" grow gap={'xs'} mt={12}>
        <Button type="submit" size="sm">
          Search
        </Button>
        <Button
          type="button"
          size="sm"
          variant="light"
          color="red"
          onClick={() => {
            form.reset();
            setSearch({});
          }}
        >
          Clear
        </Button>
      </Group>
    </form>
  );
};

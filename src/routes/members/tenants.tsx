import { useList } from '@/api';
import { ContactCard } from '@/components/contacts';
import { IMemberResDto, MemberRole } from '@/libs';
import {
  Button,
  Group,
  Input,
  Popover,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Search01Icon } from 'hugeicons-react';
import { z } from 'zod';

const searchSchema = z.object({
  type: z.string().default('tenant').optional(),
  keyword: z.string().optional(),
});

export const Route = createFileRoute('/members/tenants')({
  component: Page,
  validateSearch: searchSchema.parse,
});

function Page() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { data } = useList<IMemberResDto>({
    resource: `members/contacts?type=${MemberRole.TENANT}`,
    params: { ...search },
  });

  const form = useForm({
    initialValues: {
      keyword: search.keyword,
    },
  });

  return (
    <Stack p={'lg'}>
      <Group justify="end">
        <Popover shadow="md">
          <Popover.Target>
            <Button variant="outline">Search</Button>
          </Popover.Target>

          <Popover.Dropdown>
            <form
              onSubmit={form.onSubmit((values) => {
                navigate({
                  search: {
                    ...search,
                    ...values,
                  },
                });
              })}
            >
              <Title order={5} pb={8}>
                Search
              </Title>
              <Stack>
                <Input
                  size="sm"
                  leftSection={<Search01Icon size={16} />}
                  placeholder="Enter keyword"
                  {...form.getInputProps('keyword')}
                />
              </Stack>
              <Group justify="end" grow gap={'xs'} mt={12}>
                <Button type="submit" size="sm">
                  Apply
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="light"
                  color="red"
                  onClick={() => {
                    form.setValues({ keyword: '' });
                    navigate({
                      search: {
                        ...search,
                        keyword: undefined,
                      },
                    });
                  }}
                >
                  Reset
                </Button>
              </Group>
            </form>
          </Popover.Dropdown>
        </Popover>
      </Group>
      <SimpleGrid cols={4}>
        {data?.data.map((contact) => (
          <ContactCard key={contact.id} {...contact} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

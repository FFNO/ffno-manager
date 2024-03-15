import { useList } from "@/api";
import { GetMemberResDto } from "@/contracts";
import { ContactCard } from "@/modules/contacts";
import { Route } from "@/routes/contacts/index";
import {
  Button,
  Group,
  Input,
  Popover,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";

export function ContactsPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { data } = useList<GetMemberResDto>({
    resource: `members/contacts`,
    params: { ...search },
  });

  const form = useForm({
    initialValues: {
      keyword: search.keyword,
    },
  });

  const addButtonText = () => (search.type ? "Add professional" : "Add tenant");

  return (
    <Stack p={"lg"}>
      <Group justify="end">
        <Popover shadow="md">
          <Popover.Target>
            <Button>
              Filter
              <Text px={8}>|</Text>
              {5}
            </Button>
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
                Filters
              </Title>
              <Stack>
                <Input
                  size="sm"
                  leftSection={<SearchIcon size={16} />}
                  placeholder="Enter keyword"
                  {...form.getInputProps("keyword")}
                />
                {/* <Select /> */}
              </Stack>
              <Group justify="end" grow gap={"xs"} mt={12}>
                <Button type="submit" size="sm">
                  Apply
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="light"
                  color="red"
                  onClick={() => {
                    form.setValues({ keyword: "" });
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
        <Button>{addButtonText()}</Button>
      </Group>
      <SimpleGrid cols={4}>
        {data?.data.map((contact) => (
          <ContactCard key={contact.id} {...contact} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

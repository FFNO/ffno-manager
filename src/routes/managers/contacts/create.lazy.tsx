import { useCreate } from "@/api";
import { LinkTenantSchema, linkTenantSchema } from "@/libs";
import {
  Button,
  Divider,
  Fieldset,
  Grid,
  Group,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/managers/contacts/create")({
  component: ContactCreatePage,
});

function ContactCreatePage() {
  const mutate = useCreate({ resource: "members/create-tenant" });

  const form = useForm<LinkTenantSchema>({
    initialValues: { keyword: "", email: "", phone: "" },
    validate: zodResolver(linkTenantSchema),
  });

  const handleSubmit = form.onSubmit(async (values) => {
    mutate.mutate({ keyword: values.email || values.phone || values.keyword });
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Fieldset legend="Link tenant">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Tenant's email"
                placeholder="Enter tenant's email"
                withAsterisk
                {...form.getInputProps("email")}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>

        <Divider mt={"lg"} pb={"lg"} />

        <Group justify="end">
          <Button type="submit">Submit</Button>
          <Button
            variant="outline"
            color="red"
            type="button"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
        </Group>
      </form>
    </div>
  );
}

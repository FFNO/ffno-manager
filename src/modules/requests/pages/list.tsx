import { useList } from "@/api";
import { calculatePage } from "@/libs";
import { Route } from "@/routes/requests/index";
import {
  Button,
  Code,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
import { PlusIcon, UploadIcon } from "lucide-react";

export const RequestListPage = () => {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const { data } = useList({
    resource: "requests",
    params: search,
  });
  return (
    <div>
      <Stack p={"lg"}>
        <Group justify="end">
          <Button variant="outline" leftSection={<UploadIcon size={16} />}>
            Tải lên
          </Button>
          {/* <InvoiceFilter /> */}
          <Link to="/requests/create">
            <Button leftSection={<PlusIcon size={16} />}>Thêm yêu cầu</Button>
          </Link>
        </Group>
        <SimpleGrid cols={2} px={32} py={24}>
          {data?.data.map((invoice) => (
            <RequestCard key={invoice.id} {...invoice} />
          ))}
        </SimpleGrid>
        <Pagination
          withEdges
          total={calculatePage(data?.total)}
          value={search.page}
          onChange={(page) =>
            navigate({ search: (prev) => ({ ...prev, page }) })
          }
        />
      </Stack>
    </div>
  );
};

function RequestCard(props: any) {
  return <Code block>{JSON.stringify(props)}</Code>;
}

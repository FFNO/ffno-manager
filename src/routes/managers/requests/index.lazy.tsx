import { useList } from "@/api";
import { RequestCard } from "@/components/requests";
import { RequestResDto, calculatePage } from "@/libs";
import { Button, Group, Pagination, SimpleGrid, Stack } from "@mantine/core";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { PlusIcon, UploadIcon } from "lucide-react";

export const Route = createLazyFileRoute("/managers/requests/")({
  component: () => <RequestListPage />,
});

function RequestListPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { data } = useList<RequestResDto>({
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
          <Link to="/managers/requests/create">
            <Button leftSection={<PlusIcon size={16} />}>Thêm yêu cầu</Button>
          </Link>
        </Group>
        <SimpleGrid cols={1} px={32} py={24}>
          {data?.data.map((request) => (
            <RequestCard key={request.id} {...request} />
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
}

import { useList } from "@/api";
import { PropertyResDto, calculatePage } from "@/libs";
import { Button, Group, Pagination, Stack } from "@mantine/core";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { PlusIcon, UploadIcon } from "lucide-react";
import { PropertyListView, UnitListView } from "../../../components/properties";
import { PropertyFilter } from "./-components";

export const Route = createLazyFileRoute("/managers/properties/")({
  component: PropertyListPage,
});

function PropertyListPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { data } = useList<PropertyResDto>({
    resource: "properties",
    params: search,
  });

  return (
    <Stack p={"lg"}>
      <Group justify="end">
        <Button variant="outline" leftSection={<UploadIcon size={16} />}>
          Tải lên
        </Button>
        <PropertyFilter />
        <Link to="/managers/properties/create">
          <Button leftSection={<PlusIcon size={16} />}>Thêm tòa nhà</Button>
        </Link>
      </Group>
      {search.view === "properties" ? (
        <PropertyListView items={data?.data || []} />
      ) : (
        <UnitListView properties={data?.data || []} />
      )}
      <Pagination
        withEdges
        total={calculatePage(data?.total)}
        value={search.page}
        onChange={(page) => navigate({ search: (prev) => ({ ...prev, page }) })}
      />
    </Stack>
  );
}

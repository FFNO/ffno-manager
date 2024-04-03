import { useList } from "@/api";
import { PropertyResDto, calculatePage } from "@/libs";
import { Route } from "@/routes/properties/index";
import { Button, Group, Pagination, Stack } from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
import { PlusIcon, UploadIcon } from "lucide-react";
import { PropertyFilter, PropertyListView, UnitListView } from "../components";

export function PropertyListPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

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
        <Link to="/properties/create">
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

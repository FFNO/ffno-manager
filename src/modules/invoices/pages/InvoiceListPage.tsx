import { useList } from "@/api";
import { InvoiceResDto, calculatePage } from "@/libs";
import { Route } from "@/routes/managers/invoices/index";
import { Button, Group, Pagination, SimpleGrid, Stack } from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
import { PlusIcon, UploadIcon } from "lucide-react";
import { InvoiceCard } from "../components";
import { InvoiceFilter } from "../components/InvoiceFilter";

export const InvoiceListPage = () => {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const { data } = useList<InvoiceResDto>({
    resource: "invoices",
    params: search,
  });

  return (
    <Stack p={"lg"}>
      <Group justify="end">
        <Button variant="outline" leftSection={<UploadIcon size={16} />}>
          Import
        </Button>
        <InvoiceFilter />
        <Link to="/invoices/create">
          <Button leftSection={<PlusIcon size={16} />}>Thêm hóa đơn</Button>
        </Link>
      </Group>
      <SimpleGrid cols={2} px={32} py={24}>
        {data?.data.map((invoice) => (
          <InvoiceCard key={invoice.id} {...invoice} />
        ))}
      </SimpleGrid>
      <Pagination
        withEdges
        total={calculatePage(data?.total)}
        value={search.page}
        onChange={(page) => navigate({ search: (prev) => ({ ...prev, page }) })}
      />
    </Stack>
  );
};

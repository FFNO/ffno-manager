import { dataProvider } from "@/api";
import { RequestResDto } from "@/libs";
import { RequestListPage } from "@/modules/requests/RequestListPage";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  type: z.string().default("received"),
  page: z.coerce.number().default(1),
});

export const Route = createFileRoute("/requests/")({
  component: RequestListPage,
  validateSearch: searchSchema.parse,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) =>
    dataProvider.getList<RequestResDto>({
      resource: "requests",
      params: deps,
    }),
});

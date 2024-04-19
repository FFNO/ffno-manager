import { dataProvider } from "@/api";
import { RequestResDto } from "@/libs";
import { RequestPage } from "@/modules/requests/RequestDetailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/requests/$requestId")({
  component: () => <RequestPage />,
  loader: ({ params: { requestId } }) =>
    dataProvider.getOne<RequestResDto>({ resource: "requests", id: requestId }),
});

import { dataProvider } from "@/api";
import { RequestResDto } from "@/libs";
import { Code } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/requests/$requestId")({
  component: () => <RequestPage />,
  loader: ({ params: { requestId } }) =>
    dataProvider.getOne<RequestResDto>({ resource: "requests", id: requestId }),
});

function RequestPage() {
  const data = Route.useLoaderData();

  return (
    <div>
      <Code block>{JSON.stringify(data, null, 2)}</Code>
    </div>
  );
}

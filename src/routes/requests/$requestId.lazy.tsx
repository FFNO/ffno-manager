import { useOne } from "@/api";
import { Code } from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/requests/$requestId")({
  component: () => <RequestPage />,
});

function RequestPage() {
  const { requestId } = Route.useParams();

  const { data } = useOne({
    resource: "requests",
    id: requestId,
  });

  return (
    <div>
      <Code block>{JSON.stringify(data, null, 2)}</Code>
    </div>
  );
}

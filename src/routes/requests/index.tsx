import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/requests/")({
  validateSearch: (search: Record<string, string>) => {
    return {};
  },
});

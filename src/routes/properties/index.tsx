import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/properties/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      type: Number(search?.type ?? 0),
    };
  },
});

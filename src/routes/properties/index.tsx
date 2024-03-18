import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/properties/")({
  validateSearch: (search: Record<string, string>) => {
    return {
      view: search.view ?? "properties",
    };
  },
});

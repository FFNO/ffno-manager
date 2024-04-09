import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/managers/requests/")({
  validateSearch: (search: Record<string, string>) => {
    return {
      ...search,
      page: +(search?.page ?? 1),
    };
  },
});

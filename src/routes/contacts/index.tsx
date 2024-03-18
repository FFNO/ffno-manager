import { createFileRoute } from "@tanstack/react-router";

interface QueryDto {
  type: string;
  keyword?: string;
}

export const Route = createFileRoute("/contacts/")({
  validateSearch: (search: Record<string, string>): QueryDto => ({
    type: search.type || String(0),
    keyword: search.keyword,
  }),
});

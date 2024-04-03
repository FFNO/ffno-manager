import { PropertyType } from "@/libs";
import { createFileRoute } from "@tanstack/react-router";

interface SearchParams {
  page?: number;
  view?: string;
  name?: string;
  type?: PropertyType;
  amenities?: string[];
}

export const Route = createFileRoute("/properties/")({
  validateSearch: (search?: SearchParams) => {
    return {
      ...search,
      view: search?.view ?? "properties",
      page: +(search?.page ?? 1),
    };
  },
});

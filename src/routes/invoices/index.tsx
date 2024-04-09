import { createFileRoute } from "@tanstack/react-router";

interface SearchParams {
  page?: number;
  propertyId?: string;
  unitId?: string;
  categories?: number[];
}

export const Route = createFileRoute("/invoices/")({
  validateSearch: (search?: SearchParams) => {
    return {
      ...search,
      page: +(search?.page ?? 1),
    };
  },
});

import { dataProvider } from "@/api";
import { MePage } from "@/modules/members/MePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/members/me")({
  component: MePage,
  loader: () => dataProvider.getOne({ resource: "members", id: "me" }),
});

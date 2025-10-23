import PageLayout from "@/components/layout/PageLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/revenue-dashboard/settings/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout>Hello /_authenticated/revenue-dashboard/settings/!</PageLayout>
  );
}

import PageLayout from "@/components/layout/PageLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/revenue-dashboard/invoice-and-tax/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout>
      Hello /_authenticated/revenue-dashboard/invoice-and-tax/!
    </PageLayout>
  );
}

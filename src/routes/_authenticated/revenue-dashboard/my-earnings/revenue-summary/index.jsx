import PageLayout from "@/components/layout/PageLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/revenue-dashboard/my-earnings/revenue-summary/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout>
      Hello /_authenticated/revenue-dashboard/my-earnings/revenue-summary/!
    </PageLayout>
  );
}

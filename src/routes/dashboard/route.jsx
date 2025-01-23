import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";
export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageLayout>Hello "/dashboard"!</PageLayout>;
}

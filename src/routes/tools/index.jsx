import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";

export const Route = createFileRoute("/tools/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageLayout>Hello "/tools"!</PageLayout>;
}

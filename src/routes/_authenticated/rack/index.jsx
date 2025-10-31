import PageLayout from "@/components/layout/PageLayout";
import RackList from "@/components/pages/rack/RackList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/rack/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout items={[{ title: "Home", href: "/home" }, { title: "Rack" }]}>
      <RackList />
    </PageLayout>
  );
}

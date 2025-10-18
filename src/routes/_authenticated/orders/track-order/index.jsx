import PageLayout from "@/components/layout/PageLayout";
import TrackOrder from "@/components/pages/orders/track-order/TrackOrder";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/orders/track-order/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "Track Order" },
      ]}
    >
      <ResponsiveCard title="Track Order">
        <TrackOrder />
      </ResponsiveCard>
    </PageLayout>
  );
}

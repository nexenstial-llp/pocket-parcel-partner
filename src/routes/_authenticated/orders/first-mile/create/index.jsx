import PageLayout from "@/components/layout/PageLayout";
import CreateQuickOrder from "@/components/pages/orders/quick/CreateQuickOrder";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/orders/first-mile/create/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "First Mile", href: "/orders/first-mile" },
        { title: "Create" },
      ]}
    >
      <ResponsiveCard
        extra={
          <Link to={"/orders/first-mile/calculate-price"}>Calculate Price</Link>
        }
        size="small"
        title="Create First Mile Order"
      >
        <CreateQuickOrder />
      </ResponsiveCard>
    </PageLayout>
  );
}

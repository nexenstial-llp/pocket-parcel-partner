import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import NewOrderForm from "@/features/orders/components/NewOrderForm";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/orders/create-order")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "Create Order" },
      ]}
    >
      <ResponsiveCard
        extra={<Link to={"/orders/create-order"}>Create Order</Link>}
        size="small"
        title="Create  Order"
      >
        <NewOrderForm />
      </ResponsiveCard>
    </PageLayout>
  );
}

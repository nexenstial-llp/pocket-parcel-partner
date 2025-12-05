import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute, Link } from "@tanstack/react-router";
// import ShipmentStepperForm from "@/components/pages/orders/ShipmentStepperForm";
import ComprehensiveOrderForm from "@/features/orders/components/ComprehensiveOrderForm";

export const Route = createFileRoute("/_authenticated/orders/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "Create" },
      ]}
    >
      <ResponsiveCard
        size="small"
        title="Create Order"
        extra={
          <Link to={"/orders/first-mile/create"}>Create First Mile Order</Link>
        }
      >
        {/* <ShipmentStepperForm /> */}
        <ComprehensiveOrderForm />
      </ResponsiveCard>
    </PageLayout>
  );
}

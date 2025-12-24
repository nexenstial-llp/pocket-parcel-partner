import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute } from "@tanstack/react-router";
import NewOrderForm from "@/features/orders/components/NewOrderForm";

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
      <div className="bg-white rounded-xl border-0 shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create Order</h2>
        </div>
        <NewOrderForm />
      </div>
    </PageLayout>
  );
}

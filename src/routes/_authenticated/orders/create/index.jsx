import PageLayout from "@/components/layout/PageLayout";
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
      <NewOrderForm />
    </PageLayout>
  );
}

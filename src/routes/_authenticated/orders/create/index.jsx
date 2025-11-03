import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute } from "@tanstack/react-router";
import ShipmentStepperForm from "@/components/pages/orders/ShipmentStepperForm";

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
      <ResponsiveCard size="small" title="Create Order">
        {/* <Form layout="vertical">
          <Form.Item name={"orderType"} label={"Order Type"}>
            <Radio.Group>
              <Radio value={"forward"}>Forward (IN)</Radio>
              <Radio value={"reverse"}>Reverse (IN)</Radio>
              <Radio value={"b2b"}>B2B (IN)</Radio>
              <Radio value={"forwardGlobal"}>Forward (MENA, SEA, EU, US)</Radio>
              <Radio value={"reverseGlobal"}>Reverse (MENA, SEA, EU, US)</Radio>
              <Radio value={"b2bGlobal"}>B2B (MENA, SEA, EU, US)</Radio>
            </Radio.Group>
          </Form.Item>
        </Form> */}
        <ShipmentStepperForm />
      </ResponsiveCard>
    </PageLayout>
  );
}

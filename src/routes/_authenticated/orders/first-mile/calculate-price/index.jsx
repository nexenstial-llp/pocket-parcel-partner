import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Form, InputNumber, Button, Input } from "antd";
import { usePriceCalculate } from "@/features/orders/orders.query";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Descriptions } from "antd";
export const Route = createFileRoute(
  "/_authenticated/orders/first-mile/calculate-price/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [result, setResult] = useState(null);
  const { mutate, isPending } = usePriceCalculate({
    onSuccess: (res) => {
      setResult(res?.data?.data);
    },
    onError: () => {
      setResult(null);
    },
  });

  const onFinish = (values) => {
    const payload = {
      ...values,
      date_time: dayjs(values.date_time).format("YYYY-MM-DD HH:mm"),
    };
    mutate(payload);
  };
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "First Mile", href: "/orders/first-mile" },
        { title: "Calculate Price" },
      ]}
    >
      <ResponsiveCard title="Calculate Price">
        <div className="flex gap-4 flex-col">
          <Form layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4">
              <Form.Item
                label="From Latitude"
                name="from_latitude"
                rules={[{ required: true }]}
              >
                <InputNumber className="w-full!" placeholder="12.8538995" />
              </Form.Item>

              <Form.Item
                label="From Longitude"
                name="from_longitude"
                rules={[{ required: true }]}
              >
                <InputNumber className="w-full!" placeholder="77.6635309" />
              </Form.Item>

              <Form.Item
                label="To Latitude"
                name="to_latitude"
                rules={[{ required: true }]}
              >
                <InputNumber className="w-full!" placeholder="12.9564795" />
              </Form.Item>

              <Form.Item
                label="To Longitude"
                name="to_longitude"
                rules={[{ required: true }]}
              >
                <InputNumber className="w-full!" placeholder="77.5910694" />
              </Form.Item>

              <Form.Item
                label="Weight (kg)"
                name="weight"
                rules={[{ required: true }]}
              >
                <InputNumber className="w-full!" placeholder="5" />
              </Form.Item>

              <Form.Item label="Promo Code" name="promo_code">
                <Input placeholder="df324" />
              </Form.Item>

              <Form.Item
                label="Date Time"
                name="date_time"
                rules={[{ required: true }]}
              >
                <DatePicker format="YYYY-MM-DD HH:mm" showTime />
              </Form.Item>
            </div>

            <div className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                loading={isPending}
                className="mt-4"
              >
                Calculate Price
              </Button>
            </div>
          </Form>

          {result && (
            <ResponsiveCard
              size="small"
              title="Estimated Price"
              className="shadow-md mt-6"
            >
              <Descriptions column={1} bordered size="small" colon={false}>
                <Descriptions.Item label="Delivery Amount">
                  ₹ {result.delivery_amount}
                </Descriptions.Item>
                <Descriptions.Item label="Distance (km)">
                  {result.distance}
                </Descriptions.Item>
                <Descriptions.Item label="Estimated Time (sec)">
                  {Math.round((result.estimated_time || 0) / 60)}(min)
                </Descriptions.Item>
                <Descriptions.Item label="Assignment SLA">
                  {result.assignment_sla}
                </Descriptions.Item>
                <Descriptions.Item label="Pickup SLA">
                  {result.pickup_sla}
                </Descriptions.Item>
                <Descriptions.Item label="Additional Amount">
                  ₹ {result.additional_delivery_amount}
                </Descriptions.Item>
              </Descriptions>
            </ResponsiveCard>
          )}
        </div>
      </ResponsiveCard>
    </PageLayout>
  );
}

import PageLayout from "@/components/layout/PageLayout";
import BackButton from "@/components/ui/BackButton";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ResponsiveButton from "@/components/ui/ResponsiveButton";
import RackFormItems from "@/features/rack/components/RackFormItems";
import { useCreateRack } from "@/features/rack/racks.query";
import { createRackSchema } from "@/features/rack/racks.schems";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { InboxOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { message } from "antd";
import { Form } from "antd";

export const Route = createFileRoute("/_authenticated/rack/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateRack({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["racks"] });
      message.success("Rack created successfully");
      navigate({ to: "/rack" });
    },
  });

  const handleFinish = (values) => {
    const formattedPayload = {
      ...values,
      capacity: values?.capacity !== undefined ? Number(values.capacity) : null,
      max_weight:
        values?.max_weight !== undefined ? Number(values.max_weight) : null,
      metadata: values?.metadata?.length
        ? values.metadata.reduce((acc, curr) => {
            if (curr.key) acc[curr.key] = curr.value;
            return acc;
          }, {})
        : null,
    };
    handleFormSubmission({
      form,
      values: formattedPayload,
      schema: createRackSchema,
      onSubmit: mutate,
    });
  };
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Rack", href: "/rack" },
        { title: "Create Rack" },
      ]}
    >
      <ResponsiveCard title="Create Rack">
        <Form
          size="small"
          disabled={isPending}
          layout="vertical"
          form={form}
          onFinish={handleFinish}
        >
          <RackFormItems />
          <div className="flex justify-end gap-2 sm:gap-4 sticky bottom-0 left-0 -mx-6 -mb-8 right-0 bg-white p-4 border-t border-gray-200 z-50 shadow-sm px-2  sm:px-8 rounded-b-sm">
            <Form.Item className="mb-0!">
              <BackButton navigateTo="/rack">Cancel</BackButton>
            </Form.Item>
            <Form.Item className="mb-0!">
              <ResponsiveButton
                loading={isPending}
                type="primary"
                htmlType="submit"
                icon={<InboxOutlined />}
              >
                Create Rack
              </ResponsiveButton>
            </Form.Item>
          </div>
        </Form>
      </ResponsiveCard>
    </PageLayout>
  );
}

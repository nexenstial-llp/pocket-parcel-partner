import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Form, Space, message } from "antd";
import PageLayout from "@/components/layout/PageLayout";
import ResponsiveButton from "@/components/ui/ResponsiveButton";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import BackButton from "@/components/ui/BackButton";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import AddressFormItems from "@/features/address-management/components/AddressFormItems";
import { useCreateAddress } from "@/features/address-management/address-management.query";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { AddressSchema } from "@/features/address-management/address-management.schema";

export const Route = createFileRoute(
  "/_authenticated/address-management/create/"
)({
  component: RouteComponent,
});

const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;
function RouteComponent() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: createAddress, isPending } = useCreateAddress({
    onSuccess: () => {
      message.success("Address created successfully");
      navigate({ to: "/address-management" });
    },
  });

  const handleFinish = (values) => {
    handleFormSubmission({
      values,
      schema: AddressSchema,
      onSubmit: createAddress,
      form,
    });
  };

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Addresses", href: "/address-management" },
        { title: "Create" },
      ]}
    >
      <ResponsiveCard title="Create Address">
        <APIProvider apiKey={API_KEY} libraries={["places", "geocoding"]}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            disabled={isPending}
          >
            <AddressFormItems />

            <div className="sticky bottom-0 rounded-b-lg z-10 -mx-6 -mb-6 p-4 bg-white border-t border-gray-200 flex justify-end shadow-lg mt-4">
              <Space>
                <BackButton
                  type="default"
                  icon={<ArrowLeftOutlined />}
                  navigateTo="/address-management"
                >
                  Cancel
                </BackButton>
                <ResponsiveButton
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={isPending}
                >
                  Create
                </ResponsiveButton>
              </Space>
            </div>
          </Form>
        </APIProvider>
      </ResponsiveCard>
    </PageLayout>
  );
}

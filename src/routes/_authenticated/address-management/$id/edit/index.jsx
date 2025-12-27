import PageLayout from "@/components/layout/PageLayout";
import BackButton from "@/components/ui/BackButton";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import ResponsiveButton from "@/components/ui/ResponsiveButton";
import {
  useGetAddressesById,
  useUpdateAddress,
} from "@/features/address-management/address-management.query";
import { updateAddressSchema } from "@/features/address-management/address-management.schema";
import AddressFormItems from "@/features/address-management/components/AddressFormItems";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { message } from "antd";
import { Space } from "antd";
import { Form } from "antd";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_authenticated/address-management/$id/edit/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useGetAddressesById(id);

  const { mutate: updateAddress, isPending } = useUpdateAddress({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["addresses"] });
      message.success("Address updated successfully");
      navigate({ to: "/addresses" });
    },
  });

  const handleFinish = (values) => {
    const payload = {
      ...values,
      longitude: Number(values.longitude),
      latitude: Number(values.latitude),
    };

    handleFormSubmission({
      values: payload,
      schema: updateAddressSchema,
      onSubmit: (data) => updateAddress({ id, data }),
      form,
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  if (isError) {
    return <ErrorFallback error={error} onRetry={refetch} />;
  }

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Addresses", href: "/address-management" },
        { title: "Edit" },
      ]}
    >
      <ResponsiveCard title="Edit Address" loading={isLoading}>
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
                Update
              </ResponsiveButton>
            </Space>
          </div>
        </Form>
      </ResponsiveCard>
    </PageLayout>
  );
}

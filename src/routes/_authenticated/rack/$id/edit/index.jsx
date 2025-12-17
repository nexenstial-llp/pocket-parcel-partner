import PageLayout from "@/components/layout/PageLayout";
import BackButton from "@/components/ui/BackButton";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import ResponsiveButton from "@/components/ui/ResponsiveButton";
import RackFormItems from "@/features/rack/components/RackFormItems";
import { useFetchRackById, useUpdateRack } from "@/features/rack/racks.query";
import { updateRackSchema } from "@/features/rack/racks.schems";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { InboxOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { message } from "antd";
import { Form } from "antd";
import { useEffect } from "react";
export const Route = createFileRoute("/_authenticated/rack/$id/edit/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { data, isLoading, isError, error } = useFetchRackById(id);

  useEffect(() => {
    if (data?.data) {
      const record = data.data;

      // Normalize metadata to support Form.List
      let metadataArray = [];
      if (record.metadata && typeof record.metadata === "object") {
        metadataArray = Object.entries(record.metadata).map(([key, value]) => ({
          key,
          value,
        }));
      }

      form.setFieldsValue({
        ...record,
        metadata: metadataArray,
      });
    }
  }, [data?.data, form]);

  const { mutate, isPending } = useUpdateRack({
    onSuccess: async () => {
      message.success("Rack updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["racks"] });
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
      schema: updateRackSchema,
      onSubmit: (parsedData) => mutate({ id, data: parsedData }),
    });
  };

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Rack", href: "/rack" },
        { title: "Edit" },
      ]}
    >
      <ResponsiveCard loading={isLoading} title="Edit Rack">
        <Form
          size="small"
          disabled={isPending}
          layout="vertical"
          form={form}
          onFinish={handleFinish}
        >
          <RackFormItems />
          {/* Action Bar */}
          <div className="flex justify-end gap-2 sm:gap-4 sticky bottom-0 left-0 -mx-6 -mb-8 right-0 bg-white p-4 border-t border-gray-200 z-50 shadow-sm px-2  sm:px-8 rounded-b-sm">
            <BackButton navigateTo="/rack">Cancel</BackButton>
            <ResponsiveButton
              loading={isPending}
              type="primary"
              htmlType="submit"
              icon={<InboxOutlined />}
            >
              Update Rack
            </ResponsiveButton>
          </div>
        </Form>
      </ResponsiveCard>
    </PageLayout>
  );
}

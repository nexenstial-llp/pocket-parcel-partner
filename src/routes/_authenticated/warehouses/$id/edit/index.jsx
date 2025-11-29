import PageLayout from "@/components/layout/PageLayout";
import WarehouseForm from "@/components/pages/warehouses/WarehouseForm";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import {
  useGetWarehouseById,
  useUpdateWarehouse,
} from "@/features/warehouses/warehouses.query";
import { createWarehouseSchema } from "@/features/warehouses/warehouses.schema";
import { applyZodErrorsToForm } from "@/utils/formError";
import { useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Button, message } from "antd";
import { Form } from "antd";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/warehouses/$id/edit/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });
  console.log(id);

  const { data, isLoading, isError, error, refetch } = useGetWarehouseById(id);

  useEffect(() => {
    if (data) {
      const { capacity_info } = data;
      const { total_area, storage_capacity } = capacity_info;
      form.setFieldValue("total_area", total_area);
      form.setFieldValue("storage_capacity", storage_capacity);
      form.setFieldsValue(data);
    }
  }, [data]);

  const { mutate, isPending } = useUpdateWarehouse({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["warehouses", { id }] });
      message.success("Warehouse updated successfully");
      form.resetFields();
      navigate({ to: "/warehouses" });
    },
  });
  const handleSubmit = (values) => {
    try {
      // Build capacity_info as JSON string
      const capacityObj = {
        total_area: values.total_area || "",
        storage_capacity: values.storage_capacity || "",
      };

      // Prepare locations (if undefined, make it an empty array)
      const locations = (values.locations || []).map((loc) => ({
        location_name: loc.location_name || "",
        address_line1: loc.address_line1 || loc.address || "",
        city: loc.city || "",
        state: loc.state || "",
        pincode: loc.pincode || "",
        country: loc.country || "",
        location_type: loc.location_type || "",
        is_primary: !!loc.is_primary,
        area_size: loc.area_size || "",
        floor_info: loc.floor_info || "",
      }));

      const payload = {
        name: values.name || "",
        code: values.code || "",
        description: values.description || "",
        contact_person: values.contact_person || "",
        contact_phone: values.contact_phone || "",
        contact_email: values.contact_email || "",
        warehouse_type: "DISTRIBUTION",
        capacity_info: JSON.stringify(capacityObj),
        operating_hours: values.operating_hours || "",
        locations,
      };

      // Validate using Zod schema
      const parsedData = createWarehouseSchema.parse(payload);

      mutate({ id, data: parsedData });
    } catch (err) {
      console.log(err);
      if (err.name === "ZodError") {
        applyZodErrorsToForm(form, err);
        message.error("Fix the errors and try again.");
      } else {
        message.error(err?.message || "Something went wrong");
      }
    }
  };

  if (isError) {
    return (
      <ErrorFallback
        error={error}
        onRetry={refetch}
        backLink="/warehouses"
        backText="Back to Warehouses"
      />
    );
  }
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Warehouses", href: "/warehouses" },
        { title: "Edit Warehouse" },
      ]}
    >
      <ResponsiveCard
        loading={isLoading}
        title="Edit Warehouse"
        actions={[
          <div key={"submit"} className="flex justify-end gap-2 px-2">
            <Button
              disabled={isPending}
              htmlType="button"
              onClick={() => {
                navigate({ to: "/warehouses" });
              }}
            >
              Back
            </Button>
            <Button
              loading={isPending}
              type="primary"
              htmlType="submit"
              form="edit-warehouse"
            >
              Submit
            </Button>
          </div>,
        ]}
      >
        <WarehouseForm
          form={form}
          handleSubmit={handleSubmit}
          isPending={isPending}
          formName="edit-warehouse"
        />
      </ResponsiveCard>
    </PageLayout>
  );
}

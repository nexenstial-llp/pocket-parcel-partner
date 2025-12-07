import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Form, message } from "antd";
import { useCreateWarehouse } from "@/features/warehouses/warehouses.query";
import { applyZodErrorsToForm } from "@/utils/formError";
import { useQueryClient } from "@tanstack/react-query";
import WarehouseForm from "@/components/pages/warehouses/WarehouseForm";
import { createWarehouseSchema } from "@/features/warehouses/warehouses.schema";

export const Route = createFileRoute("/_authenticated/warehouses/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateWarehouse({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      message.success("Warehouse created successfully");
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
        capacity_info: capacityObj,
        operating_hours: values.operating_hours || "",
        locations,
      };

      // Validate using Zod schema
      const parsedData = createWarehouseSchema.parse(payload);

      mutate(parsedData);
    } catch (err) {
      if (err.name === "ZodError") {
        applyZodErrorsToForm(form, err);
        message.error("Fix the errors and try again.");
      } else {
        message.error(err?.message || "Something went wrong");
      }
    }
  };

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Warehouses", href: "/warehouses" },
        { title: "Create Warehouse" },
      ]}
    >
      <ResponsiveCard title="Create Warehouse">
        <WarehouseForm
          form={form}
          handleSubmit={handleSubmit}
          isPending={isPending}
          formName="create-warehouse"
        />
        <div className="flex justify-end gap-4 fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 z-50 shadow-lg">
          <Button
            disabled={isPending}
            htmlType="button"
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear All
          </Button>
          <Button
            loading={isPending}
            type="primary"
            htmlType="submit"
            form="create-warehouse"
          >
            Submit
          </Button>
        </div>
      </ResponsiveCard>
    </PageLayout>
  );
}

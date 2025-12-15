/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Modal, Form, Button, message, Divider } from "antd";
import { SaveOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";
// Assuming you have an update hook similar to the add hook
import { useUpdateLocationInWarehouse } from "../warehouses.query";
import { useQueryClient } from "@tanstack/react-query";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import LocationFormItems from "./LocationFormItems";
import { warehouseLocationSchema } from "../warehouses.schema";

export default function EditLocationModal({
  open,
  onClose,
  warehouseId,
  initialData,
}) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // ---- Populate Form on Open ----
  useEffect(() => {
    if (open && initialData) {
      form.setFieldsValue({
        ...initialData,
        // Ensure numbers are parsed if your API returns strings
        latitude: Number(initialData.latitude),
        longitude: Number(initialData.longitude),
      });
    }
  }, [open, initialData, form]);

  // ---- API Mutation ----
  const updateLocation = useUpdateLocationInWarehouse({
    onSuccess: async () => {
      message.success("Location updated successfully");
      await queryClient.invalidateQueries(["warehouse", warehouseId]);
      onClose();
    },
  });

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-gray-800">
          <EditOutlined className="text-indigo-600" />
          <span>Edit Location Details</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
      className="rounded-lg overflow-hidden"
      maskClosable={false}
    >
      <Form
        layout="vertical"
        form={form}
        size="middle"
        onFinish={(values) =>
          handleFormSubmission({
            values,
            schema: warehouseLocationSchema,
            form,
            onSubmit: (parsedData) =>
              updateLocation.mutate({ id: warehouseId, data: parsedData }),
          })
        }
        className="mt-4"
        disabled={updateLocation.isPending}
      >
        <LocationFormItems form={form} />

        <Divider className="my-4" />

        {/* --- FOOTER ACTIONS --- */}
        <div className="flex justify-end gap-3">
          <Button
            icon={<ReloadOutlined />}
            onClick={() => form.setFieldsValue(initialData)}
            disabled={updateLocation.isPending}
          >
            Revert
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={updateLocation.isPending}
            className="bg-indigo-600 hover:bg-indigo-500 shadow-md"
          >
            Update Location
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

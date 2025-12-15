/* eslint-disable react/prop-types */
import { Modal, Form, Button, message, Divider } from "antd";
import { SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { useAddLocationsToWarehouse } from "../warehouses.query";
import { useQueryClient } from "@tanstack/react-query";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import LocationFormItems from "./LocationFormItems";
import { warehouseLocationSchema } from "../warehouses.schema";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

export default function AddLocationModal({ open, onClose, warehouseId }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  // ---- API Mutation ----
  const createLocation = useAddLocationsToWarehouse({
    onSuccess: () => {
      message.success("Location added successfully");
      queryClient.invalidateQueries(["warehouse", warehouseId]);
      form.resetFields();
      handleClose();
    },
  });

  return (
    <Modal
      title={<span>Add New Location</span>}
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width={800} // Reduced width for a more compact feel
      className="rounded-lg overflow-hidden"
      maskClosable={false}
    >
      <APIProvider apiKey={API_KEY} libraries={["places", "geocoding"]}>
        <Form
          layout="vertical"
          form={form}
          size="middle" // Compact inputs
          onFinish={(values) =>
            handleFormSubmission({
              values,
              schema: warehouseLocationSchema,
              form,
              onSubmit: (parsedData) =>
                createLocation.mutate({ id: warehouseId, data: parsedData }),
            })
          }
          className="mt-4"
        >
          <LocationFormItems form={form} namePath={[]} absolutePath={[]} />

          <Divider className="my-4" />

          {/* --- FOOTER ACTIONS --- */}
          <div className="flex justify-end gap-3">
            <Button icon={<UndoOutlined />} onClick={() => form.resetFields()}>
              Reset
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={createLocation.isLoading}
              className="bg-blue-600 hover:bg-blue-500"
            >
              Save Location
            </Button>
          </div>
        </Form>
      </APIProvider>
    </Modal>
  );
}

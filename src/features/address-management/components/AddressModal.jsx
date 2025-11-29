/* eslint-disable react/prop-types */
import { Modal, Form, Button } from "antd";
import AddressFormItems from "./AddressFormItems";
import { useCreateAddress } from "../address-management.query";
import { message } from "antd";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { AddressSchema } from "../address-management.schema";
import { useQueryClient } from "@tanstack/react-query";

export default function AddressModal({ open, onClose }) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isPending } = useCreateAddress({
    onSuccess: async () => {
      message.success("Address added successfully");
      await queryClient.invalidateQueries({ queryKey: ["addresses"] });
      form.resetFields();
      onClose?.();
    },
  });

  const handleFinish = (values) => {
    handleFormSubmission({
      values,
      schema: AddressSchema,
      onSubmit: mutate,
      form,
      messages: {
        zodError: "Fix the errors and try again.",
      },
    });
  };

  return (
    <Modal
      title="Add Address"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose?.();
      }}
      footer={null}
      centered
      width={{ xs: "90%", sm: "70%", md: "60%" }}
    >
      <Form
        disabled={isPending}
        layout="vertical"
        form={form}
        onFinish={handleFinish}
      >
        <AddressFormItems />
        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button htmlType="reset" danger onClick={onClose}>
            Cancel
          </Button>

          <Button loading={isPending} type="primary" htmlType="submit">
            Save Address
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

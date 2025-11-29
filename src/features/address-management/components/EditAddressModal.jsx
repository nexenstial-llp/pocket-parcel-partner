/* eslint-disable react/prop-types */
import { Modal, Form, Button } from "antd";
import AddressFormItems from "./AddressFormItems";
import {
  useGetAddressesById,
  useUpdateAddress,
} from "../address-management.query";
import { message } from "antd";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { updateAddressSchema } from "../address-management.schema";
import { useQueryClient } from "@tanstack/react-query";
import ErrorFallback from "@/components/ui/ErrorFallback";
import { useEffect } from "react";

export default function EditAddressModal({ modalData, onClose }) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data, isLoading, isError, error } = useGetAddressesById(
    modalData?.id
  );

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);
  const { mutate, isPending } = useUpdateAddress({
    onSuccess: async () => {
      message.success("Address updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["addresses"] });
      form.resetFields();
      onClose?.();
    },
  });

  const handleFinish = (values) => {
    handleFormSubmission({
      values,
      schema: updateAddressSchema,
      onSubmit: (parsedData) => mutate({ id: modalData?.id, data: parsedData }),
      form,
      messages: {
        zodError: "Fix the errors and try again.",
      },
    });
  };

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <Modal
      title="Update Address"
      open={modalData?.open && modalData?.type === "edit"}
      onCancel={() => {
        form.resetFields();
        onClose?.();
      }}
      footer={null}
      centered
      width={{ xs: "90%", sm: "70%", md: "60%" }}
      loading={isLoading}
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
            Update Address
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

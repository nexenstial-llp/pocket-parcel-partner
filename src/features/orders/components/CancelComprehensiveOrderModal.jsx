/* eslint-disable react/prop-types */

import { useQueryClient } from "@tanstack/react-query";
import { Form, Modal, Input, message } from "antd";
import { useCancelOrder } from "../orders.query.js";

const CancelComprehensiveOrderModal = ({ open, onCancel, id }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  // Cancel order
  const { mutate: cancelOrder, isPending: isCanceling } = useCancelOrder({
    onSuccess: async () => {
      message.success("Order cancelled successfully");
      form.resetFields();
      onCancel?.();
      await queryClient.invalidateQueries({
        queryKey: ["track-order"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
  const onSubmit = (values) => {
    cancelOrder({
      id,
      cancellation_reason: values.cancellation_reason,
    });
  };

  return (
    <>
      <Modal
        open={open}
        title="Cancel Order"
        okText="Submit"
        cancelText="Cancel"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: isCanceling,
        }}
        onCancel={onCancel}
        destroyOnHidden
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={onSubmit}
            disabled={isCanceling}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="cancellation_reason"
          label="Reason"
          rules={[
            {
              required: true,
              message: "Please select the reason for cancellation",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter reason" />
        </Form.Item>
      </Modal>
    </>
  );
};
export default CancelComprehensiveOrderModal;

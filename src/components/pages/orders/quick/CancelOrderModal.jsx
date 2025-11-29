/* eslint-disable react/prop-types */

import { useCancelQwqerOrder } from "@/features/orders/orders.query";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { Select } from "antd";
import { Form, Input, Modal } from "antd";

const REASONS_FOR_CANCELLATION_QWQER = [
  { label: "Others", value: 34 },
  { label: "Incorrect details entered while booking", value: 37 },
  { label: "Item not ready", value: 38 },
  { label: "Pickup delay/No partner assigned", value: 39 },
  { label: "Delivery Partner refused pickup", value: 40 },
  { label: "Delivery partner not responding", value: 41 },
  { label: "QWQER asked to cancel", value: 42 },
  { label: "Technical/payment Issues", value: 43 },
  { label: "Found cheaper option", value: 44 },
  { label: "Delivery partner without uniform/mask", value: 45 },
  { label: "Delivery partner rude", value: 46 },
];

const CancelOrderModal = ({ open, onCancel, order_key }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isPending } = useCancelQwqerOrder({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["first-mile-orders"],
      });
      form.resetFields();
      message.success("Successfully cancelled order");
      onCancel?.();
    },
  });
  const onSubmit = (values) => {
    console.log(values);
    mutate({
      ...values,
      order_key,
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
          loading: isPending,
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
            disabled={isPending}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="reason"
          label="Reason"
          rules={[
            {
              required: true,
              message: "Please select the reason for cancellation",
            },
          ]}
        >
          <Select options={REASONS_FOR_CANCELLATION_QWQER} />
        </Form.Item>
        <Form.Item name="comment" label="Comment">
          <Input.TextArea />
        </Form.Item>
      </Modal>
    </>
  );
};
export default CancelOrderModal;

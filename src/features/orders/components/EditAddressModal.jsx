/* eslint-disable react/prop-types */
import { Button, Input } from "antd";
import { Form } from "antd";
import { Modal } from "antd";
import { useEffect } from "react";

const EditAddressModal = ({ open, onOk, onCancel, addressData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(addressData);
    }
  }, [open, addressData, form]);
  return (
    <Modal
      title="Edit Address"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={{ xs: "80%", md: "50%", lg: "50%" }}
    >
      <Form
        form={form}
        onFinish={onOk}
        onFinishFailed={onCancel}
        layout="vertical"
      >
        <Form.Item
          name={["pickup_address", "pickup_name"]}
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["pickup_address", "email"]}
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name={["pickup_address", "pickup_phone"]}
          label="Phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["pickup_address", "pickup_address"]}
          label="Address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          {/* Pincode */}
          <Form.Item
            name={["pickup_address", "pickup_pincode"]}
            label="Pincode"
            rules={[{ required: true, message: "Please input your pincode!" }]}
          >
            <Input disabled />
          </Form.Item>
          {/* City */}
          <Form.Item
            name={["pickup_address", "pickup_city"]}
            label="City"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Input disabled />
          </Form.Item>
          {/* State */}
          <Form.Item
            name={["pickup_address", "pickup_state"]}
            label="State"
            rules={[{ required: true, message: "Please input your state!" }]}
          >
            <Input disabled />
          </Form.Item>
          {/* Country */}
          <Form.Item
            name={["pickup_address", "pickup_country"]}
            label="Country"
            rules={[{ required: true, message: "Please input your country!" }]}
          >
            <Input disabled />
          </Form.Item>
        </div>
        <div className="flex gap-2 justify-end my-4">
          <Form.Item>
            <Button type="default" onClick={onCancel}>
              Cancel
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditAddressModal;

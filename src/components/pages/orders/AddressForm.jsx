import { Form, Input } from "antd";

const AddressForm = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Form.Item
        rules={[{ required: true, message: "Name is required" }]}
        name={"name"}
        label="Name"
      >
        <Input placeholder="Enter Name" />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Phone is required" }]}
        name={"phone"}
        label="Phone"
      >
        <Input placeholder="Enter Phone" />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Name is required" }]}
        name={"name"}
        label="Name"
      >
        <Input placeholder="Enter Name" />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Name is required" }]}
        name={"name"}
        label="Name"
      >
        <Input placeholder="Enter Name" />
      </Form.Item>
    </div>
  );
};

export default AddressForm;

/* eslint-disable react/prop-types */
import { useNavigate } from "@tanstack/react-router";
import { Select } from "antd";
import { DatePicker } from "antd";
import { Form, Input, Button, InputNumber } from "antd";

const { TextArea } = Input;

export default function EditQuickOrder({ form, handleFinish, isLoading }) {
  const navigate = useNavigate();
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{ payment_mode: 6 }}
        disabled={isLoading}
      >
        {/* DESCRIPTION */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Enter order description" }]}
        >
          <Input placeholder="Electronics - Mobile Phone" />
        </Form.Item>

        {/* ===================== FROM SECTION ===================== */}
        <SectionTitle title="Pickup Details (From)" />

        <div className="grid grid-cols-4 gap-4">
          <Form.Item
            label="Name"
            name={"from_name"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name={"from_phone"}
            rules={[
              { required: true, message: "Enter phone number" },
              {
                pattern: /^(\+?91)?[6-9]\d{9}$/,
                message:
                  "Enter a valid phone number, it must start from 6-9 and must be 10 digits long",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Landmark" name={"from_landmark"}>
            <Input />
          </Form.Item>

          <Form.Item label="House Number" name={"from_house_number"}>
            <Input />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Latitude"
              name={"from_latitude"}
              rules={[{ required: true }]}
            >
              <InputNumber className="w-full!" />
            </Form.Item>

            <Form.Item
              label="Longitude"
              name={"from_longitude"}
              rules={[{ required: true }]}
            >
              <InputNumber className="w-full!" />
            </Form.Item>
          </div>
          <Form.Item
            label="Address"
            name={"from_address"}
            rules={[{ required: true }]}
          >
            <TextArea rows={2} />
          </Form.Item>
        </div>

        {/* ===================== TO SECTION ===================== */}
        <SectionTitle title="Delivery Details (To)" />
        <div className="grid grid-cols-4 gap-4">
          <Form.Item label="Name" name={"to_name"} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name={"to_phone"}
            rules={[
              { required: true },
              {
                pattern: /^(\+?91)?[6-9]\d{9}$/,
                message:
                  "Enter a valid phone number, it must start from 6-9 and must be 10 digits long",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Landmark" name={"to_landmark"}>
            <Input />
          </Form.Item>

          <Form.Item label="House Number" name={"to_house_number"}>
            <Input />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Latitude"
              name={"to_latitude"}
              rules={[{ required: true }]}
            >
              <InputNumber className="w-full!" />
            </Form.Item>

            <Form.Item
              label="Longitude"
              name={"to_longitude"}
              rules={[{ required: true }]}
            >
              <InputNumber className="w-full!" />
            </Form.Item>
          </div>

          <Form.Item
            label="Address"
            name={"to_address"}
            rules={[{ required: true }]}
          >
            <TextArea rows={2} />
          </Form.Item>
        </div>

        {/* ===================== OTHER DETAILS ===================== */}
        <SectionTitle title="Additional Details" />
        <div className="grid grid-cols-4 gap-4">
          <Form.Item
            label="Weight (kg)"
            name="weight"
            rules={[{ required: true }]}
          >
            <InputNumber className="w-full!" />
          </Form.Item>

          <Form.Item label="Merchant Order Amount" name="merchant_order_amount">
            <InputNumber className="w-full!" />
          </Form.Item>

          <Form.Item label="Payment Mode" name="payment_mode">
            <Select
              options={[
                { label: "Cash On Pickup", value: 1 },
                { label: "COD", value: 3 },
                { label: "Credit", value: 5 },
                { label: "Wallet", value: 6 },
              ]}
            />
          </Form.Item>

          <Form.Item label="Promo Code" name="promo_code">
            <Input />
          </Form.Item>

          <Form.Item
            label="Item Type"
            name="item_type"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: "Documents & Books", value: 1 },
                { label: "Medicines", value: 2 },
                { label: "Medicines", value: 3 },
                { label: "Clothes & Accessories", value: 4 },
                { label: "Electronic Items", value: 5 },
                { label: "Others", value: 38 },
                { label: "Cake", value: 44 },
                { label: "Hot Food", value: 45 },
                { label: "Food Snacks", value: 46 },
                { label: "Gift", value: 47 },
                { label: "Meat/Fish", value: 48 },
              ]}
            />
          </Form.Item>

          <Form.Item label="Item Type Comment" name="item_type_comment">
            <Input />
          </Form.Item>

          <Form.Item
            label="Pickup Time"
            name="pickup_time"
            rules={[{ required: true }]}
          >
            <DatePicker showTime format="DD-MM-YYYY HH:mm" className="w-full" />
          </Form.Item>
        </div>

        <Form.Item label="Special Instruction" name="special_instruction">
          <TextArea rows={2} />
        </Form.Item>

        <div className="flex gap-2 justify-end">
          {/* SUBMIT BUTTON */}
          <Button
            onClick={() => navigate({ to: "/orders/first-mile" })}
            loading={isLoading}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update details
          </Button>
        </div>
      </Form>
    </>
  );
}

// ---- SMALL REUSABLE SECTION TITLE COMPONENT ----
function SectionTitle({ title }) {
  return <h3 className="text-lg font-semibold mt-6 mb-2">{title}</h3>;
}

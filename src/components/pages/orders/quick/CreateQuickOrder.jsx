/* eslint-disable react/prop-types */
import { Form, Input, Select, DatePicker, Button, InputNumber } from "antd";
import dayjs from "dayjs";
import { useCreateQuickOrder } from "@/features/orders/orders.query";
import { createQuickOrderSchema } from "@/features/orders/orders.schema";
import { applyZodErrorsToForm } from "@/utils/formError.util";
import { message } from "antd";
import { useNavigate } from "@tanstack/react-router";
import SelectLocationModal from "@/components/ui/maps/SelectLocationModal";
import { Space } from "antd";
// import GoogleAddressInput from "@/components/ui/GoogleAddressInput";
// import GoogleAddressAutocomplete from "@/components/ui/GoogleAddressAutocomplete";

const { TextArea } = Input;

export default function CreateQuickOrder() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const [userAddress, setUserAddress] = useState(null);
  // console.log(userAddress);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const { latitude, longitude } = position.coords;

  //     // use the latitude and longitude to get the user's address
  //     fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBQtLzigUdbBdYQgVXfMDhASqJRukjzkBc`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setUserAddress(data.results[0].formatted_address);
  //       });
  //   });
  // }, []);

  // ---- API SUBMIT MUTATION ----
  const createOrderMutation = useCreateQuickOrder({
    onSuccess: () => {
      form.resetFields();
      message.success("Order created successfully");
      navigate({ to: "/orders/first-mile" });
    },
  });

  // ---- FINAL SUBMIT ----
  const handleFinish = (values) => {
    try {
      const payload = {
        description: values.description,

        from_name: values.from_name,
        from_phone: values.from_phone,
        from_address: values.from_address,
        from_landmark: values.from_landmark,
        from_latitude: values.from_latitude,
        from_longitude: values.from_longitude,
        from_house_number: values.from_house_number,

        to_name: values.to_name,
        to_phone: values.to_phone,
        to_address: values.to_address,
        to_landmark: values.to_landmark,
        to_latitude: values.to_latitude,
        to_longitude: values.to_longitude,
        to_house_number: values.to_house_number,

        special_instruction: values.special_instruction,
        weight: values.weight,
        merchant_order_amount: values.merchant_order_amount,
        payment_mode: values.payment_mode,
        promo_code: values.promo_code,
        item_type: values.item_type,
        item_type_comment: values.item_type_comment,

        pickup_time: dayjs(values.pickup_time).format("YYYY-MM-DD HH:mm:ss"),
      };
      const parsedData = createQuickOrderSchema.parse(payload);

      createOrderMutation.mutate(parsedData);
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
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{ payment_mode: 6 }}
        disabled={createOrderMutation.isPending}
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

        <div className="grid grid-cols-4 gap-x-4">
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

          <Space className="col-span-2">
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
            <SelectLocationModal
              form={form}
              latitude={"from_latitude"}
              longitude={"from_longitude"}
            />
          </Space>

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
        <div className="grid grid-cols-4 gap-x-4">
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

          <Space className="col-span-2">
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
            <SelectLocationModal
              form={form}
              latitude={"to_latitude"}
              longitude={"to_longitude"}
            />
          </Space>

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
        <div className="grid grid-cols-4 gap-x-4">
          <Form.Item
            label="Weight (kg)"
            name="weight"
            rules={[{ required: true, message: "Weight is required" }]}
          >
            <InputNumber className="w-full!" min={0} />
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
          {/* CANCEL BUTTON */}
          <Button
            onClick={() => navigate({ to: "/orders/first-mile" })}
            htmlType="reset"
            className="mt-4"
            loading={createOrderMutation.isPending}
          >
            Cancel
          </Button>
          {/* SUBMIT BUTTON */}
          <Button
            type="primary"
            htmlType="submit"
            className="mt-4"
            loading={createOrderMutation.isPending}
          >
            Create Order
          </Button>
        </div>
      </Form>
    </>
  );
}

// ---- SMALL REUSABLE SECTION TITLE COMPONENT ----
function SectionTitle({ title }) {
  return <h3 className="text-lg font-semibold my-4">{title}</h3>;
}

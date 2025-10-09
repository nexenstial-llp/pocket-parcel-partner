// components/ShipmentStepperForm.jsx
import { useEffect, useState } from "react";
import { Steps, Button, message, Form, Radio } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import AddressesForm from "./steps/AddressesForm";
import ParcelForm from "./steps/ParcelForm";
import GstInfo from "./steps/GstInfo";
import ItemsPage from "./steps/ItemsPage";

const ShipmentStepperForm = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const order_type = Form.useWatch("order_type", form);
  const onChange = (value) => {
    setCurrent(value);
  };

  const next = async () => {
    try {
      const values = await form.validateFields();
      setFormData((prev) => ({ ...prev, ...values }));
      setCurrent(current + 1);
    } catch (error) {
      message.error("Please fill all required fields");
      console.log("error", error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const finalData = { ...formData, ...values };
      console.log("Final Form Data:", finalData);
      message.success("Shipment information submitted successfully!");
    } catch (error) {
      message.error("Please fix the errors before submitting");
      console.log("error", error);
    }
  };

  const steps = [
    { title: "Addresses", component: AddressesForm },
    { title: "Parcel", component: ParcelForm },
    ...(order_type === "b2b" ||
    order_type === "forward" ||
    order_type === "reverse"
      ? [{ title: "GST", component: GstInfo }]
      : []),
    { title: "Item(S)", component: ItemsPage },
  ];
  useEffect(() => {
    const maxValidStep = steps.length - 1;
    if (current > maxValidStep) {
      setCurrent(maxValidStep);
    }
  }, [steps.length, current]);

  const CurrentStepComponent = steps[current]?.component;

  if (!CurrentStepComponent) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          order_type: "forward",
          shipment_details: {
            items: [
              {
                quantity: undefined,
                price: undefined,
                sku: undefined,
                weight: undefined,
                length: undefined,
                breadth: undefined,
                height: undefined,
                description: undefined,
              },
            ],
          },
        }}
        onValuesChange={(changedValues, allValues) => {
          setFormData((prev) => ({ ...prev, ...allValues }));
        }}
      >
        <Form.Item name={"order_type"} label={"Order Type"}>
          <Radio.Group>
            <Radio value={"forward"}>Forward (IN)</Radio>
            <Radio value={"reverse"}>Reverse (IN)</Radio>
            <Radio value={"b2b"}>B2B (IN)</Radio>
            <Radio value={"forwardGlobal"}>Forward (MENA, SEA, EU, US)</Radio>
            <Radio value={"reverseGlobal"}>Reverse (MENA, SEA, EU, US)</Radio>
            <Radio value={"b2bGlobal"}>B2B (MENA, SEA, EU, US)</Radio>
          </Radio.Group>
        </Form.Item>
        <div className="flex flex-col gap-4">
          <Steps
            size="small"
            onChange={onChange}
            labelPlacement="vertical"
            current={current}
            items={steps.map((step) => ({
              title: step.title,
              key: step.key,
            }))}
          />
          <CurrentStepComponent
            formData={formData}
            form={form}
            order_type={order_type}
          />
        </div>
      </Form>

      <div className="flex justify-between mt-8">
        <Button
          onClick={prev}
          disabled={current === 0}
          icon={<ArrowLeftOutlined />}
        >
          Previous
        </Button>

        {current < steps.length - 1 && (
          <Button type="primary" onClick={next} icon={<ArrowRightOutlined />}>
            Next
          </Button>
        )}

        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={handleSubmit}
            icon={<CheckOutlined />}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShipmentStepperForm;

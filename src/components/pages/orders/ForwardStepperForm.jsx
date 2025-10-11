import { useState } from "react";
import { Form, Button, Steps } from "antd";

import ForwardShipmentDetails from "./forward/ForwardShipmentDetails";
import ForwardItems from "./forward/ForwardItems";
import ForwardAdditionalInfo from "./forward/ForwardAdditionalInfo";
import ForwardGSTInfo from "./forward/ForwardGSTInfo";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import AddressesForm from "./steps/AddressesForm";

const { Step } = Steps;

const defaultItem = {
  product_url: "",
  price: 0,
  description: "",
  quantity: 1,
  weight: 0,
  sku: "",
  final_amount_paid: "",
  store_credits_used: "",
  product_id: "",
  variant_id: "",
  additional: {
    length: 0,
    height: 0,
    breadth: 0,
    weight: 0,
    images: "",
    return_days: 0,
    cat: "",
    manufacture_country_code: "",
    manufacture_country: "",
    exchange_days: 0,
    color: "",
    sub_category: "",
    size: "",
    brand: "",
    special_instructions: "",
    imei: "",
    ean: "",
    product_url: "",
    return_reason: "",
  },
};

const ForwardStepperForm = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const onChange = (value) => {
    setCurrent(value);
  };

  const steps = [
    {
      title: "Address Info",
      content: <AddressesForm />,
    },
    {
      title: "Shipment Details",
      content: <ForwardShipmentDetails />,
    },
    {
      title: "Items",
      content: <ForwardItems />,
    },
    {
      title: "Additional Info",
      content: <ForwardAdditionalInfo />,
    },
    {
      title: "GST Info",
      content: <ForwardGSTInfo />,
    },
  ];

  const next = () => {
    form.validateFields().then(() => setCurrent(current + 1));
  };

  const prev = () => setCurrent(current - 1);

  const onFinish = async () => {
    const values = await form.validateFields();
    // Format date/time fields to ISO string if needed
    if (values.pickup_info?.pickup_time) {
      values.pickup_info.pickup_time =
        values.pickup_info.pickup_time.toISOString();
    }
    if (values.drop_info?.drop_start_time) {
      values.drop_info.drop_start_time =
        values.drop_info.drop_start_time.toISOString();
    }
    if (values.drop_info?.drop_end_time) {
      values.drop_info.drop_end_time =
        values.drop_info.drop_end_time.toISOString();
    }
    if (values.shipment_details?.invoice_date) {
      values.shipment_details.invoice_date =
        values.shipment_details.invoice_date.format("YYYY-MM-DD");
    }
    if (values.additional?.order_date) {
      values.additional.order_date = values.additional.order_date.format();
    }
    if (values.gst_info?.invoice_date) {
      values.gst_info.invoice_date =
        values.gst_info.invoice_date.format("YYYY-MM-DD");
    }
    console.log("Final Payload:", values);
  };

  return (
    <Form
      initialValues={{
        delivery_type: "FORWARD",
        shipment_details: {
          items: [defaultItem],
        },
      }}
      form={form}
      layout="vertical"
      scrollToFirstError
    >
      <Steps
        onChange={onChange}
        size="small"
        labelPlacement="vertical"
        current={current}
        style={{ marginBottom: 24 }}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>

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
          <Button type="primary" onClick={onFinish} icon={<CheckOutlined />}>
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default ForwardStepperForm;

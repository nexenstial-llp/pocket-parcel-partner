// components/ShipmentStepperForm.jsx
import { useState } from "react";
import { Radio } from "antd";
import ForwardStepperForm from "./ForwardStepperForm";
import ReverseShipmentStepperForm from "./ReverseShipmentStepperForm";
import InternationalForwardStepperForm from "./InternationalForwardStepperForm";
import InternationalReverseStepperForm from "./InternationalReverseStepperForm";

const ShipmentStepperForm = () => {
  const [deliveryType, setDeliveryType] = useState("FORWARD");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="deliveryType">Delivery type</label>
        <Radio.Group
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
        >
          <Radio value={"FORWARD"}>Forward (IN)</Radio>
          <Radio value={"RVP"}>Reverse (IN)</Radio>
          <Radio value={"FORWARD_GLOBAL"}>Forward (MENA, SEA, EU, US)</Radio>
          <Radio value={"RVP_GLOBAL"}>Reverse (MENA, SEA, EU, US)</Radio>
        </Radio.Group>
      </div>

      {deliveryType === "FORWARD" ? (
        <ForwardStepperForm />
      ) : deliveryType === "RVP" ? (
        <ReverseShipmentStepperForm />
      ) : deliveryType === "FORWARD_GLOBAL" ? (
        <InternationalForwardStepperForm />
      ) : deliveryType === "RVP_GLOBAL" ? (
        <InternationalReverseStepperForm />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ShipmentStepperForm;

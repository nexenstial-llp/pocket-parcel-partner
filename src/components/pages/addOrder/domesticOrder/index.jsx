import { useNavigate } from "@tanstack/react-router";
import { Radio } from "antd";
import React from "react";

const Index = () => {
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    navigate({ to: `/add-orders/${e.target.value}` });
  };
  return (
    <div className="m-2">
      <div className="w-fit">
        <Radio.Group
          defaultValue="single-order"
          buttonStyle="solid"
          onChange={handleOnChange}
        >
          <Radio.Button value="single-order">Single Order</Radio.Button>
          <Radio.Button value="bulk-order">Bulk Order</Radio.Button>
          <Radio.Button value="quick-shipment">Quick Shipment</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Index;

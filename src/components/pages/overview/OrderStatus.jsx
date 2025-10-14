import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { presetDateRanges } from "@/utils/date";
import { Button, DatePicker, Radio, Select, Table } from "antd";
const columns = [
  {
    title: "Carrier",
    dataIndex: "carrier",
    key: "carrier",
  },
  {
    title: "Order Placed",
    dataIndex: "order_placed",
    key: "order_placed",
  },
  {
    title: "Dispatched (Picked up)",
    dataIndex: "dispatched",
    key: "dispatched",
  },
  {
    title: "In Transit",
    dataIndex: "transit",
    key: "transit",
  },
  {
    title: "Out For Delivery",
    dataIndex: "out_for_delivery",
    key: "out_for_delivery",
  },
  {
    title: "Delivered",
    dataIndex: "delivered",
    key: "delivered",
  },
  {
    title: "Returned",
    dataIndex: "rto",
    key: "rto",
  },
  {
    title: "Lost",
    dataIndex: "lost",
    key: "lost",
  },
  {
    title: "Damaged",
    dataIndex: "damaged",
    key: "damaged",
  },
  {
    title: "Cancelled",
    dataIndex: "cancelled",
    key: "cancelled",
  },
  {
    title: "Total orders",
    dataIndex: "total_orders",
    key: "total_orders",
  },
];

const OrderStatus = () => {
  return (
    <ResponsiveCard
      title={
        <div>
          <p> Order Status breakup by Accounts</p>
          <small className="text-muted font-normal">
            This graph shows the count of orders by status with an additional
            split of carrier accounts. For order status mapping, please refer to
            this document LINK
          </small>
        </div>
      }
      size="small"
      extra={<Button size="small">Download Report</Button>}
    >
      <div className="flex gap-2 flex-wrap items-center">
        <DatePicker.RangePicker
          format="DD-MM-YYYY"
          presets={presetDateRanges}
          placeholder="Created Date"
        />
        <DatePicker.RangePicker
          format="DD-MM-YYYY"
          presets={presetDateRanges}
          placeholder="Shipped Date"
        />
        <DatePicker.RangePicker
          format="DD-MM-YYYY"
          presets={presetDateRanges}
          placeholder="Estimated Delivery Date"
        />
        <Select
          style={{ minWidth: "120px" }}
          placeholder="Carrier Partner"
          mode="multiple"
          options={[
            { label: "SELF - Self Demo", value: "self" },
            { label: "Bluedart - Bluedart", value: "BLUEDART" },
            { label: "DTDC - PP <> DTDC", value: "DTDC" },
          ]}
        />
        <Select style={{ minWidth: "120px" }} placeholder="OFD Count" />
        <Select
          style={{ minWidth: "120px" }}
          placeholder="Drop Zone"
          options={[
            { label: "East", value: "EAST" },
            {
              label: "South",
              value: "SOUTH",
            },
            {
              label: "North",
              value: "NORTH",
            },
            {
              label: "West",
              value: "WEST",
            },
          ]}
        />
        {/* Select drop city */}
        <Select style={{ minWidth: "120px" }} placeholder="Drop City" />
        {/* Select Pickup city */}
        <Select style={{ minWidth: "120px" }} placeholder="Pickup City" />
        {/* Select Drop state */}
        <Select style={{ minWidth: "120px" }} placeholder="Pickup State" />
        {/* Select status */}
        <Select style={{ minWidth: "120px" }} placeholder="Status" />
      </div>
      <div className="flex gap-2 items-center my-2">
        <label htmlFor="graph-type">Graph Type :</label>{" "}
        <Radio.Group defaultValue="values" size="small" buttonStyle="solid">
          <Radio.Button value="values">Values</Radio.Button>
          <Radio.Button value="percentage">Percentage</Radio.Button>
        </Radio.Group>
      </div>
      <Table dataSource={[]} columns={columns} size="small" />
    </ResponsiveCard>
  );
};

export default OrderStatus;

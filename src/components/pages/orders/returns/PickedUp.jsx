import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { DatePicker, Select, Table } from "antd";
const columns = [
  {
    title: "AWB",
    dataIndex: "awb",
    key: "awb",
  },
  {
    title: "Reference Number",
    dataIndex: "reference_number",
    key: "reference_number",
  },
  {
    title: "Forward AWB",
    dataIndex: "order_awb",
    key: "order_awb",
  },
  {
    title: "Forward Order ID",
    dataIndex: "forward_order_id",
    key: "forward_order_id",
  },
  {
    title: "Carrier",
    dataIndex: "carrier",
    key: "carrier",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Picked Up On",
    dataIndex: "picked_up_on",
    key: "picked_up_on",
  },
  {
    title: "Latest Status",
    dataIndex: "latest_status",
    key: "latest_status",
  },
  {
    title: "Order Type",
    dataIndex: "order_type",
    key: "order_type",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];
const PickedUp = () => {
  return (
    <ResponsiveCard title="New Returns" size="small">
      <div className="flex flex-col gap-4">
        <div
          style={{
            scrollbarWidth: "thin",
          }}
          className="flex gap-2 items-center w-full overflow-x-auto"
        >
          <Select
            allowClear
            style={{ minWidth: "150px" }}
            placeholder="Tracking Status"
            mode="multiple"
            options={[
              { label: "NoStatusExist", value: "NoStatusExist" },
              { label: "Awb Registered", value: "Awb Registered" },
              { label: "OrderPlaced", value: "OrderPlaced" },
              { label: "OutForPickup", value: "OutForPickup" },
              { label: "PickupPending", value: "PickupPending" },
              { label: "LastMilePrePickup", value: "LastMilePrePickup" },
              { label: "PickupFailed", value: "PickupFailed" },
              { label: "PickedUp", value: "PickedUp" },
              { label: "InTransit", value: "InTransit" },
              { label: "ShipmentDelayed", value: "ShipmentDelayed" },
              { label: "ShipmentHeld", value: "ShipmentHeld" },
              { label: "ContactCustomerCare", value: "ContactCustomerCare" },
              { label: "OutForDelivery", value: "OutForDelivery" },
              { label: "FailedDelivery", value: "FailedDelivery" },
              { label: "NotServiceable", value: "NotServiceable" },
              { label: "Delivered", value: "Delivered" },
              { label: "Cancelled", value: "Cancelled" },
              { label: "Lost", value: "Lost" },
              { label: "Damaged", value: "Damaged" },
              { label: "RTO-Requested", value: "RTO-Requested" },
              { label: "RTO-Marked", value: "RTO-Marked" },
              { label: "RTO-OutForDelivery", value: "RTO-OutForDelivery" },
              { label: "RTO-Failed Delivery", value: "RTO-Failed Delivery" },
              { label: "RTO-InTransit", value: "RTO-InTransit" },
              {
                label: "RTO-ContactCustomerCare",
                value: "RTO-ContactCustomerCare",
              },
              { label: "RTO-ShipmentDelay", value: "RTO-ShipmentDelay" },
              { label: "RTO-Delivered", value: "RTO-Delivered" },
              {
                label: "RTO-Delivered-Reschedule-Requested",
                value: "RTO-Delivered-Reschedule-Requested",
              },
              {
                label: "CourierPartnerTrackingDataMissing",
                value: "CourierPartnerTrackingDataMissing",
              },
              { label: "Expired", value: "Expired" },
              { label: "Aged", value: "Aged" },
              { label: "Ready To Ship", value: "Ready To Ship" },
              { label: "Exchange Pickup", value: "Exchange Pickup" },
              { label: "Exchange In Transit", value: "Exchange In Transit" },
              { label: "Exchange Delivered", value: "Exchange Delivered" },
              { label: "DestinationHubIn", value: "DestinationHubIn" },
              { label: "OriginCityIn", value: "OriginCityIn" },
              { label: "OriginCityOut", value: "OriginCityOut" },
              {
                label: "RiderAllocationAwaited",
                value: "RiderAllocationAwaited",
              },
              {
                label: "RiderAllocationFailed",
                value: "RiderAllocationFailed",
              },
              { label: "RiderAllocated", value: "RiderAllocated" },
              {
                label: "ReachedPickupLocation",
                value: "ReachedPickupLocation",
              },
              { label: "ReachedDropLocation", value: "ReachedDropLocation" },
              {
                label: "ReShippedOnNewWaybill",
                value: "ReShippedOnNewWaybill",
              },
              { label: "PartialDelivered", value: "PartialDelivered" },
              { label: "PartialCancelled", value: "PartialCancelled" },
              { label: "PartialRTO", value: "PartialRTO" },
              { label: "PartialRTOInTransit", value: "PartialRTOInTransit" },
              {
                label: "PartialRTOOutForDelivery",
                value: "PartialRTOOutForDelivery",
              },
              { label: "PartialRTODelivered", value: "PartialRTODelivered" },
            ]}
          />
          <Select
            allowClear
            style={{ minWidth: "120px" }}
            placeholder="Carrier Partner"
            mode="multiple"
            options={[
              { label: "SELF - Self Demo", value: "self" },
              { label: "Bluedart - Bluedart", value: "BLUEDART" },
              { label: "DTDC - PP <> DTDC", value: "DTDC" },
            ]}
          />
          {/* Order Type */}
          <Select
            allowClear
            style={{ minWidth: "120px" }}
            placeholder="Order Type"
            mode="multiple"
            options={[
              { label: "Prepaid", value: "PREPAID" },
              { label: "COD", value: "COD" },
            ]}
          />
          {/* Created Date */}
          <DatePicker.RangePicker placeholder={"Created Date"} />
          {/* Pick Up Date */}
          <DatePicker.RangePicker placeholder={"Pick Up Date"} />
        </div>
        <Table size="small" bordered columns={columns} dataSource={[]} />
      </div>
    </ResponsiveCard>
  );
};

export default PickedUp;

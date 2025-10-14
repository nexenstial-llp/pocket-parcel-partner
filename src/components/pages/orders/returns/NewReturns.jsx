import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { DatePicker, Select, Table } from "antd";
const columns = [
  {
    title: "Reference Number",
    dataIndex: "reference_number",
    key: "reference_number",
  },
  {
    title: "Forward Order Id",
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Self Shipped",
    dataIndex: "self_shipped",
    key: "self_shipped",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Order Type",
    dataIndex: "order_type",
    key: "order_type",
  },
  {
    title: "Created By",
    dataIndex: "created_by",
    key: "created_by",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];
const NewReturns = () => {
  return (
    <ResponsiveCard title="New Returns" size="small">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center ">
          <Select
            allowClear
            style={{ minWidth: "120px" }}
            placeholder="Status"
            mode="multiple"
            options={[
              { label: "New Case", value: "NEW_CASE" },
              { label: "Approved", value: "APPROVED" },
              { label: "Rejected", value: "REJECTED" },
              { label: "In Process", value: "IN_PROCESS" },
              { label: "Failed", value: "FAILED" },
            ]}
          />

          <Select
            allowClear
            style={{ minWidth: "120px" }}
            placeholder="Self Shipped"
            mode="multiple"
            options={[
              { label: "Yes", value: "true" },
              { label: "False", value: "false" },
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

export default NewReturns;

import React from "react";
import ResponsiveTable from "@/components/ui/tables/ResponsiveTable";
const columns = [
  {
    title: "Start Time",
    dataIndex: "start_time",
    key: "start_time",
  },
  {
    title: "End Time",
    dataIndex: "end_time",
    key: "end_time",
  },
  {
    title: "Total Count",
    dataIndex: "total_count",
    key: "total_count",
  },
  {
    title: "Success Count",
    dataIndex: "success_count",
    key: "success_count",
  },
  {
    title: "Error Count",
    dataIndex: "Error_count",
    key: "Error_count",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];
const OrderTable = () => {
  return (
    <div className="w-full">
      <ResponsiveTable columns={columns} dataSource={[]} />
    </div>
  );
};

export default OrderTable;

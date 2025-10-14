import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Table } from "antd";
const columns = [
  {
    title: "AWB",
    dataIndex: "awb",
    key: "awb",
  },
  {
    title: "Carrier",
    dataIndex: "cp_id",
    key: "cp_id",
  },
  {
    title: "Created At",
    dataIndex: "cp_id",
    key: "cp_id",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];
const CreateReturn = () => {
  return (
    <ResponsiveCard title="Create Return" size="small">
      <Table bordered columns={columns} dataSource={[]} />
    </ResponsiveCard>
  );
};

export default CreateReturn;

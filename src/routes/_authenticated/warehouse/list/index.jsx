import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb, Button, Table } from "antd";

export const Route = createFileRoute("/_authenticated/warehouse/list/")({
  component: RouteComponent,
});
const columns = [
  {
    title: "Warehouse Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Contact Person",
    dataIndex: "contact_person_name",
    key: "contact_person_name",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "GST",
    dataIndex: "GST",
    key: "GST",
  },
  {
    title: "Action",
    render: (_, record) => (
      <div className="flex gap-2">
        <Link to={`/warehouse/edit/${record.id}`}>
          <Button icon={<EditOutlined />} type="link">
            Edit
          </Button>
        </Link>
        <Button icon={<DeleteOutlined />} danger>
          Delete
        </Button>
      </div>
    ),
  },
];
function RouteComponent() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ title: "Home" }, { title: "Warehouse List" }]} />
      <ResponsiveCard
        title="Warehouse List"
        extra={
          <Link to="/warehouse/create">
            <Button type="primary">Create</Button>
          </Link>
        }
      >
        <Table size="small" bordered columns={columns} dataSource={[]} />
      </ResponsiveCard>
    </PageLayout>
  );
}

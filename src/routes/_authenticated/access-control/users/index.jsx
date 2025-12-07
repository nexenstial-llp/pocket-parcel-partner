import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { UserAddOutlined } from "@ant-design/icons";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Table } from "antd";
export const Route = createFileRoute("/_authenticated/access-control/users/")({
  component: RouteComponent,
});

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Profile Type",
    dataIndex: "profileType",
    key: "profileType",
  },
  {
    title: "Access",
    // render:(_, record)=><span>{record.permissions?.join(", ")}</span>
  },
  {
    title: "UpdatedAt",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];
function RouteComponent() {
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Access Control" },
        { title: "users" },
      ]}
    >
      <ResponsiveCard
        title="Access Control"
        extra={
          <div className="flex gap-2">
            <Link to="/access-control/users/create">
              <Button icon={<UserAddOutlined />} type="primary">
                Add New User
              </Button>
            </Link>
            <Link to="/access-control/roles/create">
              <Button>Add New Role</Button>
            </Link>
            {/* <ManageRolesDrawer /> */}
            {/* <PermissionGuard roles={["admin"]} permissions={["create"]}>
              <Button type="primary" danger>
                Admin Only Button
              </Button>
            </PermissionGuard> */}
          </div>
        }
      >
        <Table size="small" bordered columns={columns} dataSource={[]} />
      </ResponsiveCard>
    </PageLayout>
  );
}

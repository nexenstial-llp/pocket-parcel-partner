import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { PlusCircleFilled } from "@ant-design/icons";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Divider, Form, Input, Radio, Select } from "antd";

export const Route = createFileRoute(
  "/_authenticated/access-control/users/create/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [form] = Form.useForm();
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Access Control", href: "/access-control/users" },
        { title: "Create users" },
      ]}
    >
      <ResponsiveCard title="Add New User">
        <Form
          initialValues={{ profile_type: "subUser" }}
          layout="vertical"
          form={form}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4">
            <Form.Item
              rules={[{ required: true, message: "Username is required" }]}
              name={"username"}
              label="Username"
            >
              <Input placeholder="Enter username" addonAfter="@pocketparcel" />
            </Form.Item>
            <Form.Item
              name={"email"}
              label="Email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input placeholder="Enter email" type="email" />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Password is required" },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+]).{8,}$/,
                  message:
                    "Must contain 8+ characters, 1 lowercase, 1 uppercase, 1 number, and 1 special character (!@#$%^&*()+)",
                },
              ]}
              name={"password"}
              label="Password"
            >
              <Input placeholder="Enter password" />
            </Form.Item>
            {/* Role */}
            <Form.Item
              rules={[{ required: "true", message: "Please select the role" }]}
              name={"role"}
              label="Role"
            >
              <Select
                placeholder="Select role"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                ]}
                popupRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <div className="text-center">
                      <Link to="/access-control/roles/create">
                        <PlusCircleFilled /> Create New Role
                      </Link>
                    </div>
                  </div>
                )}
              />
            </Form.Item>
            <Form.Item name={"profile_type"} label="Profile Type">
              <Radio value={"subUser"}>SubUser</Radio>
            </Form.Item>
          </div>
          <Form.Item>
            <div className="flex gap-2">
              {/* Clear All */}
              <Button htmlType="reset">Clear All</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </ResponsiveCard>
    </PageLayout>
  );
}

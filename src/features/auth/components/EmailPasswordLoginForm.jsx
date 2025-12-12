/* eslint-disable react/prop-types */
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Form } from "antd";
import { Button } from "antd";

const EmailPasswordLoginForm = ({ form, handleSubmit, isLoading }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
      disabled={isLoading}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Enter your email"
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter your password"
          size="large"
        />
      </Form.Item>

      <Form.Item style={{ marginTop: 30 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
          size="large"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmailPasswordLoginForm;

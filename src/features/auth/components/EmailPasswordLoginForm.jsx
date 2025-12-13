/* eslint-disable react/prop-types */
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Form } from "antd";
import { Button } from "antd";

const EmailPasswordLoginForm = ({ form, handleSubmit, isLoading }) => {
  return (
    <Form
      size="large"
      className="login"
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
        <Input prefix={<MailOutlined />} placeholder="Enter your email" />
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
        />
      </Form.Item>

      <Form.Item>
        <Button
          className="login-button"
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmailPasswordLoginForm;

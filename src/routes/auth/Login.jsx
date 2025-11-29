import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button, Form, Input, Alert, Typography } from "antd";
import { LockOutlined, MailOutlined, SafetyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Tabs } from "antd";
import { message } from "antd";
import axiosInstance from "@/utils/axiosInstance.util";
import { useMutation } from "@tanstack/react-query";

const { Title, Text } = Typography;

const sendOtpApi = async (email) => {
  const response = await axiosInstance.post(
    "/auth/email/send-otp",
    { email },
    {
      skipAuth: true,
      suppressErrorToast: true,
    }
  );
  return response.data;
};

export const Route = createFileRoute("/auth/login")({
  validateSearch: (search) => ({
    redirect: search.redirect || "/",
  }),
  beforeLoad: ({ context, search }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: LoginComponent,
});

function LoginComponent() {
  const auth = Route.useRouteContext();
  const { redirect } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");

  const {
    mutate: sendOtp,
    isPending: isOtpSendPending,
    // isSuccess: isOtpSendSuccess,
  } = useMutation({
    mutationFn: sendOtpApi,
    onSuccess: (data) => {
      console.log("OTP send response:", data);
      setOtpSent(true);
      setEmailForOtp(data.email);
      message.success("OTP sent to your email!");
    },
    onError: (error) => {
      console.log(
        "error",
        error?.response?.data?.message || "An unexpected error occurred"
      );
      message.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleSendOtp = async (values) => {
    sendOtp(values.email);
  };

  const handleVerifyOtp = async (values) => {
    setLoading(true);
    try {
      const { error } = await auth.verifyOtp({
        email: emailForOtp,
        token: values.otp,
        type: "email",
      });

      if (error) {
        message.error(error.message);
      } else {
        message.success("Successfully logged in!");
        setOtpSent(false);
      }
    } catch (error) {
      console.log("error", error);
      message.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await auth.auth.login(values.email, values.password);
      console.log("Login successful:", response);
      // Navigate to the redirect URL using router navigation
      setTimeout(() => {
        navigate({ to: redirect });
      }, 0);
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f0a991] to-[#1024dd] p-4">
      {/* <div className="w-full max-w-5xl backdrop-blur-xl bg-white/20   shadow-2xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"> */}
      <div className="w-full max-w-5xl bg-[#db5730]   shadow-2xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE — IMAGE (hidden on small screens) */}
        <div
          className="hidden md:block bg-cover bg-center"
          style={{
            backgroundImage: "url('/app_default_image.png')",
          }}
        ></div>
        {/* RIGHT SIDE — LOGIN FORM */}
        <div className="p-8 md:p-12 bg-white">
          <Title level={2} style={{ textAlign: "center", marginBottom: 4 }}>
            Sign In
          </Title>

          <Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: 24,
              fontSize: 14,
            }}
          >
            Welcome back! Please login to your account.
          </Text>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Tabs
            centered
            items={[
              {
                key: "password",
                label: "Password",
                children: (
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

                    <Form.Item style={{ marginBottom: 16 }}>
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
                ),
              },
              {
                key: "otp",
                label: "OTP",
                children: (
                  <>
                    {!otpSent ? (
                      <Form
                        name="otp-request"
                        onFinish={handleSendOtp}
                        layout="vertical"
                        requiredMark={false}
                      >
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your email",
                            },
                            { type: "email", message: "Enter a valid email" },
                          ]}
                        >
                          <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder="Enter your email"
                            size="large"
                          />
                        </Form.Item>

                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={isOtpSendPending}
                          size="large"
                          block
                        >
                          Send OTP
                        </Button>
                      </Form>
                    ) : (
                      <div>
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            OTP sent to <strong>{emailForOtp}</strong>
                          </p>
                        </div>

                        <Form
                          name="otp-verify"
                          onFinish={handleVerifyOtp}
                          layout="vertical"
                        >
                          <Form.Item
                            name="otp"
                            label="Verification Code"
                            rules={[
                              {
                                required: true,
                                message: "Please enter the OTP",
                              },
                            ]}
                          >
                            <Input
                              prefix={
                                <SafetyOutlined className="text-gray-400" />
                              }
                              placeholder="Enter 6-digit code"
                              size="large"
                              maxLength={6}
                            />
                          </Form.Item>

                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            block
                          >
                            Verify & Sign In
                          </Button>

                          <Button
                            type="link"
                            onClick={() => {
                              setOtpSent(false);
                              setEmailForOtp("");
                            }}
                            block
                          >
                            Use a different email
                          </Button>
                        </Form>
                      </div>
                    )}
                  </>
                ),
              },
            ]}
          />

          {/* <Text className="block text-center text-sm mt-4">
            Don&apos; t have an account?{" "}
            <Link href="/auth/Register" strong>
              Sign up
            </Link>
          </Text> */}
        </div>
      </div>
    </div>
  );
}

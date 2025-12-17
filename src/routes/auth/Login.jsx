import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button, Form, Input, Alert, Typography } from "antd";
import { SafetyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Tabs, message, Space, Select } from "antd";
import { useSendMobileOtp } from "@/features/auth/auth.query";
import EmailPasswordLoginForm from "@/features/auth/components/EmailPasswordLoginForm";

const { Title, Text } = Typography;

export const Route = createFileRoute("/auth/Login")({
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
  const [mobileOtpPayload, setMobileOtpPayload] = useState({
    country_code: null,
    phone_number: null,
  });

  const {
    mutate: sendOtp,
    isPending: isOtpSendPending,
    // isSuccess: isOtpSendSuccess,
  } = useSendMobileOtp({
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
    setMobileOtpPayload(values);
    sendOtp(values);
  };

  const handleVerifyOtp = async (values) => {
    setLoading(true);
    try {
      await auth.auth.verifyMobileOtp({
        country_code: mobileOtpPayload?.country_code,
        phone_number: mobileOtpPayload?.phone_number,
        otp_code: values?.otp_code,
      });
      // Navigate to the redirect URL using router navigation
      setTimeout(() => {
        navigate({ to: redirect });
      }, 0);
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-gray-50 to-gray-100 p-4">
      {/* <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-[#f0a991] to-[#1024dd] p-4"> */}
      <div className="w-full max-w-4xl bg-[#ffedd9] shadow-2xl rounded-4xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[495px]">
        {/* LEFT SIDE — IMAGE (hidden on small screens) */}
        <div className="hidden md:flex items-center justify-center p-4">
          <img
            src="/app_default_image.png"
            alt="App preview"
            className="max-w-[70%] h-auto object-contain mx-auto"
          />
        </div>
        {/* RIGHT SIDE — LOGIN FORM */}
        <div className="p-8 md:p-10 bg-white">
          <Title level={2} style={{ textAlign: "center", marginBottom: 4 }}>
            Sign In
          </Title>

          <Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: 16,
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
            className="login"
            centered
            items={[
              {
                key: "password",
                label: "Password",
                children: (
                  <EmailPasswordLoginForm
                    form={form}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                ),
              },
              {
                key: "otp",
                label: "OTP",
                children: (
                  <>
                    {!otpSent ? (
                      <Form
                        size="large"
                        name="otp-request"
                        onFinish={handleSendOtp}
                        layout="vertical"
                        requiredMark={false}
                        initialValues={{
                          country_code: "91",
                        }}
                      >
                        <Form.Item
                          name="phone_number"
                          label="Phone Number"
                          rules={[
                            {
                              required: true,
                              message: "Please input your phone number!",
                            },
                            {
                              pattern: /^[0-9]{10}$/,
                              message:
                                "Please enter a valid 10-digit phone number",
                            },
                          ]}
                        >
                          {/* Demo only, real usage should wrap as custom component */}
                          <Space.Compact block>
                            <Form.Item
                              name="country_code"
                              noStyle
                              rules={[
                                {
                                  required: true,
                                  message: "Please select a country code!",
                                },
                              ]}
                            >
                              <Select
                                style={{ width: 70 }}
                                options={[{ label: "+91", value: "91" }]}
                              />
                            </Form.Item>
                            <Input
                              style={{ width: "100%" }}
                              placeholder="Enter phone number"
                            />
                          </Space.Compact>
                        </Form.Item>

                        <Button
                          className="login-button"
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
                          size="large"
                        >
                          <Form.Item
                            name="otp_code"
                            label="Verification Code"
                            rules={[
                              {
                                required: true,
                                message: "Please enter the OTP",
                              },
                              {
                                pattern: /^[0-9]{6}$/,
                                message:
                                  "Please enter a valid 6-digit verification code",
                              },
                            ]}
                          >
                            <Input
                              prefix={
                                <SafetyOutlined className="text-gray-400" />
                              }
                              placeholder="Enter 6-digit code"
                              maxLength={6}
                            />
                          </Form.Item>

                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            className="login-button"
                          >
                            Verify & Sign In
                          </Button>

                          <Button
                            type="link"
                            onClick={() => {
                              setOtpSent(false);
                              setEmailForOtp("");
                            }}
                            size="small"
                            block
                            style={{
                              marginTop: "0.5rem",
                            }}
                          >
                            Use a different phone number
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

/* eslint-disable react/prop-types */
import { useChangePassword } from "@/features/users/users.query";
import { changePasswordSchema } from "@/features/users/users.schema";
import { applyZodErrorsToForm } from "@/utils/formError.util";
import { Modal, Form, Input, Button, message } from "antd";
import { memo } from "react";

function ChangePasswordModal({ open, onClose }) {
  const [form] = Form.useForm();
  const { mutate, isPending } = useChangePassword({
    onSuccess: () => {
      message.success("Password changed successfully");
      form.resetFields();
      onClose?.();
    },
  });

  const handleFinish = async (values) => {
    try {
      await form.validateFields();
      // Validate using Zod schema
      const parsed = changePasswordSchema.parse(values);

      mutate(parsed);
    } catch (err) {
      if (err.name === "ZodError") {
        applyZodErrorsToForm(form, err);
        message.error("Fix the errors and try again.");
      } else {
        message.error(err?.message || "Something went wrong");
      }
    }
  };

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnHidden
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        disabled={isPending}
      >
        {/* Old Password */}
        <Form.Item
          rules={[{ required: true, message: "Old password is required" }]}
          label="Old Password"
          name="old_password"
        >
          <Input.Password placeholder="Enter old password" />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          dependencies={["old_password"]}
          rules={[
            { required: true, message: "New password is required" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("old_password") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("New password must be different from old password")
                );
              },
            }),
          ]}
          label="New Password"
          name="new_password"
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          dependencies={["new_password"]}
          rules={[
            { required: true, message: "Confirm password is required" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
          label="Confirm Password"
          name="confirm_password"
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-3">
          <Button onClick={onClose}>Cancel</Button>

          <Button type="primary" htmlType="submit" loading={isPending}>
            Change Password
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default memo(ChangePasswordModal);

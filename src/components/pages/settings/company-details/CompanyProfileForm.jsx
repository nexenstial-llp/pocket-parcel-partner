import { Form, Input, Upload, Typography, Button, message } from "antd";
import {
  InfoCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Text } = Typography;

const CompanyProfileForm = () => {
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle file upload
  const handleUpload = async (file) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("logo", file);

    try {
      // Replace this with your actual API endpoint
      const response = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setLogoUrl(data.logoUrl);
        message.success("Logo uploaded successfully!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Failed to upload logo. Please try again.");
    } finally {
      setUploading(false);
    }

    return false;
  };

  // Handle logo removal
  const handleRemoveLogo = () => {
    setLogoUrl(null);
    message.success("Logo removed successfully");
  };

  // Preview file before upload
  const handlePreview = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoUrl(e.target.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const uploadProps = {
    name: "logo",
    accept: "image/png,image/jpeg,image/jpg,image/svg+xml",
    maxCount: 1,
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files (PNG, JPG, JPEG, SVG)!");
        return Upload.LIST_IGNORE;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
        return Upload.LIST_IGNORE;
      }

      handlePreview(file);
      handleUpload(file);

      return false;
    },
  };

  // Handle form submission
  const handleFinish = async (values) => {
    setLoading(true);
    try {
      // Prepare data to send
      const dataToSend = {
        ...values,
        logoUrl: logoUrl, // Include logo URL
      };

      console.log("Form data to submit:", dataToSend);

      // Replace with your actual API endpoint
      const response = await fetch("/api/update-company-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        message.success("Company profile updated successfully!");
        setIsUpdate(false); // Exit edit mode
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Save error:", error);
      message.error("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel - reset form to initial values
  const handleCancel = () => {
    form.resetFields();
    setLogoUrl(null);
    setIsUpdate(false);
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        name="companyProfileForm"
        onFinish={handleFinish}
        disabled={!isUpdate}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Section - 8 columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Registered Company Name */}
              <Form.Item
                rules={[
                  { required: true, message: "Please enter company name" },
                ]}
                label={
                  <span className="font-medium text-gray-800">
                    Registered Company Name
                  </span>
                }
                name="companyName"
              >
                <Input placeholder="Enter Company Name" className="w-full" />
              </Form.Item>

              {/* Company Email ID */}
              <Form.Item
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
                label={
                  <span className="font-medium text-gray-800">
                    Company Email ID
                  </span>
                }
                name="companyEmail"
              >
                <Input
                  type="email"
                  placeholder="Enter Email ID"
                  className="w-full"
                />
              </Form.Item>

              {/* Brand Name */}
              <Form.Item
                label={
                  <span className="font-medium text-gray-800">
                    Brand Name
                    <small className="pl-1 text-gray-500 font-normal">
                      (Optional)
                    </small>
                    <InfoCircleOutlined
                      className="ml-2 text-gray-400 cursor-pointer text-xs"
                      title="Your brand name as it appears to customers"
                    />
                  </span>
                }
                name="brandName"
              >
                <Input placeholder="Enter Brand name" className="w-full" />
              </Form.Item>

              {/* Website */}
              <Form.Item
                rules={[
                  {
                    type: "url",
                    message: "Please enter a valid URL",
                  },
                ]}
                label={
                  <span className="font-medium text-gray-800">
                    Website
                    <small className="pl-1 text-gray-500 font-normal">
                      (Optional)
                    </small>
                  </span>
                }
                name="website"
              >
                <Input placeholder="Enter Website link" className="w-full" />
              </Form.Item>
            </div>
          </div>

          {/* Logo Upload Section - 4 columns */}
          <div className="lg:col-span-4">
            <div className="mb-3">
              <span className="font-medium text-gray-800">Company Logo</span>
              <small className="pl-1 text-gray-500">(Optional)</small>
            </div>

            {!logoUrl ? (
              <div className="flex flex-col gap-3">
                <Text className="text-gray-500 text-xs">No logo uploaded</Text>
                <Upload {...uploadProps} disabled={!isUpdate}>
                  <Button
                    icon={<UploadOutlined />}
                    loading={uploading}
                    className="w-full sm:w-auto"
                    disabled={!isUpdate}
                  >
                    {uploading ? "Uploading..." : "Upload Logo"}
                  </Button>
                </Upload>
                <Text className="text-gray-400 text-xs mt-1">
                  Supported formats: PNG, JPG, JPEG, SVG (Max 2MB)
                </Text>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="relative w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                  <img
                    src={logoUrl}
                    alt="Company Logo"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                {isUpdate && (
                  <div className="flex gap-2">
                    <Upload {...uploadProps}>
                      <Button
                        icon={<UploadOutlined />}
                        size="small"
                        loading={uploading}
                      >
                        {uploading ? "Uploading..." : "Change"}
                      </Button>
                    </Upload>
                    <Button
                      icon={<DeleteOutlined />}
                      size="small"
                      danger
                      onClick={handleRemoveLogo}
                    >
                      Remove
                    </Button>
                  </div>
                )}
                <Text className="text-gray-400 text-xs">
                  PNG, JPG, JPEG, SVG (Max 2MB)
                </Text>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          {isUpdate && (
            <>
              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
                disabled={uploading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handleCancel} disabled={loading || uploading}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </Form>
      {!isUpdate && (
        <Button onClick={() => setIsUpdate(true)} type="primary">
          Update
        </Button>
      )}
    </div>
  );
};

export default CompanyProfileForm;

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Upload, message, Modal } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useUploadFile } from "@/features/upload/upload.query";
import { UPLOAD_TYPES } from "@/features/upload/upload.service";
import AWSImage from "@/components/ui/AWSImage";
import { cn } from "@/utils/classname.util";

/**
 * AWSUpload Component
 *
 * A reusable component for uploading images/files to AWS S3.
 * Supports controlled constraints (value/onChange) for integration with Forms.
 *
 * @param {string | string[]} value - The current S3 key(s). String for single, Array for multiple.
 * @param {function} onChange - Callback when upload completes or changes: (s3Key | s3Key[]) => void
 * @param {string} uploadType - The type of upload (from UPLOAD_TYPES)
 * @param {number} maxCount - Max number of files
 * @param {boolean} multiple - Support multiple files
 * @param {string} listType - Antd Upload listType
 * @param {object} uploadProps - Partial props to pass to Antd Upload
 * @param {ReactNode} customButton - Custom upload button content
 */
export default function AWSUpload({
  value,
  onChange,
  uploadType = UPLOAD_TYPES.GENERAL,
  maxCount = 1,
  multiple = false,
  listType = "picture-card",
  className,
  uploadProps = {},
  customButton,
  disabled = false,
}) {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  //   const [previewTitle, setPreviewTitle] = useState("");
  const previewS3Key = previewImage?.startsWith("https")
    ? previewImage.split(
        "https://s3.ap-south-1.amazonaws.com/pp-s3.pocketparcel.in/"
      )[1]
    : previewImage;

  const uploadMutation = useUploadFile(uploadType);

  // Sync internal fileList with external value prop
  useEffect(() => {
    // Determine if we need to sync to avoid overriding upload progress states
    // We only sync if the value represents a different set of keys than what we have in fileList (filtering out active uploads)

    const currentKeys = fileList
      .filter((f) => f.status === "done" && f.url)
      .map((f) => f.url);

    let incomingKeys = [];
    if (value) {
      incomingKeys = Array.isArray(value) ? value : [value];
    }

    const isSame =
      currentKeys.length === incomingKeys.length &&
      currentKeys.every((key) => incomingKeys.includes(key));

    if (!isSame) {
      // Re-construct fileList from value
      const newFileList = incomingKeys.map((key, index) => ({
        uid: key || `existing-${index}`,
        name: key || "Image",
        status: "done",
        url: key, // We store S3 Key in url for existing items to be picked up by itemRender
      }));
      setFileList(newFileList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleCustomRequest = async ({ file, onSuccess, onError }) => {
    uploadMutation.mutate(
      { file },
      {
        onSuccess: (data) => {
          onSuccess(data, file);
          message.success("Upload successful");
          // The onChange handling logic in handleChange will pick this up
        },
        onError: (error) => {
          console.error(error);
          onError(error);
          message.error("Upload failed");
        },
      }
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Filter success files to emit values
    const doneFiles = newFileList.filter(
      (file) => file.status === "done" || file.status === "success"
    );

    // Map to S3 Keys.
    // Access s3Key from response (newly uploaded) or url (existing)
    const keys = doneFiles
      .map((file) => {
        if (file.response && file.response.s3Key) {
          return file.response.s3Key;
        }
        return file.url;
      })
      .filter(Boolean);

    // Only trigger onChange if there are no active uploads (pending/uploading)
    const isUploading = newFileList.some((f) => f.status === "uploading");

    if (onChange && !isUploading) {
      if (multiple) {
        onChange(keys);
      } else {
        onChange(keys.length > 0 ? keys[0] : null);
      }
    }
  };

  const handlePreview = async (file) => {
    let preview = file.url || file.preview;

    if (!preview && file.originFileObj) {
      preview = await getBase64(file.originFileObj);
      file.preview = preview;
    }

    // New upload case: use response s3Key if available
    if (!preview && file.response && file.response.s3Key) {
      preview = file.response.s3Key;
    }

    setPreviewImage(preview);
    setPreviewOpen(true);
    // setPreviewTitle(
    //   file.name ||
    //     (file.url ? file.url.substring(file.url.lastIndexOf("/") + 1) : "Image")
    // );
  };

  const handleCancel = () => setPreviewOpen(false);

  // Custom Item Render for existing S3 images
  const itemRender = (originNode, file, fileList, actions) => {
    // If it's a "done" file and has a URL that looks like an S3 key (no protocol), use AWSImage
    const isS3Key =
      file.url &&
      !file.url.startsWith("blob:") &&
      !file.url.startsWith("data:") &&
      !file.originFileObj;

    if (isS3Key) {
      return (
        <div className="ant-upload-list-item ant-upload-list-item-done group relative border border-gray-200 rounded-lg overflow-hidden h-full">
          <div className="w-full h-full p-1 flex items-center justify-center bg-gray-50">
            <AWSImage
              s3Key={file.url}
              className="w-full h-full object-cover rounded-md"
              preview={false}
              alt={file.name}
            />
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 bg-black/50 flex items-center justify-center gap-3">
            <span
              className="text-white cursor-pointer hover:text-indigo-400 transition-colors z-20"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handlePreview(file);
              }}
              title="Preview"
            >
              <EyeOutlined className="text-lg" />
            </span>
            {!disabled && (
              <span
                className="text-white cursor-pointer hover:text-red-400 transition-colors z-20"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  actions.remove();
                }}
                title="Remove"
              >
                <DeleteOutlined className="text-lg" />
              </span>
            )}
          </div>
        </div>
      );
    }

    return originNode;
  };

  const uploadButton = (
    <div>
      {uploadMutation.isPending ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        listType={listType}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={handleCustomRequest}
        itemRender={itemRender}
        maxCount={maxCount}
        multiple={multiple}
        disabled={disabled}
        className={cn("aws-upload-component", className)}
        accept="image/*,.pdf" // Default accept
        {...uploadProps}
      >
        {fileList.length >= maxCount ? null : customButton || uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        // title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        {/* If previewImage is an S3 Key, render AWSImage */}
        {previewS3Key &&
        !previewS3Key.startsWith("blob:") &&
        !previewS3Key.startsWith("data:") &&
        !previewS3Key.startsWith("http") ? (
          <AWSImage s3Key={previewS3Key} width="100%" preview={false} />
        ) : (
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        )}
      </Modal>
    </>
  );
}

// Utility for previewing local files
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

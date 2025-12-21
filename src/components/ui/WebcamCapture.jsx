import { useState, useRef, useEffect } from "react";
import { Button, Modal, message, Spin } from "antd";
import {
  CameraOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useUploadFile } from "@/features/upload/upload.query";
import { UPLOAD_TYPES } from "@/features/upload/upload.service";
import AWSImage from "@/components/ui/AWSImage";

/**
 * WebcamCapture Component
 *
 * Captures images from the webcam, uploads them to AWS S3, and returns the S3 keys.
 *
 * @param {string[]} value - Array of S3 keys
 * @param {function} onChange - Callback (keys) => void
 * @param {number} maxCount - Max number of images
 */
export default function WebcamCapture({ value = [], onChange, maxCount = 5 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const uploadMutation = useUploadFile(UPLOAD_TYPES.GENERAL);

  // Stop stream when modal closes or component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      message.error("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    startCamera();
  };

  const handleCloseModal = () => {
    stopCamera();
    setIsModalOpen(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          message.error("Failed to capture image");
          return;
        }

        // Create a File object
        const file = new File([blob], `capture-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });

        // Upload
        setUploading(true);
        try {
          await uploadMutation.mutateAsync(
            { file },
            {
              onSuccess: (data) => {
                const s3Key = data.s3Key;
                const newValues = [...(value || []), s3Key];
                onChange?.(newValues);
                message.success("Image captured and uploaded");
              },
              onError: (error) => {
                console.error(error);
                message.error("Failed to upload image");
              },
            }
          );
        } catch (error) {
          // XMLHttp error or other issues
          console.error("Upload error:", error);
        } finally {
          setUploading(false);
        }
      },
      "image/jpeg",
      0.8
    );
  };

  const handleRemove = (keyToRemove) => {
    const newValues = (value || []).filter((key) => key !== keyToRemove);
    onChange?.(newValues);
  };

  const currentCount = (value || []).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Image Grid */}
      <div className="flex flex-wrap gap-4">
        {(value || []).map((s3Key, index) => (
          <div
            key={s3Key || index}
            className="relative w-24 h-24 border rounded-lg overflow-hidden group"
          >
            <AWSImage
              s3Key={s3Key}
              className="w-full h-full object-cover"
              preview={true}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="text"
                icon={<DeleteOutlined className="text-white text-lg" />}
                onClick={() => handleRemove(s3Key)}
                danger
              />
            </div>
          </div>
        ))}

        {/* Add Button */}
        {currentCount < maxCount && (
          <div
            className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors bg-gray-50"
            onClick={handleOpenModal}
          >
            <CameraOutlined className="text-2xl mb-1" />
            <span className="text-xs">Take Photo</span>
          </div>
        )}
      </div>

      {/* Capture Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        title="Take Photo"
        destroyOnClose
        centered
        width={600}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
            {!stream && <Spin />}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
            />
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="flex justify-center w-full">
            <Button
              type="primary"
              icon={uploading ? <LoadingOutlined /> : <CameraOutlined />}
              size="large"
              shape="round"
              onClick={captureImage}
              disabled={!stream || uploading}
            >
              {uploading ? "Uploading..." : "Capture"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

import PropTypes from "prop-types";

WebcamCapture.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  maxCount: PropTypes.number,
};

/* eslint-disable react/prop-types */
import { useGetPresignedUrl } from "@/features/upload/upload.query";
import { cn } from "@/utils/classname.util";
import { FileImageOutlined, LoadingOutlined } from "@ant-design/icons";
import { Avatar, Image, Skeleton } from "antd";
import { useEffect, useState } from "react";

/**
 * AWSImage - A powerful component to render images from AWS S3 using presigned URLs.
 *
 * @param {string} s3Key - The S3 key of the image.
 * @param {string} mode - Render mode: 'image' (default), 'avatar', 'cover'.
 * @param {boolean} preview - Enable click-to-zoom preview (only for 'image' mode).
 * @param {string} className - Custom CSS classes.
 * @param {number|string} width - Image width.
 * @param {number|string} height - Image height.
 * @param {string} alt - Alt text.
 * @param {object} fallback - Custom fallback element on error.
 * @param {string} shape - Avatar shape (only for 'avatar' mode).
 * @param {number|string} size - Avatar size (only for 'avatar' mode).
 */
const AWSImage = ({
  s3Key,
  mode = "image",
  preview = true,
  className,
  width,
  height,
  alt = "AWS Image",
  fallback,
  shape = "square",
  size,
  ...props
}) => {
  const { data: imageUrl, isLoading, isError } = useGetPresignedUrl({ s3Key });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [s3Key]);

  if (!s3Key) return null;

  // Loading State
  if (isLoading) {
    if (mode === "avatar") {
      return <Skeleton.Avatar active shape={shape} size={size} />;
    }
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-50 rounded animate-pulse",
          className
        )}
        style={{ width, height: height || "100%", minHeight: 100 }}
      >
        <LoadingOutlined className="text-gray-400 text-xl" />
      </div>
    );
  }

  // Error State
  if (isError || hasError || !imageUrl) {
    if (fallback) return fallback;
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 rounded text-gray-400 border border-gray-200",
          className
        )}
        style={{ width, height: height || "100%", minHeight: 100 }}
      >
        <FileImageOutlined className="text-2xl" />
      </div>
    );
  }

  // Render Modes
  if (mode === "avatar") {
    console.log("avatar");
    return (
      <Avatar
        src={imageUrl}
        alt={alt}
        className={cn("shadow-sm border", className)}
        shape={shape}
        size={size}
        onError={() => {
          setHasError(true);
          return true;
        }}
        {...props}
      />
    );
  }

  if (mode === "cover") {
    return (
      <div
        className={cn("bg-cover bg-center bg-no-repeat", className)}
        style={{
          backgroundImage: `url(${imageUrl})`,
          width,
          height,
        }}
        {...props}
      />
    );
  }

  // Default: Ant Design Image
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      preview={preview}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

export default AWSImage;

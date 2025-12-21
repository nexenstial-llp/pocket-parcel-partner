/* eslint-disable react/prop-types */
import { useGetDownloadUrl } from "@/features/upload/upload.query";
import { cn } from "@/utils/classname.util";
import { FileImageOutlined, LoadingOutlined } from "@ant-design/icons";
import { Avatar, Image, Skeleton } from "antd";
import { useEffect, useState } from "react";

/**
 * AWSImage - A powerful component to render images from AWS S3 using presigned URLs.
 *
 * @param {string} s3Key
 * @param {string} mode - 'image' | 'avatar' | 'cover'
 * @param {boolean} preview
 * @param {string} className
 * @param {number|string} width
 * @param {number|string} height
 * @param {string} alt
 * @param {object} fallback
 * @param {string} shape
 * @param {number|string} size
 */
const AWSImage = ({
  s3Key,
  expiresIn = 3600,
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
  const [imageUrl, setImageUrl] = useState(null);
  const [hasError, setHasError] = useState(false);
  const { mutate, isPending, isError } = useGetDownloadUrl({
    onSuccess: (url) => {
      setImageUrl(url);
    },
  });

  // SAME behavior as before: refetch when s3Key changes
  useEffect(() => {
    if (!s3Key) return;

    setHasError(false);
    setImageUrl(null);
    mutate({ s3_key: s3Key, expiresIn });
  }, [s3Key, expiresIn, mutate]);

  if (mode == "avatar" && !s3Key) {
    return <Avatar shape={shape} size={size} />;
  }

  if (!s3Key) return null;

  /* ---------------- Loading State ---------------- */
  if (isPending) {
    if (mode === "avatar") {
      return <Skeleton.Avatar active shape={shape} size={size} />;
    }

    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-50 rounded animate-pulse",
          className
        )}
        style={{
          width: width || size,
          height: height || "100%",
          minHeight: size || 60,
        }}
      >
        <LoadingOutlined className="text-gray-400 text-xl" />
      </div>
    );
  }

  /* ---------------- Error State ---------------- */
  if (isError || hasError || !imageUrl) {
    if (fallback) return fallback;

    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 rounded text-gray-400 border border-gray-200",
          className
        )}
        style={{
          width: width || size,
          height: height || "100%",
          minHeight: size || 60,
        }}
      >
        <FileImageOutlined className="text-2xl" />
      </div>
    );
  }

  /* ---------------- Render Modes ---------------- */
  if (mode === "avatar") {
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

  /* ---------------- Default Image ---------------- */
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

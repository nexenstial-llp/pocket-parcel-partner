// uploadService.js - AWS S3 Upload Service (Your API Structure)
import axiosInstance from "@/utils/axiosInstance.util";
import axios from "axios";
import toast from "react-hot-toast";

// ============================================
// MAIN UPLOAD FUNCTION - Using Your APIs
// ============================================

/**
 * Upload file to S3 using your presigned URL API
 * @param {File} file - The file to upload
 * @param {string} uploadType - Type of upload (e.g., 'courier_logo', 'product_image', etc.)
 * @param {function} onProgress - Progress callback function
 * @returns {Promise<object>} - Returns { s3Key, fileUrl, fileName, fileSize, fileType }
 */
export const uploadFileToS3 = async (file, uploadType, onProgress) => {
  try {
    // Step 1: Get presigned URL from your backend
    const { data } = await axiosInstance.get(
      "/v1/mobile/upload/asset/getuploadurl",
      {
        params: {
          filename: file.name,
          uploadType: uploadType || "general",
        },
      }
    );

    // Extract presigned URL and S3 key from response
    // Adjust based on your actual API response structure
    const presignedUrl = data.data?.presignedUrl;
    const s3Key = data.data?.s3Key;

    if (!presignedUrl) {
      throw new Error("Failed to get presigned URL");
    }

    // Step 2: Upload file directly to S3 using presigned URL
    await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      transformRequest: (data, headers) => {
        delete headers.common?.Authorization;
        delete headers.Authorization;
        return data;
      },

      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (onProgress) {
            onProgress(percentCompleted);
          }
        }
      },
    });

    // Step 3: Get the public URL (remove query params from presigned URL)
    const fileUrl = presignedUrl.split("?")[0];

    toast.success("File uploaded successfully!");

    return {
      s3Key,
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadType,
    };
  } catch (error) {
    console.error("Upload error:", error);

    // Only show toast if not already handled by axiosInstance
    if (!error.response) {
      toast.error("Failed to upload file");
    }

    throw error;
  }
};

// ============================================
// GET ASSET URL - Using Your API
// ============================================

/**
 * Get signed URL for accessing a private asset
 * @param {string} s3Key - The S3 key of the file
 * @param {number} expiresIn - URL expiration time in seconds (default: 3600)
 * @returns {Promise<string>} - Returns the signed URL
 */
export const getAssetUrl = async (s3Key, expiresIn = 3600) => {
  try {
    const { data } = await axiosInstance.get(`/v1/upload/asset/${s3Key}`, {
      params: { expiresIn },
      suppressErrorToast: true, // Don't show error toast for this request
    });

    // Extract URL from response - adjust based on your API structure
    const assetUrl = data.data?.url || data.url || data;

    return assetUrl;
  } catch (error) {
    console.error("Get asset URL error:", error);
    toast.error("Failed to get asset URL");
    throw error;
  }
};

// ============================================
// MULTIPLE FILES UPLOAD (Parallel)
// ============================================

/**
 * Upload multiple files in parallel
 * @param {File[]} files - Array of files to upload
 * @param {string} uploadType - Type of upload
 * @param {function} onProgress - Overall progress callback
 * @returns {Promise<Array>} - Returns array of upload results
 */
export const uploadMultipleFiles = async (files, uploadType, onProgress) => {
  try {
    const totalFiles = files.length;
    const progressMap = new Map();

    const uploadPromises = files.map((file, index) => {
      return uploadFileToS3(file, uploadType, (fileProgress) => {
        // Track individual file progress
        progressMap.set(index, fileProgress);

        // Calculate overall progress
        if (onProgress) {
          const totalProgress = Array.from(progressMap.values()).reduce(
            (sum, progress) => sum + progress,
            0
          );
          const overallProgress = Math.round(totalProgress / totalFiles);
          onProgress(overallProgress);
        }
      });
    });

    const results = await Promise.all(uploadPromises);
    toast.success(`All ${totalFiles} files uploaded successfully!`);
    return results;
  } catch (error) {
    console.error("Multiple upload error:", error);
    toast.error("Some files failed to upload");
    throw error;
  }
};

// ============================================
// SEQUENTIAL UPLOAD (One by One)
// ============================================

/**
 * Upload files one by one (sequential)
 * @param {File[]} files - Array of files to upload
 * @param {string} uploadType - Type of upload
 * @param {function} onProgress - Overall progress callback
 * @returns {Promise<Array>} - Returns array of upload results
 */
export const uploadFilesSequential = async (files, uploadType, onProgress) => {
  const results = [];
  const totalFiles = files.length;

  for (let i = 0; i < totalFiles; i++) {
    try {
      const result = await uploadFileToS3(
        files[i],
        uploadType,
        (fileProgress) => {
          if (onProgress) {
            // Calculate overall progress
            const overallProgress = Math.round(
              ((i + fileProgress / 100) / totalFiles) * 100
            );
            onProgress(overallProgress);
          }
        }
      );
      results.push({ ...result, success: true });
    } catch (error) {
      console.error(`Failed to upload file ${i}:`, error);
      results.push({
        fileName: files[i].name,
        error: error.message,
        success: false,
      });
    }
  }

  const successCount = results.filter((r) => r.success).length;
  toast.success(`${successCount}/${totalFiles} files uploaded successfully`);

  return results;
};

// ============================================
// UPLOAD WITH RETRY LOGIC
// ============================================

/**
 * Upload file with automatic retry on failure
 * @param {File} file - The file to upload
 * @param {string} uploadType - Type of upload
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @param {function} onProgress - Progress callback
 * @returns {Promise<object>} - Returns upload result
 */
export const uploadWithRetry = async (
  file,
  uploadType,
  maxRetries = 3,
  onProgress
) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await uploadFileToS3(file, uploadType, onProgress);

      if (attempt > 1) {
        toast.success(`Upload succeeded on attempt ${attempt}`);
      }

      return result;
    } catch (error) {
      lastError = error;
      console.warn(
        `Upload attempt ${attempt}/${maxRetries} failed:`,
        error.message
      );

      if (attempt < maxRetries) {
        // Wait before retrying (exponential backoff: 1s, 2s, 4s...)
        const delay = Math.pow(2, attempt) * 1000;
        toast.loading(`Retrying upload... (${attempt}/${maxRetries})`, {
          duration: delay,
        });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  toast.error(`Upload failed after ${maxRetries} attempts`);
  throw lastError;
};

// ============================================
// Read it from the AWS
// ============================================
export const getPreSignedUrlFromS3Key = async (s3Key, expiresIn = 3600) => {
  const { data } = await axiosInstance.get(`/v1/mobile/upload/asset/${s3Key}`, {
    params: {
      expiresIn,
    },
  });

  // Extract URL from response based on the provided structure
  // Structure: { status: true, message: "...", data: { s3_pre_signed_url: "..." } }
  const assetUrl =
    data?.data?.s3_pre_signed_url ||
    data?.s3_pre_signed_url ||
    data?.data?.url ||
    data?.url;

  return assetUrl;
};

// ============================================
// FILE VALIDATION
// ============================================

/**
 * Validate file before upload
 * @param {File} file - The file to validate
 * @param {object} options - Validation options
 * @returns {boolean} - Returns true if valid, false otherwise
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = [],
    allowedExtensions = [],
  } = options;

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
    toast.error(`File size must be less than ${maxSizeMB}MB`);
    return false;
  }

  // Check file type (if specified)
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    toast.error(`File type ${file.type} is not allowed`);
    return false;
  }

  // Check file extension (if specified)
  if (allowedExtensions.length > 0) {
    const fileName = file.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(ext.toLowerCase())
    );

    if (!hasValidExtension) {
      toast.error(
        `File extension must be one of: ${allowedExtensions.join(", ")}`
      );
      return false;
    }
  }

  return true;
};

// ============================================
// UTILITY: Format File Size
// ============================================

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

// ============================================
// UTILITY: Check if File is Image
// ============================================

export const isImageFile = (fileName) => {
  return /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(fileName);
};

// ============================================
// UTILITY: Get File Extension
// ============================================

export const getFileExtension = (fileName) => {
  return fileName?.split(".").pop()?.toLowerCase() || "";
};

// ============================================
// PRESET UPLOAD TYPES
// ============================================

export const UPLOAD_TYPES = {
  COURIER_LOGO: "courier_logo",
  PRODUCT_IMAGE: "product_image",
  USER_AVATAR: "user_avatar",
  DOCUMENT: "document",
  INVOICE: "invoice",
  GENERAL: "general",
};

// ============================================
// PRESET VALIDATION CONFIGS
// ============================================

export const VALIDATION_CONFIGS = {
  IMAGE: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    allowedExtensions: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  },
  LOGO: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ["image/png", "image/svg+xml", "image/jpeg"],
    allowedExtensions: [".png", ".svg", ".jpg", ".jpeg"],
  },
  DOCUMENT: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    allowedExtensions: [".pdf", ".doc", ".docx"],
  },
  ANY: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [],
    allowedExtensions: [],
  },
};

// ============================================
// EXPORT ALL FUNCTIONS
// ============================================

export default {
  uploadFileToS3,
  getAssetUrl,
  uploadMultipleFiles,
  uploadFilesSequential,
  uploadWithRetry,
  validateFile,
  formatFileSize,
  isImageFile,
  getFileExtension,
  getPreSignedUrlFromS3Key,
  UPLOAD_TYPES,
  VALIDATION_CONFIGS,
};

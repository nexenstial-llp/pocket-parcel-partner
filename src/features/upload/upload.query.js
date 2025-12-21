import { useMutation, useQuery } from "@tanstack/react-query";
import uploadService from "./upload.service";

export const useUploadFile = (
  uploadType = uploadService.UPLOAD_TYPES.GENERAL
) => {
  return useMutation({
    mutationFn: ({ file, onProgress }) =>
      uploadService.uploadFileToS3(file, uploadType, onProgress),
  });
};

export const useGetPresignedUrl = ({ s3Key, expiresIn }) => {
  return useQuery({
    queryKey: ["presigned-url", { s3Key, expiresIn }],
    queryFn: () => uploadService.getPreSignedUrlFromS3Key(s3Key, expiresIn),
    enabled: !!s3Key,
    retry: 0,
  });
};

export const useGetDownloadUrl = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: uploadService.getDownloadUrlFromS3Key,
    onSuccess,
    onError,
    ...rest,
  });
};

import { useMutation, useQuery } from "@tanstack/react-query";
import uploadService from "./upload.service";

export const useUploadFile = (
  uploadType = uploadService.UPLOAD_TYPES.COURIER_LOGO
) => {
  return useMutation({
    mutationFn: ({ file, onProgress }) =>
      uploadService.uploadFileToS3(file, uploadType, onProgress),
  });
};

export const useGetPresignedUrl = ({ s3Key }) => {
  return useQuery({
    queryKey: ["presigned-url", { s3Key }],
    queryFn: () => uploadService.getPreSignedUrlFromS3Key(s3Key),
    enabled: !!s3Key,
    // staleTime: 0,
  });
};

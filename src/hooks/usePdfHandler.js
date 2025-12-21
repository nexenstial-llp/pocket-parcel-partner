import { useState, useCallback } from "react";
import { message } from "antd";
import { handlePdfBlob } from "@/utils/printPdf.util";

/**
 * Hook to handle PDF print / download with built-in loading & error handling
 */
export const usePdfHandler = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processPdf = useCallback(
    async ({
      blob,
      print = false,
      download = false,
      fileName = "document.pdf",
      successMessage,
    }) => {
      if (isProcessing) return;

      try {
        setIsProcessing(true);

        handlePdfBlob({
          blob,
          print,
          download,
          fileName,
        });

        if (successMessage) {
          message.success(successMessage);
        }
      } catch (error) {
        console.error("PDF handling failed:", error);
        message.error(
          error?.message || "Failed to process PDF. Please try again."
        );
        throw error;
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing]
  );

  return {
    processPdf,
    isProcessing,
  };
};
4;

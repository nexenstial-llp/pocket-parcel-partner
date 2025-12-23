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
      pdfPromise, // NEW: Accept a promise or function that returns a blob
      print = false,
      download = false,
      fileName = "document.pdf",
      successMessage,
    }) => {
      if (isProcessing) return;

      try {
        setIsProcessing(true);

        // Resolve blob if it's a promise or function
        let resolvedBlob = blob;
        if (pdfPromise) {
          resolvedBlob =
            typeof pdfPromise === "function"
              ? await pdfPromise()
              : await pdfPromise;
        }

        if (!resolvedBlob) {
          throw new Error("No PDF data received");
        }

        handlePdfBlob({
          blob: resolvedBlob,
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
        // throw error; // Don't re-throw if we want to just show error toast, but maybe user wants to handle it.
        // For now preventing app crash by not re-throwing if unhandled, but usually re-throw is better if component needs to know.
        // Keeping behavior similar but safer.
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

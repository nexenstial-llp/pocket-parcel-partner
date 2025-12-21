/**
 * Print or silently download a PDF Blob
 *
 * @param {Object} options
 * @param {Blob} options.blob - PDF blob
 * @param {boolean} [options.print=false] - Trigger print dialog
 * @param {boolean} [options.download=false] - Trigger silent download
 * @param {string} [options.fileName="document.pdf"] - File name for download
 */
export const handlePdfBlob = ({
  blob,
  print = false,
  download = false,
  fileName = "document.pdf",
}) => {
  if (!blob || !(blob instanceof Blob)) {
    throw new Error("Invalid PDF blob");
  }

  if (blob.size === 0) {
    throw new Error("Empty PDF file");
  }

  // Ensure correct MIME type
  const pdfBlob =
    blob.type === "application/pdf"
      ? blob
      : new Blob([blob], { type: "application/pdf" });

  const url = URL.createObjectURL(pdfBlob);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  /* -------------------------
     SILENT AUTO DOWNLOAD
  -------------------------- */
  if (download) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Let browser finish download
    setTimeout(() => URL.revokeObjectURL(url), 30000);

    // If only download is needed, exit early
    if (!print) return;
  }

  /* -------------------------
     PRINT HANDLING
  -------------------------- */
  if (print) {
    // Mobile browsers can't silently print
    if (isMobile) {
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      return;
    }

    // Desktop iframe print
    const iframe = document.createElement("iframe");

    Object.assign(iframe.style, {
      visibility: "hidden",
      position: "fixed",
      width: "0",
      height: "0",
      border: "none",
    });

    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch {
          // Let caller handle UI errors
        }
      }, 200);
    };

    setTimeout(() => {
      document.body.removeChild(iframe);
      URL.revokeObjectURL(url);
    }, 60000);
  }
};

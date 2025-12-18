import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import CancelComprehensiveOrderModal from "@/features/orders/components/CancelComprehensiveOrderModal";
import CustomerOrderDetails from "@/features/orders/components/CustomerOrderDetails";
import { useGetOrderById, usePackOrder } from "@/features/orders/orders.query";
import { downloadInvoice } from "@/features/orders/orders.service";
import { DownloadOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Button, message } from "antd";
import { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export const Route = createFileRoute("/_authenticated/orders/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useGetOrderById(id);
  const { mutateAsync: packOrder, isLoading: isPacking } = usePackOrder({
    onSuccess: () => {
      message.success("Order packed successfully");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  const handlePrint = async () => {
    try {
      setIsDownloading(true);
      // 1. Ensure the Blob is explicitly treated as a PDF
      let blob = await downloadInvoice(id);

      if (!blob || blob.size === 0) {
        message.error("Invoice generation failed or file is empty");
        return;
      }

      // Force the type to PDF if the backend didn't set the header correctly
      if (blob.type !== "application/pdf") {
        blob = new Blob([blob], { type: "application/pdf" });
      }

      const url = URL.createObjectURL(blob);

      // 2. Mobile Browser Fallback
      // Hidden iframes often fail to print on iOS/Android due to security sandboxing.
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        window.open(url, "_blank");
        // Note: We can't revoke the URL immediately on mobile as the new tab needs it.
        // A shorter timeout like 1 min is still appropriate here.
        setTimeout(() => URL.revokeObjectURL(url), 60000);
        return;
      }

      // 3. Desktop Iframe Approach
      const iframe = document.createElement("iframe");
      Object.assign(iframe.style, {
        visibility: "hidden", // Do not use display: none; it prevents rendering
        position: "fixed",
        right: "0",
        bottom: "0",
        width: "0",
        height: "0",
        border: "none",
      });

      iframe.src = url;
      document.body.appendChild(iframe);

      iframe.onload = () => {
        try {
          // 4. Slight Delay for Firefox
          // Firefox occasionally renders the iframe content slower than the load event
          // resulting in a blank print if you print immediately.
          setTimeout(() => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
          }, 100);
        } catch (e) {
          console.error("Print failed", e);
          message.error("Failed to trigger print dialog");
        }
      };

      // 5. Cleanup
      // There is no standard "afterprint" event for iframes that works consistently.
      // A 1-minute timeout is the industry standard hack to ensure the user has time
      // to interact with the dialog before we destroy the source.
      setTimeout(() => {
        document.body.removeChild(iframe);
        URL.revokeObjectURL(url);
      }, 60000);
    } catch (error) {
      console.error("PDF Download Failed:", error);
      message.error("PDF Download Failed");
    } finally {
      setIsDownloading(false);
    }
  };

  if (isError) {
    return <ErrorFallback error={error} />;
  }

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Orders", href: "/orders" },
        { title: "Order Details" },
      ]}
    >
      {open && (
        <CancelComprehensiveOrderModal
          open={open}
          onCancel={() => setOpen(false)}
          id={id}
        />
      )}
      <ResponsiveCard
        loading={isLoading}
        title="Order Details"
        extra={
          <div className="flex gap-2">
            {(data?.order?.lifecycle_status === "RECEIVED" ||
              data?.order?.lifecycle_status === "IN_TRANSIT") && (
              <Button
                icon={<IoIosCheckmarkCircleOutline />}
                type="primary"
                onClick={() => packOrder(id)}
                loading={isPacking}
              >
                Verify & Pack Order
              </Button>
            )}
            {data?.order?.order_status !== "CANCELLED" && (
              <Button
                icon={<GiCancel />}
                type="primary"
                onClick={() => setOpen(true)}
              >
                Cancel Order
              </Button>
            )}
            <Button
              icon={<DownloadOutlined />}
              type="primary"
              onClick={handlePrint}
              loading={isDownloading}
            >
              Print Invoice
            </Button>
          </div>
        }
      >
        <CustomerOrderDetails order={data?.order} />
      </ResponsiveCard>
    </PageLayout>
  );
}

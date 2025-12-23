import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import CancelComprehensiveOrderModal from "@/features/orders/components/CancelComprehensiveOrderModal";
import CustomerOrderDetails from "@/features/orders/components/CustomerOrderDetails";
import { useGetOrderById, usePackOrder } from "@/features/orders/orders.query";
import {
  downloadInvoice,
  downloadWaybill,
} from "@/features/orders/orders.service";
import { usePdfHandler } from "@/hooks/usePdfHandler";

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
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useGetOrderById(id);
  const { mutateAsync: packOrder, isPending: isPacking } = usePackOrder({
    onSuccess: () => {
      message.success("Order packed successfully");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
  const { processPdf, isProcessing } = usePdfHandler();

  const handlePrint = async () => {
    const blob = await downloadInvoice(id);

    processPdf({
      blob,
      print: true,
      download: true,
      fileName: `invoice-${id}.pdf`,
      successMessage: "Invoice processed successfully",
    });
  };

  const handleWaybill = async () => {
    processPdf({
      pdfPromise: () => downloadWaybill(id),
      print: true,
      fileName: `waybill-${id}.pdf`,
      successMessage: "Waybill processed successfully",
    });
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
            {/* {data?.order?.lifecycle_status === "PACKED" && (
              <Button
                icon={<DownloadOutlined />}
                type="primary"
                onClick={handlePrint}
                loading={isProcessing}
              >
                Print Invoice
              </Button>
            )} */}
            {/* <Button
              icon={<DownloadOutlined />}
              type="primary"
              onClick={handlePrint}
              loading={isProcessing}
            >
              Print Invoice
            </Button> */}
            <Button
              icon={<DownloadOutlined />}
              type="primary"
              onClick={handleWaybill}
              loading={isProcessing}
              disabled={isProcessing}
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

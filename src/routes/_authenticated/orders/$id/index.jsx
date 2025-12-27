import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import CancelComprehensiveOrderModal from "@/features/orders/components/CancelComprehensiveOrderModal";
import CustomerOrderDetails from "@/features/orders/components/CustomerOrderDetails";
import { useGetOrderById, usePackOrder } from "@/features/orders/orders.query";
import {
  downloadWaybill,
  generateShippingLabel,
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
// const cashFreePaymentMode =
//   import.meta.env.VITE_APP_ENV === "production" ? "production" : "sandbox";
function RouteComponent() {
  const { id } = useParams({ strict: false });
  const [open, setOpen] = useState(false);
  // const [cashfree, setCashfree] = useState(null);
  // const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useGetOrderById(id);
  const { mutate: packOrder, isPending: isPacking } = usePackOrder({
    onSuccess: async () => {
      message.success("Order packed successfully");
      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["order", id],
      });
    },
    onError: (error) => {
      message.error("Failed to pack order", error);
    },
  });

  // Initialize Cashfree SDK
  // useEffect(() => {
  //   const initializeSDK = async () => {
  //     try {
  //       const cashfreeInstance = await load({ mode: cashFreePaymentMode });
  //       setCashfree(cashfreeInstance);
  //     } catch (error) {
  //       console.error("Failed to load Cashfree SDK:", error);
  //     }
  //   };
  //   initializeSDK();
  // }, []);

  // const handlePayNow = async () => {
  //   if (!cashfree) {
  //     message.error("Payment system is loading. Please try again.");
  //     return;
  //   }

  //   try {
  //     setIsPaymentProcessing(true);
  //     const order = data?.order;

  //     // Prepare payment payload
  //     const payload = {
  //       order_id: order?.id,
  //       order_amount: Number(order?.total_amount),
  //       customer_details: {
  //         customer_id: order?.pickup_address?.pickup_phone,
  //         customer_phone: order?.pickup_address?.pickup_phone,
  //         customer_name: order?.pickup_address?.pickup_name,
  //         customer_email:
  //           order?.pickup_address?.pickup_email || "customer@pocketparcel.com",
  //       },
  //     };

  //     const validatedData = createPaymentOrderSchema.parse(payload);

  //     // Create payment session
  //     const sessionData = await createPaymentSession(validatedData);

  //     if (!sessionData?.payment_order?.payment_session_id) {
  //       throw new Error("Failed to generate payment session ID");
  //     }

  //     if (!sessionData?.payment_order?.cf_order_id) {
  //       throw new Error("Failed to generate Cashfree Order ID");
  //     }

  //     // Trigger Cashfree checkout
  //     const checkoutOptions = {
  //       paymentSessionId: sessionData?.payment_order?.payment_session_id,
  //       redirectTarget: "_modal",
  //     };

  //     cashfree.checkout(checkoutOptions).then(async (result) => {
  //       if (result.error) {
  //         message.error("Payment failed or cancelled. Please retry.");
  //         setIsPaymentProcessing(false);
  //       }

  //       if (result.redirect) {
  //         console.log("Payment Redirecting...");
  //       }

  //       if (result.paymentDetails) {
  //         try {
  //           await verifyPayment(sessionData?.payment_order?.cf_order_id);
  //           message.success("Payment completed successfully!");

  //           // Refresh order data
  //           await queryClient.invalidateQueries({
  //             queryKey: ["order", id],
  //           });
  //           await queryClient.invalidateQueries({
  //             queryKey: ["orders"],
  //           });
  //         } catch (err) {
  //           message.error(
  //             err.message ||
  //               "Payment successful but verification failed. Contact support."
  //           );
  //         } finally {
  //           setIsPaymentProcessing(false);
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     message.error(error.message || "Failed to initiate payment");
  //     setIsPaymentProcessing(false);
  //   }
  // };
  const { processPdf } = usePdfHandler();

  const [isWaybillLoading, setIsWaybillLoading] = useState(false);
  const [isLabelLoading, setIsLabelLoading] = useState(false);

  const handleShippingLabel = async () => {
    if (isLabelLoading) return; // Prevent double click
    setIsLabelLoading(true);
    try {
      // Must await here so the 'finally' block doesn't run immediately
      await processPdf({
        pdfPromise: () => generateShippingLabel({ id, format: "pdf" }),
        print: true,
        fileName: `shipping-label-${id}.pdf`,
        successMessage: "Shipping label processed successfully",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLabelLoading(false);
    }
  };
  const handleWaybill = async () => {
    if (isWaybillLoading) return; // Prevent double click
    setIsWaybillLoading(true);
    try {
      await processPdf({
        pdfPromise: () => downloadWaybill(id),
        print: true,
        fileName: `waybill-${id}.pdf`,
        successMessage: "Waybill processed successfully",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsWaybillLoading(false);
    }
  };

  // const isPendingPayment = data?.order?.payment_status === "PENDING";

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
            {/* {isPendingPayment && (
              <Button
                icon={<RiBillLine />}
                type="primary"
                onClick={handlePayNow}
                loading={isPaymentProcessing}
                className="bg-green-600 hover:bg-green-700"
              >
                Pay Now (₹{data?.order?.total_amount})
              </Button>
            )} */}
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
              onClick={handleWaybill}
              loading={isWaybillLoading}
              disabled={isWaybillLoading}
            >
              Print Invoice
            </Button>
            <Button
              icon={<DownloadOutlined />}
              type="primary"
              onClick={handleShippingLabel}
              loading={isLabelLoading}
              disabled={isLabelLoading}
            >
              Shipping Label
            </Button>
          </div>
        }
      >
        <CustomerOrderDetails order={data?.order} />
      </ResponsiveCard>
    </PageLayout>
  );
}

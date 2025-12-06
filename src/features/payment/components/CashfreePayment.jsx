import { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import {
  useCreatePaymentSession,
  useVerifyPayment,
} from "@/features/payment/payment.query";
import { Button, message } from "antd";

let cashfree;

const initializeCashfree = async () => {
  cashfree = await load({
    mode: "sandbox",
  });
};

initializeCashfree();

export default function CashfreePayment({
  orderId,
  amount,
  currency = "INR",
  customerId,
  customerPhone,
  customerName,
  customerEmail,
  returnUrl,
  notifyUrl,
  onSuccess,
  onFailure,
  btnText = "Pay Now",
  className = "",
  style = {},
  disabled = false,
}) {
  const [loading, setLoading] = useState(false);

  const { mutateAsync: createSession } = useCreatePaymentSession();
  const { mutateAsync: verifyPayment } = useVerifyPayment();

  const handlePayment = async () => {
    if (!cashfree) {
      message.error("Payment SDK not loaded yet");
      return;
    }

    setLoading(true);
    try {
      const validatedData = createPaymentOrderSchema.parse({
        order_id: orderId,
        order_amount: amount,
        currency,
        customer_details: {
          customer_id: customerId,
          customer_phone: customerPhone,
          customer_name: customerName,
          customer_email: customerEmail,
        },
        order_meta: {
          return_url: returnUrl,
          notify_url: notifyUrl,
          payment_methods: "card",
        },
      });
      // 1. Create Payment Session
      const sessionData = await createSession({
        order_id: validatedData.order_id,
        order_amount: validatedData.order_amount,
        currency: validatedData.currency,
        customer_details: validatedData.customer_details,
        order_meta: validatedData.order_meta,
      });
      console.log(sessionData?.payment_order?.payment_session_id);

      if (!sessionData?.payment_order?.payment_session_id) {
        throw new Error("Failed to create payment session");
      }

      // 2. Open Checkout
      const checkoutOptions = {
        paymentSessionId: sessionData.payment_order.payment_session_id,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          // This will handle user closing the popup or other errors
          console.error("Payment Error:", result.error);
          message.error(result.error.message || "Payment failed");
          if (onFailure) onFailure(result.error);
          setLoading(false);
        }
        if (result.redirect) {
          // This will be called when the user is redirected
          console.log("Payment Redirect");
        }
        if (result.paymentDetails) {
          // This is called when payment is completed in the modal
          console.log("Payment Completed", result.paymentDetails);
          verifyPayment(orderId)
            .then((res) => {
              message.success("Payment successful!");
              if (onSuccess) onSuccess(res);
            })
            .catch((err) => {
              message.error("Payment verification failed");
              if (onFailure) onFailure(err);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      });
    } catch (error) {
      console.error("Payment Initiation Error:", error);
      message.error(error.message || "Something went wrong");
      setLoading(false);
      if (onFailure) onFailure(error);
    }
  };

  return (
    <Button
      type="primary"
      onClick={handlePayment}
      loading={loading}
      disabled={disabled}
      className={className}
      style={style}
    >
      {btnText}
    </Button>
  );
}

import PropTypes from "prop-types";
import { createPaymentOrderSchema } from "@/features/payment/payment.schema";

CashfreePayment.propTypes = {
  orderId: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string,
  customerId: PropTypes.string,
  customerPhone: PropTypes.string,
  customerName: PropTypes.string,
  customerEmail: PropTypes.string,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
  btnText: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  returnUrl: PropTypes.string,
  notifyUrl: PropTypes.string,
};

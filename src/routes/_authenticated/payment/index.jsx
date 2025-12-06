import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import CashfreePayment from "@/features/payment/components/CashfreePayment";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Result } from "antd";
import z from "zod";

const searchSchema = z.object({
  orderId: z.string().optional(),
  amount: z.number().optional(),
});

export const Route = createFileRoute("/_authenticated/payment/")({
  component: PaymentPage,
  validateSearch: (search) => searchSchema.parse(search),
});

function PaymentPage() {
  const { orderId, amount } = useSearch({ strict: false });

  if (!orderId || !amount) {
    return (
      <PageLayout>
        <ResponsiveCard>
          <Result
            status="warning"
            title="Invalid Payment Request"
            subTitle="Order ID and Amount are required to process payment."
          />
        </ResponsiveCard>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-md mx-auto mt-10">
        <ResponsiveCard title={`Payment for Order #${orderId}`}>
          <div className="flex flex-col gap-6 items-center text-center">
            <div>
              <p className="text-gray-500">Amount to Pay</p>
              <h1 className="text-4xl font-bold text-primary">
                ₹{amount.toFixed(2)}
              </h1>
            </div>

            <div className="w-full">
              <CashfreePayment
                orderId={orderId}
                amount={amount}
                customerId="guest" // Replace with actual user ID
                customerPhone="9999999999" // Replace with actual phone
                customerName="Guest User" // Replace with actual name
                customerEmail="guest@example.com" // Replace with actual email
                onSuccess={(data) => {
                  console.log("Payment Success:", data);
                }}
                btnText="Pay Securely"
                className="w-full h-12 text-lg"
                returnUrl=""
                notifyUrl=""
              />
            </div>

            <p className="text-xs text-gray-400">
              Secured by Cashfree Payments
            </p>
          </div>
        </ResponsiveCard>
      </div>
    </PageLayout>
  );
}

import z from "zod";

export const createPaymentOrderSchema = z.object({
  order_id: z.uuid("Invalid order ID").min(1, "Order ID is required"),
  order_amount: z
    .number()
    .positive("Order amount must be positive")
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      "Order amount can have up to 2 decimal places"
    ),
  order_currency: z.string().default("INR").optional(),
  customer_details: z
    .object({
      customer_id: z
        .string()
        .min(1, "Customer ID is required")
        .max(100, "Customer ID must not exceed 100 characters")
        .optional(),
      customer_phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must not exceed 15 digits")
        .regex(/^\d+$/, "Phone number must contain only digits")
        .optional(),
      customer_email: z.email("Invalid email address").optional(),
      customer_name: z
        .string()
        .min(1, "Customer name is required")
        .max(255, "Customer name must not exceed 255 characters")
        .optional(),
    })
    .optional(),
  order_meta: z
    .object({
      return_url: z.url("Invalid return URL").optional(),
      notify_url: z.url("Invalid notify URL").optional(),
      payment_methods: z.string().optional(),
    })
    .optional(),
});

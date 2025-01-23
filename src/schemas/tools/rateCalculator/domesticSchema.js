import { z } from "zod";

export const domesticSchema = z.object({
  shipment_type: z.enum(["forward", "return"], {
    message: "Shipment Type is required",
  }),
  pickup_pincode: z
    .string()
    .regex(/^\d{6}$/, { message: "Pincode must be a 6-digit number" })
    .refine((value) => Number(value) >= 0, {
      message: "Pincode cannot be negative",
    }),
  delivery_pincode: z
    .string()
    .regex(/^\d{6}$/, { message: "Pincode must be a 6-digit number" })
    .refine((value) => Number(value) >= 0, {
      message: "Pincode cannot be negative",
    }),
  actual_weight: z
    .string()
    .regex(/^\d+$/, { message: "Actual should contain only digits" })
    .min(1, { message: "Actual weight is required" })
    .refine((value) => Number(value) >= 0, {
      message: "Weight cannot be negative",
    }),
  length: z
    .string()
    .regex(/^\d+$/, { message: "Length should contain only digits" }) // Restricts to digits
    .refine((value) => Number(value) >= 0, {
      message: "Length cannot be negative",
    }) // Ensures non-negative values
    .optional(), // Allows the field to be optional
  breadth: z
    .string()
    .regex(/^\d+$/, { message: "Breadth should contain only digits" })
    .refine((value) => Number(value) >= 0, {
      message: "Breadth cannot be negative",
    })
    .optional(),
  height: z
    .string()
    .regex(/^\d+$/, { message: "Height should contain only digits" })
    .refine((value) => Number(value) >= 0, {
      message: "Height cannot be negative",
    })
    .optional(),
  payment_type: z.enum(["prepaid", "cash_on_delivery"], {
    message: "Payment Type is required",
  }),
  shipment_value: z
    .string()
    .regex(/^\d+$/, { message: "Height should contain only digits" })
    .min(1, { message: "Shipment Value is required" }),
  shipping_dangerous_goods: z.enum(["yes", "no"], {
    message: "Payment Type is required",
  }),
});

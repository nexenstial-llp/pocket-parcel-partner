import { z } from "zod";

export const internationalSchema = z.object({
  pickup_pincode: z
    .string()
    .regex(/^\d{6}$/, { message: "Pincode must be a 6-digit number" })
    .refine((value) => Number(value) >= 0, {
      message: "Pincode cannot be negative",
    }),
  destination_country: z
    .string()
    .min(1, { message: "Destination country is required" }),
  actual_weight: z
    .string()
    .regex(/^\d+$/, { message: "Actual weight should contain only digits" })
    .min(1, { message: "Actual weight is required" })
    .refine((value) => Number(value) >= 0, {
      message: "Weight cannot be negative",
    }),
  length: z
    .string({ required_error: "Length is required" })
    .regex(/^\d+$/, { message: "Length should contain only digits" })
    .min(1, { message: "Length is required" })
    .refine((value) => Number(value) >= 0, {
      message: "Length cannot be negative",
    }),

  breadth: z
    .string({ required_error: "Breadth is required" })
    .regex(/^\d+$/, { message: "Breadth should contain only digits" })
    .min(1, { message: "Breadth is required" })
    .refine((value) => Number(value) >= 0, {
      message: "Breadth cannot be negative",
    }),

  height: z
    .string({ required_error: "Height is required" })
    .regex(/^\d+$/, { message: "Height should contain only digits" })
    .min(1, { message: "Height is required" })
    .refine((value) => Number(value) >= 0, {
      message: "Height cannot be negative",
    }),
  shipment_purpose: z.string().min(1, "Shipment purpose is required"),
});

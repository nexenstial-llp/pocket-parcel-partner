import z from "zod";

export const createQuickOrderSchema = z.object({
  description: z.string().min(1, "Item description is required"),
  from_name: z.string().min(1, "Pickup contact name is required"),
  from_phone: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine(
      (val) => /^(\+?91)?[6-9]\d{9}$/.test(val),
      "Invalid from phone number (10 digits starting with 6-9, optionally prefixed with +91 or 91)"
    ),
  from_address: z.string().min(1, "Pickup address is required"),
  from_landmark: z.string().optional().default(""),
  from_latitude: z.number().min(-90).max(90, "Invalid latitude"),
  from_longitude: z.number().min(-180).max(180, "Invalid longitude"),
  from_house_number: z.string().optional().default(""),

  to_name: z.string().min(1, "Delivery contact name is required"),
  to_phone: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine(
      (val) => /^(\+?91)?[6-9]\d{9}$/.test(val),
      "Invalid to phone number (10 digits starting with 6-9, optionally prefixed with +91 or 91)"
    ),
  to_address: z.string().min(1, "Delivery address is required"),
  to_landmark: z.string().optional().default(""),
  to_latitude: z.number().min(-90).max(90, "Invalid latitude"),
  to_longitude: z.number().min(-180).max(180, "Invalid longitude"),
  to_house_number: z.string().optional().default(""),

  special_instruction: z.string().max(500).optional().default(""),
  weight: z.number().positive("Weight must be positive"),
  // merchant_order_id is auto-generated, not required in request
  merchant_order_amount: z
    .number()
    .nonnegative("Order amount must be non-negative")
    .default(0),
  payment_mode: z
    .number()
    .int("Payment mode must be an integer")
    .positive("Payment mode must be positive")
    .optional(), // Optional - if not provided, merchant's default will be used
  promo_code: z.string().optional().default(""),
  item_type: z
    .number()
    .int("Item type must be an integer")
    .positive("Item type must be positive"), // Accept any positive integer as Qwqer may have more codes
  item_type_comment: z.string().max(255).optional().default(""),
  pickup_time: z.string().optional(), // Format: "YYYY-MM-DD HH:mm:ss"
});

export const updateQuickOrderSchema = z.object({
  order_key: z.union([
    z.string().min(1, "Order key is required"),
    z.number().int().positive("Order key must be a positive integer"),
  ]),
  // Optional fields that can be modified (same as create order)
  to_phone: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine(
      (val) => /^(\+?91)?[6-9]\d{9}$/.test(val),
      "Invalid to phone number (10 digits starting with 6-9, optionally prefixed with +91 or 91)"
    )
    .optional(),
  to_name: z.string().min(1).optional(),
  to_address: z.string().min(1).optional(),
  to_landmark: z.string().optional(),
  to_latitude: z.number().min(-90).max(90).optional(),
  to_longitude: z.number().min(-180).max(180).optional(),
  to_house_number: z.string().optional(),

  from_phone: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine(
      (val) => /^(\+?91)?[6-9]\d{9}$/.test(val),
      "Invalid from phone number (10 digits starting with 6-9, optionally prefixed with +91 or 91)"
    )
    .optional(),
  from_name: z.string().min(1).optional(),
  from_address: z.string().min(1).optional(),
  from_landmark: z.string().optional(),
  from_latitude: z.number().min(-90).max(90).optional(),
  from_longitude: z.number().min(-180).max(180).optional(),
  from_house_number: z.string().optional(),

  pickup_time: z.string().optional(), // Format: "YYYY-MM-DD HH:mm:ss"
  special_instruction: z.string().max(500).optional(),
  weight: z.number().positive().optional(),
  merchant_order_amount: z.number().nonnegative().optional(),
  payment_mode: z.number().int().positive().optional(),
  promo_code: z.string().optional(),
  item_type: z.number().int().positive().optional(),
  item_type_comment: z.string().max(255).optional(),
  description: z.string().optional(),
});

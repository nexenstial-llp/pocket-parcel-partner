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

export const createComprehensiveOrderSchema = z.object({
  pickup_info: z.object({
    pickup_name: z.string().min(1, "Pickup name is required"),
    pickup_phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits"),
    pickup_email: z
      .string()
      .email("Invalid email")
      .optional()
      .or(z.literal("")),
    pickup_time: z.any().optional(), // Can be string or dayjs object
    pickup_address: z.string().min(1, "Pickup address is required"),
    pickup_landmark: z.string().optional(),
    pickup_pincode: z.string().length(6, "Pincode must be 6 digits"),
    pickup_city: z.string().min(1, "City is required"),
    pickup_district: z.string().optional(),
    pickup_state: z.string().min(1, "State is required"),
    pickup_country: z.string().optional(),
    pickup_lat: z.number().optional(),
    pickup_long: z.number().optional(),
  }),
  drop_info: z.object({
    drop_name: z.string().min(1, "Drop name is required"),
    drop_phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits"),
    drop_email: z.string().email("Invalid email").optional().or(z.literal("")),
    drop_address: z.string().min(1, "Drop address is required"),
    drop_landmark: z.string().optional(),
    drop_pincode: z.string().length(6, "Pincode must be 6 digits"),
    drop_city: z.string().min(1, "City is required"),
    drop_district: z.string().optional(),
    drop_state: z.string().min(1, "State is required"),
    drop_country: z.string().optional(),
    drop_lat: z.number().optional(),
    drop_long: z.number().optional(),
  }),
  shipment_details: z.object({
    delivery_type: z.enum(["FORWARD", "REVERSE"]).default("FORWARD"),
    courier_partner: z.string().optional(), // Can be ID or name
    length: z.number().min(0).optional(),
    breadth: z.number().min(0).optional(),
    height: z.number().min(0).optional(),
    weight: z.number().min(0, "Weight must be positive"),
    items: z
      .array(
        z.object({
          description: z.string().min(1, "Description is required"),
          sku: z.string().optional(),
          cat: z.string().optional(),
          price: z.number().min(0, "Price must be positive"),
          quantity: z.number().min(1, "Quantity must be at least 1"),
          hs_code: z.string().optional(),
          manufacture_country: z.string().optional(),
        })
      )
      .optional(),
  }),
  gst_info: z
    .object({
      seller_gstin: z.string().optional(),
      enterprise_gstin: z.string().optional(),
      consignee_gstin: z.string().optional(),
      taxable_value: z.number().optional(),
      gst_total_tax: z.number().optional(),
      hsn_code: z.string().optional(),
      ewaybill_serial_number: z.string().optional(),
      sgst_amount: z.number().optional(),
      cgst_amount: z.number().optional(),
      igst_amount: z.number().optional(),
      is_seller_registered_under_gst: z.boolean().optional(),
    })
    .optional(),
  additional: z
    .object({
      vendor_code: z.string().optional(),
      order_date: z.any().optional(),
      async: z.boolean().optional(),
      label: z.boolean().optional(),
      return_info: z
        .object({
          return_name: z.string().optional(),
          return_phone: z.string().optional(),
          return_address: z.string().optional(),
          return_city: z.string().optional(),
          return_pincode: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

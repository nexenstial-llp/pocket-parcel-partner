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

export const calculatePriceSchema = z.object({
  from_latitude: z.number().min(-90).max(90, "Invalid from latitude"),
  from_longitude: z.number().min(-180).max(180, "Invalid from longitude"),
  to_latitude: z.number().min(-90).max(90, "Invalid to latitude"),
  to_longitude: z.number().min(-180).max(180, "Invalid to longitude"),
  weight: z.number().positive("Weight must be positive"),
  date_time: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/,
      "Invalid date_time format. Expected: YYYY-MM-DD HH:mm"
    ),
  promo_code: z.string().optional().default(""),
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

// Serviceability Check Schema - Single pincode pair
const serviceabilityPairSchema = z.object({
  pickup_pincode: z
    .string()
    .min(6)
    .max(6)
    .regex(/^\d{6}$/, "Invalid pickup pincode (must be 6 digits)"),
  drop_pincode: z
    .string()
    .min(6)
    .max(6)
    .regex(/^\d{6}$/, "Invalid drop pincode (must be 6 digits)"),
});

// Serviceability Check Schema - Accepts array of pincode pairs (1-100)
export const serviceabilityCheckSchema = z
  .array(serviceabilityPairSchema)
  .min(1, "At least one pincode pair is required")
  .max(100, "Maximum 100 pincode pairs allowed per request");

// ClickPost Order Creation Schema
const pickupInfoSchema = z.object({
  pickup_name: z.string().min(1).max(100),
  pickup_phone: z.string().min(10).max(15),
  email: z.email().nullable(),
  pickup_address: z.string().min(1).max(500),
  pickup_house_number: z.string().max(50).optional(), // House/Building number for QWQER
  pickup_city: z.string().min(1).max(100),
  pickup_state: z.string().min(1).max(100),
  pickup_pincode: z.string().regex(/^\d{6}$/),
  pickup_country: z.string().min(1).max(100).default("India"),
  pickup_lat: z.number().min(-90).max(90),
  pickup_long: z.number().min(-180).max(180),
  pickup_time: z.string().optional(),
  pickup_landmark: z.string().max(255).optional(),
  pickup_district: z.string().max(100).optional(),
  pickup_organisation: z.string().max(100).optional(),
  pickup_address_type: z.enum(["HOME", "WORK", "OTHERS"]).optional(),
  tin: z.string().optional(),
});

const dropInfoSchema = z.object({
  drop_name: z.string().min(1).max(100),
  drop_phone: z.string().min(10).max(15),
  drop_address: z.string().min(1).max(500),
  drop_city: z.string().min(1).max(100),
  drop_state: z.string().min(1).max(100),
  drop_pincode: z.string().regex(/^\d{6}$/),
  drop_country: z.string().min(1).max(100).default("India"),
  drop_email: z.email().optional(),
  drop_lat: z.number().optional(),
  drop_long: z.number().optional(),
  drop_landmark: z.string().max(255).optional(),
  drop_district: z.string().max(100).optional(),
  drop_organisation: z.string().max(100).optional(),
  drop_address_type: z.enum(["HOME", "WORK", "OTHERS"]).optional(),
  drop_start_time: z.string().optional(),
  drop_end_time: z.string().optional(),
  drop_vendor_code: z.string().optional(),
  location_type: z.string().optional(),
  location_value: z.string().optional(),
});

const shipmentDetailsSchema = z.object({
  order_type: z.enum(["COD", "PREPAID", "EXCHANGE", "PICKUP"]),
  delivery_type: z.enum(["FORWARD", "REVERSE", "EXCHANGE"]),
  invoice_value: z.coerce.number().positive(),
  invoice_date: z.string(),
  category_id: z.uuid(), // UUID reference to Category table
  item_ids: z.array(z.uuid()).min(1), // Array of Item UUIDs from catalog
  weight: z.number().positive(), // Total weight in kg
  length: z.number().positive(), // Carton length in cm
  breadth: z.number().positive(), // Carton breadth in cm
  height: z.number().positive(), // Carton height in cm
  cod_value: z.number().min(0).optional(),
  reference_number: z.string().optional(),
  cp_id: z.string().optional(), // Reference to CourierPartner table
  courier_partner_id: z.uuid().optional(),
  clickpost_courier_id: z.number().int().optional(),
  account_code: z.string().optional(),
  courier_partner: z.number().int().optional(),
  offer_code: z.string().optional().default(""),
});

const returnInfoSchema = z.object({
  pincode: z.string().regex(/^\d{6}$/),
  address: z.string().min(1).max(500),
  state: z.string().min(1).max(100),
  phone: z.string().min(10).max(15),
  name: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  lat: z.number().optional(),
  long: z.number().optional(),
  district: z.string().max(100).optional(),
  landmark: z.string().max(255).optional(),
  email: z.string().email().optional(),
});

const userDefinedFieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  value: z.string(),
});

const additionalSchema = z.object({
  warehouse_location_id: z.uuid().optional(), // For walk-in orders: warehouse location to use for pickup
  return_info: returnInfoSchema.optional(),
  special_instructions: z.string().max(1000).optional(),
  enable_whatsapp: z.boolean().optional(),
  is_fragile: z.boolean().optional(),
  is_dangerous: z.boolean().optional(),
  skip_first_mile_pickup: z.boolean().optional(), // Skip QWQER first-mile pickup (for HQ/warehouse orders)
  parcel_images: z.array(z.string().min(1)).max(10).optional(), // S3 keys for parcel images (max 10 images)
  gst_number: z.string().optional(),
  channel_name: z.string().optional(),
  order_date: z.string().optional(),
  label: z.boolean().optional(),
  async: z.boolean().optional(),
  zone: z.string().optional(),
  max_edd: z.number().int().optional(),
  min_edd: z.number().int().optional(),
  invoice_base_64: z.string().optional(),
  is_multi_seller: z.boolean().optional(),
  vendor_code: z.string().optional(),
  store_code: z.string().optional(),
  user_defined_field_array: z.array(userDefinedFieldSchema).optional(),
  estimated_delivery_date: z.string().optional(),
});

const gstInfoSchema = z.object({
  seller_gstin: z.string().optional(),
  taxable_value: z.number().optional(),
  ewaybill_serial_number: z.string().optional(),
  is_seller_registered_under_gst: z.boolean().optional(),
  sgst_tax_rate: z.number().optional(),
  place_of_supply: z.string().optional(),
  gst_discount: z.number().optional(),
  hsn_code: z.string().optional(),
  sgst_amount: z.number().optional(),
  enterprise_gstin: z.string().optional(),
  gst_total_tax: z.number().optional(),
  igst_amount: z.number().optional(),
  cgst_amount: z.number().optional(),
  gst_tax_base: z.number().optional(),
  consignee_gstin: z.string().optional(),
  igst_tax_rate: z.number().optional(),
  invoice_reference: z.string().optional(),
  cgst_tax_rate: z.number().optional(),
  invoice_number: z.string().optional(),
  invoice_date: z.string().optional(),
  invoice_value: z.number().optional(),
  seller_name: z.string().optional(),
  seller_address: z.string().optional(),
  seller_state: z.string().optional(),
  seller_pincode: z.string().optional(),
});
export const createOrderSchema = z.object({
  pickup_info: pickupInfoSchema,
  drop_info: dropInfoSchema,
  shipment_details: shipmentDetailsSchema,
  additional: additionalSchema.optional(),
  gst_info: gstInfoSchema.optional(),
});

export const calculatePriceOfOrderSchema = z.object({
  length: z.number().positive(),
  breadth: z.number().positive(),
  height: z.number().positive(),
  weight: z.number().positive(),
  from_latitude: z.number().min(-90).max(90),
  from_longitude: z.number().min(-180).max(180),
  courier_partner: z.string().optional(),
  to_pincode: z.string().regex(/^\d{6}$/),
  cp_id: z.number().optional(),
  account_code: z.string().optional(),
  offer_code: z.string().optional().default(""),
  skip_first_mile_pickup: z.boolean().optional(),
});

export const orderRecommendationSchema = z.object({
  pickup_pincode: z
    .string()
    .min(6)
    .max(6)
    .regex(/^\d{6}$/, "Invalid pickup pincode"),
  drop_pincode: z
    .string()
    .min(6)
    .max(6)
    .regex(/^\d{6}$/, "Invalid drop pincode"),
  weight: z.union([z.string(), z.number()]),
  length: z.union([z.string(), z.number()]),
  breadth: z.union([z.string(), z.number()]),
  height: z.union([z.string(), z.number()]),
  delivery_type: z.enum(["FORWARD", "RVP"]),
  order_type: z.enum(["PREPAID", "COD"]),
  // Optional fields
  item: z.union([z.string(), z.number()]).optional(),
  invoice_value: z.number().optional().default(0),
  additional: z.any().optional(),
  item_count: z.number().int().min(1).optional(),
  reference_number: z.string().min(1).max(50).optional(), // Optional - will be auto-generated if not provided
});

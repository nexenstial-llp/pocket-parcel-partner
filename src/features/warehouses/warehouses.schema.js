import z from "zod";

// Warehouse type enum validation
const warehouseTypeSchema = z.enum([
  "MAIN",
  "REGIONAL",
  "LOCAL",
  "DISTRIBUTION",
  "SORTING",
  "STORAGE",
]);

// Location type enum validation
const locationTypeSchema = z.enum([
  "MAIN",
  "DOCK",
  "STORAGE",
  "OFFICE",
  "SORTING",
  "LOADING",
]);

// Warehouse location validation schema
const warehouseLocationSchema = z.object({
  location_name: z
    .string()
    .min(1, "Location name is required")
    .max(100, "Location name must be less than 100 characters"),
  address_line1: z
    .string()
    .min(1, "Address line 1 is required")
    .max(255, "Address line 1 must be less than 255 characters"),
  address_line2: z
    .string()
    .max(255, "Address line 2 must be less than 255 characters")
    .optional(),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must be less than 100 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .max(100, "State must be less than 100 characters"),
  pincode: z
    .string()
    .min(6, "Pincode must be at least 6 digits")
    .max(10, "Pincode must be less than 10 digits"),
  country: z
    .string()
    .max(100, "Country must be less than 100 characters")
    .default("India"),
  landmark: z
    .string()
    .max(255, "Landmark must be less than 255 characters")
    .optional(),
  latitude: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .optional(),
  longitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .optional(),
  location_type: locationTypeSchema.default("MAIN"),
  is_primary: z.boolean().default(false),
  is_active: z.boolean().default(true),
  area_size: z
    .string()
    .max(50, "Area size must be less than 50 characters")
    .optional(),
  floor_info: z
    .string()
    .max(100, "Floor info must be less than 100 characters")
    .optional(),
  special_features: z.string().optional(),
});

export const createWarehouseSchema = z.object({
  name: z
    .string()
    .min(1, "Warehouse name is required")
    .max(100, "Warehouse name must be less than 100 characters"),
  code: z
    .string()
    .min(1, "Warehouse code is required")
    .max(20, "Warehouse code must be less than 20 characters")
    .regex(
      /^[A-Z0-9-_]+$/,
      "Warehouse code must contain only uppercase letters, numbers, hyphens, and underscores"
    ),
  description: z.string().optional(),
  contact_person: z
    .string()
    .min(1, "Contact person is required")
    .max(100, "Contact person must be less than 100 characters"),
  contact_phone: z
    .string()
    .min(10, "Contact phone must be at least 10 digits")
    .max(15, "Contact phone must be less than 15 digits"),
  contact_email: z
    .string()
    .email("Invalid email format")
    .max(255, "Contact email must be less than 255 characters")
    .optional(),
  warehouse_image: z
    .string()
    .url("Invalid warehouse image URL format")
    .max(500, "Warehouse image URL must be less than 500 characters")
    .optional(),
  warehouse_type: warehouseTypeSchema.default("MAIN"),
  capacity_info: z.string().optional(),
  operating_hours: z
    .string()
    .max(255, "Operating hours must be less than 255 characters")
    .optional(),
  locations: z
    .array(warehouseLocationSchema)
    .min(1, "At least one location is required")
    .max(10, "Maximum 10 locations allowed per warehouse"),
});

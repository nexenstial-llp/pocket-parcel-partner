import z from "zod";
// Address type enum validation
const addressTypeSchema = z.enum(["HOME", "WORK", "OTHERS"]);
// Address usage type enum validation
const addressUsageTypeSchema = z.enum(["PICKUP", "DELIVERY", "BOTH"]);
const addressBaseSchema = {
  label: z
    .string()
    .min(1, "Label is required")
    .max(100, "Label must be less than 100 characters"),
  full_name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be less than 100 characters"),
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits"),
  email: z.email("Please provide a valid email address").optional(),
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
  address_type: addressTypeSchema.default("HOME"),
  custom_address_type: z
    .string()
    .min(1, "Custom address type is required when address_type is OTHERS")
    .max(50, "Custom address type must be less than 50 characters")
    .optional(),
  usage_type: addressUsageTypeSchema.optional(),
  is_default: z.boolean().default(false),
};

export const AddressSchema = z
  .object(addressBaseSchema)
  .superRefine((data, ctx) => {
    // This example superRefine logic handles the custom_address_type dependency
    if (data.address_type === "OTHER" && !data.custom_address_type) {
      ctx.addIssue({
        code: z.invalid_type.custom,
        path: ["custom_address_type"],
        message: "Custom address type is required when address type is OTHER",
      });
    }
  });

// Update address validation schema (all fields optional except id)
export const updateAddressSchema = z
  .object({
    label: z
      .string()
      .min(1, "Label is required")
      .max(100, "Label must be less than 100 characters")
      .optional(),
    full_name: z
      .string()
      .min(1, "Full name is required")
      .max(100, "Full name must be less than 100 characters")
      .optional(),
    phone_number: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be less than 15 digits")
      .optional(),
    email: z.email("Please provide a valid email address").optional(),
    address_line1: z
      .string()
      .min(1, "Address line 1 is required")
      .max(255, "Address line 1 must be less than 255 characters")
      .optional(),
    address_line2: z
      .string()
      .max(255, "Address line 2 must be less than 255 characters")
      .optional(),
    city: z
      .string()
      .min(1, "City is required")
      .max(100, "City must be less than 100 characters")
      .optional(),
    state: z
      .string()
      .min(1, "State is required")
      .max(100, "State must be less than 100 characters")
      .optional(),
    pincode: z
      .string()
      .min(6, "Pincode must be at least 6 digits")
      .max(10, "Pincode must be less than 10 digits")
      .optional(),
    country: z
      .string()
      .max(100, "Country must be less than 100 characters")
      .optional(),
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
    address_type: addressTypeSchema.optional(),
    custom_address_type: z
      .string()
      .min(1, "Custom address type is required when address_type is OTHERS")
      .max(50, "Custom address type must be less than 50 characters")
      .optional(),
    is_default: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // If address_type is OTHERS, custom_address_type must be provided
      if (data.address_type === "OTHERS") {
        return (
          data.custom_address_type && data.custom_address_type.trim().length > 0
        );
      }
      return true;
    },
    {
      message: "custom_address_type is required when address_type is OTHERS",
      path: ["custom_address_type"],
    }
  );

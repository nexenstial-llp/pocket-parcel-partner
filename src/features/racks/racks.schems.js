import { z } from "zod";

export const createRackSchema = z.object({
  warehouse_id: z.uuid("Invalid warehouse ID"),
  rack_code: z
    .string()
    .min(1, "Rack code is required")
    .max(50, "Rack code must not exceed 50 characters")
    .regex(
      /^[A-Z0-9\-_]+$/,
      "Rack code must contain only uppercase letters, numbers, hyphens, and underscores"
    ),
  rack_name: z
    .string()
    .min(1, "Rack name is required")
    .max(100, "Rack name must not exceed 100 characters"),
  location: z
    .string()
    .max(255, "Location must not exceed 255 characters")
    .optional(),
  zone: z.string().max(50, "Zone must not exceed 50 characters").optional(),
  aisle: z.string().max(20, "Aisle must not exceed 20 characters").optional(),
  row: z.string().max(20, "Row must not exceed 20 characters").optional(),
  level: z
    .number()
    .int()
    .positive("Level must be a positive integer")
    .optional(),
  capacity: z
    .number()
    .int()
    .positive("Capacity must be a positive integer")
    .optional(),
  max_weight: z
    .number()
    .positive("Maximum weight must be a positive number")
    .optional(),
  dimensions: z
    .object({
      width: z.number().positive("Width must be positive"),
      height: z.number().positive("Height must be positive"),
      depth: z.number().positive("Depth must be positive"),
      unit: z.enum(["cm", "m", "inch", "ft"]).default("cm"),
    })
    .optional(),
  rack_type: z
    .enum([
      "STANDARD",
      "HEAVY_DUTY",
      "FRAGILE",
      "COLD_STORAGE",
      "HAZMAT",
      "CUSTOM",
    ])
    .optional(),
  is_active: z.boolean().default(true),
  notes: z.string().optional(),
  metadata: z.object().optional(),
});

export const updateRackSchema = z.object({
  rack_code: z
    .string()
    .min(1, "Rack code is required")
    .max(50, "Rack code must not exceed 50 characters")
    .regex(
      /^[A-Z0-9\-_]+$/,
      "Rack code must contain only uppercase letters, numbers, hyphens, and underscores"
    )
    .optional(),
  rack_name: z
    .string()
    .min(1, "Rack name is required")
    .max(100, "Rack name must not exceed 100 characters")
    .optional(),
  location: z
    .string()
    .max(255, "Location must not exceed 255 characters")
    .optional(),
  zone: z.string().max(50, "Zone must not exceed 50 characters").optional(),
  aisle: z.string().max(20, "Aisle must not exceed 20 characters").optional(),
  row: z.string().max(20, "Row must not exceed 20 characters").optional(),
  level: z
    .number()
    .int()
    .positive("Level must be a positive integer")
    .optional(),
  capacity: z
    .number()
    .int()
    .positive("Capacity must be a positive integer")
    .optional(),
  current_load: z
    .number()
    .int()
    .nonnegative("Current load must be non-negative")
    .optional(),
  max_weight: z
    .number()
    .positive("Maximum weight must be a positive number")
    .optional(),
  dimensions: z
    .object({
      width: z.number().positive("Width must be positive"),
      height: z.number().positive("Height must be positive"),
      depth: z.number().positive("Depth must be positive"),
      unit: z.enum(["cm", "m", "inch", "ft"]).default("cm"),
    })
    .optional(),
  rack_type: z
    .enum([
      "STANDARD",
      "HEAVY_DUTY",
      "FRAGILE",
      "COLD_STORAGE",
      "HAZMAT",
      "CUSTOM",
    ])
    .optional(),
  is_active: z.boolean().optional(),
  notes: z.string().optional(),
  metadata: z.object().optional(),
});

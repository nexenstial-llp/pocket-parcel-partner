import z from "zod";

export const updateUserSchema = z.object({
  full_name: z.string().min(2).max(100).trim().optional(),
  country_code: z
    .string()
    .min(1)
    .max(5)
    .trim()
    .transform((val) => val.replace(/^\+/, ""))
    .refine((val) => /^\d+$/.test(val), {
      message: "Country code must contain only digits (no + sign)",
    })
    .optional(),
  phone_number: z
    .string("Please enter a valid phone number")
    .min(6)
    .max(15)
    .trim()
    .optional(),
  address: z.string("Address must be string").max(1000).trim().optional(),
  city: z.string("City must be string").max(100).trim().optional(),
  state: z.string("State must be string").max(100).trim().optional(),
  pincode: z.string("Pincode must be string").max(10).trim().optional(),
  avatar: z.url("Avatar must be a valid URL").optional(),
});

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Old password is required"),
    new_password: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(50, "New password must be at most 50 characters"),
    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "New password and confirm password must match",
    path: ["confirm_password"],
  });

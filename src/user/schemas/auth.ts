import { z } from "zod";

import { VALIDATION_REGEX, ValidationMessages } from "@/lib/utils/validation";
import { createEmailSchema } from "@/user/schemas/base";

const passwordSchema = z
  .string()
  .min(8, ValidationMessages.minLength("Password", 8))
  .max(72, ValidationMessages.maxLength("Password", 72))
  .regex(
    VALIDATION_REGEX.PASSWORD,
    "Please enter at least 8 characters including half-width English letters and numbers."
  );

export const loginSchema = z.object({
  email: createEmailSchema(),
  password: z.string().min(1, ValidationMessages.require("Password")),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  firstName: z.string().min(1, ValidationMessages.require("First name")),
  lastName: z.string().min(1, ValidationMessages.require("Last name")),
  email: createEmailSchema(),
  password: passwordSchema,
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

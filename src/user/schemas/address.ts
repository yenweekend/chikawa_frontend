import { z } from "zod";

import { VALIDATION_REGEX, ValidationMessages } from "@/lib/utils/validation";

export const addressSchema = z.object({
  country: z.string().min(1, ValidationMessages.require("Country")),
  city: z.string().min(1, ValidationMessages.require("City")),
  province: z.string().min(1, ValidationMessages.require("Province")),
  locationDetail: z
    .string()
    .min(1, ValidationMessages.require("Specific location")),
  recipientName: z
    .string()
    .min(1, ValidationMessages.require("Recipient's Name")),
  isDefaultAddress: z.boolean(),
  phoneNumber: z
    .string()
    .min(1, ValidationMessages.require("Phone Number"))
    .regex(
      VALIDATION_REGEX.PHONE_NUMBER,
      "Please enter a 10-digit or 11-digit phone number starting with 0."
    ),
});

export type AddressFormData = z.infer<typeof addressSchema>;

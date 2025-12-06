import { z } from "zod";

import { ValidationMessages } from "@/lib/utils/validation";

export const createEmailSchema = (
  fieldName: string = "Email address",
  maxLength: number = 200
) =>
  z
    .string()
    .min(1, ValidationMessages.require(fieldName))
    .max(maxLength, ValidationMessages.maxLength(fieldName, maxLength))
    .email(ValidationMessages.email);

export const filterPriceSchema = z
  .object({
    minPrice: z.number().min(0, ValidationMessages.numberMinLength("From", 0)),
    maxPrice: z.number().min(0, ValidationMessages.numberMinLength("To", 0)),
  })
  .refine((data) => data.maxPrice >= data.minPrice, {
    message:
      "The 'To' price must be greater than or equal to the 'From' price.",
    path: ["maxPrice"],
  });

export type FilterPriceFormData = z.infer<typeof filterPriceSchema>;

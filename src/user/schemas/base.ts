import { z } from "zod";

import { ValidationMessages } from "@/lib/validation";

export const createEmailSchema = (
  fieldName: string = "メールアドレス",
  maxLength: number = 200
) =>
  z
    .string()
    .min(1, ValidationMessages.require(fieldName))
    .max(maxLength, ValidationMessages.maxLength(fieldName, maxLength))
    .email(ValidationMessages.email);

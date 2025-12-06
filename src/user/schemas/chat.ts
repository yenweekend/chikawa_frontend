import { z } from "zod";

import { ValidationMessages } from "@/lib/utils/validation";

export const chatSchema = z.object({
  content: z
    .string()
    .min(1, { message: ValidationMessages.require("Message content") })
    .max(1000, {
      message: ValidationMessages.maxLength("Message content", 1000),
    }),
});

export type ChatFormData = z.infer<typeof chatSchema>;

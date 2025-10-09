import { z } from "zod";

import { ValidationMessages } from "@/lib/validation";
import { createEmailSchema } from "@/user/schemas/base";

export const loginSchema = z.object({
  email: createEmailSchema(),
  password: z.string().min(1, ValidationMessages.require("Password")),
});

export type LoginFormData = z.infer<typeof loginSchema>;

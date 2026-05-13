import { z } from "zod";

export const transferFormSchema = z.object({
  accountNumber: z
    .string()
    .regex(/^\d{10}$/, "Account number must be exactly 10 digits"),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than 0"),
  narration: z
    .string()
    .max(50, "Narration must not exceed 50 characters")
    .optional(),
});

export type TransferFormValues = z.infer<typeof transferFormSchema>;

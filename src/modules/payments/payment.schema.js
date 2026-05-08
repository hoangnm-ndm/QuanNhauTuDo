import z from "zod";
import { PAYMENT_STATUS } from "../../common/constants/payment-status.enum.js";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const paymentCreateSchema = z.object({
  order: objectIdSchema,
  method: z.enum(["cash", "vnpay", "momo", "banking", "pos"]),
  transactionId: z.string().optional(),
  amount: z.number().min(0),
  status: z.enum(Object.values(PAYMENT_STATUS)).optional(),
  paidAt: z.coerce.date().optional().nullable(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const paymentUpdateSchema = paymentCreateSchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

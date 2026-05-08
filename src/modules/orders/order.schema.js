import z from "zod";
import { ORDER_STATUS } from "../../common/constants/order-status.enum.js";
import { PAYMENT_STATUS } from "../../common/constants/payment-status.enum.js";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

const orderItemSchema = z.object({
  menuItem: objectIdSchema,
  nameSnapshot: z.string().min(1),
  imageSnapshot: z.string().nullable().optional(),
  priceSnapshot: z.number().min(0),
  quantity: z.number().int().min(1),
  note: z.string().max(500).optional(),
  customizations: z.array(z.string()).optional(),
  status: z.enum(Object.values(ORDER_STATUS)).optional(),
});

export const orderCreateSchema = z.object({
  branch: objectIdSchema,
  table: objectIdSchema,
  reservation: objectIdSchema.optional(),
  orderNumber: z.string().trim().min(1),
  customerName: z.string().optional(),
  customerPhone: z.string().optional(),
  items: z.array(orderItemSchema).min(1),
  status: z.enum(Object.values(ORDER_STATUS)).optional(),
  subtotal: z.number().min(0),
  tax: z.number().min(0).optional(),
  discount: z.number().min(0).optional(),
  total: z.number().min(0),
  paymentStatus: z.enum(Object.values(PAYMENT_STATUS)).optional(),
  paidAt: z.coerce.date().optional().nullable(),
  completedAt: z.coerce.date().optional().nullable(),
});

export const orderUpdateSchema = orderCreateSchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

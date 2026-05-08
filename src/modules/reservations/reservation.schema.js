import z from "zod";
import { RESERVATION_STATUS } from "../../common/constants/reservation-status.enum.js";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const reservationCreateSchema = z.object({
  branch: objectIdSchema,
  table: objectIdSchema.optional(),
  reservationCode: z.string().trim().min(1),
  customerName: z.string().trim().min(1).max(100),
  customerPhone: z.string().trim().min(1),
  customerEmail: z.string().email().optional(),
  guestCount: z.number().int().min(1).max(100),
  reservationTime: z.coerce.date(),
  reservedUntil: z.coerce.date().optional().nullable(),
  source: z.enum(["website", "facebook", "zalo", "phone", "walk_in"]).optional(),
  status: z.enum(Object.values(RESERVATION_STATUS)).optional(),
  note: z.string().max(2000).optional(),
});

export const reservationUpdateSchema = reservationCreateSchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

import z from "zod";
import { TABLE_STATUS } from "../../common/constants/table-status.enum.js";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const tableCreateSchema = z.object({
  branch: objectIdSchema,
  name: z.string().trim().min(1).max(50),
  qrCode: z.string().trim().min(1),
  capacity: z.number().int().min(1).max(50),
  status: z.enum(Object.values(TABLE_STATUS)).optional(),
  isActive: z.boolean().optional(),
});

export const tableUpdateSchema = tableCreateSchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

import z from "zod";
import { USER_ROLES } from "../../common/constants/user-role.enum.js";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const userCreateSchema = z.object({
  branch: objectIdSchema.optional(),
  fullName: z.string().trim().min(2).max(100).optional(),
  email: z.string().email(),
  phone: z.string().trim().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(Object.values(USER_ROLES)).optional(),
  avatar: z.string().trim().nullable().optional(),
  isActive: z.boolean().optional(),
});

export const userUpdateSchema = userCreateSchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

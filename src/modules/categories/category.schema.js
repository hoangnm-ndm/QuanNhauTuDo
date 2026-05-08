import z from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const categoryCreateSchema = z.object({
  branch: objectIdSchema,
  name: z.string().trim().min(1).max(100),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const categoryUpdateSchema = categoryCreateSchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

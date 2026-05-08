import z from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const menuItemCreateSchema = z.object({
  branch: objectIdSchema,
  category: objectIdSchema,
  name: z.string().trim().min(1).max(150),
  slug: z.string().trim().toLowerCase().min(1),
  description: z.string().max(2000).optional(),
  image: z.string().trim().nullable().optional(),
  price: z.number().min(0),
  available: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  preparationTime: z.number().int().min(1).optional(),
});

export const menuItemUpdateSchema = menuItemCreateSchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

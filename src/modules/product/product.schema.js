import z from "zod";

export const productCreateSchema = z.object({
  name: z.string().trim().min(1),
  price: z.number().min(0),
  description: z.string().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
});

export const productUpdateSchema = productCreateSchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

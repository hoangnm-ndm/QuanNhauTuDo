import z from "zod";

export const branchCreateSchema = z.object({
  name: z.string().trim().min(1).max(150),
  slug: z.string().trim().toLowerCase().optional(),
  phone: z.string().trim().min(1),
  address: z.string().trim().min(1).max(500),
  thumbnail: z.string().trim().nullable().optional(),
  openTime: z.string().trim().optional(),
  closeTime: z.string().trim().optional(),
  isActive: z.boolean().optional(),
});

export const branchUpdateSchema = branchCreateSchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

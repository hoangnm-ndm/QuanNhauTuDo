import z from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const feedbackCreateSchema = z.object({
  branch: objectIdSchema,
  order: objectIdSchema,
  rating: z.number().min(1).max(5),
  comment: z.string().max(2000).optional(),
});

export const feedbackUpdateSchema = feedbackCreateSchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

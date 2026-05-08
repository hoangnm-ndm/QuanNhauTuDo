import z from "zod";

export const registerAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export const loginAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

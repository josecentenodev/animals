import { z } from "zod";

export const animalFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters.")
    .max(400, "Description must be less than 400 characters"),
  imageUrl: z.string(),
  speciesId: z.string(),
});

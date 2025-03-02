import { z } from "zod";

export const categorySchema = z.object({
  name: z.string({
    required_error: "Nombre de la categoria es requerida",
  })
})
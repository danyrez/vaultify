import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce un email válido",
  }),
  password: z.string().min(6, {
    message: "Contraseña debe tener al menos 6 caracteres",
  })
})

export const registerSchema = z.object({
  name: z.string().min(3, {
    required_error: "El nombre de usuario es requerido",
  }).min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres",
  }),
  email: z.string().email({
    message: "Por favor, introduce un email válido",
  }),
  password: z.string().min(6, {
    message: "Contraseña debe tener al menos 6 caracteres",
  })
})
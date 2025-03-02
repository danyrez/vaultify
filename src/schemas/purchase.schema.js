import { z } from 'zod'

export const createPurchaseSchema = z.object({
  purchaseDate: z.string().datetime().optional()
})

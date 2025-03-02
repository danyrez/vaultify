import { z } from 'zod'

export const createSaleSchema = z.object({
  saleDate: z.string().datetime().optional()
})

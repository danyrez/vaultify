import { z } from 'zod'

export const createPurchaseDetailSchema = z.object({
  quantity: z.number({
    required_error: 'Purchase detail quantity is required'
  }),
  price: z.number({
    required_error: 'Purchase detail price is required'
  })
})

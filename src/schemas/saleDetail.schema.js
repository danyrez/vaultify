import { z } from 'zod'

export const createSaleDetailSchema = z.object({
  quantity: z.number({
    required_error: 'Sale detail quantity is required'
  }),
  price: z.number({
    required_error: 'Sale detail price is required'
  })
})

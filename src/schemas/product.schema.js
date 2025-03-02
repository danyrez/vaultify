import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string({
    required_error: 'Product name is required'
  }),
  description: z.string({
    required_error: 'Product description is required'
  }),
  price: z.number({
    required_error: 'Product price is required'
  })
})

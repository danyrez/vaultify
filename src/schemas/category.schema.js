import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string({
    required_error: 'Category name is required'
  })
})

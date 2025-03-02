import { z } from 'zod'

export const createSupplierSchema = z.object({
  name: z.string({
    required_error: 'Supplier name is required'
  }),
  email: z.string({
    required_error: 'Supplier email is required'
  }),
  phone: z.string({
    required_error: 'Supplier phone is required'
  }),
  address: z.string({
    required_error: 'Supplier address is required'
  })
})

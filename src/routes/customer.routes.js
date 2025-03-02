import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer
} from '../controllers/customer.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createCustomerSchema } from '../schemas/customer.schema.js'

const router = Router()

router.get('/', authRequired, getCustomers)
router.post('/', authRequired, validateSchema(createCustomerSchema), createCustomer)
router.delete('/:id', authRequired, deleteCustomer)
router.put('/:id', authRequired, validateSchema(createCustomerSchema), updateCustomer)

export default router

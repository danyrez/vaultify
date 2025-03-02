import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
  getSuppliers,
  createSupplier,
  deleteSupplier,
  updateSupplier
} from '../controllers/supplier.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createSupplierSchema } from '../schemas/supplier.schema.js'

const router = Router()

router.get('/', authRequired, getSuppliers)
router.post('/', authRequired, validateSchema(createSupplierSchema), createSupplier)
router.delete('/:id', authRequired, deleteSupplier)
router.put('/:id', authRequired, updateSupplier)

export default router

import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
  getSales,
  createSale,
  deleteSale,
  updateSale
} from '../controllers/sale.controler.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createSaleSchema } from '../schemas/sale.schema.js'

const router = Router()

router.get('/', authRequired, getSales)
router.post('/', authRequired, validateSchema(createSaleSchema), createSale)
router.delete('/:id', authRequired, deleteSale)
router.put('/:id', authRequired, updateSale)

export default router

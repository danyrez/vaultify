import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
  getSaleDetails,
  createSaleDetail,
  deleteSaleDetail,
  updateSaleDetail
} from '../controllers/saleDetail.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createSaleDetailSchema } from '../schemas/saleDetail.schema.js'

const router = Router()

router.get('/', authRequired, getSaleDetails)
router.post('/', authRequired, validateSchema(createSaleDetailSchema), createSaleDetail)
router.delete('/:id', authRequired, deleteSaleDetail)
router.put('/:id', authRequired, validateSchema(createSaleDetailSchema), updateSaleDetail)

export default router

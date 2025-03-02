import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
  getPurchaseDetails,
  createPurchaseDetail,
  deletePurchaseDetail,
  updatePurchaseDetail
} from '../controllers/purchaseDetail.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createPurchaseDetailSchema } from '../schemas/purchaseDetail.schema.js'

const router = Router()

router.get('/', authRequired, getPurchaseDetails)
router.post('/', authRequired, validateSchema(createPurchaseDetailSchema), createPurchaseDetail)
router.delete('/:id', authRequired, deletePurchaseDetail)
router.put('/:id', authRequired, validateSchema(createPurchaseDetailSchema), updatePurchaseDetail)

export default router

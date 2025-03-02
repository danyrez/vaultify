import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsByCategory
} from '../controllers/product.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createProductSchema } from '../schemas/product.schema.js'

const router = Router()

router.get('/', authRequired, getProducts)
router.post('/', authRequired, validateSchema(createProductSchema), createProduct)
router.delete('/:id', authRequired, deleteProduct)
router.put('/:id', authRequired, updateProduct)

router.get('/category/:categoryId', authRequired, getProductsByCategory)

export default router

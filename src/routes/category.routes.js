import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
} from '../controllers/category.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createCategorySchema } from '../schemas/category.schema.js'

const router = Router()

router.get('/', authRequired, getCategories)
router.post('/', authRequired, validateSchema(createCategorySchema), createCategory)
router.delete('/:id', authRequired, deleteCategory)
router.put('/:id', authRequired, updateCategory)

export default router

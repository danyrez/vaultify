import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getCounts } from '../controllers/stats.controller.js'

const router = Router()

router.get('/', authRequired, getCounts)

export default router

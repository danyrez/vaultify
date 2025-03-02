import { Router } from 'express'
import authToutes from './auth.routes.js'
import categoryRoutes from './category.routes.js'
import productRoutes from './product.routes.js'
import customerRoutes from './customer.routes.js'
import purchaseRoutes from './purchase.routes.js'
import saleRoutes from './sale.routes.js'
import saleDetailRoutes from './saleDetail.routes.js'
import purchaseDetailRoutes from './purchaseDetail.routes.js'
import supplierRoutes from './supplier.routes.js'
import statsRoutes from './stats.routes.js'

const routes = Router()

routes.use('/auth', authToutes)
routes.use('/categories', categoryRoutes)
routes.use('/products', productRoutes)
routes.use('/customers', customerRoutes)
routes.use('/purchases', purchaseRoutes)
routes.use('/sales', saleRoutes)
routes.use('/sale-details', saleDetailRoutes)
routes.use('/purchase-details', purchaseDetailRoutes)
routes.use('/suppliers', supplierRoutes)
routes.use('/stats', statsRoutes)

export default routes

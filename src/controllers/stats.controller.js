import { prisma } from '../config/db.js'

export const getCounts = async (req, res) => {
  try {
    const [categoriesCount, productsCount, suppliersCount, customersCount, purchasesCount, salesCount] = await Promise.all([
      prisma.category.count({ where: { userId: req.userId } }),
      prisma.product.count({ where: { userId: req.userId } }),
      prisma.supplier.count({ where: { userId: req.userId } }),
      prisma.customer.count({ where: { userId: req.userId } }),
      prisma.purchase.count({ where: { userId: req.userId } }),
      prisma.sale.count({ where: { userId: req.userId } })
    ])

    res.json({
      categoriesCount,
      productsCount,
      suppliersCount,
      customersCount,
      purchasesCount,
      salesCount
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

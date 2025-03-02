import { prisma } from '../config/db.js'

export const getSales = async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        userId: req.userId
      },
      include: {
        customer: true,
        user: true,
        saleDetails: {
          include: {
            product: true
          }
        }
      }
    })

    res.json(sales)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createSale = async (req, res) => {
  try {
    const { customerId, saleDate, saleDetails } = req.body

    const saleDetailsWithPrices = await Promise.all(
      saleDetails.map(async (detail) => {
        const product = await prisma.product.findUnique({
          where: {id: detail.productId}
        })
        return {
          productId: detail.productId,
          quantity: detail.quantity,
          price: product.price // Obtener precio del producto
        }
      })
    )

    const totalAmount = saleDetails.reduce((total, detail) => {
      return total + detail.price * detail.quantity
    }, 0)

    const newSale = await prisma.sale.create({
      data: {
        customerId,
        userId: req.userId,
        totalAmount,
        saleDate: new Date(saleDate),
        saleDetails: {
          create: saleDetailsWithPrices
        }
      }
    })

    // Actualizar stock de productos vendidos
    for (const detail of saleDetails) {
      await prisma.product.update({
        where: { id: detail.productId },
        data: {
          stock: {
            decrement: detail.quantity
          }
        }
      })
    }

    res.json(newSale)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateSale = async (req, res) => {
  const { id } = req.params
  const { customerId, saleDate, saleDetails } = req.body

  try {
    const totalAmount = saleDetails.reduce((total, detail) => {
      return total + detail.price * detail.quantity
    }, 0)

    await prisma.saleDetail.deleteMany({
      where: { saleId: parseInt(id) }
    })

    await prisma.sale.update({
      where: { id: parseInt(id) },
      data: {
        customerId,
        totalAmount,
        saleDate: new Date(saleDate),
        saleDetails: {
          create: saleDetails.map(detail => ({
            productId: detail.productId,
            quantity: detail.quantity,
            price: detail.price
          })
          )
        }
      }
    })

    // Actualizar stock de productos vendidos
    for (const detail of saleDetails) {
      await prisma.product.update({
        where: { id: detail.productId },
        data: {
          stock: {
            decrement: detail.quantity
          }
        }
      })
    }
    res.json({ message: 'Venta actualizada correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteSale = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.saleDetail.deleteMany({
      where: { saleId: parseInt(id) }
    })

    await prisma.sale.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Venta eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

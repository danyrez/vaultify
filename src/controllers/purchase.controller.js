import { prisma } from '../config/db.js'

export const getPurchases = async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: req.userId
      },
      include: {
        supplier: true,
        user: true,
        purchaseDetails: true
      }
    })

    res.json(purchases)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createPurchase = async (req, res) => {
  const { supplierId, purchaseDate, purchaseDetails } = req.body

  try {
    const totalAmount = purchaseDetails.reduce((total, detail) => {
      return total + detail.price * detail.quantity
    }, 0)

    const newPurchase = await prisma.purchase.create({
      data: {
        supplierId,
        userId: req.userId,
        totalAmount,
        purchaseDate: new Date(purchaseDate),
        purchaseDetails: {
          create: purchaseDetails.map(detail => ({
            productId: detail.productId,
            quantity: detail.quantity,
            price: detail.price
          }))
        }
      }
    })
    // Actualizar stock de productos comprados
    for (const detail of purchaseDetails) {
      await prisma.product.update({
        where: { id: detail.productId },
        data: {
          stock: {
            increment: detail.quantity
          }
        }
      })
    }
    res.json(newPurchase)
  } catch (error) {
    console.log('Error al crear compra', error)
    res.status(500).json({ message: error.message })
  }
}

export const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params

    const purchase = await prisma.purchase.findUnique({
      where: { id: parseInt(id) },
      include: {
        supplier: true,
        user: true,
        purchaseDetails: {
          include: {
            product: true
          }
        }
      }
    })

    if (!purchase) return res.status(404).json({ message: 'Compra no encontrada' })

    res.json(purchase)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updatePurchase = async (req, res) => {
  const { id } = req.params
  const { supplierId, purchaseDate, purchaseDetails } = req.body

  try {
    const totalAmount = purchaseDetails.reduce((total, detail) => {
      return total + detail.price * detail.quantity
    }, 0)

    // Eliminar los detalles de compra relacionados
    await prisma.purchaseDetail.deleteMany({
      where: { purchaseId: parseInt(id) }
    })

    // Actualizar la compra
    await prisma.purchase.update({
      where: { id: parseInt(id) },
      data: {
        supplierId,
        totalAmount,
        purchaseDate: new Date(purchaseDate),
        purchaseDetails: {
          create: purchaseDetails.map(detail => ({
            productId: detail.productId,
            quantity: detail.quantity,
            price: detail.price
          })
          )
        }
      }
    })

    // Actualizar stock de productos comprados
    for (const detail of purchaseDetails) {
      await prisma.product.update({
        where: { id: detail.productId },
        data: {
          stock: {
            increment: detail.quantity
          }
        }
      })
    }

    res.json({ message: 'Compra actualizada correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params

    // Eliminar los detalles de compra relacionados
    await prisma.purchaseDetail.deleteMany({
      where: { purchaseId: parseInt(id) }
    })

    // Eliminar la compra
    await prisma.purchase.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Compra eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

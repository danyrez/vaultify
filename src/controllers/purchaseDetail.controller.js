import { prisma } from '../config/db.js'

// Obtener todos los detalles de compra
export const getPurchaseDetails = async (req, res) => {
  try {
    const purchaseDetails = await prisma.purchaseDetail.findMany({
      include: {
        purchase: true,  // Incluir la compra asociada
        product: true    // Incluir el producto asociado
      }
    })
    res.json(purchaseDetails)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Crear un nuevo detalle de compra
export const createPurchaseDetail = async (req, res) => {
  try {
    const { purchaseId, productId, quantity, price } = req.body

    const newPurchaseDetail = await prisma.purchaseDetail.create({
      data: {
        purchaseId,
        productId,
        quantity,
        price
      }
    })

    res.json(newPurchaseDetail)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Obtener los detalles de una compra específica
export const getPurchaseDetailsByPurchaseId = async (req, res) => {
  try {
    const { purchaseId } = req.params

    const purchaseDetails = await prisma.purchaseDetail.findMany({
      where: { purchaseId: parseInt(purchaseId) },
      include: {
        product: true
      }
    })

    res.json(purchaseDetails)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Actualizar un detalle de compra
export const updatePurchaseDetail = async (req, res) => {
  try {
    const { id } = req.params
    const { productId, quantity, price } = req.body

    const updatedPurchaseDetail = await prisma.purchaseDetail.update({
      where: { id: parseInt(id) },
      data: {
        productId,
        quantity,
        price
      }
    })

    res.json(updatedPurchaseDetail)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Eliminar un detalle de compra
export const deletePurchaseDetail = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.purchaseDetail.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Purchase detail deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

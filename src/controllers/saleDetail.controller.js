import { prisma } from '../config/db.js'

// Obtener todos los detalles de ventas
export const getSaleDetails = async (req, res) => {
  try {
    const saleDetails = await prisma.saleDetail.findMany({
      include: {
        sale: true,      // Incluir la venta asociada
        product: true    // Incluir el producto asociado
      }
    })
    res.json(saleDetails)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Crear un nuevo detalle de venta
export const createSaleDetail = async (req, res) => {
  try {
    const { saleId, productId, quantity, price } = req.body

    const newSaleDetail = await prisma.saleDetail.create({
      data: {
        saleId,
        productId,
        quantity,
        price
      }
    })

    res.json(newSaleDetail)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Obtener los detalles de una venta específica
export const getSaleDetailsBySaleId = async (req, res) => {
  try {
    const { saleId } = req.params

    const saleDetails = await prisma.saleDetail.findMany({
      where: { saleId: parseInt(saleId) },
      include: {
        product: true
      }
    })

    res.json(saleDetails)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Actualizar un detalle de venta
export const updateSaleDetail = async (req, res) => {
  try {
    const { id } = req.params
    const { productId, quantity, price } = req.body

    const updatedSaleDetail = await prisma.saleDetail.update({
      where: { id: parseInt(id) },
      data: {
        productId,
        quantity,
        price
      }
    })

    res.json(updatedSaleDetail)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Eliminar un detalle de venta
export const deleteSaleDetail = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.saleDetail.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Sale detail deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

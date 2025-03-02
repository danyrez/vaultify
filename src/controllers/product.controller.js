import { prisma } from '../config/db.js'

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: req.userId
      },
      include: {
        category: true,
        user: true
      }
    })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = async (req, res) => {
  const { name, description, price, stock = 0, categoryId } = req.body
  if (stock < 0) {
    return res.status(400).json({ message: 'Stock no puede ser negativo' })
  }
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
        userId: req.userId
      }
    })
    res.json(newProduct)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto' })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, price, stock, categoryId } = req.body

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        stock,
        categoryId
      }
    })

    res.json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.product.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Obtener productos por categoría
export const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: parseInt(categoryId),
        userId: req.userId
      },
      include: {
        category: true,
        user: true
      }
    })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

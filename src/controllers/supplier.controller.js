import { prisma } from '../config/db.js'

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      where: {
        userId: req.userId
      }
    })
    res.json(suppliers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createSupplier = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body

    const newSupplier = await prisma.supplier.create({
      data: {
        name,
        email,
        phone,
        address,
        userId: req.userId
      }
    })

    res.json(newSupplier)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone, address } = req.body

    const updatedSupplier = await prisma.supplier.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        phone,
        address
      }
    })

    res.json(updatedSupplier)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.supplier.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Proveedor elimnado satisfactoriamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

import { prisma } from '../config/db.js'

export const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        userId: req.userId
      }
    })
    res.json(customers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body

    const newCustomer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        userId: req.userId
      }
    })

    res.json(newCustomer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params
    const { firstName, lastName, email, phone } = req.body

    const updatedCustomer = await prisma.customer.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        phone
      }
    })

    res.json(updatedCustomer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.customer.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Cliente elminado satisfactoriamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

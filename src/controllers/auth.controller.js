import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js'
import { createAccessToken } from '../libs/jwt.js'
import { TOKEN_SECRET } from '../config/variables.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userFound = await prisma.user.findUnique({
      where: {email}
    })

    if (userFound) {
      return res.status(400).json(['El email ya está en uso'])
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    })
    const token = await createAccessToken({ id: newUser.id })

    res.cookie('token', token, {
      // httpOnly: process.env.NODE_ENV === 'development', // descomesntar en producción
      // secure: false, // true in production
      // sameSite: 'none' // descomesntar en producción
    })

    res.json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json(['El correo no existe'])
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json(['La contraseña no es válida'])
    }

    const token = await createAccessToken({ id: user.id })

    res.cookie('token', token, {
      // httpOnly: process.env.NODE_ENV === 'development',// descomesntar en producción
      // secure: false, // true en producción
      // sameSite: 'none' // descomesntar en producción
    })

    res.json({
      is: user.id,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,

    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    expires: new Date(0)
  })
  res.json({message: 'Logout success'})
}

export const profile = async (req, res) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json(['No autorizado'])
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    })

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(401)

    const userFound = await prisma.user.findUnique({
      where: { id: decoded.id }
    })
    if (!userFound) return res.sendStatus(401)

    return res.json({
      id: userFound.id,
      name: userFound.name,
      email: userFound.email
    })
  })
}

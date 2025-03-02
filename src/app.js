import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import routes from './routes/index.js'
import { FRONTEND_URL } from './config/variables.js'

const app = express()
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api', routes)

export default app

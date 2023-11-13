import express, { Express } from 'express'
import cors from 'cors'

import apiRouter from './api'
import { errorHandler } from './middlewares'

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)

app.use(errorHandler)

export default app

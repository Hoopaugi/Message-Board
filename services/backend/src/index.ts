import app from './app'
import db from './db'
import { PORT } from './config'

const start = async () => {
  await db.connect()

  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
  })
}

start()

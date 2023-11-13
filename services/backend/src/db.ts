import mongoose from 'mongoose'

import { MONGO_URL } from './config'

const connect = async () => {
  if (!MONGO_URL) {
    throw new Error('MONGO_URL missing from env')
  }

  await mongoose.connect(MONGO_URL)
}

const disconnect = async () => {
  await mongoose.connection.close()
}

export default { connect, disconnect }

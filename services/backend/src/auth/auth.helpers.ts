import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from '../config'

export const hashPassword = async (password: string): Promise<string> => {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  return passwordHash
}

export const checkPassword = async (password: string, passwordHash: string): Promise<boolean> => {
  const correct = await bcrypt.compare(password, passwordHash)

  return correct
}

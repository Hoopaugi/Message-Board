import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserForToken, DecodedToken } from './auth.interfaces'
import { SALT_ROUNDS, SECRET } from '../config'

export const hashPassword = async (password: string): Promise<string> => {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  return passwordHash
}

export const checkPassword = async (password: string, passwordHash: string): Promise<boolean> => {
  const correct = await bcrypt.compare(password, passwordHash)

  return correct
}

export const generateToken = (userForToken: UserForToken) => {
  if(!SECRET) {
    throw new Error('SECRET missing from env')
  }

  const token = jwt.sign(userForToken, SECRET)

  return token
}

export const decodeToken = (token: string): DecodedToken => {
  if(!SECRET) {
    throw new Error('SECRET missing from env')
  }

  const decodedToken = <DecodedToken>jwt.verify(token, SECRET)

  return decodedToken
}

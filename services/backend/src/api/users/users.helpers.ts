import { Request } from "express"

import { AppError } from "../../utils"
import { NewUser } from "./users.interfaces"
import { hashPassword } from "../../auth/auth.helpers"

export const toNewUser = async (req: Request): Promise<NewUser> => {
  const body = req.body

  if (!body) {
    throw new AppError('missing request body')
  }

  if (!("username" in body)) {
    throw new AppError('missing username')
  }

  if (!("password" in body)) {
    throw new AppError('missing password')
  }

  const newUser = {
    username: body.username,
    email: body.email ? body.email : null,
    passwordHash: await hashPassword(body.password)
  }

  return newUser
}

import { Response, NextFunction } from "express"

import usersServices from "../api/users/users.services"
import { decodeToken } from "./auth.helpers"
import { AppError } from "../utils"
import { RequestWithUser } from "./auth.interfaces"

export const userExtractor = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization']

  if (!(authorization && authorization.startsWith('Bearer '))) {
    const error = new AppError('invalid token', 401)

    return next(error)
  }
  const token = authorization.replace('Bearer ', '')

  const decodedToken = decodeToken(token)

  if (!decodedToken.id) {
    const error = new AppError('invalid token', 401)

    return next(error)
  }

  const user = await usersServices.findById(decodedToken.id)

  if (!user) {
    throw new AppError('user not found', 500)
  }

  req.user = user
}

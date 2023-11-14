import { Request, Response, NextFunction } from "express"

import services from "./users.services"
import { toNewUser } from "./users.helpers"

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await toNewUser(req)

    const user = await services.create(newUser)
  
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export default { create }

import { Request, Response, NextFunction } from "express"

import { NODE_ENV } from "./config"
import { AppError } from "./utils"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).send({ message: error.message })
  }

  if (NODE_ENV === 'development') {
    res.status(500).send({ message: 'Something went wrong', stack: error.stack })
  } else {
    res.status(500).send({ message: 'Something went wrong' })
  }
}

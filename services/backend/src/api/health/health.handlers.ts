import { Request, Response } from "express";

const pong = (req: Request, res: Response) => {
  res.send('pong')
}

export default { pong }

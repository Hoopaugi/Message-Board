import { Request, Response } from "express";

const ping = (req: Request, res: Response) => {
  res.send('pong')
}

export default { ping }

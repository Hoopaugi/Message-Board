import { User } from "../api/users/users.interfaces"
import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export interface UserForToken {
  id: string
  username: string
}

export interface DecodedToken extends JwtPayload {
  id: string
  username: string
}

export interface RequestWithUser extends Request {
  user?: User
}

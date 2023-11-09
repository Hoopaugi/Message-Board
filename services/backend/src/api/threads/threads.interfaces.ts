import { Types } from "mongoose"

export interface Thread {
  title: string
  content: string
  user: Types.ObjectId
  board: Types.ObjectId
}

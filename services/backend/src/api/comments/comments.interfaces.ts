import { Types } from "mongoose"

export interface Comment {
  content: string
  user: Types.ObjectId
  thread: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

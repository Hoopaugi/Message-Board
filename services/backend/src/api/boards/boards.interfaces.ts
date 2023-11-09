import { Types } from "mongoose"

export interface Board {
  id?: Types.ObjectId
  name: string
  threads: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

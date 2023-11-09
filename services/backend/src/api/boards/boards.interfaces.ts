import { Types } from "mongoose"

export interface Board {
  name: string
  threads: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

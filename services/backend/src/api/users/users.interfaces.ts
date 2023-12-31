import { Types } from "mongoose"

export interface User {
  username: string
  email?: string
  passwordHash: string
  threads: Types.ObjectId[]
  comments: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

export type NewUser = Omit<User, "threads" | "comments" | "createdAt" | "updatedAt">

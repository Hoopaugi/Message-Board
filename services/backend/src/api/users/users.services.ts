import { HydratedDocument } from "mongoose"
import { User as IUser } from "./users.interfaces"
import User from "./User"
import { NewUser } from "./users.interfaces"

const findById = async (id: string): Promise<HydratedDocument<IUser> | null> => {
  const user = await User.findById(id)

  return user
}

const create = async (user: NewUser): Promise<HydratedDocument<IUser>> => {
  const newUser = await User.create(user)

  return newUser
}

export default { create, findById }

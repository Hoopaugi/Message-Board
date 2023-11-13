import User from "./User"
import { NewUser } from "./users.interfaces"

const create = async (user: NewUser) => {
  const newUser = await User.create(user)

  return newUser
}

export default { create }

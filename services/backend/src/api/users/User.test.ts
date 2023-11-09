import db from "../../test/db"
import User from "./User"

beforeAll(async () => {
  await db.connect()
})

afterAll(async () => {
  await db.disconnect()
})

describe("User Model", () => {
  test("New document can be created", async () => {
    const userData = {
      username: 'test',
      email: 'test',
      passwordHash: 'test'
    }

    const user = await User.create(userData)

    expect(user._id).toBeDefined()
    expect(user.username).toBe(userData.username)
    expect(user.email).toBe(userData.email)
    expect(user.threads).toStrictEqual([])
    expect(user.comments).toStrictEqual([])
    expect(user.__v).toBeDefined()
    expect(user.createdAt).toBeDefined()
    expect(user.updatedAt).toBeDefined()
  })
})

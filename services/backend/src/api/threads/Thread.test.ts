import db from "../../test/db"
import Thread from "./Thread"

beforeAll(async () => {
  await db.connect()
})

afterAll(async () => {
  await db.disconnect()
})

describe("Thread Model", () => {
  test("New document can be created", async () => {
    const threadData = {
      title: 'test',
      content: 'test'
    }

    const thread = await Thread.create(threadData)

    expect(thread._id).toBeDefined()
    expect(thread.title).toBe(threadData.title)
    expect(thread.content).toBe(threadData.content)
    expect(thread.__v).toBeDefined()
    expect(thread.createdAt).toBeDefined()
    expect(thread.updatedAt).toBeDefined()
  })

  test("JSON representation has right properties", async () => {
    const threadData = {
      title: 'test',
      content: 'test'
    }

    const thread = await Thread.create(threadData)

    const json = thread.toJSON()

    expect(Object.keys(json)).toStrictEqual([ 'title', 'content', 'createdAt', 'updatedAt', 'id' ])
  })
})

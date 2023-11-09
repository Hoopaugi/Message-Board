import db from "../../test/db"
import Comment from "./Comment"

beforeAll(async () => {
  await db.connect()
})

afterAll(async () => {
  await db.disconnect()
})

describe("Comment Model", () => {
  test("New document can be created", async () => {
    const commentData = {
      content: 'test'
    }

    const comment = await Comment.create(commentData)

    expect(comment._id).toBeDefined()
    expect(comment.content).toBe(commentData.content)
    expect(comment.__v).toBeDefined()
    expect(comment.createdAt).toBeDefined()
    expect(comment.updatedAt).toBeDefined()
  })

  test("JSON representation has right properties", async () => {
    const commentData = {
      content: 'test'
    }

    const comment = await Comment.create(commentData)

    const json = comment.toJSON()

    expect(Object.keys(json)).toStrictEqual([ 'content', 'createdAt', 'updatedAt', 'id' ])
  })
})

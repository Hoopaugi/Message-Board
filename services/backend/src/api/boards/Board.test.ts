import db from "../../test/db"
import Board from "./Board"

beforeAll(async () => {
  await db.connect()
})

afterAll(async () => {
  await db.disconnect()
})

describe("Board Model", () => {
  test("New document can be created", async () => {
    const boardData = {
      name: 'test'
    }

    const board = await Board.create(boardData)

    expect(board._id).toBeDefined()
    expect(board.name).toBe(boardData.name)
    expect(board.threads).toStrictEqual([])
    expect(board.__v).toBeDefined()
    expect(board.createdAt).toBeDefined()
    expect(board.updatedAt).toBeDefined()
  })

  test("JSON representation has right properties", async () => {
    const boardData = {
      name: 'test'
    }

    const board = await Board.create(boardData)

    const json = board.toJSON()

    expect(Object.keys(json)).toStrictEqual([ 'name', 'threads', 'createdAt', 'updatedAt', 'id' ])
  })
})

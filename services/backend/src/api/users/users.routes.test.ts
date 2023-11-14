import request from "supertest"

import app from "../../app"
import db from "../../test/db"

beforeAll(async () => {
  await db.connect()
})

afterAll(async () => {
  await db.disconnect()
})

describe("users.routes", () => {
  describe("POST /api/users", () => {
    test("Creating a new user with valid fields works", async () => {
      const data = {
        username: "tester",
        password: "secret"
      }

      const res = await request(app).post("/api/users").send(data)
  
      expect(res.statusCode).toEqual(201)
      expect(res.headers['content-type']).toContain('application/json')

      expect(res.body.username).toBe(data.username)
      expect(res.body.password).not.toBeDefined()
      expect(res.body.passwordHash).not.toBeDefined()
    })
  })
})

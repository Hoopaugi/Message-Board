import request from "supertest"

import app from "../../app"

describe("health.routes", () => {
  test("GET /api/ping", async () => {
    const res = await request(app).get("/api/ping")

    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('pong')
  })
})

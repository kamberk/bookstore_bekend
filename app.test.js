const app = require('./app')
const request = require('supertest')

describe("GET /", () => {
    describe("when nothing", () => {
        test("shoud return status 200", async() => {
            const res = await request(app).get("/")
            expect(res.statusCode).toBe(200)
        })
    })
})


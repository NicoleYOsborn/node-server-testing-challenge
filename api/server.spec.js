const request = require('supertest');
const server = require('./server.js');
const db = require("../data/dbConfig")

// describe('server.js', ()=>{
//     test('that the testing environment is set up', ()=>{
//         expect(process.env.DB_ENV).toBe('testing');
//     });

//     describe('GET /', ()=>{

//         let res = {};
//         beforeAll(async ()=>{
//             res = await request(server).get('/');
//         })

//         it('should return 200 ok', ()=>{
//              expect(res.status).toBe(200);

//         });
  
//         it('should return a JSON object', async ()=>{
//              expect(res.type).toBe('application/json');
//         });

//         it('should return {api: "up"}', ()=>{
//             expect(res.body).toEqual({api: "up"});
//         });
//     });

//     describe('GET /milkshakes', ()=>{
//         let res = {};
//         beforeAll(async ()=>{
//             res = await request(server).get('/milkshakes');
//         })

//         it('should return 200 ok', ()=>{
//              expect(res.status).toBe(200);

//         });

//         it('should return a JSON object', async ()=>{
//             expect(res.type).toBe('application/json')
//         })
//         it("should have length of 3", async ()=>{
//             expect(res.body).toHaveLength(3);
//         })
        
//     });
// });
beforeEach(async ()=>{
    await db.seed.run()
})

afterAll(async ()=>{
    await db.destroy()
})

describe('milkshake integration tests', ()=>{
    it("GET /", async ()=>{
        const res = await request(server).get('/')
        expect(res.statusCode).toBe(200)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.api).toBe("up")
    })
    it("GET /milkshakes", async () =>{
        const res = await request(server).get("/milkshakes")
        expect(res.statusCode).toBe(200)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body[0].id).toBe(1)
    })
    it("GET/milkshakes/:id", async ()=>{
        const res = await request(server).get("/milkshakes/1")
        expect(res.statusCode).toBe(200)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.flavor).toBe("strawberry")
    })
    it("GET /milkshakes/:id (not found", async ()=>{
        const res = await request(server).get("/milkshakes/50")
        expect(res.statusCode).toBe(404)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.message).toBe("could not find milkshake with given id")
    })
    it("POST /milkshakes", async ()=>{
        const res = await request(server)
            .post("/milkshakes")
            .send({flavor: "mint oreo"})
        expect(res.statusCode).toBe(201)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.id).toBeDefined()
        expect(res.body.flavor).toBe("mint oreo")
    })
    it("POST /milkshakes (failed)", async ()=>{
        const res = await request(server).post("/milkshakes").send({})
        expect(res.statusCode).toBe(500)
        expect(res.body.message).toBe("failed to insert new flavor")
    })
    it("PUT /milkshakes/:id", async ()=>{
        const res = await request(server)
            .put("/milkshakes/1")
            .send({flavor: "strawberry cream"})
        expect(res.statusCode).toBe(201)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.flavor).toBe("strawberry cream")
    })
    it("PUT /milkshakes/:id (failed)", async ()=>{
        const res = await request(server)
            .put("/milkshakes/70")
            .send({flavor: "strawberry cream"})
        expect(res.statusCode).toBe(404)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.message).toBe("unable to find milkshake to update")
    })
    it("DELETE /milkshakes/id", async ()=>{
        const res = await request(server)
        .delete("/milkshakes/2")
        .send()
    expect(res.statusCode).toBe(200)
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(res.body.removed).toBe(1)
    })
    it("DELETE /milkshakes/id (failed)", async ()=>{
        const res = await request(server)
        .delete("/milkshakes/45")
        .send()
    expect(res.statusCode).toBe(404)
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(res.body.message).toBe("could not find milkshake with given id")
    })

})
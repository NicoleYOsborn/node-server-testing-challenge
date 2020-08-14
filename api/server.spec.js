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
    // it("POST /milkshakes", async ()=>{
    //     const res = await request(server).post("/milkshakes")

    // })

})
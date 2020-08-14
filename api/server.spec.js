const request = require('supertest');
const server = require('./server.js');

describe('server.js', ()=>{
    test('that the testing environment is set up', ()=>{
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', ()=>{

        let res = {};
        beforeAll(async ()=>{
            res = await request(server).get('/');
        })

        it('should return 200 ok', ()=>{
             expect(res.status).toBe(200);

        });
  
        it('should return a JSON object', async ()=>{
             expect(res.type).toBe('application/json');
        });

        it('should return {api: "up"}', ()=>{
            expect(res.body).toEqual({api: "up"});
        });
    });

})
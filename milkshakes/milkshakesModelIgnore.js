// const db = require('../data/dbConfig')
// const Milkshakes = require('./milkshakeModel.js');


// describe('milkshake model', ()=>{
//     describe('insert', ()=>{
//         beforeEach(async ()=>{
//             await db('milkshakes').truncate();
//         });

//         it('should insert the new milkshakes into the db', async ()=>{
//             await Milkshakes.insert({flavor: 'oreo'});
//             await Milkshakes.insert({flavor: 'mint'});

//             const milkshakes = await db('milkshakes');
//             expect(milkshakes).toHaveLength(2);
//         });

//         it('should return the flavor that was inserted', async ()=>{
//             let milkshake = await Milkshakes.insert({flavor: 'oreo'});
//             expect(milkshake.flavor).toBe('oreo');

//             milkshake = await Milkshakes.insert({flavor: 'mint'});
//             expect(milkshake.flavor).toBe('mint')
//         });
//     });

//     describe('remove', ()=>{
//         beforeEach(async ()=>{
//             await db('milkshakes').truncate();
//             await Milkshakes.insert({flavor: 'oreo'});
//             await Milkshakes.insert({flavor: 'mint'});
//         });

//         it('should remove the requested flavor', async ()=>{
//             await Milkshakes.remove(1);

//             const milkshakes = await db('milkshakes');
//             expect(milkshakes).toHaveLength(1);
//         });


//     })
// })
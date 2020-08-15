const express = require("express");

const Milkshakes = require("../milkshakes/milkshakeModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/milkshakes", (req, res) => {
  Milkshakes.getAll()
    .then(milkshakes => {
      res.status(200).json(milkshakes);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/milkshakes/:id", (req, res)=>{
    const { id } = req.params;
    Milkshakes.findById(id)
    .then(milkshake =>{
       if(milkshake) {
           res.status(200).json(milkshake)
       } else {
           res.status(404).json({message: 'could not find milkshake with given id'})
       }
    })
    .catch(err =>{
        res.status(500).json({message: 'failed to get milkshakes'})
    })
})

server.post("/milkshakes", (req, res)=>{
    const milkshake = req.body
    Milkshakes.insert(milkshake)
    .then(milkshake =>{
        res.status(201).json(milkshake)
    })
    .catch(err =>{
        res.status(500).json({message: 'failed to insert new flavor'});
    })
})

server.put("/milkshakes/:id", (req, res)=>{
    const {id} = req.params;
    const changes = req.body;
    Milkshakes.findById(id)
        .then(milkshake =>{
            if(milkshake){
                Milkshakes.update(id, changes)
                .then(updated =>{
                    res.status(201).json(updated)
                });
            }else{
                res.status(404).json({message: "unable to find milkshake to update"})
            }
        })
        .catch(err =>{
            res.status(500).json({message: "Failed to update milkshake"})
        })
})

module.exports = server;
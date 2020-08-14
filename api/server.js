const express = require("express");

const milkshakes = require("../milkshakes/milkshakesModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/milkshakes", (req, res) => {
  milkshakes.getAll()
    .then(milkshakes => {
      res.status(200).json(milkshakes);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;
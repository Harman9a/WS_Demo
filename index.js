const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

require("dotenv").config();

let app = express();
let port = process.env.PORT;

const server = createServer(app);
const io = new Server(server);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

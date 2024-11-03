const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//app.use(express.static("public")); isso foi o chat que pediu por conta da modularização

io.on("connection", (socket) => {
  console.log("Usuário conectado: " + socket.id);

  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/chat.html");
});

server.listen(3000);

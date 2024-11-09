const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//app.use(express.static("public")); isso foi o chat que pediu por conta da modularização

io.on("connection", (socket) => {
  console.log("Usuário conectado: " + socket.id);

  socket.on("message", (msgData) => {
    // Recebe um objeto { username: 'nome', message: 'mensagem' }
    console.log(`${msgData.username}: ${msgData.message}`);
    
    // Emite a mensagem para todos os clientes, incluindo o nome do usuário
    io.emit("message", msgData);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html"); // Página inicial é o login
});

app.get("/chat.html", (req, res) => {
  res.sendFile(__dirname + "/chat.html"); // Verifique o caminho completo aqui
});

app.get("/css/style.css", (req, res) => {
  res.sendFile(__dirname + "/css/style.css"); // Verifique o caminho completo aqui
});
app.get("/css/login_style.css", (req, res) => {
  res.sendFile(__dirname + "/css/login_style.css"); // Verifique o caminho completo aqui
});

server.listen(3000);

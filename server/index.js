const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

//////////////////////////////////////////////////////////////////////////

const app = express();
app.use(cors());
const server = http.createServer(app);
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});

//////////////////////////////////////////////////////////////////////////

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

let playersArrayServer = [];
let coinsArrayServer = [];
for (i = 0; i < 50; i++) {
  coinsArrayServer.push({
    id: i,
    x: Math.random() * 80 - 40,
    z: Math.random() * 80 - 40,
  });
}
console.log(coinsArrayServer);
io.on("connection", (socket) => {
  console.log("New client connected ==>", "socket.id :", socket.id);

  socket.emit("init", {
    id: socket.id,
    playersArrayServer: playersArrayServer,
    coinsArrayServer: coinsArrayServer,
  });

  socket.on("move-myPlayer", (myInfo) => {
    const updateArray = playersArrayServer.filter(
      (player) => player.id !== myInfo.id
    );
    playersArrayServer = [...updateArray, myInfo];

    console.log("playersArrayServer", playersArrayServer);
    socket.broadcast.emit("move-otherPlayer", playersArrayServer);
  });

  socket.on("new-player", (player) => {
    player.id = socket.id;
    playersArrayServer.push(player);
    socket.broadcast.emit("new-player", player);
  });

  socket.on("coin-taken", (target) => {
    const updateArray = coinsArrayServer.filter((coin) => coin.id !== target);
    coinsArrayServer = [...updateArray];
    console.log("UPDATE_coinsArrayServer", coinsArrayServer.length);
    socket.broadcast.emit("coin-destroied", coinsArrayServer);

    socket.emit("coin-destroied", coinsArrayServer);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//////////////////////////////////////////////////////////////////////////

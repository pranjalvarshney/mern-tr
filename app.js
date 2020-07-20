const express = require("express");
const app = express();
const socket = require("socket.io");
const mongoose = require("mongoose");
const Game = require("./models/game");
const GameApi = require("./api/gameapi");

const port = process.env.PORT;

const expressServer = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = socket(expressServer);
mongoose.connect(
  "mongodb://localhost:27017/typefast",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected");
  }
);

io.on("connect", (socket) => {
  socket.on("create-game", async (playerName) => {
    try {
      const data = await GameApi();
      let game = new Game();
      game.words = data;
      let player = {
        socketId: socket.id,
        isGameLeader: true,
        name: playerName,
      };
      game.players.push(player);
      game = await game.save();

      const gameId = game._id.toString();
      socket.join(gameId);
      io.to(gameId).emit("update-game", game);
    } catch (error) {
      console.log(error);
    }
  });
});

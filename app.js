const express = require("express");
const app = express();
const socket = require("socket.io");
const mongoose = require("mongoose");
const Game = require("./models/game");
const GameApi = require("./api/gameapi");
const { update } = require("./models/game");
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
  socket.on("create-game", async ({ name: playerName }) => {
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

      const gameID = game._id.toString();
      socket.join(gameID);
      io.to(gameID).emit("update-game", game);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("join-game", async ({ name: playerName, gameID: _id }) => {
    try {
      let game = await Game.findById(_id);
      if (game.isOpen) {
        const gameID = game._id.toString();
        socket.join(gameID);
        let player = {
          socketId: socket.id,
          name: playerName,
          isGameLeader: false,
        };
        game.players.push(player);
        game = await game.save();
        io.to(gameID).emit("update-game", game);
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("timer", async ({ playerID, gameID }) => {
    let countdown = 5;
    let game = await Game.findById(gameID);
    let player = game.players.id(playerID);
    if (player.isGameLeader) {
      let timerID = setInterval(async () => {
        if (countdown >= 0) {
          io.to(gameID).emit("timer", { countdown, msg: "Starting game " });
          countdown--;
        } else {
          game.isOpen = false;
          game = await game.save();
          io.to(gameID).emit("update-game", game);
          // startGameClock(gameID);
          clearInterval(timerID);
        }
      }, 1000);
    }
  });

  socket.on("user-input", async ({ userInput, gameID }) => {
    try {
      let game = await Game.findById(gameID);
      console.log(game);
      if (!game.isOpen && !game.isOver) {
        let player = game.players.find(
          (player) => player.socketId === socket.id
        );
        let word = game.words[player.currentWordIndex];
        if (word === userInput) {
          player.currentWordIndex++;
          if (player.currentWordIndex !== game.words.length) {
            game = await game.save();
            io.to(gameID).emit("update-game", game);
          } else {
            let endtime = new Date().getTime();
            let { startTime } = game;
            player.wpm = calculateWPM(startTime, endtime, player);
            game = await game.save();
            socket.emit("done");
            io.to(gameID).emit("update-game", game);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
});

const startGameClock = async (gameID) => {
  let game = await Game.findById(gameID);
  game.startTime = new Date().getTime();
  game = await game.save();
  let time = 60;
  let timerID = setInterval(
    (function gameIntervalFunction() {
      if (time >= 0) {
        const formatTime = calculate(time);
        io.to(gameID).emit("timer", {
          countdown: formatTime,
          msg: "Time remaining",
        });
        time--;
      } else {
        (async () => {
          let endtime = new Date().getTime();
          let game = await Game.findById(gameID);
          let { startTime } = game;
          game.isOver = true;
          game.players.forEach((player, index) => {
            if (player.wpm === -1) {
              game.players[index].wpm = calculateWPM(
                startTime,
                endtime,
                player
              );
            }
          });
          game = await game.save();
          io.to(gameID).emit("update-game", game);
          clearInterval(timerID);
        })();
      }
      return gameIntervalFunction;
    })(),
    1000
  );
};

const calculateTime = (time) => {
  let seconds = time % 60;
  return seconds;
};

const calculateWPM = (startTime, endtime, player) => {
  let length = player.currentWordIndex;
  const time = (endtime - startTime) / 1000;
  const timeInMinutes = time / 60;
  const wpm = Math.floor(length / timeInMinutes);
  return wpm;
};

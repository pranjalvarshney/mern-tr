const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  currentWordIndex: {
    type: Number,
    default: 0,
  },
  socketId: {
    type: String,
  },
  isGameLeader: {
    type: Boolean,
    default: false,
  },
  wpm: {
    type: Number,
    default: -1,
  },
  playerName: {
    type: String,
  },
});

const GameSchema = new mongoose.Schema({
  words: [{ type: String }],
  isOpen: {
    type: Boolean,
    default: true,
  },
  isOver: {
    type: Boolean,
    default: false,
  },
  players: [PlayerSchema],
  startTime: {
    type: Number,
  },
});
module.exports = mongoose.model("Game", GameSchema);

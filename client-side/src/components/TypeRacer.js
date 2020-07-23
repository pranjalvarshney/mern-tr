import React from "react";
import { Redirect } from "react-router-dom";
import { Timer } from "./Timer";
import { StartBtn } from "./StartBtn";
import socket from "../socketConfig";
import { DisplayWords } from "./DisplayWords";
import { Form } from "./Form";
import { ProgressBar } from "./ProgressBar";
import { ScoreBoard } from "./ScoreBoard";
import { DisplayGameCode } from "./DisplayGameCode";

const findPlayer = (players) => {
  return players.find((player) => player.socketId === socket.id);
};

export const TypeRacer = ({ gameState }) => {
  const { _id, players, words, isOpen, isOver } = gameState;
  const player = findPlayer(players);

  if (_id === "") {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="text-center">
        <DisplayWords words={words} player={player} />
        <Form isOpen={isOpen} isOver={isOver} gameID={_id} />
        <ProgressBar
          players={players}
          player={player}
          wordslength={words.length}
        />
        <Timer />
        <StartBtn player={player} gameID={_id} />
        <ScoreBoard players={players} />
        <DisplayGameCode gameID={_id} />
      </div>
    </div>
  );
};

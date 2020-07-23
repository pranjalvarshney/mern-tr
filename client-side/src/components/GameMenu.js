import React from "react";
import { useHistory } from "react-router-dom";

export const GameMenu = (props) => {
  let history = useHistory();

  return (
    <div>
      <div className="text-center">
        <h1 className="my-3">Welcome to the game</h1>
        <button
          className="btn btn-primary btn-lg mr-3"
          onClick={() => history.push("/game/create")}
        >
          Create game
        </button>
        <button
          className="btn btn-success btn-lg"
          onClick={() => history.push("/game/join")}
        >
          Join game
        </button>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import socket from "../socketConfig";

export const CreateGame = () => {
  const [playerName, setplayerName] = useState("");

  const onNameChange = (event) => {
    setplayerName(event.target.value);
  };

  const onNameSubmit = (event) => {
    event.preventDefault();
    socket.emit("create-game", playerName);
  };
  return (
    <div>
      <div className="my-3 row container mx-auto">
        <div className="col-sm"></div>
        <div className="col-sm-8">
          <h3 className="text-center">Create Game</h3>
          <form onSubmit={onNameSubmit}>
            <div className="form-group">
              <label>Enter your name</label>
              <input
                className="form-control"
                type="text"
                name="playerName"
                placeholder="Player name or nickname"
                value={playerName}
                onChange={onNameChange}
              />
            </div>
            <button className="btn w-100 btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
};

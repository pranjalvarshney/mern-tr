import React, { useState } from "react";
import socket from "../socketConfig";

export const JoinGame = () => {
  const [userInput, setuserInput] = useState({ gameID: "", playerName: "" });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setuserInput({ ...userInput, [name]: value });
  };

  const onInputSubmit = (e) => {
    e.preventDefault();
    socket.emit("join-game", userInput);
  };

  return (
    <div>
      <div className="my-3 row container  mx-auto">
        <div className="col-sm"></div>
        <div className="col-sm-8">
          <h3 className="text-center">Join Game</h3>
          <form onSubmit={onInputSubmit}>
            <div className="form-group">
              <label>Enter your name</label>
              <input
                className="form-control"
                type="text"
                name="playerName"
                placeholder="Player name or nickname"
                value={userInput.playerName}
                onChange={onInputChange}
              />
            </div>
            <div className="form-group">
              <label>Enter game id</label>
              <input
                className="form-control"
                type="text"
                name="gameID"
                placeholder="Game id"
                value={userInput.gameID}
                onChange={onInputChange}
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

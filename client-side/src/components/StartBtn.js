import React, { useState } from "react";
import socket from "../socketConfig";

export const StartBtn = ({ player, gameID }) => {
  const [showBtn, setshowBtn] = useState(true);
  const { isGameLeader } = player;

  const onClickHandler = (e) => {
    socket.emit("timer", { playerID: player._id, gameID });
    setshowBtn(false);
  };

  return (
    <div>
      {isGameLeader && showBtn ? (
        <button
          type="button"
          onClick={onClickHandler}
          className="btn btn-success"
        >
          Start Game
        </button>
      ) : null}
    </div>
  );
};

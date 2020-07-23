import React, { useState, useEffect } from "react";
import socket from "../socketConfig";

export const Timer = (props) => {
  const [timer, setTimer] = useState({ countdown: "", msg: "" });
  useEffect(() => {
    socket.on("timer", (data) => {
      setTimer(data);
    });
    socket.on("done", () => {
      socket.removeListener("timer");
    });
  }, []);
  const { countdown, msg } = timer;
  return (
    <div>
      <h3>{countdown}</h3>
      <h5>{msg}</h5>
    </div>
  );
};

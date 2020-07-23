import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

import { GameMenu } from "./components/GameMenu";
import socket from "./socketConfig";
import { CreateGame } from "./components/CreateGame";
import { JoinGame } from "./components/JoinGame";
import { TypeRacer } from "./components/TypeRacer";

const App = () => {
  const [gameState, setgameState] = useState({
    _id: "",
    isOpen: false,
    players: [],
    words: "",
  });
  useEffect(() => {
    socket.on("update-game", (game) => {
      console.log(game);
      setgameState(game);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);
  //since setGameState is an async so....
  useEffect(() => {
    if (gameState._id !== "") {
      history.push(`/game/${gameState._id}`);
    }
  }, [gameState._id]);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={GameMenu} />
        <Route path="/game/create" component={CreateGame} />
        <Route path="/game/join" component={JoinGame} />
        <Route
          path="/game/:gameID"
          render={(props) => <TypeRacer {...props} gameState={gameState} />}
        />
      </Switch>
    </Router>
  );
};
export default App;

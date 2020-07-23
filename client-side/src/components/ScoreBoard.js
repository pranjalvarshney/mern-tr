import React from "react";

const getScoreBoard = (players) => {
  const filterplayers = players.filter((player) => player.wpm !== -1);
  return filterplayers.sort((a, b) =>
    a.wpm > b.wpm ? -1 : b.wpm > a.wpm ? 1 : 0
  );
};

export const ScoreBoard = ({ players }) => {
  const scoreboard = getScoreBoard(players);
  if (scoreboard.length === 0) {
    return null;
  }
  return (
    <div>
      <table className="table table-striped my-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>WPM -words per minute</th>
          </tr>
        </thead>
        <tbody>
          {scoreboard.map((player, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.wpm}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

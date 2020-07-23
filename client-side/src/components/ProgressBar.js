import React from "react";

const calculateProgress = (player, wordslength) => {
  if (player.currentWordIndex !== 0) {
    return ((player.currentWordIndex / wordslength) * 100).toFixed(2) + "%";
  }
};

export const ProgressBar = ({ player, players, wordslength }) => {
  const percent = calculateProgress(player, wordslength);
  return (
    <div className="container">
      {
        <>
          <h5 className="text-left">{player.name}</h5>
          <div className="progress my-1" key={player._id}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: percent }}
            >
              {percent}
            </div>
          </div>
        </>
      }
      {players.map((otherplayer) => {
        const percent = calculateProgress(otherplayer, wordslength);
        if (otherplayer._id !== player._id) {
          return (
            <>
              <h5 className="text-left">{otherplayer.name}</h5>
              <div className="progress my-1" key={otherplayer._id}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: percent }}
                >
                  {percent}
                </div>
              </div>
            </>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

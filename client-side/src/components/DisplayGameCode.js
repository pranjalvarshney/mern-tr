import React, { useRef, useState } from "react";
export const DisplayGameCode = ({ gameID }) => {
  const [copy, setcopy] = useState(false);
  const inputRef = useRef(null);

  const bg = {
    background: "grey",
  };

  const handleCopy = (e) => {
    inputRef.current.select();
    document.execCommand("copy");
    setcopy(true);
  };

  return (
    <div className="my-5 container">
      <span style={bg}>
        <h6>Share this game code to your friends </h6>
        <input
          value={gameID}
          type="text"
          onClick={handleCopy}
          ref={inputRef}
          readOnly
          className="form-control inline"
        />
        {copy ? alert("Game code copied successfully!") : null}
      </span>
    </div>
  );
};

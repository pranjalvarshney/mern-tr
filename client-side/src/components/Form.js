import React, { useState, useEffect, useRef } from "react";
import socket from "../socketConfig";

export const Form = ({ isOpen, isOver, gameID }) => {
  const [userInput, setuserInput] = useState("");

  const textInput = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      textInput.current.focus();
    }
  }, [isOpen]);

  const resetForm = () => {
    setuserInput("");
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;
    let lastCharacter = inputValue.charAt(inputValue.length - 1);
    if (lastCharacter === " ") {
      socket.emit("user-input", { userInput, gameID });
      resetForm();
    } else {
      setuserInput(e.target.value);
    }
  };
  return (
    <div>
      <div className="row my-3">
        <div className="col-sm"></div>
        <div className="col-sm-4">
          <form>
            <div className="form-group">
              <input
                className="form-control"
                readOnly={isOpen || isOver}
                value={userInput}
                onChange={handleChange}
                type="text"
                ref={textInput}
              />
            </div>
          </form>
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
};

import React from "react";

const typedWordsStyle = {
  color: "green",
};

const untypedWordsStyle = {
  color: "grey",
};

const currentWordStyle = {
  color: "blue ",
};

const getTypedWords = (words, player) => {
  let typedWords = words.slice(0, player.currentWordIndex);
  typedWords = typedWords.join(" ");
  return <span style={typedWordsStyle}>{typedWords} </span>;
};

const getUnTypedWords = (words, player) => {
  let untypedWords = words.slice(player.currentWordIndex + 1, words.length);
  untypedWords = untypedWords.join(" ");
  return <span style={untypedWordsStyle}> {untypedWords}</span>;
};

const currentWord = (words, player) => {
  return (
    <span style={currentWordStyle}>{words[player.currentWordIndex]} </span>
  );
};

export const DisplayWords = ({ words, player }) => {
  return (
    <div className="container">
      {getTypedWords(words, player)}
      {currentWord(words, player)}
      {getUnTypedWords(words, player)}
    </div>
  );
};

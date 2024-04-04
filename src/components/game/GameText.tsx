import React from "react";

type GameTextProps = {
  phrase: string;
  typedText: string;
  matchingLen: number;
  startIdx: number;
};

const GameText: React.FC<GameTextProps> = ({
  phrase,
  typedText,
  matchingLen,
  startIdx,
}) => {
  const completedPhrase = phrase.slice(0, startIdx);

  const matchingPhrase = phrase.slice(startIdx, startIdx + matchingLen);

  const misMatchingPhrase = phrase.slice(
    startIdx + matchingLen,
    startIdx + typedText.length
  );

  const remainingPhrase = phrase.slice(startIdx + typedText.length);

  return (
    <div className="text-3xl font-bold text-gray-800 p-4 max-w-lg mx-auto">
      <span className="text-green-500">{completedPhrase}</span>
      <span className="text-green-500">{matchingPhrase}</span>
      <span className="text-red-500">{misMatchingPhrase}</span>
      <span className="text-gray-800">{"|"}</span>
      <span className="text-gray-400">{remainingPhrase}</span>
    </div>
  );
};

export default GameText;

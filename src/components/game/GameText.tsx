"use clinet";
import React from "react";

type GameTextProps = {
  gamePhrase: string;
  cursor: number;
};

const GameText: React.FC<GameTextProps> = ({ gamePhrase, cursor }) => {
  return (
    <div className="text-3xl font-bold text-gray-800 p-4 max-w-lg mx-auto">
      {gamePhrase.split("").map((char, index) => {
        let charClass = "";
        if (index < cursor) {
          charClass = "text-green-500";
        }
        return (
          <span key={index} className={charClass}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default GameText;

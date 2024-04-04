"use client";
import React, { useState, useEffect, useRef } from "react";
import PlayerInput from "@/components/game/PlayerInput";
import GameText from "@/components/game/GameText";
import { calculateLongestPrefix } from "@/lib/utils";

const testPhrase = "Hello testing this world hello my ages in 25";
const misMatchLimit = 15;

export default function Game() {
  const [typedText, setTypedText] = useState("");
  const [startIdx, setStartIdx] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (gameStarted && !gameEnded) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [gameStarted, gameEnded]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const matchingPrefix = calculateLongestPrefix(input, testPhrase.slice(startIdx));

    // OUT OF BOUNDS
    if (startIdx + input.length > testPhrase.length) {
      return;
    }

    // MISMATCH LIMIT REACHED
    if (input.length - matchingPrefix > misMatchLimit) {
      return;
    }

    // WORD FINISHED -> MOVED TO NEXT WORD
    if (input.endsWith(" ") && testPhrase.slice(startIdx).startsWith(input)) {
        setStartIdx(startIdx + input.length);
        setTypedText("");
        return;
    }
    
    // GAME ENDED
    if (
      input.length + startIdx === testPhrase.length &&
      input === testPhrase.slice(startIdx)
    ) {
      console.log("Game Ended!")
      setGameEnded(true);
    }
    
    // UPDATE TYPED TEXT
    setTypedText(input);
  };



  const handleReset = () => {
    setTypedText("");
    setStartIdx(0);
    setGameStarted(false);
    setGameEnded(false);
    setElapsedTime(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-3xl font-bold text-gray-800 border border-gray-300 p-4 rounded-lg max-w-lg mx-auto">
        <GameText
          phrase={testPhrase}
          typedText={typedText}
          startIdx={startIdx}
        />
        <h1>{elapsedTime}</h1>
      </div>
      {!gameEnded && <PlayerInput value={typedText} onChange={handleChange} />}
      {gameEnded && (
        <div className="text-black">
          <p>Game ended! Time elapsed: {elapsedTime} seconds</p>
          <button onClick={handleReset}>Restart</button>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import PlayerInput from "@/components/game/PlayerInput";
import TextBoard from "@/components/game/GameText";
import { calculateLongestPrefix } from "@/lib/utils";

type EnemyProgress = Record<string, number>;

const testPhrase = "Hello testing this world hello my ages in 25";
const misMatchLimit = 15;

export default function Game() {
  const [typedText, setTypedText] = useState("");
  const [startIdx, setStartIdx] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [enemyProgress, setEnemyProgress] = useState<EnemyProgress>({
    player1: 0,
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (gameStarted && !gameEnded) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000); // Update every 1 seconds
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [gameStarted, gameEnded]);

  // Mocking enemy progress
  useEffect(() => {
    let enemyTimer: NodeJS.Timeout;
    if (gameStarted && !gameEnded) {
      enemyTimer = setInterval(() => {
        setEnemyProgress((prevEnemyProgress) => {
          const updatedProgress = { ...prevEnemyProgress };
          let shouldStop = true;

          Object.keys(updatedProgress).forEach((player) => {
            updatedProgress[player] += 1;
            if (updatedProgress[player] < testPhrase.length) {
              shouldStop = false;
            }
          });
          console.log(updatedProgress);
          if (shouldStop) {
            console.log("I'm done!");
            clearInterval(enemyTimer);
          }

          return updatedProgress;
        });
      }, 100);
    } else {
      setEnemyProgress({ player1: 0 });
    }
    return () => {
      clearInterval(enemyTimer);
    };
  }, [gameStarted, gameEnded]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const matchingPrefix = calculateLongestPrefix(
      input,
      testPhrase.slice(startIdx)
    );

    // OUT OF BOUNDS
    if (startIdx + input.length > testPhrase.length) {
      return;
    }

    // MISMATCH LIMIT REACHED
    if (input.length - matchingPrefix > misMatchLimit) {
      return;
    }

    // GAME STARTED
    if (!gameStarted) {
      setGameStarted(true);
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
      console.log("Game Ended!");
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
      <div className="text-3xl flex flex-col gap-10 font-bold text-gray-800 border border-gray-300 p-4 rounded-lg max-w-lg mx-auto">
        <TextBoard
          phrase={testPhrase}
          typedText={typedText}
          startIdx={startIdx}
          enemiesProgress={enemyProgress}
        />
        {!gameEnded && (
          <PlayerInput value={typedText} onChange={handleChange} />
        )}
        <h1 className="text-black text-center">{elapsedTime}</h1>
      </div>
      {gameEnded && (
        <div className="text-black">
          <p className="text-center">
            Game ended! Time elapsed: {elapsedTime} seconds
          </p>
          <button onClick={handleReset}>Restart</button>
        </div>
      )}
    </div>
  );
}

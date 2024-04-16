"use client";

import React, { useState, useEffect } from "react";
import PlayerInput from "@/components/game/PlayerInput";
import TextBoard from "@/components/game/TextBoard";
import { calculateLongestPrefix } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type EnemyProgress = Record<string, number>;

const testPhrase = "Hello testing this world hello my ages in 25";
const misMatchLimit = 15;

export default function Game() {
  const searchParms = useSearchParams();
  const [typedText, setTypedText] = useState("");
  const [startIdx, setStartIdx] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [enemyProgress, setEnemyProgress] = useState<EnemyProgress>({
    player1: 0,
  });

  useEffect(() => {
    const playerId = searchParms.get("playerId")
    console.log("playerId: ", playerId);
    const gameWebSocket = new WebSocket(
      "ws://localhost:8000/game/{game_id}/ws"
    );

    gameWebSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    gameWebSocket.onmessage = (event) => {
      const data: EnemyProgress = JSON.parse(event.data);
      setEnemyProgress(data);
    };

    gameWebSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      gameWebSocket.close();
    };
  }, []);

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
      </div>
      {gameEnded && (
        <div className="text-black">
          <button onClick={handleReset}>Restart</button>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState } from "react";
import PlayerInput from "@/components/game/PlayerInput";
import PlayerProgressComponent from "@/components/game/PlayerProgress";
import GameText from "@/components/game/GameText";

const testPhrase =
  "Hello this is a test phrase to type out in the game component. But it's not a game yet, just a test.";

export default function Game() {
  const [playerProgress, setPlayerProgress] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerProgress(event.target.value);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <GameText gamePhrase={testPhrase} cursor={playerProgress.length} />
      <PlayerInput value={playerProgress} onChange={handleChange} />
    </div>
  );
}

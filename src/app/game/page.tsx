"use client";
import React, { useState } from "react";
import PlayerInput from "@/components/game/PlayerInput";
import GameText from "@/components/game/GameText";

const testPhrase =
  "Hello this is a test phrase to type out in the game component. But it's not a game yet, just a test.";

export default function Game() {
  const [typedText, setTypedText] = useState("");
  const [matchingLen, setMatchingLen] = useState(0);
  const [startIdx, setStartIdx] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    let newMatchingLen = 0;
    while (
      newMatchingLen < input.length &&
      newMatchingLen < testPhrase.length &&
      input[newMatchingLen] === testPhrase[startIdx + newMatchingLen]
    ) {
      newMatchingLen++;
    }

    if (input.endsWith(" ") && testPhrase.slice(startIdx).startsWith(input)) {
      setStartIdx(startIdx + input.length);
      setTypedText("");
      setMatchingLen(0);
    } else if (matchingLen + 15 > input.length) {
      setMatchingLen(newMatchingLen);
      setTypedText(input);
    }

    if (testPhrase.slice(startIdx + input.length).trim().length === 0) {
      // implement game end
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-3xl font-bold text-gray-800 border border-gray-300 p-4 rounded-lg max-w-lg mx-auto">
        <GameText
          phrase={testPhrase}
          typedText={typedText}
          matchingLen={matchingLen}
          startIdx={startIdx}
        />
        <PlayerInput value={typedText} onChange={handleChange} />
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import LinkButton from "@/components/common/LinkButton";
import CustomButton from "@/components/common/CustomButton";

const JoinPage: React.FC = () => {
  const [gameId, setGameId] = useState("");
  const [username, setUsername] = useState("");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join Game
        </h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gameId"
            >
              Game ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gameId"
              type="text"
              placeholder="Enter Game ID"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <CustomButton onClick={()=>{}} className="w-full">
            {"> "} Join Game
            </CustomButton>
            <LinkButton
              href="/"
              className="btn-sm"
            >
              Back to Home
            </LinkButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JoinPage;

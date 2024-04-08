"use client";
import React from "react";
import LinkButton from "@/components/common/LinkButton";

const Home: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          K-ype IO
        </h2>
        <div className="space-y-6">
          <LinkButton href="/game/create">
            Create Game
          </LinkButton>
          <LinkButton href="/game/join">
            Join Game
          </LinkButton>
        </div>
      </div>
    </main>
  );
};

export default Home;

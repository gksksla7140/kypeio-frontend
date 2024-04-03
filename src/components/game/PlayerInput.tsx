import React from "react";

type PlayerInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PlayerInput = ({ value, onChange }: PlayerInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Type here..."
      className="border rounded p-2 w-full"
    />
  );
};

export default PlayerInput;

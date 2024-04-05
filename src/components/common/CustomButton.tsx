"use client"
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

const CustomButton: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
}) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;

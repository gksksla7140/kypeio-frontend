"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const CustomButton: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
}) => {
  const { pending } = useFormStatus();
  const buttonClassName = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline ${className} ${
    pending ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <button className={buttonClassName} onClick={onClick} disabled={pending}>
      {children}
    </button>
  );
};

export default CustomButton;

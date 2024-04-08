"use client";

import React from "react";
import { useFormState } from "react-dom";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormProps = {
  children: React.ReactNode;
  className?: string;
  formAction: (preFormData: any, formData: FormData) => Promise<any>;
};

export default function Form({ children, className, formAction }: FormProps) {
const [state, action] = useFormState(formAction, null);
const router = useRouter();

if (state?.error) {
    toast.error(state.error.message);
} else if (state?.data) {
    const query = new URLSearchParams(state.data.playerId).toString();
    router.push(`/game/play/${state.data.gameId}?${query}`);
}

  return (
    <form
      action={action}
      className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${className}`}
    >
      {children}
    </form>
  );
}

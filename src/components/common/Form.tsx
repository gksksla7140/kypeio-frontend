"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-hot-toast";

type FormProps = {
  children: React.ReactNode;
  className?: string;
  formAction: (preFormData: any, formData: FormData) => Promise<any>;
};

export default function Form({ children, className, formAction }: FormProps) {
  const [state, action] = useFormState(formAction, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }

    return () => {
      toast.dismiss();
    };
  }, [state]);

  return (
    <form
      action={action}
      className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${className}`}
    >
      {children}
    </form>
  );
}

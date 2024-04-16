import { ValidationError } from "@/errors/errors";
export const calculateLongestPrefix = (
  input: string,
  phrase: string
): number => {
  const minLength = Math.min(input.length, phrase.length);
  for (let i = 0; i < minLength; i++) {
    if (input[i] !== phrase[i]) {
      return i;
    }
  }

  return minLength;
};

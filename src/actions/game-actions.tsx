"use server";

import { z } from "zod";

const host = "http://localhost:8000";

const createSchema = z.object({
  playerId: z.string({
    invalid_type_error: "Invalid Player ID",
  }),
});

export async function createGame(formData: FormData) {
  const validatedFields = createSchema.safeParse({
    playerId: formData.get("playerId")
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${host}/create_game`, {
    method: "POST",
    body: JSON.stringify({
      playerId: validatedFields.data.playerId
    }),
  });

    if (!res.ok) {
      return {
        errors: "Server Error"
      };
    }

    return res.json();
}

const joinSchema = z.object({
    playerId: z.string({
        invalid_type_error: "Invalid Player ID",
        }),
    gameId: z.string({
        invalid_type_error: "Invalid Game ID",
        }),
    });

export async function joinGame(formData: FormData) {
    const validatedFields = joinSchema.safeParse({
        playerId: formData.get("playerId"),
        gameId: formData.get("gameId"),
    });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${host}/join_game`, {
    method: "POST",
    body: JSON.stringify({
      playerId: validatedFields.data.playerId,
    }),
  });

   if (!res.ok) {
     return {
       errors: "Game not found",
     };
   }

  return res.json();
}
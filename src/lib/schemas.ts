import { z } from "zod";

export const createSchema = z.object({
  hostId: z
    .string({
      invalid_type_error: "Invalid Host ID",
    })
    .min(1, "Host ID is required"),
});

export const joinSchema = z.object({
  playerId: z
    .string({
      invalid_type_error: "Invalid Player ID",
    })
    .min(1, "Player ID is required"),
  gameId: z
    .string({
      invalid_type_error: "Invalid Game ID",
    })
    .min(1, "Game ID is required"),
});

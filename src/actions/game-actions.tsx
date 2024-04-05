import { z } from "zod";
import * as changeCase from "change-case/keys";
import {
  ValidationError,
  ServerError,
  GameNotFoundError,
  PlayerIdColisionError,
} from "@/errors/errors";
const host = "http://127.0.0.1:8000";

const createSchema = z.object({
  hostId: z.string({
    invalid_type_error: "Invalid Host ID",
  }),
});

interface CreateGameResponse {
  errors?: string;
  gameId?: string;
  message?: string;
}

export async function createGame(
  formData: FormData
): Promise<CreateGameResponse> {
  const validatedFields = createSchema.safeParse({
    hostId: formData.get("playerId"),
  });

  try {
    if (!validatedFields.success) {
      throw new ValidationError("Invalid Host ID");
    }
    const response = await fetch(`${host}/create_game`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changeCase.snakeCase(validatedFields.data)),
    });

    if (!response.ok) {
      throw new ServerError("Server Error");
    }

    return changeCase.camelCase(await response.json()) as CreateGameResponse;
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: error.message,
      };
    } else {
      return { errors: "UNKNOWN ERROR" };
    }
  }
}

const joinSchema = z.object({
  playerId: z.string({
    invalid_type_error: "Invalid Player ID",
  }),
  gameId: z.string({
    invalid_type_error: "Invalid Game ID",
  }),
});

interface JoinGameResponse {
  errors?: string;
  message?: string;
}

export async function joinGame(formData: FormData): Promise<JoinGameResponse> {
  const validatedFields = joinSchema.safeParse({
    playerId: formData.get("playerId"),
    gameId: formData.get("gameId"),
  });

  try {
    if (!validatedFields.success) {
      throw new ValidationError("Invalid Player ID or Game ID");
    }
    const response = await fetch(`${host}/join_game`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changeCase.snakeCase(validatedFields.data)),
    });

    if (!response.ok) {
      handleStatusCodeError(response.status);
    }

    return changeCase.camelCase(await response.json()) as JoinGameResponse;
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: error.message,
      };
    } else {
      return { errors: "UNKNOWN ERROR" };
    }
  }
}

function handleStatusCodeError(statusCode: number) {
  switch (statusCode) {
    case 404:
      throw new GameNotFoundError("Game not found");
    case 409:
      throw new PlayerIdColisionError("Player ID already exists");
    default:
      throw new ServerError("Server Error");
  }
}

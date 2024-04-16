"use server";
import { createSchema, joinSchema } from "@/lib/schemas";
import { GameDetailResponse } from "@/lib/types";
import {
  ValidationError,
  ServerError,
  GameNotFoundError,
  PlayerIdColisionError,
} from "@/errors/errors";
import * as changeCase from "change-case/keys";

const HOST_ENDPOINT = process.env.API_HOST;
const CHANGE_CASE_MAX_DEPTH = 3;

async function fetchData(url: string, method: string, body?: any) {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(changeCase.snakeCase(body)) : undefined,
  });

  if (!response.ok) {
    let errorMessage = "Failed to fetch data";
    if (response.status === 404) {
      errorMessage = "Game not found";
      throw new GameNotFoundError(errorMessage);
    } else if (response.status === 409) {
      errorMessage = "Player ID already exists";
      throw new PlayerIdColisionError(errorMessage);
    } else {
      throw new ServerError(errorMessage);
    }
  }

  return changeCase.camelCase(await response.json(), CHANGE_CASE_MAX_DEPTH);
}

export async function createGame(
  preFormData: any,
  formData: FormData
): Promise<Partial<{ error: string; data: GameDetailResponse["gameDetail"] }>> {
  try {
    const validatedFields = createSchema.safeParse({
      hostId: formData.get("hostId"),
    });

    if (!validatedFields.success) {
      throw new ValidationError(validatedFields.error.issues[0].message);
    }

    const responseData = (await fetchData(
      `${HOST_ENDPOINT}/create_game`,
      "POST",
      validatedFields.data
    )) as GameDetailResponse;
    return {
      data: responseData.gameDetail,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function joinGame(
  preFormData: any,
  formData: FormData
): Promise<Partial<{ error: string; data: GameDetailResponse["gameDetail"] }>> {
  try {
    const validatedFields = joinSchema.safeParse({
      playerId: formData.get("playerId"),
      gameId: formData.get("gameId"),
    });

    if (!validatedFields.success) {
      throw new ValidationError(validatedFields.error.issues[0].message);
    }

    const responseData = (await fetchData(
      `${HOST_ENDPOINT}/join_game`,
      "POST",
      validatedFields.data
    )) as GameDetailResponse;

    return {
      data: responseData.gameDetail,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

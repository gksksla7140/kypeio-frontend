"use server";
import { createSchema, joinSchema } from "@/lib/schemas";
import { GameApiResponse } from "@/lib/types";
import {
  ValidationError,
  ServerError,
  GameNotFoundError,
  PlayerIdColisionError,
} from "@/errors/errors";
import * as changeCase from "change-case/keys";

const host = "http://127.0.0.1:8000";

export async function createGame(
  preFormData: any,
  formData: FormData
): Promise<GameApiResponse> {
  try {
    const validatedFields = createSchema.safeParse({
      hostId: formData.get("hostId"),
    });

    if (!validatedFields.success) {
      throw new ValidationError("Invalid Form Data");
    }
    const snakeCaseData = changeCase.snakeCase(validatedFields.data);
    const responseData = await fetchData(snakeCaseData, `${host}/create_game`);
    const data = changeCase.camelCase(responseData.data);

    return { data } as GameApiResponse;
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
}

export async function joinGame(
  preFormData: any,
  formData: FormData
): Promise<GameApiResponse> {
  try {
    const validatedFields = joinSchema.safeParse({
      playerId: formData.get("playerId"),
      gameId: formData.get("gameId"),
    });

    if (!validatedFields.success) {
      throw new ValidationError("Invalid Form Data");
    }

    const snakeCaseData = changeCase.snakeCase(validatedFields.data);
    const responseData = await fetchData(snakeCaseData, `${host}/join_game`);
    const data = changeCase.camelCase(responseData);
    return { data } as GameApiResponse;
  } catch (error) {
    return handleError(error);
  }
}

async function fetchData(data: any, url: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new ServerError(errorMessage);
  }

  return await response.json();
}

function handleError(error: any) {
  if (error instanceof Error) {
    switch (true) {
      case error instanceof ValidationError:
        return { errors: error.message };
      case error instanceof GameNotFoundError:
        return { errors: error.message };
      case error instanceof PlayerIdColisionError:
        return { errors: error.message };
      case error instanceof ServerError:
        return { errors: error.message };
      default:
        return { errors: "UNKNOWN ERROR" };
    }
  } else {
    return { errors: "UNKNOWN ERROR" };
  }
}

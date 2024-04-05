export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
  }
}

export class GameNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GameNotFoundError";
  }
}

export class PlayerIdColisionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PlayerIdColisionError";
  }
}
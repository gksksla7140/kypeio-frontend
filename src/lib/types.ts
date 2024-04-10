export interface CreateGameResponse {
  errors?: string;
  gameId?: string;
  message?: string;
  hostId?: string;
}
export interface JoinGameResponse {
  errors?: string;
  message?: string;
  gameId?: string;
  playerId?: string;
}


export interface GameApiResponse {
  errors?: string;
  data?: {
    gameId: string;
    playerId: string;
  };
}